# FDK CMS Service – Claude Project Context

Project guidance for Claude Code and other AI assistants. See [AGENTS.md](./AGENTS.md) for the full agent guide.

## Quick Reference

- **Stack**: Strapi v5, TypeScript, Node ≥22, PostgreSQL
- **Run dev**: `yarn develop`
- **Lint/check**: `yarn pre-commit`

## Dependency Vulnerability Fix Routine

Use this routine when fixing Dependabot or `yarn audit` vulnerabilities:

1. **Audit**: `yarn audit` to list vulnerabilities.
2. **Add resolutions**: In `package.json`, add entries to the `resolutions` block for fixable packages. Use the "Patched in" version from the audit (e.g. `"rollup":"^4.59.0"`, `"koa":"^2.16.4"`).
3. **Reinstall**: `yarn install` to update `yarn.lock`.
4. **Verify**: `yarn audit` to confirm fixes.
5. **Document**: Note any unfixable packages; track upstream for patches.

### Current security resolutions

- `koa`: ^2.16.4 (Host header injection)
- `rollup`: ^4.59.0 (Path traversal)
- Plus: ajv, esbuild, lodash, nodemailer, minimatch, tar, undici, webpack, qs, zod, etc.

### Example

```json
"resolutions": {
  "vulnerable-package": "^patched.version"
}
```

Then: `yarn install` → `yarn audit`.
