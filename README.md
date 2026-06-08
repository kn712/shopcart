# ShopCart

A full-stack e-commerce web application built with Next.js 15, Sanity CMS, Clerk authentication, and Stripe payments.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + shadcn/ui |
| CMS | Sanity v3 |
| Authentication | Clerk |
| Payments | Stripe |
| State Management | Zustand (persisted) |
| Animations | Motion (Framer Motion) |

## Features

- **Product catalog** — browse by category, brand, or deal; featured products on the homepage
- **Product detail pages** — image gallery, pricing with discounts, stock status, variant types
- **Shopping cart** — add/remove items, quantity controls, subtotal with discount calculation; persisted in localStorage
- **Wishlist** — save products as favourites, toggle on/off from any product card
- **Checkout** — Stripe Checkout session with promotion code support and invoice generation
- **Order history** — view past orders with status and order detail dialog
- **Blog** — articles with categories, author profiles, and rich block content
- **Search** — modal product search across the catalogue
- **Authentication** — sign-in/sign-up via Clerk; protected routes via middleware
- **Sanity Studio** — headless CMS at `/studio` for managing all content

## Project Structure

```
app/
  (client)/         # Public-facing storefront
    page.tsx        # Home — banner, featured products, categories, brands, blog
    cart/           # Shopping cart
    product/[slug]/ # Product detail
    category/[slug]/# Products by category
    brand/[slug]/   # Products by brand
    shop/           # Full shop with brand/category/price filters
    deal/           # Sale & deal products
    wishlist/       # Saved favourites
    orders/         # Order history (authenticated)
    blog/           # Blog listing & article pages
    success/        # Post-checkout confirmation
  studio/           # Sanity Studio
actions/
  createCheckoutSession.ts  # Stripe server action
  productActions.ts         # Product-related server actions
components/         # Shared UI components
sanity/
  schemaTypes/      # Content models (product, order, brand, blog, …)
  queries/          # GROQ queries
  lib/              # Sanity client, image builder, live preview
store.ts            # Zustand cart + wishlist store
middleware.ts       # Clerk auth middleware
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://www.sanity.io/) project
- A [Clerk](https://clerk.com/) application
- A [Stripe](https://stripe.com/) account

### Installation

```bash
git clone https://github.com/kn712/shopcart.git
cd shopcart
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Stripe
STRIPE_SECRET_KEY=sk_...

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.  
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

### Build

```bash
npm run build
npm run start
```

### Type Generation

After updating Sanity schemas, regenerate TypeScript types:

```bash
npm run typegen
```

## Sanity Content Models

| Schema | Description |
|---|---|
| `product` | Name, slug, images, price, discount %, stock, brand, category, status (new/hot/sale), variant, featured flag |
| `category` | Product categories |
| `brand` | Product brands |
| `order` | Customer orders with line items and status |
| `blog` | Blog posts with rich block content |
| `blogCategory` | Blog categories |
| `author` | Blog authors |
| `address` | Customer shipping addresses |

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/). Add all environment variables from the `.env` section above to your Vercel project settings and set `NEXT_PUBLIC_BASE_URL` to your production domain.

## License

MIT
