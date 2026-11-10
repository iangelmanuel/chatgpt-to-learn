# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones siguen [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.0.0] — 2026-11-10

Actualización a Node.js 26 (LTS), React 19, Vite 8 y dependencias exactas.

### Changed

- **Node.js 26.13.0** (LTS) en `engines`, `.nvmrc` y CI; **pnpm 12.18.0** como `packageManager`.
- **React 19.3.1**, **React Router 7**, **Vite 8.3.6**, **TypeScript 6.0.3** y dependencias a su versión exacta más reciente.
- **Tailwind CSS 3.4.19** se mantiene, porque el proyecto usa su configuración actual.
- **ESLint 10.14.0** con configuración flat; se sustituyen ESLint 8 y `standard`.
- **Formato**: `.prettierrc` estándar; CI con `check`, `eslint`, `prettier:check` y `build`.

### Fixed

- `useRef` sin argumento inicial (requerido por React 19) en `GptMessageSelectableImage`.
- Import de `React` sin uso en `AssistantPage`.
- Llamadas condicionales `cond && fn()` pasan a `fn?.()`; `!` sobre encadenamiento opcional se sustituye por `as string`; `catch` sin variable sin uso.
- `@emnapi/core` y `@emnapi/runtime` fijados a `1.11.3` mediante `overrides`.
