# Vue 3 Codebase Analysis

## Project Overview

This is a personal portfolio website built with Vue 3, Vite, and Tailwind CSS. The project showcases projects, publications, experience, and contact information with multiple interactive animated background options featuring particles, Hydra shaders, and audio integration.

## Project Structure

### Main Application Files

- `src/main.js`: Vue 3 app initialization with FontAwesome setup.
- `src/App.vue`: Root component with section navigation, data management, and animation state.
- `src/particle.js`: ES6 class for particle system with mouse interaction and visual effects.

### Core Components

#### Background Animation System

- `AnimatedBackgroundParticles.vue`: Interactive particle system with Tone.js audio.
- `AnimatedBackgroundHydra.vue`: Hydra-synth based shader animations.
- `AnimatedBackgroundMinimal.vue`: Simple color-based background.
- `P5Canvas.vue`: Generic p5.js wrapper component.
- `HydraCanvas.vue`: Hydra-synth wrapper with resize handling.

#### Content Sections

- `Navbar.vue`: Sticky navigation with animation toggle and section highlighting.
- `About.vue`: Standard personal introduction section.
- `AboutP5.vue`: About section with p5.js photo manipulation.
- `AboutHydra.vue`: About section with Hydra-synth photo effects.
- `Publications.vue`: Research publications display with modal system.
- `Experience.vue`: Work experience timeline with interactive selection.
- `Projects.vue`: Project showcase with tag-based filtering.
- `Contact.vue`: Contact information section.

#### Supporting Components

- `Modal.vue`: Generic modal component for creating pop-up dialogs.
- `ProjectCard.vue`, `ProjectModal.vue`: Project display and detail modals.
- `ProjectsMenu.vue`: Tag-based filtering menu for projects.
- `PublicationBlock.vue`, `PublicationModal.vue`: Publication display and detail modals.
- `ExperienceBlock.vue`, `ExperienceDetails.vue`, `ExperienceTimeline.vue`: Experience display components.

### Data Files

- `bio.json`: Personal information and call-to-action text.
- `projects.json`: Project data with tags, media links, and descriptions.
- `experiences.json`: Work experience and education data with skills.
- `publications.json`: Research publications with DOI, URLs, and code links.

## Vue 3 Architecture

### Component Structure

- **Hybrid API**: Mix of Options API and Composition API (`setup()` function).
- **Provide/Inject**: Animation state management across components.
- **Props validation**: Type checking for all component props.
- **Event emission**: Custom events for component communication (e.g., `@close` in modals).
- **Global registration**: FontAwesome components registered globally in `main.js`.

### Key Features

1.  **Multi-Modal Animation System**: Three different background animation modes (particles, Hydra, minimal).
2.  **Audio Integration**: Tone.js for interactive sound generation with particles.
3.  **Canvas Graphics**: p5.js and Hydra-synth for visual effects.
4.  **Responsive Design**: Tailwind CSS with custom components.
5.  **Modal System**: Generic `Modal.vue` component used for project and publication details.
6.  **Intersection Observer**: Section-based navigation with hash management.
7.  **State Management**: `provide`/`inject` pattern for global animation state.

### Animation System Architecture

The animation system uses a sophisticated state management approach:

- **Global State**: Animation state provided from `App.vue` to all components.
- **Multiple Renderers**: p5.js, Hydra-synth, and CSS-based animations.
- **Audio Integration**: Tone.js synthesizers triggered by particle interactions.
- **Performance Optimization**: Throttled audio triggers and efficient canvas rendering.

### State Management

- **Provide/Inject**: A global `animationState` is provided from `App.vue` and injected into background components. This allows any component to react to changes in the animation state.
- **Local State**: Component-specific data and UI state are managed within each component's `data()` or `setup()` function.
- **Props**: Data flows from parent to child components (e.g., `projects` data passed to `Projects.vue`).
- **Events**: Custom events are used for child-to-parent communication (e.g., the `Modal` component emits a `close` event).

