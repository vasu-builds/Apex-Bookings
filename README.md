# Apex Bookings — Hotel Technology Suite

Apex Bookings is a comprehensive, modern, and high-performance revenue management and software platform for independent hotels. 
This application provides the frontend presentation layers and an integrated CMS to manage all facets of the hotel technology business.

## 🚀 Features & Modules

- **Core Hotel Solutions**: Showcases our premium offerings including Channel Manager, Commission-Free Booking Engine, Cloud PMS, and Cloud POS.
- **Digital Growth**: Marketing solutions covering Google Hotel Ads, OTA Listing, and completely managed Digital Marketing.
- **In-Built Admin CMS**: A protected `/admin` dashboard powered by **Supabase** that allows authorized staff to:
  - Update hero text, combo pricing, and site configuration in real-time.
  - Upload dynamic images directly to Supabase Storage.
  - Manage and publish SEO-optimized blog posts seamlessly.
  - Modify Testimonials and Team members without touching code.
- **Lead Generation**: Visitors can claim promotional offers (like the Combo Suite) via lead forms. Connected with **Resend** for instant email alerts and automated replies.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: Tailwind CSS & Custom CSS Modules for premium animations
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Storage)
- **Authentication**: JWT-based protected admin routes
- **Email Delivery**: [Resend](https://resend.com/)

## 📦 Getting Started

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your required API keys:
```env
# Admin credentials
ADMIN_USER=admin
ADMIN_PASS=your_secure_password

# Authentication
JWT_SECRET=your_jwt_secret

# Supabase Keys (From Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# Email configuration
RESEND_API_KEY=re_your_key
ADMIN_EMAIL=your@email.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄 Database Setup

For the admin panel to function properly, ensure your Supabase project contains the following tables:
- `site_config` (key: string, value: jsonb)
- `blog_posts` (id, title, content, slug, published, etc.)
- `uploaded_images` 
- A public Supabase storage bucket named `apex-images`

## 📄 License

Proprietary Software - All rights reserved by Apex Bookings.
