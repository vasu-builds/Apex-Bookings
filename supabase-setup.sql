-- Run this in your Supabase SQL Editor
-- Creates tables for site config and blog posts

-- Site config table (key-value store)
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL DEFAULT '',
  slug TEXT UNIQUE NOT NULL DEFAULT '',
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  category TEXT DEFAULT 'Revenue Management',
  author TEXT DEFAULT 'Apex Bookings Team',
  read_time TEXT DEFAULT '4 min read',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Image uploads table (stores uploaded file metadata)
CREATE TABLE IF NOT EXISTS uploaded_images (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: disable for service key (admin only)
ALTER TABLE site_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_images DISABLE ROW LEVEL SECURITY;

-- Seed default site config
INSERT INTO site_config (key, value) VALUES
  ('hero', '{"headline":"Your Partner in Hotel Revenue Growth","subheadline":"From smart revenue management to cutting-edge software — Channel Managers, Booking Engines, Cloud PMS, and tailored digital solutions."}'),
  ('popup', '{"enabled":true,"headline":"Limited Time — Complete Hotel Technology Suite","subtext":"Get Channel Manager, PMS, Booking Engine, Website & Hosting all in one bundle.","ctaText":"Claim This Offer","ctaLink":"/offer","badge":"Limited Time Offer"}'),
  ('combo', '{"visible":true,"name":"Complete Hotel Suite","price":"Contact Us","badge":"🔥 Limited Time Offer","features":["Channel Manager","PMS — Property Management System","Booking Engine","Hotel Website Builder","Hosting + SSL Certificate"]}'),
  ('pricing', '[{"name":"Starter","price":"3,000","sub":"Get online, start getting bookings","featured":false,"features":["Rates Management","Bookings Management","Payment Collection","Payment Gateway Solutions","Channel Manager","Booking Engine"]},{"name":"Growth","price":"6,000","sub":"Streamline your daily operations","featured":true,"features":["Everything in Starter","Channel Manager","Booking Engine","Cloud PMS","Cloud POS","Front Desk Operations","Billing & Invoicing"]},{"name":"Pro","price":"15,000","sub":"Full suite with expert management","featured":false,"features":["Everything in Growth","Website + Hosting + SSL","Google Hotel Ads + OTA Listing","Revenue Management","Dedicated Account Manager"]}]'),
  ('images', '{"homepage":{"hero_dashboard":"/images/analytics-illustration.png","about_section":"/images/hotel-ota-illustration.png","channel_manager_split":"/images/ota-network-new.png","booking_engine_split":"/images/booking-engine-new.png"},"channel_manager":{"hero":"/images/cm-rate-management.png","tab1":"/images/cm-rate-management.png","tab2":"/images/cm-inventory.png","tab3":"/images/ota-network-new.png","split":"/images/ota-network-new.png","how_it_works":"/images/how-it-works.png"},"booking_engine":{"hero":"/images/booking-engine-new.png","tab1":"/images/booking-engine-new.png","tab2":"/images/pms-calendar.png","split":"/images/booking-engine-new.png","how_it_works":"/images/how-it-works.png"},"cloud_pms":{"hero":"/images/pms-calendar.png","tab1":"/images/pms-calendar.png","tab2":"/images/mobile-app.png","split":"/images/pms-integrations.png","how_it_works":"/images/how-it-works.png"},"cloud_pos":{"hero":"/images/pos-new.png","tab1":"/images/pos-new.png","tab2":"/images/pms-calendar.png","split":"/images/pos-new.png","how_it_works":"/images/how-it-works.png"},"google_hotel_ads":{"hero":"/images/google-ads-desktop.png","tab1":"/images/google-ads-desktop.png","tab2":"/images/google-ads-mobile.png","split":"/images/google-ads-mobile.png","how_it_works":"/images/how-it-works.png"},"revenue_management":{"hero":"/images/revenue-mgmt-diagram.png","split":"/images/cm-rate-management.png","how_it_works":"/images/how-it-works.png"},"ota_listing":{"hero":"/images/ota-network-new.png","split":"/images/how-it-works.png","how_it_works":"/images/how-it-works.png"},"digital_marketing":{"hero":"/images/digital-marketing.png","split":"/images/digital-marketing.png","how_it_works":"/images/how-it-works.png"},"website_development":{"hero":"/images/website-design.png","split":"/images/booking-engine-new.png","how_it_works":"/images/how-it-works.png"},"payment_gateway":{"hero":"/images/booking-engine-new.png","split":"/images/booking-engine-new.png","how_it_works":"/images/how-it-works.png"}}'),
  ('team', '[{"name":"Veera Saravanan","role":"Founder & CEO","initials":"VS","color":"#1a4fc4","photo":""},{"name":"Uma Maheswari","role":"Director & VP — Sales","initials":"UM","color":"#7c3aed","photo":""},{"name":"Sangeetha Vijay","role":"Technical Head","initials":"SV","color":"#0891b2","photo":""},{"name":"Lakshmi Sree","role":"Strategic Consultant","initials":"LS","color":"#059669","photo":""}]'),
  ('testimonials', '[{"quote":"Apex Bookings has been a genuine game-changer. Our OTA connectivity is seamless, revenue has grown significantly.","name":"Mr. Rohit Panwar","hotel":"Aarogya Residency","rating":5},{"quote":"Occupancy improved noticeably within the first few months. The Channel Manager is reliable.","name":"Mr. Sagar Negi","hotel":"Hotel Kishna Palace","rating":5},{"quote":"Streamlined our operations entirely. The seasonal package features and support are excellent.","name":"Mr. Sunil Bisht","hotel":"Silver River Resort","rating":5},{"quote":"The Booking Engine has transformed our direct reservations. We are seeing 40% more direct bookings.","name":"Mr. Anil Sharma","hotel":"Grand Palace Hotel","rating":5},{"quote":"Revenue management from Apex helped us optimize pricing. Our RevPAR improved by 25%.","name":"Ms. Priya Nair","hotel":"The Hillside Resort","rating":5}]'),
  ('contact', '{"email":"info@apexbookings.in","support":"support@apexbookings.in","phone":"+91 8171871902","phone2":"+91 8979071902","whatsapp":"918171871902","address":"Phartyal'\''s Annexe, Anupam Vihar, Haldwani — 263139"}')
ON CONFLICT (key) DO NOTHING;

-- Seed sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, read_time, published) VALUES
  ('How to Increase Hotel Occupancy in 2024', 'how-to-increase-hotel-occupancy-2024', 'Proven strategies to boost your hotel occupancy using channel management, dynamic pricing, and digital marketing.', '# How to Increase Hotel Occupancy in 2024

In today''s competitive hospitality market, maintaining high occupancy rates requires a strategic approach.

## 1. Leverage Multiple OTA Channels

Being present on multiple OTAs dramatically increases your visibility.

## 2. Implement Dynamic Pricing

Dynamic pricing allows you to automatically adjust rates based on demand and seasonality.

## 3. Optimize Your Direct Booking Channel

Your hotel website with an integrated booking engine can save significant OTA commissions.', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'Revenue Management', '5 min read', true),
  ('Channel Manager vs Manual OTA Updates', 'channel-manager-vs-manual-ota-updates', 'Why manual OTA management is costing your hotel revenue and how a channel manager solves it.', '# Channel Manager vs Manual OTA Updates

Many independent hotels still update their OTA listings manually — a time-consuming process prone to errors.

## The Problem with Manual Updates

Manual updates create several critical issues: overbooking risk, rate parity violations, and delayed updates.

## How a Channel Manager Solves This

A channel manager provides real-time, two-way synchronization across all connected OTAs.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Technology', '4 min read', true)
ON CONFLICT (slug) DO NOTHING;
