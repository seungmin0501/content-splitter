# 코드 정리 자동화 가이드

## 목적
개발 중 쌓인 불필요한 코드를 제거하여 코드베이스를 깔끔하게 유지합니다.

## 정리 항목

### 1. console.log 제거
**찾기:** 
```bash
grep -rn "console.log" --include="*.js" .
```

**제거 기준:**
- ✅ 제거: `console.log('test')`, `console.log(data)` 등 디버깅용
- ❌ 유지: `console.error()` - 에러 로그는 필요
- ❌ 유지: `// console.log()` - 이미 주석 처리된 것

**예시:**
```javascript
// 제거할 것
console.log('API 호출 시작');
console.log('받은 데이터:', data);

// 유지할 것
console.error('변환 중 오류:', error);
```

### 2. 사용하지 않는 import 제거
**찾기:** 
- import한 것 중 실제로 사용하지 않는 것 찾기
- 각 파일을 열어서 import된 변수/함수가 코드에 있는지 확인

**예시:**
```javascript
// 제거할 것
import { unused } from './utils';  // unused를 코드에서 사용 안 함
import React from 'react';  // React 안 쓰는 파일에서

// 유지할 것
import { formatDate } from './utils';  // formatDate() 사용 중
```

### 3. 주석 처리된 코드 제거
**제거 기준:**
- ✅ 제거: 주석 처리된 옛날 코드
- ❌ 유지: 설명용 주석
- ❌ 유지: TODO 주석

**예시:**
```javascript
// 제거할 것
// const oldFunction = () => {
//   return 'deprecated';
// }

// 유지할 것
// TODO: 나중에 캐싱 추가
// 이 함수는 API 호출을 처리합니다
```

### 4. 중복 함수 통합
**찾기:** 이름이나 기능이 비슷한 함수
**판단 기준:**
- 완전히 동일한 코드 → 하나만 남기고 제거
- 90% 유사 → 하나로 통합 후 파라미터로 분기
- 50% 유사 → 그대로 유지 (무리하게 통합하지 말 것)

## 실행 순서
1. **백업 먼저:** `git add . && git commit -m "backup before cleanup"`
2. 위 항목을 순서대로 처리
3. 각 수정 후 **로컬 테스트** 필수
4. 정리 내역을 `CLEANUP_REPORT.md`에 기록

## 테스트 방법
```bash
# 로컬 서버 실행
vercel dev

# 브라우저에서 확인
# - 모든 페이지 정상 로드?
# - 버튼 클릭 작동?
# - 콘솔 에러 없음?
```

## 절대 금지
- ❌ 파일 삭제
- ❌ 함수 로직 변경
- ❌ API 엔드포인트 변경
- ❌ CSS/디자인 수정
- ❌ package.json에서 의존성 제거

## 보고 형식
```markdown
# 코드 정리 결과 (2026-02-XX)

## 제거한 것
- console.log: 15개 (script.js: 8개, api/convert.js: 7개)
- 사용하지 않는 import: 3개
- 주석 처리된 코드: 50줄

## 통합한 함수
- getCookie()와 readCookie() → getCookie()로 통합

## 테스트 결과
✅ 로컬 서버 정상 작동
✅ 모든 기능 정상
✅ 콘솔 에러 없음
```