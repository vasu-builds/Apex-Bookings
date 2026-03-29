# Apex Bookings — Setup Guide

## Step 1 — Environment Variables

Copy `.env.local.example` → `.env.local` and fill values.
Same values add karo Vercel → Project Settings → Environment Variables.

---

## Step 2 — Supabase: Enquiries Table banana

1. supabase.com → apna existing project open karo
2. Left sidebar → **SQL Editor** → **New Query**
3. `SUPABASE_ENQUIRIES.sql` file ka content paste karo
4. **Run** karo

Ab har form submission `enquiries` table mein save hogi.

Keys kahan milenge:
- Project Settings → API → `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_KEY`

---

## Step 3 — Resend Setup

1. resend.com → login
2. **Domains** → apexbookings.in verify karo (DNS records add karne honge)
3. **API Keys** → Create → copy
4. `.env.local` mein `RESEND_API_KEY` set karo
5. `pages/api/contact.js` mein `from` address change karo:
   ```
   from: 'Apex Bookings <onboarding@resend.dev>'
   ```
   ko replace karo:
   ```
   from: 'Apex Bookings <no-reply@apexbookings.in>'
   ```

---

## Step 4 — Admin Password

`.env.local` mein set karo:
```
ADMIN_USER=admin
ADMIN_PASS=ApexAdmin@2025    ← apna strong password
JWT_SECRET=kuch-bhi-random-lamba-string
```

Default (agar env set nahi kiya): `admin` / `apex@2024`

---

## Step 5 — Deploy to Vercel

```bash
git add .
git commit -m "production ready"
git push origin main
```

Vercel auto-deploy karega. Env variables Vercel dashboard mein add karo.

---

## Enquiries Dashboard

Admin panel (`/admin/dashboard`) mein abhi enquiries section nahi hai.
Supabase table mein directly dekh sako:
supabase.com → Table Editor → enquiries
