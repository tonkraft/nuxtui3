# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site
- `npm run test` - Run Vitest unit tests
- `npm install` - Install dependencies
- `npm run postinstall` - Prepare Nuxt (runs automatically after install)

## Testing

- Tests are located in `tests/components/` directory
- Vitest is configured with jsdom environment for DOM testing
- Vue Test Utils is used for component testing
- When testing components that use Nuxt UI, stub components like `UButton`, `UAvatar`, etc.
- Run tests with `npm run test`

## Development Tips

- Restart the dev server when making configuration changes
- Components are auto-imported from `components/` directory
- Use composables in `composables/` directory for shared logic
- Nuxt devtools are disabled for performance

## Project Architecture

This is a Nuxt 3 application focused on recruitment/application management with the following key technologies:

### Core Stack
- **Nuxt 3** - Vue.js framework with server-side rendering
- **Vue 3** - Frontend framework with Composition API
- **TypeScript** - Used throughout the application
- **Vitest** - Testing framework with Vue Test Utils

### UI & Styling
- **Nuxt UI v3** - Primary component library with extensive theming
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Icon library via `@iconify-json/lucide`
- **Color Mode** - Dark/light theme support

### Application Features
The application is a recruitment/applicant tracking system with:
- **Application Management** - Track and manage job applications
- **Candidate Profiles** - Display candidate information and resumes
- **PDF Integration** - PDF viewing capabilities via `@tato30/vue-pdf`
- **Form Management** - Complex forms for education, experience, skills, and languages
- **Tabbed Interface** - Profile, Resume, and Screening tabs for candidate data
- **Modal System** - Custom modal implementations using `<Teleport to="body">` pattern
- **Header Visibility** - Advanced scroll-based header show/hide with velocity detection

### Project Structure
- `app.vue` - Root component using UApp wrapper
- `pages/` - File-based routing with nested application routes
  - `pages/application/` - Nested routing for application tabs (profile, resume, screening)
  - Multiple application page variations (disabled, old, backup versions)
- `components/` - Organized component structure:
  - Form components in `components/form/`
  - Tab components in `components/tabs/`
  - Application-specific components (ApplicationHeader, CandidateDrawer, etc.)
- `layouts/` - Custom layouts including `application.vue` with advanced modal system
- `composables/` - Shared logic with performance-optimized implementations
- `plugins/` - Browser compatibility polyfills (client and server)
- `tests/` - Component tests with Vue Test Utils
- `server/` - Server-side TypeScript configuration
- `assets/css/` - Global CSS with Nuxt UI reset
- Configuration files: `nuxt.config.ts`, `app.config.ts`, `vitest.config.ts`

### UI Configuration
- Primary color: blue, neutral: zinc
- Nuxt UI configured with color mode support
- Page transitions disabled for performance
- Auto-imported components and composables

### Component Patterns
- Vue 3 Composition API with `<script setup>`
- Nuxt UI components (UButton, UCard, UDrawer, etc.)
- TypeScript prop definitions with `defineProps()`
- Responsive design with Tailwind utilities
- Modular component organization by feature area
- Custom modal pattern using `<Teleport to="body">` for proper z-index handling
- Event emission chains for cross-component communication
- Performance-optimized scroll handling with throttling and velocity detection

### Key Architecture Patterns

#### Modal System
- Custom modals use `<Teleport to="body">` to render outside component hierarchy
- Modal state managed in parent layouts, not individual components
- Event chains: Component → HeaderWithToolbar → Layout → Modal
- Backdrop click, Escape key, and focus management included

#### Header Visibility System
- `useHeaderVisibility` composable provides advanced scroll-based header control
- Throttled scroll events with velocity detection to prevent momentum bounce
- Configurable thresholds for show/hide behavior
- Performance optimized with passive event listeners

#### Testing Strategy
- Component tests in `tests/components/` directory
- Nuxt UI components are stubbed in tests
- JSdom environment for DOM testing
- Vue Test Utils for component mounting and assertions

#### Browser Compatibility
- Client-side polyfills for Promise.withResolvers
- Separate server-side polyfill configuration
- Compatibility date set to 2025-05-15