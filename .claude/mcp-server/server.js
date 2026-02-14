#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const CLAUDE_DIR = path.join(PROJECT_ROOT, '.claude');

const server = new Server(
  {
    name: 'content-splitter-rules',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_rules',
        description: 'Read the safety rules that must be followed for all operations',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'read_guide',
        description: 'Read a specific guide file (security, cleanup, test, translation-check, functional-test)',
        inputSchema: {
          type: 'object',
          properties: {
            guide: {
              type: 'string',
              enum: ['security', 'cleanup', 'test', 'translation-check', 'functional-test'],
              description: 'Which guide to read',
            },
          },
          required: ['guide'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'read_rules') {
      const rulesPath = path.join(CLAUDE_DIR, 'rules.md');
      
      if (!fs.existsSync(rulesPath)) {
        return {
          content: [
            {
              type: 'text',
              text: '⚠️ rules.md not found.',
            },
          ],
        };
      }

      const content = fs.readFileSync(rulesPath, 'utf8');
      return {
        content: [
          {
            type: 'text',
            text: `# Safety Rules\n\n${content}`,
          },
        ],
      };
    }

    if (name === 'read_guide') {
      const guideName = args.guide;
      const guidePath = path.join(CLAUDE_DIR, `${guideName}.md`);

      if (!fs.existsSync(guidePath)) {
        return {
          content: [
            {
              type: 'text',
              text: `⚠️ ${guideName}.md not found.`,
            },
          ],
        };
      }

      const content = fs.readFileSync(guidePath, 'utf8');
      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Unknown tool: ${name}`,
        },
      ],
      isError: true,
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('ContentSplitter MCP Server running');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});