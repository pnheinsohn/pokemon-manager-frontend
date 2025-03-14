# Django Tutorial Frontend

A React-based admin interface built with TypeScript, Vite, and TailwindCSS.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A running Django backend server

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5173
```

## Installation

1. Install dependencies:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Key Features

- React with TypeScript
- Vite for fast development
- TailwindCSS for styling
- React Query for API state management
- React Router with automatic routing
- Hot Module Replacement (HMR)
- ESLint configuration for code quality
- Pokemon and Reports management

## Available Scripts

- `dev`: Start development server
- `build`: Run TypeScript build and Vite build
- `lint`: Run ESLint
- `preview`: Preview production build

## API Integration

The application is configured to proxy API requests to the Django backend. All API requests are automatically:
- Prefixed with `/admin`
- Convert camelCase to snake_case for requests
- Convert snake_case to camelCase for responses
- Handle errors consistently

## Code Style

The project uses several tools to maintain code quality:

- ESLint with custom configuration for React and TypeScript
- Functional React components
- TypeScript for type safety
- TailwindCSS for styling with custom theme configuration

## TailwindCSS Theme

Custom colors are configured for:
```js
colors: {
  background: {
    primary: '#1a1a1a',    // sidebar bg
    secondary: '#f1f5f9',  // main content bg
    hover: '#333',         // hover states
  },
  text: {
    primary: '#ffffff',    // white text
    secondary: '#64748b',  // muted text
    accent: '#3b82f6',     // links/actions
  }
}
```

## Development Guidelines

1. Use functional components
2. Implement proper error handling using the API response interceptors
3. Use React Query for API state management
4. Follow the established project structure
5. Use the provided custom hooks for data fetching
6. Implement responsive designs using TailwindCSS

## Features

The application includes management for:
- Pokemons
- Base Pokemons
- Base Pokemon Types
- Reports
  - Highest Level Pokemon Reports
  - Most Common Base Pokemon Reports
  - Report Generation

## Browser Support

The application is built to support modern browsers with Vite and uses the latest React features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
