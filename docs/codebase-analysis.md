# Vue 3 Codebase Analysis

## Project Overview

This is a personal portfolio website built with Vue 3, Vite, and Tailwind CSS v4. The project showcases projects, publications, experience, and contact information with multiple interactive animated background options featuring particles, Hydra shaders, and audio integration.

## Project Structure

### Main Application Files

- `src/main.js`: Vue 3 app initialization with FontAwesome setup
- `src/App.vue`: Root component with section navigation, data management, and animation state
- `src/particle.js`: ES6 class for particle system with mouse interaction and visual effects

### Core Components

#### Background Animation System
- `AnimatedBackgroundParticles.vue`: Interactive particle system with Tone.js audio
- `AnimatedBackgroundHydra.vue`: Hydra-synth based shader animations
- `AnimatedBackgroundMinimal.vue`: Simple color-based background
- `P5Canvas.vue`: Generic p5.js wrapper component
- `HydraCanvas.vue`: Hydra-synth wrapper with resize handling

#### Content Sections
- `Navbar.vue`: Sticky navigation with animation toggle and section highlighting
- `About.vue`: Standard personal introduction section
- `AboutP5.vue`: About section with p5.js photo manipulation
- `AboutHydra.vue`: About section with Hydra-synth photo effects
- `Publications.vue`: Research publications display with modal system
- `Experience.vue`: Work experience timeline with interactive selection
- `Projects.vue`: Project showcase with tag-based filtering
- `Contact.vue`: Contact information section

#### Supporting Components
- `ProjectCard.vue`, `ProjectModal.vue`: Project display and detail modals
- `PublicationBlock.vue`, `PublicationModal.vue`: Publication display and detail modals
- `ExperienceBlock.vue`, `ExperienceDetails.vue`, `ExperienceTimeline.vue`: Experience display components

### Data Files

- `bio.json`: Personal information and call-to-action text
- `projects.json`: Project data with tags, media links, and descriptions
- `experiences.json`: Work experience and education data with skills
- `publications.json`: Research publications with DOI, URLs, and code links

## Vue 3 Architecture

### Component Structure

- **Hybrid API**: Mix of Options API and Composition API
- **Provide/Inject**: Animation state management across components
- **Props validation**: Type checking for all component props
- **Event emission**: Custom events for component communication
- **Global registration**: FontAwesome components registered globally

### Key Features

1. **Multi-Modal Animation System**: Three different background animation modes
2. **Audio Integration**: Tone.js for interactive sound generation with particles
3. **Canvas Graphics**: p5.js and Hydra-synth for visual effects
4. **Responsive Design**: Tailwind CSS v4 with custom components
5. **Modal System**: Project and publication detail modals
6. **Intersection Observer**: Section-based navigation with hash management
7. **State Management**: Provide/inject pattern for animation state

### Animation System Architecture

The animation system uses a sophisticated state management approach:

- **Global State**: Animation state provided from App.vue to all components
- **Multiple Renderers**: p5.js, Hydra-synth, and CSS-based animations
- **Audio Integration**: Tone.js synthesizers triggered by particle interactions
- **Performance Optimization**: Throttled audio triggers and efficient canvas rendering

### State Management

- **Provide/Inject**: Animation state shared across all components
- **Local State**: Component-specific data and UI state
- **Props**: Data flow from parent to child components
- **Events**: Custom events for component communication

## Build Configuration

### Vite Configuration

- `vite.config.js`: Vue plugin, ESLint integration, path aliases
- `postcss.config.js`: Tailwind CSS v4 PostCSS plugin
- **No separate Tailwind config**: Using Tailwind CSS v4's new @theme syntax

### Dependencies

#### Core Framework
- Vue 3.4.0 with Composition API
- Vite 7.1.6 for build tooling
- Tailwind CSS v4.1.13 with new @theme syntax

#### Animation & Graphics
- p5.js 1.7.0 for particle systems
- hydra-synth 1.4.0 for shader effects
- two.js 0.8.0 for 2D graphics
- Tone.js 14.7.77 for audio synthesis

#### UI & Icons
- FontAwesome 6.5.0 with Vue 3 integration
- vue3-simple-icons 13.2.0 for social icons

#### Utilities
- lodash 4.17.21 for data manipulation
- marked 12.0.0 for markdown rendering

### Styling System

- **Tailwind CSS v4**: New @theme syntax for custom properties
- **Custom Components**: Pre-built component classes in CSS
- **Responsive Design**: Mobile-first approach with custom grid layouts
- **Color System**: Dark/light theme with primary/secondary colors

## Component Interactions

### Data Flow

1. **App.vue** loads JSON data and provides animation state
2. **Navbar** receives current section and animation state
3. **Background components** react to animation state changes
4. **Content sections** display filtered/sorted data
5. **Modal components** handle detailed views

### Animation State Management

- **Global State**: `animationState` boolean provided from App.vue
- **Toggle Function**: `toggleAnimation` function provided to child components
- **Reactive Updates**: All animation components watch state changes
- **Audio Control**: Tone.js context managed per animation component

### Section Navigation

- **Intersection Observer**: Tracks visible sections
- **Hash Management**: Updates URL without scrolling
- **Responsive Design**: Different layouts for mobile/desktop
- **Smooth Transitions**: CSS transitions for state changes

## Performance Considerations

### Canvas Optimization

- **Resize Handling**: Efficient canvas resizing with ResizeObserver
- **Frame Rate Control**: Configurable FPS for different animation types
- **Memory Management**: Proper cleanup of p5.js and Hydra instances
- **Throttled Audio**: Prevents audio overload during interactions

### Bundle Optimization

- **Tree Shaking**: Individual lodash imports
- **Code Splitting**: Vite's automatic code splitting
- **Asset Optimization**: Efficient image and icon loading
- **ESLint Integration**: Development-time code quality checks

## Development Workflow

### Scripts

- `npm run dev`: Vite development server
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run deploy`: GitHub Pages deployment
- `npm run lint:fix`: ESLint with auto-fix

### Code Quality

- **ESLint**: Vue 3 and Prettier integration
- **Prettier**: Code formatting
- **Vue 3 Best Practices**: Composition API where beneficial
- **TypeScript Ready**: Structure supports future TypeScript migration
