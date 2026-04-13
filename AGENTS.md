# FDK CMS Service – AI Agent Guide

Context for AI coding agents (Cursor, Claude, Copilot, etc.) working on this project.

## Project Overview

- **Stack**: Strapi v5 CMS, TypeScript, Node.js ≥22, PostgreSQL
- **Purpose**: Headless Content Management System for FDK

## Dev Environment

- **Package manager**: Yarn (v1)
- **Node**: ≥22.x (required by engines)
- **Install**: `yarn install` (use `--ignore-engines` if Node <22)

### Key Commands

| Command             | Purpose                  |
| ------------------- | ------------------------ |
| `yarn develop`      | Run Strapi in dev mode   |
| `yarn start`        | Run production build     |
| `yarn build`        | Build Strapi             |
| `yarn lint`         | Run ESLint               |
| `yarn lint:fix`     | Auto-fix lint issues     |
| `yarn type-check`   | TypeScript check         |
| `yarn format:check` | Prettier check           |
| `yarn pre-commit`   | Full pre-commit pipeline |

### Docker

```bash
docker-compose build
docker-compose up
```

## Coding Conventions

- **Linting**: ESLint with Airbnb + TypeScript configs
- **Formatting**: Prettier
- **Pre-commit**: husky + lint-staged run lint, type-check, format
- **Files**: `.js`, `.ts` for Strapi; follow existing patterns in `/config`, `/src`

## Dependency Vulnerability Fix Routine

When addressing Dependabot or `yarn audit` vulnerabilities:

1. **Run audit**: `yarn audit` to list vulnerabilities.
2. **For fixable issues**: Add Yarn `resolutions` in `package.json` to force patched versions:
   - Use the "Patched in" version from the audit output
   - Add to the `resolutions` block, e.g. `"package-name":"^X.Y.Z"`
3. **Reinstall**: Run `yarn install` to regenerate `yarn.lock`.
4. **Recheck**: Run `yarn audit` to confirm fixes.
5. **Unfixable**: Some packages (e.g. `elliptic` via `jwk-to-pem`) have no patch; note them and track upstream.

## PR Instructions

- Run `yarn pre-commit` before pushing
- Ensure `yarn audit` shows no new high/critical issues
- Strapi content-type changes: build/edit in Strapi admin, then commit generated files

## Local Admin Setup

1. Open http://localhost:1337 and register a user
2. Update `/config/server.js` with your password for `ADMIN_JWT_SECRET`
3. Restart Strapi
