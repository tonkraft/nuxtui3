# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site
- `npm install` - Install dependencies
- `npm run postinstall` - Prepare Nuxt (runs automatically after install)

## Project Architecture

This is a Nuxt 3 application with the following key technologies:

### Core Stack
- **Nuxt 3** - Vue.js framework with server-side rendering
- **Vue 3** - Frontend framework with Composition API
- **TypeScript** - Used for configuration files

### UI & Styling
- **Nuxt UI v3** - Component library with extensive theming
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide Icons** - Icon library via `@iconify-json/lucide`
- **Color Mode** - Dark/light theme support (defaults to dark)

### Project Structure
- `app.vue` - Root application component using UApp wrapper
- `pages/` - File-based routing with Nuxt pages
- `components/` - Vue components (auto-imported)
- `assets/css/` - Global CSS files (Tailwind imports)
- `nuxt.config.ts` - Main Nuxt configuration
- `app.config.ts` - App-specific configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### UI Configuration
- Nuxt UI configured with full color palette support
- Theme colors include primary plus full spectrum (red through rose)
- UI shortcuts, overlay, and toast features enabled
- Neutral color scheme uses 'zinc' variant
- Dark mode preference set as default

### Component Patterns
- Uses Nuxt UI components (UButton, UAvatar, UApp, etc.)
- Props are defined using defineProps() with TypeScript
- Components follow Vue 3 Composition API patterns
- Responsive design with Tailwind breakpoints (sm:, etc.)