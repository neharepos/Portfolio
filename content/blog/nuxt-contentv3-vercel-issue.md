---
date: 2025-12-23
title: "Deploying Nuxt Content v3 on Vercel: The `better-sqlite3` Trap"
description: "While deployment of a project made in NUXT4 with NUXT Content v3, I ran into an issue where it was running perfectly fine in localhost but when I deployed it on vercel, I was faced with an error which I wasn't able to solve for a good amount of time. So in this blog I have documented how I solved that error and finally deployed my project."
tags: ["devlog", "nuxt", "nuxt content", "vercel", "issue"]
---

<!-- # Deploying Nuxt Content v3 on Vercel: The `better-sqlite3` Trap -->
## The Trap
If you've recently started a project with **Nuxt 4** and **Nuxt Content v3** and tried to deploy it to Vercel, you may have run into a frustrating 500 error that looks something like this:

```bash
Module did not self-register:
'/var/task/node_modules/better-sqlite3/build/Release/better_sqlite3.node'
```

I hit this exact wall, and this post is a breakdown of what went wrong, why it happened, and the clean solution that actually works.

---

## What Is `better-sqlite3` and Why Is It a Problem?

Nuxt Content v3 uses SQLite under the hood to index and query your markdown content. Locally, it uses `better-sqlite3` — a native Node.js addon — to do this. "Native" is the key word here. Unlike a pure JavaScript package, `better-sqlite3` is compiled C++ code that produces a `.node` binary file. This binary is compiled at install time and is tightly coupled to the specific OS, architecture, and Node.js version on the machine where `npm install` was run.

Vercel's build environment compiles the binary just fine during the build step. The problem is that **Vercel runs your deployed code inside serverless Lambda functions**, which have a different runtime environment than the build machine. The pre-compiled `.node` binary simply does not work there, and Node.js throws `ERR_DLOPEN_FAILED` — the "Module did not self-register" error you see in the logs.

---

## What I Was Doing Wrong

My `package.json` had `better-sqlite3` listed as a direct dependency:

```json
"dependencies": {
  "@nuxt/content": "^3.11.2",
  "better-sqlite3": "^12.6.2",
  "nuxt": "^4.3.1",
  "vue": "^3.5.28",
  "vue-router": "^4.6.4"
}
```

I had added it manually, assuming Nuxt Content needed me to provide it explicitly. This was the wrong assumption. Nuxt Content manages its own database adapter internally and is designed to select the right one based on the deployment target — **but only if you let it**. By forcing `better-sqlite3` into my own dependencies, I was overriding that behavior and locking the deployment into using a native binary that cannot survive in a serverless environment.

---

## The Solution: Static Generation with `nuxt generate`

The correct approach for deploying a Nuxt Content site on Vercel — especially a portfolio or blog — is to **statically pre-render your site at build time** using `nuxt generate` instead of `nuxt build`.

Here is what changes and why it works:

- `nuxt build` produces a server-rendered app that needs a running Node.js server to handle each request. That server needs SQLite at runtime — which is where the crash happens.
- `nuxt generate` pre-renders every page into plain HTML files at build time. By the time the site is deployed, there is no SQLite needed at runtime. The content has already been read, processed, and baked into static files.

Vercel then serves these files straight from its CDN — no serverless function, no native binary, no crash.

### Step 1: Remove `better-sqlite3` from your dependencies

```json
"dependencies": {
  "@nuxt/content": "^3.11.2",
  "nuxt": "^4.3.1",
  "vue": "^3.5.28",
  "vue-router": "^4.6.4"
}
```

Run `npm install` to update your lockfile after this change.

### Step 2: Change your Vercel build command

In your Vercel project settings, set the build command to:

```
npm run generate
```

And set the output directory to:

```
.output/public
```

### Step 3 (Optional): Explicitly set the preset in `nuxt.config.ts`

You can also make the static target explicit in your config:

```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'static'
  }
})
```

This is optional since `nuxt generate` already implies static output, but it makes your intent clear and ensures consistent behavior across environments.

---

## What to Keep in Mind

**Re-deploying on new content:** With static generation, your site is a snapshot taken at build time. If you add or edit a blog post, you need to trigger a new deployment. On Vercel this is trivial — just push to your repository and it redeploys automatically. For a portfolio or blog this is almost always perfectly acceptable.

**Dynamic content:** If your site ever needs truly dynamic content that changes at runtime without a redeploy (like user-submitted data or live comments), static generation is not sufficient and you would need a different hosting strategy. For most personal sites and blogs, though, static is the right default.

**The Nuxt Content documentation says "no extra config needed for Vercel"** — and that is true, but it assumes you are using `nuxt generate`. The docs are written with the static use case in mind for serverless platforms like Vercel. Using `nuxt build` in a serverless context is what causes the conflict.

---

## Summary

| Approach | What Happens | Works on Vercel? |
|---|---|---|
| `nuxt build` + `better-sqlite3` in deps | Native binary crashes in Lambda | ❌ |
| `nuxt build` without `better-sqlite3` | Build prompt hangs asking to install it | ❌ |
| `nuxt generate` without `better-sqlite3` | Pages pre-rendered at build time, no runtime SQLite needed | ✅ |

The fix is genuinely simple once you understand why the problem exists. Nuxt Content is well-designed for static deployment — you just have to let it do its job by using the right build command and not fighting it with manual native dependencies.