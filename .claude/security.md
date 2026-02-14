# 보안 자동 체크 가이드

## 목적
프로젝트에 보안 취약점이 있는지 자동으로 확인하고 수정합니다.

## 체크리스트

### 1. .env 파일 보호
**확인:** `.gitignore`에 `.env`가 있는가?
**이유:** API 키가 GitHub에 올라가면 큰 문제
**수정:** 없으면 `.gitignore`에 `.env` 추가

### 2. 하드코딩된 API 키 찾기
**확인:** 
- `grep -r "sk-ant-" --include="*.js" .` 실행
- `grep -r "ANTHROPIC_API_KEY.*=" --include="*.js" .` 실행

**이유:** 코드에 API 키가 직접 들어있으면 GitHub에 노출됨
**수정:** 
```javascript
// 잘못된 예
const apiKey = "sk-ant-abc123...";

// 올바른 예
const apiKey = process.env.ANTHROPIC_API_KEY;
```

### 3. CORS 와일드카드 체크
**확인:** `Access-Control-Allow-Origin: *` 검색
**이유:** 모든 도메인 허용은 위험
**수정:**
```javascript
// 잘못된 예
res.setHeader('Access-Control-Allow-Origin', '*');

// 올바른 예
res.setHeader('Access-Control-Allow-Origin', 'https://content-splitter.vercel.app');
```

### 4. 사용자 입력 검증
**확인:** API 엔드포인트에서 `req.body` 사용 시 검증 코드 있는지
**이유:** 악의적인 입력 방지
**수정:** 입력값 길이, 타입 검증 추가

## 실행 순서
1. 위 항목을 **순서대로** 하나씩 체크
2. 문제 발견 시 즉시 수정
3. 모든 수정 사항을 `SECURITY_REPORT.md`에 기록
4. 형식:
```
# 보안 체크 결과 (2026-02-XX)

## 발견된 문제
1. [문제 설명]
   - 파일: [파일명]
   - 줄: [줄번호]
   - 수정: [어떻게 고쳤는지]

## 문제 없었던 항목
- .env는 .gitignore에 있음
- ...
```

## 주의사항
- **절대** 기능 변경하지 말 것
- **절대** API 엔드포인트 URL 바꾸지 말 것
- 의심스러우면 수정하지 말고 보고만 할 것