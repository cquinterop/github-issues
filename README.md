# Github Issue Tracker

A performant and modern GitHub issue comments viewer, built with a strong focus on type safety, modularity, and great DX.

## Tech Stack

- **React** – Modern UI library for building component-based interfaces
- **TypeScript** – Strongly typed JavaScript for better reliability and tooling
- **Vite** – Lightning-fast build tool and development server
- **GraphQL** – Declarative data fetching with precise queries
- **Apollo Client** – Caching, pagination, and data management for GraphQL
- **GraphQL Code Generator** – Automatic TypeScript types and React hooks based on your GraphQL schema
- **Fragment Colocation** – Promotes modularity and reuse by colocating GraphQL fragments with components that use them
- **Suspense + `useSuspenseQuery`** – Enables declarative data loading with Suspense
- **Incremental Fetching / Pagination** – Efficient loading of issue comments using `fetchMore`
- **Custom Intersection Observer Hook** – Enables infinite scroll based on component visibility
- **Caching** – Leverages Apollo’s normalized cache to reduce redundant fetches

## Features

- Data management with URL params with Nuqs
- Infinite scroll to load all comments for a GitHub issue
- Fragment colocation for modular, self-contained data dependencies
- Suspense-first architecture with React's concurrent features
- Custom `CommentCard` component rendering Markdown with avatar, timestamp, and metadata
- Query state management using Apollo cache and `fetchMore`
- Fully typed with auto-generated types from your GraphQL schema
- SSR-friendly (Server Side Rendering ready)
- Lazy loading & on-demand data fetching for optimal performance


## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run GraphQL Codegen
npm run codegen

# 3. Start the dev server
npm run dev
```

Make sure your .env contains the necessary GitHub token if accessing the GitHub API.

```
VITE_API_BASE_URL=https://api.github.com
VITE_GITHUB_API_KEY=<your_token>
```

## Future Improvements
- Add SSR integration with streaming
- Improve accessibility across components
- Add support for authenticated GitHub actions
