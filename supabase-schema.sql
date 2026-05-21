-- ============================================================
-- ContentSplitter — Supabase Schema
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- ============================================================

-- 일일 사용 횟수 추적 테이블
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID    REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  usage_date  DATE    NOT NULL DEFAULT CURRENT_DATE,
  count       INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, usage_date)
);

-- Row Level Security 활성화
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- 본인 데이터만 접근 가능
CREATE POLICY "Users can manage own usage"
  ON public.usage_tracking
  FOR ALL
  USING (auth.uid() = user_id);

-- 원자적 카운터 증가 함수 (Race condition 방지)
CREATE OR REPLACE FUNCTION public.increment_usage(p_user_id UUID, p_date DATE)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO public.usage_tracking (user_id, usage_date, count)
  VALUES (p_user_id, p_date, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET count = public.usage_tracking.count + 1
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;
