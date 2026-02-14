# 번역 체크 가이드

## 목적
ContentSplitter의 4개 언어(한국어, 영어, 일본어, 스페인어) 번역이 완전하고 일관성 있는지 자동으로 검사합니다.

## 체크 대상 파일
1. `translations.js` - UI 번역
2. `seo-content.js` - SEO 섹션 번역
3. `index.html` - 모달 번역 (modalTranslations)

## 체크리스트

### 1. 번역 키 완전성 체크
**확인:**
- 모든 언어(ko, en, ja, es)가 동일한 키를 가지고 있는가?
- 한 언어에만 있고 다른 언어에 없는 키는 없는가?

**방법:**
```javascript
// translations.js 예시
const translations = {
  ko: { key1: '값', key2: '값' },
  en: { key1: 'value', key2: 'value' },
  ja: { key1: '値', key2: '値' },
  es: { key1: 'valor', key2: 'valor' }
};

// 각 언어의 Object.keys() 개수가 동일한지 확인
// 누락된 키가 있으면 보고
```

**수정:**
- 누락된 키 찾아서 추가
- 임시로 영어 번역 복사 후 "TODO: 번역 필요" 주석

---

### 2. 빈 번역값 체크
**확인:**
- 값이 빈 문자열("")인 경우
- undefined 또는 null인 경우

**예시:**
```javascript
// 잘못된 예
ko: { button: '' }  // ❌ 빈 문자열

// 올바른 예
ko: { button: '클릭' }  // ✅
```

---

### 3. 번역 파일별 체크

#### A. translations.js
**확인 항목:**
- `title`, `subtitle` - 헤더
- `platforms` - 플랫폼 이름
- `inputPlaceholder` - 입력창
- `convertBtn` - 변환 버튼
- `copyBtn`, `copiedBtn` - 복사 버튼
- `alerts` - 모든 경고 메시지
- `loadingMessages` - 로딩 메시지 배열
- `charInfo`, `overLimit` - 글자 수

**보고 형식:**
```
translations.js 체크 결과:
- ko: 45개 키
- en: 45개 키
- ja: 44개 키 ❌ (누락: alerts.error)
- es: 45개 키
```

#### B. seo-content.js
**확인 항목:**
- `howItWorks` - 3단계
- `benefits` - 6개 혜택
- `perfectFor` - 4개 사용자 유형
- `faq` - 6개 질문

**각 섹션의 항목 개수 확인:**
```javascript
// 예시
ko: { howItWorks: { steps: [step1, step2, step3] } }
// steps 배열 길이가 모든 언어에서 3인지 확인
```

#### C. index.html (modalTranslations)
**확인 항목:**
- `title`, `subtitle`
- `monthlyTitle`, `annualTitle`
- `feature1` ~ `feature5` (월간/연간 동일)
- `monthlyBtn`, `annualBtn`
- `note`

---

### 4. 특수 문자 및 포맷 일관성
**확인:**
- 이모지가 일관되게 사용되는가?
```javascript
  ko: { title: '✨ ContentSplitter' }
  en: { title: '✨ ContentSplitter' }  // ✅ 동일
  ja: { title: 'ContentSplitter' }     // ❌ 이모지 누락
```

- 숫자 포맷이 맞는가?
```javascript
  ko: { limit: '3회/일' }
  en: { limit: '3/day' }
  ja: { limit: '3回/日' }
  es: { limit: '3/día' }
```

---

### 5. 번역 품질 체크 (선택)
**확인:**
- 같은 영어 단어가 일관되게 번역되는가?
  - "convert" → "변환" (항상 동일하게)
  - "premium" → "프리미엄" (항상 동일하게)

- 길이가 너무 차이 나지 않는가?
```javascript
  ko: { desc: '간단한 설명' }          // 7자
  en: { desc: 'Simple description' }   // 18자
  ja: { desc: '簡単な説明' }           // 6자
  es: { desc: 'Una descripción muy muy larga...' }  // ❌ 너무 김
```

---

## 자동 체크 스크립트

다음 명령어로 자동 체크 가능:
```javascript
// translations.js에서
function checkTranslationCompleteness() {
  const langs = ['ko', 'en', 'ja', 'es'];
  const allKeys = {};
  
  langs.forEach(lang => {
    allKeys[lang] = Object.keys(translations[lang]);
  });
  
  // 키 개수 비교
  // 누락된 키 찾기
  // 빈 값 찾기
}
```

---

## 실행 순서
1. `translations.js` 열어서 각 언어 키 개수 확인
2. 누락된 키가 있으면 목록 작성
3. `seo-content.js` 열어서 동일 체크
4. `index.html`의 modalTranslations 체크
5. 발견된 문제를 `TRANSLATION_REPORT.md`에 기록
6. 수정 제안 (하지만 번역 내용 자체는 수정하지 말 것)

## 보고 형식
```markdown
# 번역 체크 결과 (2026-02-XX)

## 발견된 문제

### translations.js
- ❌ ja (일본어): 'alerts.error' 키 누락
- ❌ es (스페인어): 'loadingMessages' 배열 길이 3 (다른 언어는 5)
- ⚠️  ko (한국어): 'copyBtn' 값이 빈 문자열

### seo-content.js  
- ✅ 모든 언어 완전

### modalTranslations (index.html)
- ❌ ja (일본어): 'feature3' 누락

## 권장 조치
1. translations.js의 ja.alerts.error 추가
2. es.loadingMessages에 2개 메시지 추가
3. ko.copyBtn에 "복사" 값 입력
4. index.html 모달에 ja.feature3 추가

## 통계
- 총 번역 키: 120개
- 완전한 언어: en (100%), ko (99.2%)
- 불완전: ja (95.8%), es (97.5%)
```

## 주의사항
- ❌ 번역 내용 자체를 수정하지 말 것 (한국어→영어 등)
- ❌ 새로운 키 추가하지 말 것
- ✅ 누락된 키만 찾아서 보고
- ✅ 빈 값만 찾아서 보고
- ⚠️  확실하지 않으면 보고만 하고 수정 제안