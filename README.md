# Aromamor Candles

Aromamor Candles is a boutique candle and fragrance storefront built with React, TypeScript, Vite, and Tailwind CSS. It features a polished shopping experience with product browsing, filtering, wishlist support, cart management, and a demo checkout flow.

## Live Demo

[View the site](https://thangsauce.github.io/aromamor-candles/)

## Features

- Curated candle storefront with mood- and destination-based products
- Bestsellers section with horizontal product cards
- Always-visible filters for mood, search, sort, and stock availability
- Wishlist drawer
- Cart drawer with quantity controls
- Checkout page with pickup or shipping selection
- Demo order confirmation flow
- About and Reviews pages
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- React Query
- React Hook Form
- Zod
- Axios

## Project Structure

```text
frontend/
  src/
    components/   Reusable UI pieces
    pages/        Route-level pages
    store/        Catalog data, app state, hooks
    schemas/      Validation schemas
    styles/       Global styles

## Getting Started

cd frontend
pnpm install
pnpm dev
pnpm build
pnpm preview

## Available Scripts
- From the frontend directory:

pnpm dev - start the Vite dev server
pnpm build - type-check and build the app
pnpm preview - preview the production build locally
pnpm lint - run ESLint

## Current Scope
This project is currently a frontend-first storefront prototype.

Included now:

browsing products
cart and wishlist state
demo checkout and confirmation flow
static catalog and review content

Not included yet:

real payment processing
backend order storage
inventory syncing
authentication
admin dashboard
Notes
The app uses HashRouter, which makes it easy to deploy on GitHub Pages.
Checkout is currently a demo flow and does not process real payments.
Product/catalog data is stored locally in the app.
Future Improvements
Integrate Stripe or PayPal
Persist cart and wishlist across sessions
Add product images and richer media
Connect checkout to a backend or serverless API
Add email confirmations and order management
Improve accessibility and test coverage
