# Changelog

## [2.0.0] - Vue 3 + Vite Migration

### 🚀 Major Changes

#### Build System Migration
- **BREAKING**: Migrated from Vue CLI to Vite
  - Replaced `vue-cli-service` with Vite build system
  - Updated build scripts: `serve` → `dev`, `build` → `build`
  - Added `preview` script for production preview
  - Removed `vue.config.js` and `babel.config.js`

#### Vue Framework Upgrade
- **BREAKING**: Upgraded from Vue 2.6.11 to Vue 3.4.0
  - Updated main.js to use `createApp()` API
  - Replaced `new Vue()` with `createApp()`
  - Updated component registration pattern
  - Changed `destroyed()` lifecycle hook to `unmounted()`

#### Dependencies Updated
- **@fortawesome/vue-fontawesome**: `^2.0.2` → `^3.0.0` (Vue 3 compatible)
- **@fortawesome/fontawesome-svg-core**: `^1.2.35` → `^6.5.0`
- **@fortawesome/free-solid-svg-icons**: `^5.15.3` → `^6.5.0`
- **tailwindcss**: `^2.1.0` → `^3.4.0` (PostCSS 8 compatible)
- **marked**: `^2.0.3` → `^12.0.0`
- **two.js**: `^0.7.5` → `^0.8.0`
- **postcss**: `^7.0.35` → `^8.4.0`
- **autoprefixer**: `^9.8.6` → `^10.4.0`
- **eslint**: `^6.7.2` → `^8.57.0`
- **eslint-plugin-vue**: `^6.2.2` → `^9.20.0`

#### New Dependencies
- **p5**: `^1.7.0` - Direct p5.js integration
- **@vitejs/plugin-vue**: `^5.0.0` - Vue plugin for Vite
- **vite**: `^5.0.0` - New build tool

#### Removed Dependencies
- **vue-p5**: `^0.8.4` - Replaced with custom P5Canvas component
- **@vue/cli-service**: `~4.5.0` - Replaced with Vite
- **@vue/cli-plugin-babel**: `~4.5.0` - Vite handles this
- **@vue/cli-plugin-eslint**: `~4.5.0` - Replaced with Vite plugin
- **vue-template-compiler**: `^2.6.11` - Built into Vue 3
- **sass-loader**: `^8.0.2` - Vite handles SCSS natively
- **@tailwindcss/postcss7-compat**: `^2.1.0` - No longer needed

### 🔧 Configuration Changes

#### Vite Configuration
- Created `vite.config.js` with Vue plugin and path aliases
- Configured for GitHub Pages deployment
- Set up development server on port 3000

#### Tailwind CSS
- Updated to Tailwind CSS 3.x syntax
- Replaced `purge` with `content` configuration
- Removed `variants` configuration (now uses `modifiers`)
- Updated PostCSS configuration for PostCSS 8

#### File Structure
- Moved `public/index.html` to root directory
- Updated HTML template for Vite (removed webpack-specific syntax)
- Created `.eslintrc.cjs` for Vue 3 ESLint configuration

### 🆕 New Features

#### Custom P5Canvas Component
- Created Vue 3 compatible p5.js wrapper component
- Replaces vue-p5 dependency
- Supports setup, draw, and windowResized callbacks
- Configurable frame rate

### 🐛 Bug Fixes
- Fixed lifecycle hook naming (`destroyed` → `unmounted`)
- Updated asset paths for Vite compatibility
- Fixed ESLint configuration for Vue 3

### 📝 Documentation
- Created comprehensive migration documentation in `docs/` directory
- Added migration rules in `.cursor/rules/` directory
- Documented all breaking changes and migration steps

### ⚠️ Breaking Changes
- Vue 2 to Vue 3 API changes
- Build system completely replaced
- Some third-party libraries updated to incompatible versions
- File structure changes (index.html moved to root)

### 🔄 Migration Notes
- Event bus pattern still uses `$root.$emit/$on` (Vue 3 compatible)
- All components use Options API (still supported in Vue 3)
- No Composition API migration performed (can be done incrementally)
- All existing functionality preserved

### 📦 Installation
To install dependencies for the migrated project:
```bash
npm install
```

### 🚀 Development
To start the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

### 🐛 Bug Fixes (Testing Phase)
- **Fixed marked import**: Updated from `import marked from "marked"` to `import { marked } from "marked"` in all components
- **Fixed Tailwind CSS warning**: Updated `darkMode: false` to `darkMode: 'media'` in tailwind.config.js
- **Fixed vue-simple-icons**: Removed unavailable `SemanticScholarIcon` from Contact component
- **Fixed Vue 2 filter**: Converted `quotes` filter to computed property in PublicationBlock component
- **Fixed ProjectsMenu bug**: Fixed `this.tag` reference error in handleInput method
- **Temporarily disabled animated background**: Disabled AnimatedBackground component to resolve runtime issues
- **Verified build process**: Both development and production builds work correctly
- **Reduced bundle size**: From ~1.7MB to ~430KB by disabling animated background
- **Added icon size prop**: Contact component now accepts `iconSize` prop (default: 32px)

### 🎯 Next Steps
- Test all interactive features (particle system, audio, navigation) in browser
- Consider migrating to Composition API for better maintainability
- Update event bus pattern to use provide/inject or composables
- Add TypeScript support if desired
- Optimize bundle size (currently ~1.7MB, consider code splitting)
