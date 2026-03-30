# Legend Motors PS — Car Dealership Website

A production-ready MVP for a premium car dealership website in Nablus, Palestine. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **React Hook Form + Zod** for validation.

![Legend Motors PS](https://img.shields.io/badge/Legend_Motors-PS-dc2626?style=for-the-badge)

## Features

### Pages
- **Homepage** — Hero with search, featured cars grid, stats, testimonials, trust builders
- **Inventory** — Full filter system (price, make, body type, fuel, transmission, condition, year, mileage, color), sort, grid/list toggle, pagination
- **Vehicle Detail** — Image gallery with lightbox, specs/features tabs, finance calculator, strong CTAs, similar cars
- **Finance** — Payment calculator, how-it-works steps, FAQ accordion, pre-approval CTA
- **Contact** — Contact form with validation, Google Maps embed, team section, about blurb

### Key Features
- **Lead Capture Forms** — Modal forms on every CTA with Zod validation and localStorage persistence
- **Finance Calculator** — Interactive payment estimator with adjustable down payment, term, and rate
- **Advanced Filters** — 10+ filter dimensions with instant client-side filtering
- **Click-to-Call & WhatsApp** — One-tap contact for mobile users (60%+ of traffic)
- **SEO** — JSON-LD schema for AutoDealer + Car types, Open Graph, proper meta tags
- **Responsive** — Mobile-first design, thumb-friendly navigation
- **Performance** — Next/Image optimization, lazy loading, skeleton loaders
- **Accessibility** — ARIA labels, keyboard navigation, high contrast

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

## How to Customize

### Adding / Editing Cars

Open `src/lib/cars.ts` and edit the `cars` array. Each car object looks like:

```typescript
{
  id: "car-23",           // Unique ID
  slug: "2025-toyota-rav4", // URL-friendly slug
  title: "2025 Toyota RAV4", // Display title
  make: "Toyota",
  model: "RAV4",
  year: 2025,
  price: 35000,
  originalPrice: 38000,   // Optional — shows strikethrough discount
  mileage: 500,
  bodyType: "SUV",         // Sedan | SUV | Truck | Hatchback | Coupe | Van | Convertible
  fuel: "Hybrid",          // Petrol | Diesel | Electric | Hybrid
  transmission: "Automatic", // Automatic | Manual
  color: "Pearl White",
  condition: "New",        // New | Used | Certified Pre-Owned
  photos: ["url1", "url2", ...],
  description: "...",
  specs: { engine, horsepower, torque, fuelEconomy, drivetrain, seating, cargo, dimensions, weight },
  features: ["Feature 1", "Feature 2", ...],
  certified: true,
  warranty: "3 years / 36,000 miles",
  addedDate: "2025-01-15", // ISO date — controls "Newest First" sorting
}
```

### Changing Branding

- **Colors**: Edit `tailwind.config.ts` → `colors.brand` (currently red — change to blue, etc.)
- **Logo**: Edit `src/components/Header.tsx` and `Footer.tsx`
- **Contact Info**: Search for `+970 599 000 000` and `legendmotorsps.com` across files
- **Business Hours**: Edit Header.tsx, Footer.tsx, and Contact page

### Connecting a Real Database

The car data currently lives in `src/lib/cars.ts`. To connect a real database:

1. **Supabase**: Replace the `cars` export with a Supabase query
2. **Airtable**: Use the Airtable API to fetch records
3. **JSON file**: Fetch from a public JSON URL

The `Car` type in `src/lib/types.ts` remains the same — just change the data source.

## Project Structure

```
legend-motors/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Root layout + SEO
│   │   ├── globals.css      # Global styles
│   │   ├── not-found.tsx    # 404 page
│   │   ├── inventory/
│   │   │   ├── page.tsx     # Inventory browse page
│   │   │   ├── layout.tsx   # Inventory metadata
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Vehicle detail page (VDP)
│   │   ├── finance/
│   │   │   ├── page.tsx     # Finance page
│   │   │   └── layout.tsx   # Finance metadata
│   │   └── contact/
│   │       ├── page.tsx     # Contact page
│   │       └── layout.tsx   # Contact metadata
│   ├── components/
│   │   ├── Header.tsx       # Sticky header + mobile drawer
│   │   ├── Footer.tsx       # Footer + CTA banner
│   │   ├── HeroSection.tsx  # Homepage hero with search
│   │   ├── CarCard.tsx      # Car card (grid + list layouts)
│   │   ├── FeaturedCars.tsx # Featured cars grid
│   │   ├── QuickStats.tsx   # Stats banner
│   │   ├── WhyChooseUs.tsx  # Trust builders section
│   │   ├── Testimonials.tsx # Testimonials carousel
│   │   ├── ImageGallery.tsx # VDP image gallery + lightbox
│   │   ├── FinanceCalculator.tsx # Payment calculator
│   │   ├── LeadModal.tsx    # Lead capture modal form
│   │   └── Skeletons.tsx    # Loading skeletons
│   ├── lib/
│   │   ├── cars.ts          # Car inventory data (edit this!)
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Utility functions
│   └── hooks/
│       └── useLocalStorage.ts
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework + routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Hook Form + Zod | Form validation |
| Lucide React | Icons |
| localStorage | Client-side persistence |

## Next Steps (Post-MVP)

- [ ] Connect to Supabase / Airtable for dynamic inventory
- [ ] Replace placeholder photos with real vehicle photos
- [ ] Add Google Analytics / Facebook Pixel tracking
- [ ] Set up email notifications for new leads (Resend, SendGrid)
- [ ] Add WhatsApp Business API integration
- [ ] Deploy to Vercel (`vercel deploy`)
- [ ] Add sitemap.xml and robots.txt
- [ ] Implement dark mode toggle
- [ ] Add saved searches with localStorage
- [ ] Add "Compare Vehicles" feature
- [ ] Add blog / news section for SEO

## Deployment

```bash
# Deploy to Vercel (recommended)
npx vercel

# Or build for production
npm run build
npm start
```

## License

Built for Legend Motors PS. All rights reserved.
