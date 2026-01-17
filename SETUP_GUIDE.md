# 🚀 ContentSplitter 설정 가이드

## 📋 필수 설정 단계

### 1. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 API 키를 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일에 다음 정보를 입력:

```env
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Lemon Squeezy API Key
LEMON_SQUEEZY_API_KEY=your_api_key_here

# Lemon Squeezy Webhook Secret (webhook 설정 후 추가)
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Product Configuration
LEMON_SQUEEZY_VARIANT_ID=1227112
```

---

### 2. Lemon Squeezy 설정

#### A. 상품 확인
- Product ID: `778538`
- Variant ID: `1227112`
- Price: `$9.99/month`
- Free Trial: `7 days`

#### B. Webhook 설정
1. Lemon Squeezy 대시보드 → **Settings** → **Webhooks**
2. **Create Webhook** 클릭
3. 설정:
   - **URL**: `https://your-domain.vercel.app/api/webhook`
   - **Events**: 다음 이벤트 선택
     - `subscription_created`
     - `subscription_updated`
     - `subscription_cancelled`
     - `subscription_payment_success`
     - `subscription_payment_failed`
4. **Secret** 복사 → `.env`에 `LEMON_SQUEEZY_WEBHOOK_SECRET`로 저장

---

### 3. Vercel 배포

#### A. Vercel 환경 변수 설정
1. Vercel 프로젝트 설정 → **Settings** → **Environment Variables**
2. 다음 변수들 추가:
   ```
   ANTHROPIC_API_KEY
   LEMON_SQUEEZY_API_KEY
   LEMON_SQUEEZY_WEBHOOK_SECRET
   LEMON_SQUEEZY_VARIANT_ID
   ```

#### B. GitHub 연동 후 자동 배포
```bash
git add .
git commit -m "Add Lemon Squeezy payment integration"
git push origin main
```

---

## 🧪 로컬 테스트

### 1. 의존성 설치
```bash
npm install
```

### 2. 로컬 서버 실행
```bash
node server.js
```

서버가 `http://localhost:3001`에서 실행됩니다.

### 3. Webhook 로컬 테스트
Webhook을 로컬에서 테스트하려면 [ngrok](https://ngrok.com/) 사용:

```bash
# ngrok 설치 후
ngrok http 3001

# ngrok이 제공한 URL을 Lemon Squeezy webhook URL로 설정
# 예: https://abc123.ngrok.io/api/webhook
```

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] `.env` 파일에 모든 API 키 입력
- [ ] Lemon Squeezy에서 상품 생성 완료
- [ ] Webhook URL 설정 완료
- [ ] Vercel 환경 변수 설정 완료
- [ ] GitHub에 `.env` 파일이 push되지 않았는지 확인 (`.gitignore` 확인)
- [ ] 로컬에서 테스트 완료

---

## 🐛 문제 해결

### 결제 버튼이 작동하지 않음
- Vercel 환경 변수 확인
- 브라우저 콘솔에서 에러 메시지 확인
- `/api/create-checkout` 엔드포인트 응답 확인

### Webhook이 작동하지 않음
- Lemon Squeezy에서 webhook 로그 확인
- Webhook secret이 올바른지 확인
- Vercel 함수 로그 확인

### API 키 오류
- `.env` 파일 존재 확인
- Vercel 환경 변수 이름이 정확한지 확인
- API 키가 유효한지 확인

---

## 📞 지원

문제가 발생하면:
1. GitHub Issues에 문의
2. 이메일: your-email@example.com

---

**Made with ❤️ by Seungmin**
