# 🎬 BookMS — Movie Booking Application

An online movie ticket booking platform built with modern web technologies. Users can browse movies, select seats, and book tickets with a seamless experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 + shadcn/ui component library |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM v6 |
| **State Management** | TanStack React Query v5 |
| **Forms** | React Hook Form + Zod validation |
| **Backend & Database** | Lovable Cloud (Supabase) — PostgreSQL with Row Level Security |
| **Authentication** | Email/password auth via Lovable Cloud |
| **Serverless Functions** | Deno-based Edge Functions |
| **Realtime** | PostgreSQL realtime subscriptions for live seat updates |
| **Icons** | Lucide React |
| **Date Utilities** | date-fns |
| **Charts** | Recharts |

## Features

- 🎥 Browse movie listings with posters, ratings, and genres
- 🪑 Interactive seat selection layout
- 💳 Simulated payment flow with booking confirmation
- 🔐 User authentication (sign up / sign in)
- 📋 View personal booking history
- 🌐 Realtime seat availability updates
- 📱 Fully responsive design (mobile + desktop)
- 🌙 Dark mode support

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, MovieCard, SeatLayout, etc.)
├── contexts/         # React context providers (AuthContext)
├── data/             # Static data (movies, theaters)
├── hooks/            # Custom hooks (useMovies, useBookings, useAuth)
├── integrations/     # Lovable Cloud client & types
├── pages/            # Route pages (Index, AuthPage, MyBookings)
└── components/ui/    # shadcn/ui primitives
supabase/
├── functions/        # Edge functions (update-availability)
└── config.toml       # Backend configuration
```

## Getting Started

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## Deployment

Open [Lovable](https://lovable.dev) and click **Share → Publish**.

## Custom Domain

Navigate to **Project → Settings → Domains** and click **Connect Domain**.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
