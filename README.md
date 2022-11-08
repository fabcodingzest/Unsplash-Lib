# Swanky: Unsplash Image Feed

A swanky new client for Unsplash. It will feature Instagram like feed features like Carousel, Grid, Detail view, etc. There is not even a single Unsplash client in the ecosystem which has top notch user experience. That changes now.

## Features

1. Instagram-esque grid feed ✅
2. Unlimited scrolling ✅
3. Mark your favorite image as favorite ✅
4. Universal Search by image tags, author, etc ✅
5. Detail view and scrolling through detail view ✅
6. Caching ✅
7. Snappy and fast image loading ✅
8. Server side rendering ✅

## Getting Started

1.First, create `.env.local` file and add the following keys:

```
NEXT_PUBLIC_UNSPLASH_URL=https://api.unsplash.com
NEXT_PUBLIC_UNSPLASH_COLLECTION_ID=8240068 //default collection id for home page
NEXT_PUBLIC_UNSPLASH_CLIENT_ID=your_client_id
NEXT_PUBLIC_UNSPLASH_SECRET_ID=your_secret_id
NEXT_PUBLIC_ACCESS_TOKEN=your_access_token

```

2. Install the dependencies with `yarn` or `npm install`

3. To run the development server:

```bash
npm run dev
# or
yarn dev
```

## Features to be added

- Testing
- Better Cache handling
- Blur hash for next/img placeholder blurDataURL
- Better Design
