# Codebase Improvements & Upgrades

Here is a list of suggested improvements and upgrades for the codebase, categorized from most trivial to most involved.

### Trivial Improvements (Quick Wins)

- [x] **Adopt `<script setup>` Syntax:** Migrate components to the recommended Vue 3 `<script setup>` syntax. All components have been migrated.
- [x] **Refactor CSS in `ProjectsMenu.vue`:** Remove redundant CSS by creating a single base class for buttons.
- [x] **Cleanup Commented Code:** Remove any dead or commented-out debugging code.
- [x] **Standardize Asset Importing:** Ensure all static assets are imported into scripts to get their bundled URL, rather than being referenced by direct source paths.
- [x] **Regular Dependency Audits:** Periodically run `npm outdated` and update dependencies to get the latest features, performance improvements, and security patches.

### Dependency Audit Results (2025-09-20)

- Major version updates are available for `p5`, `marked`, `tone`, `@vue/eslint-config-prettier`, and `vue3-simple-icons`. These should be handled carefully as they may contain breaking changes.
- Minor version updates are available for `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@eslint/js`, `eslint`, and `sass`. These should be safe to update.
- Note: do not update `vue3-simple-icons` because it will remove some necessary icons.

### Moderate Improvements (Enhancing Structure)

- [x] **Extract Utility Functions:** Move pure utility functions (e.g., `drawGradient` from `AnimatedBackgroundParticles.vue`) into dedicated utility files.
- [x] **Refactor `About` Components for Reusability:** Create a single `AboutBase.vue` component with slots to reduce code duplication between the three existing `About` components.
- [x] **Create `useModal` Composable:** Abstract the duplicated modal state logic from `Projects.vue` and `Publications.vue` into a reusable `useModal.js` composable.
- [x] **Introduce Pinia for State Management:** Replace the current `provide`/`inject` implementation with Pinia for a more robust and scalable state management solution.

### Involved Improvements (Major Upgrades)

- [x] **Refactor `AnimatedBackgroundParticles.vue` with Composables:** Break down the component's logic into smaller, reusable composables (e.g., `useParticleSynth.js` for audio, `useP5Sketch.js` for canvas logic).
- [x] **Performance Optimization with Dynamic Imports:** Use dynamic `import()` for large libraries like `tone`, `p5`, and `hydra-synth` to reduce the initial bundle size.
- [x] **Code-Split Component Variants:** Use `defineAsyncComponent` to dynamically load component variants (like the different `About` and `AnimatedBackground` sections) to reduce the initial bundle size.
- [ ] **Introduce a Testing Strategy:** Set up a testing framework like Vitest and begin writing unit and component tests.

### Deep Review Findings (2025-09-20)

This section contains findings from a detailed component-by-component review, focusing on smaller inconsistencies, redundancies, and opportunities for improvement.


- [ ] **Projects section upgrade:**
    - projects stored as files in `data/projects/`
    - each file contains the project title, period, location, description (markdown), media links, tags, etc in a simple structured format
    - imported into a json object
    - generate a couple couple of examples files from `projects.json` to show how it works
    - rest of rendering logic stays the same
    - we might add pictures too eventually
- [ ] **Integrate strudel (audio):** 
    - new animated background with hydra and strudel
    - add strudel to the project as in https://codeberg.org/uzu/strudel/src/branch/main/packages/web#strudel-web (we don't want the live editor, just the sound generation)
    - use composables
- [ ] **Add `lastName` to `bio.json`:** The `bio.json` file should have a dedicated `lastName` field to avoid brittle logic like `name.split(' ')[1]` when sourcing the name for author highlighting.
