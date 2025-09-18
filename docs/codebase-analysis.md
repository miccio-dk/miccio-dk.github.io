# Vue 2 Codebase Analysis

## Project Overview
This is a personal portfolio website, originally built with Vue 2 and Vue CLI, and now in the process of being migrated to Vue 3 and Vite. 
The project showcases projects, publications, experience, and contact information with an interactive animated background featuring particles and audio (currently temporarily disabled).


## Project Structure

### Main Application Files
- `src/main.js`: Vue 2 app initialization with FontAwesome setup
- `src/App.vue`: Root component with section navigation and data management
- `src/particle.js`: ES6 class for particle system

### Components
- `AnimatedBackground.vue`: Interactive particle system with audio
- `Navbar.vue`: Navigation with animation toggle
- `About.vue`: Personal introduction section
- `Publications.vue`: Research publications display
- `Experience.vue`: Work experience timeline
- `Projects.vue`: Project showcase with filtering
- `Contact.vue`: Contact information

### Data Files
- `projects.json`: Project data with tags and media links
- `experiences.json`: Work experience and education data
- `publications.json`: Research publications data

## Vue 2 Patterns Used

### Component Structure
- Options API with `data()`, `computed`, `methods`, `mounted()`, `destroyed()`
- Props validation with type checking
- Event emission using `$root.$emit()` and `$root.$on()`
- Global component registration: `Vue.component()`

### Key Features
1. **Intersection Observer**: Section-based navigation
2. **Audio Integration**: Tone.js for interactive sound generation
3. **Canvas Graphics**: p5.js for particle animation
4. **Responsive Design**: Tailwind CSS with custom grid layouts
5. **Modal System**: Project and publication detail modals

### State Management
- Local component state
- Root-level event bus for animation state
- Props for data passing between components

## Build Configuration

### Vue CLI Configuration
- `vue.config.js`: Basic public path configuration
- `babel.config.js`: Vue CLI babel preset
- `postcss.config.js`: Tailwind CSS and Autoprefixer

### Tailwind Configuration
- Custom color palette (dark, light, primary, secondary)
- Custom grid templates for responsive layouts
- Extended variants for hover/focus states

## Migration Considerations

### Vue 2 to Vue 3 Changes Needed
1. **Composition API**: Consider migrating from Options API
2. **Event Bus**: Replace `$root.$emit/$on` with provide/inject or composables
3. **Global Registration**: Update FontAwesome component registration
4. **Lifecycle Hooks**: `destroyed()` → `unmounted()`
5. **Template Refs**: Update ref access patterns

### Build Tool Migration
1. **Vue CLI → Vite**: Complete build system replacement
2. **Webpack → Vite**: Faster development and build
3. **PostCSS 7 → PostCSS 8**: Update Tailwind CSS compatibility
4. **Dependencies**: Update all packages to Vue 3 compatible versions

### Potential Issues
1. **vue-p5**: May need Vue 3 compatible alternative
2. **FontAwesome**: Update to Vue 3 compatible version
3. **Tone.js**: Should work with Vue 3
4. **Lodash**: Individual imports should continue working

## File Dependencies
- All components import from `@/` alias (src directory)
- Static assets in `public/` directory
- CSS imports in main.js
- JSON data files imported directly as modules
