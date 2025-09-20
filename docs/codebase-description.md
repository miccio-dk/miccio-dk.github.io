# Codebase Description

This document outlines the architecture and implementation details of the personal portfolio website.

## Architecture

The project is a single-page application (SPA) built on the following stack:
- **Framework:** Vue 3 (using `<script setup>` syntax)
- **Build Tool:** Vite. The configuration (`vite.config.js`) includes a path alias (`@`) for the `src` directory.
- **Styling:** Tailwind CSS with SCSS
- **State Management:** Pinia
- **Linting:** ESLint and Prettier

### Key Architectural Patterns
- **Component-Based:** The UI is modularized into single-file components (SFCs) located in `src/components`.
- **Dynamic Component Rendering:** `App.vue` uses `<component :is="...">` and `defineAsyncComponent` to lazy-load and randomly select visual themes on initialization. This provides a varied user experience while minimizing the initial bundle size.
- **Centralized Data:** All page content is decoupled from components and stored in JSON files within `src/data/`.
- **Reusable Logic:** Composables (`src/composables/`) encapsulate and reuse stateful logic (e.g., modal state, animation engines).
- **Global State:** Pinia (`src/stores/`) manages global UI state, specifically for the animation system.

## Key Dependencies

- **Animation & Graphics:** `p5.js`, `hydra-synth`, `two.js`, `Tone.js`
- **UI & Icons:** `vue3-simple-icons`, `@fortawesome/vue-fontawesome` (registered globally in `main.js`).
- **Utilities:** `lodash` (imported per-function for tree-shaking), `marked` (for markdown parsing).

## Performance Considerations

- **Bundle Optimization:** Vite's code splitting is leveraged via `defineAsyncComponent`. Lodash is imported on a per-function basis to ensure effective tree-shaking.
- **Canvas Optimization:** Animations are designed with performance in mind:
    - **Frame Rate Control:** The FPS for canvas animations is configurable.
    - **Memory Management:** p5.js and Hydra instances are properly destroyed on component unmount to prevent memory leaks.
    - **Throttled Audio:** Audio triggers in the particle system are throttled to prevent performance issues during rapid interactions.

## Development Workflow

### NPM Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Creates a production build in the `dist/` directory.
- `npm run preview`: Serves the production build locally.
- `npm run lint:fix`: Runs ESLint with the auto-fix flag.

## File Breakdown

### Root Files
- **`App.vue`**: The application's root component. It composes the main page layout, loads all data from `src/data`, initializes the Pinia store, implements the random theme selection logic, and manages an `IntersectionObserver` to update the URL hash based on the currently viewed section.
- **`particle.js`**: An ES6 class defining the logic for a single particle in the `AnimatedBackgroundParticles` component, including its movement, rendering, and mouse interaction.

### `src/components/`
- **About & Background Variants:**
    - **`AboutBase.vue`**: A layout component for "About" sections. Provides a consistent structure and a default slot for visual content (e.g., `<img>` or `<canvas>`). Manages the state of the call-to-action button.
    - **`About.vue`**: The default "About" section variant. Renders an `<img>` in the `AboutBase` slot.
    - **`AboutHydra.vue`**: Variant that uses `HydraCanvas` to display a generative visual derived from the profile photo.
    - **`AboutP5.vue`**: Variant that uses `P5Canvas` for a custom p5.js sketch. (Currently excluded from randomization).
    - **`AnimatedBackgroundHydra.vue`**: A full-screen background using Hydra-Synth for generative visuals.
    - **`AnimatedBackgroundMinimal.vue`**: A full-screen background using p5.js for a simple noise-based gradient.
    - **`AnimatedBackgroundParticles.vue`**: A full-screen background featuring an interactive particle system driven by p5.js and Tone.js. Its logic is offloaded to the `useParticleSketch` and `useParticleSynth` composables.
- **Core UI:**
    - **`Navbar.vue`**: The main navigation. Receives the `currentHash` prop to highlight the active section.
    - **`Modal.vue`**: A generic modal shell with a backdrop and a close button. Emits a `@close` event.
    - **`MarkdownRenderer.vue`**: Renders a markdown string to HTML using the `marked` library and applies project-specific styles.
- **Content Sections:**
    - **`Contact.vue`**: Renders the contact form and data-driven social media links.
    - **`Experience.vue`**: Main component for the "Experience" section. Uses `ExperienceTimeline` and `ExperienceDetails` for the desktop view and `ExperienceBlock` for mobile.
    - **`ExperienceBlock.vue`**: A single experience entry for the mobile accordion view.
    - **`ExperienceDetails.vue`**: Displays details for a selected timeline entry on desktop.
    - **`ExperienceTimeline.vue`**: Renders an interactive timeline canvas using `two.js`.
    - **`Projects.vue`**: Renders a grid of `ProjectCard` components. Manages the state for the `ProjectModal` using `useModal`.
    - **`ProjectCard.vue`**: A summary card for a single project. Emits a `@click` event.
    - **`ProjectModal.vue`**: A modal displaying detailed project information.
    - **`Publications.vue`**: Renders a list of `PublicationBlock` components. Manages the state for the `PublicationModal` using `useModal`.
    - **`PublicationBlock.vue`**: A single publication entry. Highlights the author's name based on props.
    - **`PublicationModal.vue`**: A modal displaying a publication's abstract.
- **Canvas Wrappers:**
    - **`HydraCanvas.vue`**: A wrapper that instantiates and manages a Hydra-Synth canvas. Emits `@hydra-ready` with the Hydra instance.
    - **`P5Canvas.vue`**: A wrapper that instantiates and manages a p5.js sketch. Accepts `setup`, `draw`, and other p5 event functions as props.

### `src/composables/`
- **`useModal.js`**: Manages modal visibility. Exposes a `selectedItem` ref and `showItem`/`closeItem` functions.
- **`useParticleSketch.js`**: The p5.js rendering engine for `AnimatedBackgroundParticles`. Manages particle physics and mouse interactions.
- **`useParticleSynth.js`**: The Tone.js audio engine for `AnimatedBackgroundParticles`. Handles synthesizer setup and chord progression. Dynamically imports `Tone.js` to reduce bundle size.

### `src/data/`
Contains JSON files that provide content for the respective components (e.g., `projects.json` for `Projects.vue`).

### `src/stores/`
- **`animation.js`**: A Pinia store managing global animation state. Exposes an `animationOn` computed property that components can use to toggle animations.

### `src/utils/`
- **`canvas.js`**: Helper functions for p5.js sketches (e.g., `drawGradient`).
- **`mediaMappings.js`**: Exports an object that maps media type keys to labels and Font Awesome icons, used by `ProjectCard`, `ProjectModal`, and `PublicationBlock`.