## Build Configuration

### Vite Configuration

- `vite.config.js`: Configured with the Vue plugin, ESLint integration for development, and a path alias `@` for `src`.
- `postcss.config.js`: Configured to use `@tailwindcss/postcss`.
- `eslint.config.js`: A modern, flat ESLint configuration is used, with plugins for Vue and Prettier. It's configured to ignore build and editor directories.

### Dependencies

#### Core Framework

- Vue 3 with a mix of Options and Composition APIs.
- Vite for build tooling.
- Tailwind CSS for styling.

#### Animation & Graphics

- p5.js for particle systems and canvas animations.
- hydra-synth for shader effects.
- two.js for 2D graphics.
- Tone.js for audio synthesis.

#### UI & Icons

- FontAwesome for icons, with a curated library of icons for a smaller bundle size.
- vue3-simple-icons for social media icons.

#### Utilities

- lodash for data manipulation.
- marked for markdown rendering.

### Styling System

- **Tailwind CSS**: Used for all styling, with some custom component classes defined in the component's `<style>` tags.
- **Responsive Design**: Mobile-first approach.
- **Color System**: A dark/light theme is implemented through Tailwind's color classes.

## Component Interactions

### Data Flow

1.  **`App.vue`** loads all data from JSON files and provides the global animation state.
2.  **`Navbar`** receives the current section and animation state as props and highlights the active section.
3.  **Background components** (`AnimatedBackgroundParticles`, `AnimatedBackgroundHydra`, `AnimatedBackgroundMinimal`) inject the animation state and react to its changes.
4.  **Content sections** (e.g., `Projects.vue`, `Publications.vue`) receive data as props and manage their own state (e.g., selected project, current tags).
5.  **Modal components** are controlled by the parent components (e.g., `Projects.vue` controls `ProjectModal.vue`) and emit events to close themselves.

### Animation State Management

- **Global State**: A boolean `animationState` is provided from `App.vue`.
- **Toggle Function**: A `toggleAnimation` function is also provided to allow child components to change the animation state.
- **Reactive Updates**: All animation components use a `watch`er to react to changes in the `animationState`.
- **Audio Control**: The Tone.js context is managed within the `AnimatedBackgroundParticles` component and is enabled or disabled based on the `animationState`.

### Section Navigation

- **Intersection Observer**: Tracks which section is currently visible on the screen.
- **Hash Management**: Updates the URL hash without causing the page to scroll.
- **Smooth Transitions**: CSS transitions are used for smooth state changes.

## Performance Considerations

### Canvas Optimization

- **Resize Handling**: Efficient canvas resizing with `ResizeObserver`.
- **Frame Rate Control**: Configurable FPS for different animation types.
- **Memory Management**: Proper cleanup of p5.js and Hydra instances on component unmount.
- **Throttled Audio**: Prevents audio overload during interactions by throttling the audio triggers.

### Bundle Optimization

- **Tree Shaking**: Individual lodash function imports (`lodash/sample`, `lodash/throttle`, etc.).
- **Code Splitting**: Vite's automatic code splitting.
- **Asset Optimization**: Efficient image and icon loading.
- **ESLint Integration**: Development-time code quality checks.

## Development Workflow

### Scripts

- `npm run dev`: Vite development server.
- `npm run build`: Production build.
- `npm run preview`: Preview production build.
- `npm run deploy`: GitHub Pages deployment.
- `npm run lint:fix`: ESLint with auto-fix.
- `npm run format:fix`: Prettier with auto-fix.

### Code Quality

- **ESLint**: Integrated with Vue 3 and Prettier for code quality and consistency.
- **Prettier**: Code formatting.
- **Vue 3 Best Practices**: Composition API is used where beneficial (e.g., for providing global state).
- **TypeScript Ready**: The project structure supports a future migration to TypeScript.
