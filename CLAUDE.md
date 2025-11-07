# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application for "The Library Jazz Band" website. It's a modern web application with responsive design, custom styling, and multiple pages showcasing the band's information, events, and donation options.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast refresh
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **UI Components**: Custom components using Radix UI primitives
- **Icons**: Lucide React and React Icons

### Project Structure

- `src/` - Main source code
  - `components/` - Reusable React components
    - `ui/` - Base UI components (Button, Card, Carousel)
    - `NavBar.tsx`, `BioCard.tsx`, `Footer.tsx` - Layout components
  - `pages/` - Page components
    - `Landing.tsx` - Homepage
    - `AboutPage.tsx` - About the band
    - `Events.tsx` - Events listing
    - `Donate.tsx` - Donation page
    - `playbills/` - Event-specific pages
  - `lib/` - Utilities and assets
    - `utils.ts` - Utility functions (cn for className merging)
    - `assets/` - Images and static files
  - `styles/` - Custom CSS files

### Key Configuration

- **Path Aliases**: `@/` maps to `src/` (configured in vite.config.ts and tsconfig.app.json)
- **Tailwind**: Custom color system with CSS variables, custom breakpoints including 'xsm' (300px)
- **TypeScript**: Strict mode enabled with comprehensive type checking

### Styling System

- Uses Tailwind CSS with custom design tokens
- Custom font families: Roboto, Bebas Neue, Aboreto, Sree Krushnadevaraya
- Responsive breakpoints: xsm (300px), sm, md, lg, xl, 2xl
- CSS variables for colors and radii defined in Tailwind config

### Component Patterns

- UI components follow a consistent pattern using `cn` utility for className merging
- Navigation uses React Router with Link components
- Responsive images with `<picture>` elements for different screen sizes
- Sticky navigation bar with backdrop blur effect

## Development Notes

- The project uses Husky for Git hooks with lint-staged for automatic Prettier formatting
- ESLint configuration includes React Hooks and TypeScript rules
- No existing CLAUDE.md, cursor rules, or Copilot instructions found
- The application appears to be a promotional website for a jazz band with focus on events and donations
