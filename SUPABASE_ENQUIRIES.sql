-- Run this in Supabase SQL Editor
-- supabase.com → your project → SQL Editor → New Query → paste → Run

CREATE TABLE IF NOT EXISTS enquiries (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now() NOT NULL,
  name        text NOT NULL,
  phone       text NOT NULL,
  email       text,
  hotel       text,
  service     text,
  message     text,
  source      text DEFAULT 'website',
  ip          text,
  read        boolean DEFAULT false
);

-- Index for dashboard sorting
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);

-- RLS: only service role can read/write (API uses service role key)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON enquiries
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Allow inserts from anon (for the contact form via service key in API)
-- Note: inserts happen server-side via service key so RLS is bypassed anyway
