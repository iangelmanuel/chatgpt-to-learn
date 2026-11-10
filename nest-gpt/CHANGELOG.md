# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones siguen [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.0.0] — 2026-11-10

Actualización a Node.js 26 (LTS), NestJS 12, OpenAI SDK 7 y dependencias exactas.

### Changed

- **Node.js 26.13.0** (LTS) en `engines` y CI; **pnpm 12.18.0** como `packageManager`.
- **NestJS 12.4.0** (`@nestjs/core`, `common`, `platform-express`, `config`, `testing`, `cli`, `schematics`, `mapped-types` 12.0.1).
- **OpenAI 7.53.0** (antes 4.52), **Sharp 0.35.5**, **Multer 2.5.0**, **Jest 30.5.2**, **TypeScript 6.0.3**, **class-validator** y **class-transformer** a su versión exacta más reciente.
- `ts-node`, `ts-loader`, `nodemon` y `standard` se retiran; `jest` pasa a `jest.config.js` (antes en `package.json`).
- **ESLint 10.14.0** con configuración flat y `typescript-eslint`; se sustituye `.eslintrc.js` y `eslint-plugin-prettier`.
- **Formato**: `.prettierrc` estándar con `@trivago/prettier-plugin-sort-imports`; CI con `check`, `eslint`, `prettier:check` y `build`.

### Fixed

- `body-parser` 2 necesita `@types/body-parser` y `body-parser` fijado a 2.4.0 explícitamente.
- `urlencoded({ extends: true })` era un error tipográfico de `extended`. Se corrige a `extended: true` para mantener el parseo extendido, que en `body-parser` 2 ya no es el valor por defecto.
- `import from 'src/helpers'` (dependía de `baseUrl`, deprecado en TS 6) se sustituye por rutas relativas.
- Import de `sharp` como default export.
- `@emnapi/core` y `@emnapi/runtime` fijados a `1.11.3` mediante `overrides` en `pnpm-workspace.yaml`.

### Notes

- No hay pruebas unitarias (`*.spec.ts`); `pnpm test` termina con error porque Jest no encuentra archivos, igual que antes.
