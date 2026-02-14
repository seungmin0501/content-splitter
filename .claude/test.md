# 자동 에러 테스트 가이드

## 목적
코드를 실제로 실행하여 런타임 에러를 찾고 수정합니다.

## 준비 단계

### 1. 환경 변수 확인
```bash
# .env 파일이 있는지 확인
ls -la .env

# 필수 환경변수가 모두 있는지 확인
grep "ANTHROPIC_API_KEY" .env
grep "LEMON_SQUEEZY_API_KEY" .env
```

**없으면:** 테스트 중단하고 보고

### 2. 의존성 설치 확인
```bash
# node_modules 있는지 확인
ls node_modules

# 없으면 설치
npm install
```

## 테스트 실행

### 1단계: 서버 시작
```bash
vercel dev
```

**예상 출력:**
```
Ready! Available at http://localhost:3000
```

**에러 나면:**
- 에러 메시지 전체를 복사
- 어느 파일의 몇 번째 줄인지 확인
- 해당 파일 열어서 수정
- 다시 시작

### 2단계: 브라우저 테스트
**URL:** http://localhost:3000

**체크리스트:**
1. 페이지가 로드되는가?
   - ✅ 성공: 헤더, 입력창, 버튼 보임
   - ❌ 실패: 빈 화면 또는 에러 페이지

2. F12 → Console 탭 확인
   - ✅ 성공: 에러 없음
   - ❌ 실패: 빨간색 에러 메시지 있음

3. 기능 테스트:
   - 언어 선택 드롭다운 클릭 → 변경되는가?
   - 텍스트 입력 → 글자 수 카운터 업데이트되는가?
   - 변환 버튼 클릭 → 로딩 표시되는가?
   - (API 키 있으면) 실제 변환 작동하는가?

### 3단계: 에러 수정

**콘솔 에러 예시와 수정 방법:**

**에러 1:**
```
Uncaught ReferenceError: updateUI is not defined
```
**의미:** `updateUI` 함수를 호출했는데 정의되지 않음
**수정:**
1. `updateUI` 함수가 어디 있는지 찾기
2. import 되어있는지 확인
3. 함수명 오타인지 확인

**에러 2:**
```
TypeError: Cannot read property 'textContent' of null
```
**의미:** 존재하지 않는 DOM 요소에 접근
**수정:**
1. 에러가 난 줄 찾기
2. `getElementById` 또는 `querySelector`로 찾는 요소
3. HTML에 해당 id가 있는지 확인
4. 오타 확인

**에러 3:**
```
Failed to fetch
```
**의미:** API 호출 실패
**수정:**
1. API 엔드포인트 URL 확인
2. 서버가 실행 중인지 확인
3. CORS 설정 확인
4. 환경변수 확인

## 수정 프로세스
1. 에러 메시지 읽기
2. 해당 파일 열기
3. 문제 코드 찾기
4. 수정
5. 서버 재시작 (자동 재시작 안 되면)
6. 브라우저 새로고침
7. 다시 테스트
8. 반복

## 완료 조건
- ✅ 서버가 에러 없이 시작됨
- ✅ 페이지가 정상 로드됨
- ✅ 콘솔에 빨간 에러 0개
- ✅ 모든 기본 기능 작동

## 보고 형식
```markdown
# 에러 테스트 결과 (2026-02-XX)

## 발견하고 수정한 에러

### 에러 1: updateUI is not defined
- **파일:** script.js:40
- **원인:** 함수 정의 전에 호출
- **수정:** 함수 정의를 위로 이동

### 에러 2: Cannot read textContent of null
- **파일:** script.js:125
- **원인:** id="charCount" 요소가 없음
- **수정:** HTML에 해당 요소 추가

## 최종 상태
✅ 모든 에러 수정 완료
✅ 기능 정상 작동 확인
```