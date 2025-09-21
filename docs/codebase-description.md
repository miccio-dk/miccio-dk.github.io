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
- **Dynamic Component Rendering:** `App.vue` uses `<component :is="...">` and `defineAsyncComponent` to lazy-load and randomly select visual themes on initialization.
- **Content as Data:** All page content is decoupled from components. Project data is stored as individual markdown files with YAML frontmatter in `src/data/projects/`. All other content is stored in JSON files within `src/data/`.
- **Reusable Logic:** Composables (`src/composables/`) encapsulate and reuse stateful logic (e.g., data loading, modal state, animation engines).
- **Global State:** Pinia (`src/stores/`) manages global UI state, specifically for the animation system.

## Key Dependencies

- **Animation & Graphics:** `p5.js`, `hydra-synth`, `two.js`, `Tone.js`
- **UI & Icons:** `vue3-simple-icons`, `@fortawesome/vue-fontawesome` (registered globally in `main.js`).
- **Utilities:** `lodash`, `marked` (for markdown parsing), `gray-matter` (for parsing project files frontmatter).

## Performance Considerations

- **Bundle Optimization:** Vite's code splitting is leveraged via `defineAsyncComponent`. Large libraries like `Tone.js` are also dynamically imported in composables.
- **Canvas Optimization:**
    - **Frame Rate Control:** The FPS for canvas animations is configurable.
    - **Memory Management:** p5.js and Hydra instances are properly destroyed on component unmount.
    - **Throttled Audio:** Audio triggers in the particle system are throttled to prevent performance issues.

## Development Workflow

### NPM Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Creates a production build in the `dist/` directory.
- `npm run preview`: Serves the production build locally.
- `npm run lint:fix`: Runs ESLint with the auto-fix flag.

## File Breakdown

### Root Files
- **`App.vue`**: The application's root component. It composes the main page layout, loads data via composables and static imports, initializes the Pinia store, implements the random theme selection, and manages an `IntersectionObserver` for section navigation.
- **`particle.js`**: An ES6 class defining the logic for a single particle in `AnimatedBackgroundParticles`.

### `src/components/`
- **Experience Components (`Experience.vue`, `ExperienceBlock.vue`, `ExperienceDetails.vue`):** These components now render a category icon (`briefcase`, `graduation-cap`, etc.) next to each entry, based on the `category` field in `experiences.json`.

(Other component descriptions remain largely the same)

### `src/composables/`
- **`useProjects.js`**: Encapsulates the logic for loading and parsing project data. It uses Vite's `import.meta.glob` to import all `.md` files from `src/data/projects/` and `gray-matter` to parse the frontmatter and content.
- **`useModal.js`**: Manages modal visibility.
- **`useParticleSketch.js`**: The p5.js rendering engine for `AnimatedBackgroundParticles`.
- **`useParticleSynth.js`**: The Tone.js audio engine for `AnimatedBackgroundParticles`.

### `src/data/`
- **`projects/`**: Contains individual project data as markdown files with YAML frontmatter.
- **Other JSON files (`bio.json`, `experiences.json`, etc.)**: Provide content for their respective components. Note that `experiences.json` now includes a `category` field for each entry.
