# Car Models Website

A responsive car models website built with React, Vite, TypeScript, TailwindCSS, and React Router.

## Features

- Browse all car models in a responsive grid layout
- Filter models by segment (Autos, Pickups, SUVs, etc.)
- Sort models by price (ascending/descending) and year (newest/oldest)
- View detailed information about each model
- Fully responsive design for mobile and desktop
- Loading and error states
- Clean, production-ready code with TypeScript interfaces

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## API Endpoints

- List models: `https://challenge.egodesign.dev/api/models/`
- Model detail: `https://challenge.egodesign.dev/api/models/:id/`

## Technologies

- React 18
- Vite
- TypeScript
- TailwindCSS
- React Router
- React Icons
