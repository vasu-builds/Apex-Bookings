// This file was used for local testing only.
// Keys have been removed. Use .env.local for credentials.
// Run: node test-supabase.js (after setting env vars)

const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url || !serviceKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function test() {
  const { data, error } = await supabase.from('site_config').select('*').limit(3);
  if (error) console.error('Error:', error);
  else console.log('Connected! Sample data:', data);
}

test();
