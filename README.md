# VibeCoding Landing

A Next.js application for restaurant recommendations and location-based browsing.

## Features

- Map view with Naver Maps integration
- List view for restaurant browsing
- Restaurant detail pages
- Filter by food type, price, rating, and more
- Restaurant recommendation feature

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Naver Maps API

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=your_naver_maps_client_id
OPENAI_API_KEY=your_openai_api_key (optional, for recommendations)
```

## Deployment

The project can be deployed using Vercel:

```bash
npm run build
```

## License

MIT
