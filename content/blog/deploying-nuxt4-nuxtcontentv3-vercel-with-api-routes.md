---
date: 2026-02-21
title: "Deploying Nuxt 4 + Nuxt Content v3 on Vercel with API Routes"
description: "TL;DR: Deploying a Nuxt 4 portfolio with Nuxt Content v3 and API routes on Vercel requires hybrid rendering with better-sqlite3 in devDependencies. Read on for the complete debugging journey. Yes, this is the story of this website."
tags: ["devlog", "nuxt", "nuxt content", "vercel", "issue"]
---
---

## The Project

A portfolio website built with:
- **Nuxt 4** (latest stable)
- **Nuxt Content v3** for blog posts and project pages
- **Server API routes** for a contact form (`/server/api/contact.post.ts`)
- **Vercel** as the deployment target

The goal was straightforward: deploy a portfolio site with dynamic content management and a working contact form. What followed was a three-stage debugging journey that exposed the nuances of serverless deployments, native Node.js modules, and hybrid rendering.

---

## Issue #1: The 500 Error - Native Binary Mismatch

### What Happened

After deploying to Vercel using the standard `nuxt build` command, all content pages (`/blog/test`, `/work/project-name`, etc.) returned **500 Internal Server Error**. The Vercel logs showed:

```
[error] Failed to execute SQL CREATE TABLE IF NOT EXISTS _content_info...
Module did not self-register: '/var/task/node_modules/better-sqlite3/build/Release/better_sqlite3.node'.

H3Error: Module did not self-register: '/var/task/node_modules/better-sqlite3/build/Release/better_sqlite3.node'.
  cause: Error: Module did not self-register...
    code: 'ERR_DLOPEN_FAILED'
```

### Initial Setup

The `package.json` had `better-sqlite3` as a direct dependency:

```json
{
  "dependencies": {
    "@nuxt/content": "^3.11.2",
    "better-sqlite3": "^12.6.2",
    "nuxt": "^4.3.1",
    "vue": "^3.5.28",
    "vue-router": "^4.6.4"
  }
}
```

### Root Cause Analysis

**What is `better-sqlite3`?**
- A native Node.js addon (compiled C++ code)
- Produces a `.node` binary file during `npm install`
- The binary is platform-specific (OS + architecture + Node.js version)

**Why did it fail?**
1. Vercel's build environment compiled the binary for one environment
2. Vercel's Lambda runtime (where the code actually runs) is a different environment
3. The pre-compiled binary was incompatible with the Lambda runtime
4. Node.js threw `ERR_DLOPEN_FAILED` when trying to load it

**The mistake:** Manually adding `better-sqlite3` as a dependency overrode Nuxt Content's internal database adapter selection logic, which is designed to choose the right adapter based on the deployment target.

### First Solution Attempt

**Action taken:** Remove `better-sqlite3` from dependencies and switch to static generation.

```json
{
  "dependencies": {
    "@nuxt/content": "^3.11.2",
    "nuxt": "^4.3.1",
    "vue": "^3.5.28",
    "vue-router": "^4.6.4"
  }
}
```

**Vercel settings:**
- Build command: `npm run generate`
- Output directory: `.output/public`

**Why this worked (initially):**
- `nuxt generate` pre-renders all pages to static HTML at build time
- Content is processed during the build (where SQLite works fine)
- Runtime deployment is just static files on Vercel's CDN
- No server, no SQLite, no native binary issues

**Result:** ✅ Content pages worked perfectly. Site deployed successfully.

---

## Issue #2: The Missing API - Static vs Dynamic

### What Happened

After switching to static generation, the contact form started returning **404 Not Found** errors when submitting. The API endpoint `/api/contact` was completely unavailable.

### Root Cause Analysis

**The fundamental trade-off:**
- `nuxt generate` creates a **purely static site** — just HTML, CSS, and JavaScript files
- Server routes (`/server/api/*`) are **not included** in static builds
- They require a Node.js runtime to execute, which static hosting doesn't provide

**The architecture mismatch:**
```
Static Generation:
├── Pre-render: Everything → HTML files
├── Deploy: Only static files
└── Runtime: No server, no API routes ❌

Server-Side Rendering:
├── Build: Server bundle + client bundle
├── Deploy: Server runs on every request
└── Runtime: SQLite needed ❌ (back to Issue #1)
```

### The Real Requirement

The project needed **hybrid rendering**:
- Content pages: Static (fast, no SQLite)
- API routes: Dynamic (serverless functions)

---

## Issue #3: The Stuck Build - Timing Matters

### What Happened

Switched back to `nuxt build` with hybrid rendering configuration:

```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },
  routeRules: {
    '/': { prerender: true },
    '/blog/**': { prerender: true },
    '/work/**': { prerender: true },
    '/project/**': { prerender: true },
    '/api/**': { cors: true },
  }
})
```

**Vercel settings:**
- Build command: `npm run build`
- Output directory: `.output`

But the build got **stuck** with this prompt:

```
> postinstall
> nuxt prepare

[error] [@nuxt/content] Nuxt Content requires `better-sqlite3` module to operate.
❯ Do you want to install `better-sqlite3` package?
● Yes / ○ No
```

The build hung indefinitely, waiting for user input that couldn't be provided in a CI environment.

### Root Cause Analysis

**The lifecycle issue:**

1. Vercel runs `npm install`
2. This triggers the `postinstall` script: `nuxt prepare`
3. During `nuxt prepare`, Nuxt Content checks for `better-sqlite3`
4. Since it's not in `dependencies`, Content prompts to install it
5. In a non-interactive CI environment, the build hangs forever

