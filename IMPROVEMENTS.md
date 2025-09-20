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

- [x] **Data-Driven Social Links:** Refactor `Contact.vue` to source its social media links from a data array in the script rather than having them hardcoded in the template. This will make the component cleaner and easier to maintain.
- [x] **Create `MarkdownRenderer` Component:** The `mdToHtml` function and associated styles were duplicated in `ExperienceBlock.vue` and `ExperienceDetails.vue`. This logic has been extracted into a reusable `MarkdownRenderer.vue` component.
- [x] **Centralize Media Mappings:** The `pickIcon` and `pickLabel` functions in `ProjectCard.vue` and `ProjectModal.vue` have been replaced by a centralized mapping utility in `src/utils/mediaMappings.js`.
- [x] **Externalize Author Highlighting:** The author highlighting in `PublicationBlock.vue` no longer uses a hardcoded magic string. The name is now passed as a prop from the parent, sourced from `bio.json`. This also fixed a text wrapping issue.
- [x] **Modernize Variable Declarations:** All instances of `var` in the project's scripts have been replaced with `let` or `const` to adhere to modern ES6 standards.
- [ ] **Add `lastName` to `bio.json`:** The `bio.json` file should have a dedicated `lastName` field to avoid brittle logic like `name.split(' ')[1]` when sourcing the name for author highlighting.
