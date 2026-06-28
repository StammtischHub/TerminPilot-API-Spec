# TerminPilot-API-Spec

OpenAPI specification for the TerminPilot API. This repository manages the spec as a versioned artifact and automatically publishes it as both an npm and Maven package via GitHub Packages.

---

## Overview

The specification is based on **OpenAPI** and is validated and bundled using [Redocly CLI](https://redocly.com/docs/cli/). The resulting bundle (`dist/openapi.bundled.yaml`) is published as an artifact to two package registries:

- **npm** – `@stammtischhub/terminpilot-api-spec` (GitHub Packages)
- **Maven** – `de.stammtischhub:terminpilot-api-spec` (GitHub Packages, packaging: `yaml`)

---

## Prerequisites

- **Node.js** 24+
- **pnpm** 11

```bash
npm install -g pnpm
pnpm install
```
---


## Local Development

### Validate the specification

```bash
pnpm run validate
```

This command lints the api spec using redocly and ensures that all required fields are present. Lint rules are configured in `redocly.yaml`.

### Build the bundle

```bash
pnpm run build
```

Produces `dist/openapi.bundled.yaml` and resolves all `$ref` references into a single self-contained file.

---

## Versioning

The version is maintained **exclusively** in `package.json`. When `pnpm version` (or `npm version`) is run, the `version` lifecycle hook fires automatically and propagates the new version number to two additional places:

**Script:** `scripts/sync-version.js`

1. `src/openapi.yaml` – the `info.version` field is updated to the new version.
2. `.github/maven/maven-deploy-pom.xml` – the `<version>` element is updated.

### Bumping the version

```bash
# Patch bump (e.g. 1.2.3 -> 1.2.4)
pnpm version patch

# Minor bump (e.g. 1.2.3 -> 1.3.0)
pnpm version minor

# Major bump (e.g. 1.2.3 -> 2.0.0)
pnpm version major
```

> **Important:** Any pull request that contains changes under `src/` **must** include a version bump in `package.json`. `check-version-bump` in the CI workflow enforces this and will fail if the version is unchanged.

---

## CI/CD Workflows

### 1. Publish Preview (`publish-preview.yml`)

**Trigger:** A pull request is opened, synchronized, or reopened.

**Steps:**

1. Checks if the PR contains changes under `src/`. If not, the publish run is skipped to save resources.
2. Checks whether the version in `package.json` has been bumped if needed
3. If relevant files have changed, a preview version of the api spec is published to GitHub Packages with the format:
   `<base-version>-pr.<PR-number>.<short SHA>`
   e.g. `1.2.3-pr.42.a1b2c3d`

Preview packages are consumable via the `preview` dist-tag (npm) or the preview version string (Maven).

### 2. Publish Release (`publish-release.yml`)

**Trigger:** A push to `main`.

**Steps:**

1. Checks whether a Git tag `v<version>` already exists for the current version. If it does, the publish run is skipped to prevent duplicate releases.
2. If the version does NOT already exist, the release version of the api spec is published to GitHub Packages — both the npm registry and the Maven registry — with the version from `package.json`.

### 3. Cleanup Preview (`cleanup-preview.yml`)

**Trigger:** A pull request is closed (merged or abandoned).

**Steps:**

1. All preview versions of the api spec from the closed MR are deleted from GitHub Packages — both from the npm registry and from the Maven registry.

---

## Dependency Updates with Renovate

Renovate is configured inside the `renovate.json` and automatically updates the present dependencies.

---

## Notes

- The `version` hook in `package.json` ensures that `src/openapi.yaml` and the POM always carry the same version number as `package.json`. The version should therefore never be updated manually in those files.
- Accessing GitHub Packages requires a Personal Access Token with the `read:packages` scope.