**Why the prompt appeared:**
- Nuxt Content needs `better-sqlite3` at **build time** to index markdown files
- Even with hybrid rendering, the prerendered routes still need content indexing during the build
- The module wasn't available, triggering the installation prompt

### Final Solution

**The key insight:** `better-sqlite3` is needed at **build time** but not at **runtime**.

In npm/Node.js dependency management:
- `dependencies`: Installed in both development and production
- `devDependencies`: Installed only in development and **during builds**

**The fix:**

```json
{
  "dependencies": {
    "@nuxt/content": "^3.11.2",
    "nuxt": "^4.3.1",
    "vue": "^3.5.28",
    "vue-router": "^4.6.4"
  },
  "devDependencies": {
    "better-sqlite3": "^12.6.2"
  }
}
```

**Why this works:**

1. **Build time** (Vercel's build machine):
   - Installs both `dependencies` and `devDependencies`
   - `better-sqlite3` is available for Nuxt Content to index files
   - Prerendered routes are generated successfully
   - No prompts, no hanging

2. **Runtime** (Vercel's Lambda functions):
   - Only `dependencies` are bundled into serverless functions
   - `better-sqlite3` is not included
   - Prerendered pages don't need it (they're just HTML)
   - API routes run independently without needing SQLite

**Result:** ✅ Build completes, content pages load, API routes work.

---

## Final Working Configuration

### `package.json`

```json
{
  "name": "portfolio",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@nuxt/content": "^3.11.2",
    "nuxt": "^4.3.1",
    "vue": "^3.5.28",
    "vue-router": "^4.6.4"
  },
  "devDependencies": {
    "better-sqlite3": "^12.6.2"
  }
}
```

### `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  
  nitro: {
    preset: 'vercel',
  },
  
  routeRules: {
    // Pre-render content pages at build time
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/work': { prerender: true },
    '/work/**': { prerender: true },
    '/project': { prerender: true },
    '/project/**': { prerender: true },
    
    // Keep API routes as serverless functions
    '/api/**': { cors: true },
  }
})
```

### Vercel Settings

- **Build Command:** `npm run build`
- **Output Directory:** `.output` (or leave empty for auto-detection)
- **Node.js Version:** 18.x or higher

---

## Key Takeaways

### 1. Native Modules Are Platform-Specific

Native Node.js addons like `better-sqlite3` compile to binaries that only work on specific platforms. Serverless environments like Vercel's Lambda have different runtimes than build machines, causing incompatibility.

### 2. Dependencies vs DevDependencies Matter in Serverless

In traditional server deployments, this distinction is minor. In serverless:
- **Build environment**: Full access to both dependency types
- **Runtime environment**: Only `dependencies` are bundled
- Build-only tools should be in `devDependencies`

### 3. Hybrid Rendering Is the Sweet Spot

For content sites with API routes:
- Don't use pure SSR (requires runtime SQLite)
- Don't use pure static (loses API routes)
- Use hybrid rendering with route rules

### 4. Nuxt Content's Documentation Assumes Context

When the docs say "no extra config needed for Vercel," they assume:
- You're using `nuxt generate` for pure static, OR
- You're using hybrid rendering with proper dependency management
- They don't mean "just run `nuxt build` with SQLite in dependencies"

### 5. The Build Lifecycle Matters

Understanding when each step runs:
1. `npm install` → Installs `dependencies` + `devDependencies`
2. `postinstall` → Runs `nuxt prepare` (needs build tools)
3. Build command → Runs `nuxt build` (needs build tools)
4. Deploy → Only `dependencies` packaged
5. Runtime → Serverless functions execute

---

## Debugging Checklist for Similar Issues

If you encounter deployment issues with Nuxt Content on Vercel:

- [ ] Is `better-sqlite3` in the right place? (devDependencies)
- [ ] Are you using the correct preset? (`vercel`, not `vercel-static`)
- [ ] Are content routes prerendered in routeRules?
- [ ] Are API routes excluded from prerendering?
- [ ] Is the build command `nuxt build`? (not `nuxt generate`)
- [ ] Is the output directory `.output`? (not `.output/public`)
- [ ] Did you run `npm install` after moving dependencies?
- [ ] Are there any broken internal links causing prerender failures?

---

## Alternative Approaches Considered

### Option A: Use a Different Database Adapter

Nuxt Content can theoretically use other adapters, but they're not officially documented or recommended. Sticking with the designed workflow is safer.

### Option B: Disable Content Indexing

Not viable — it breaks the entire content querying system that Nuxt Content provides.

### Option C: Use Edge Runtime

Vercel Edge Runtime doesn't support native modules at all. Would require a complete rearchitecture.

### Option D: Self-Host on a Traditional VPS

Would work fine, but defeats the purpose of using Vercel's serverless infrastructure and CDN benefits.

---

## Conclusion

Deploying Nuxt Content v3 on Vercel with API routes requires understanding the intersection of:
- Native Node.js modules and platform compatibility
- Build-time vs runtime dependency management
- Hybrid rendering with selective prerendering
- Serverless deployment architectures

The final solution is elegant: `better-sqlite3` in `devDependencies`, hybrid rendering with route rules, and the Vercel preset. This gives you:
- Fast, CDN-served content pages
- Working API routes as serverless functions
- No native binary issues in production
- Automatic redeployment on content changes

The key is letting Nuxt Content do what it's designed to do — handle the database layer intelligently based on context — while providing it the build-time tools it needs without polluting the runtime bundle.