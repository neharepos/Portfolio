<script setup>
import { computed, onMounted } from "vue";

const route = useRoute();
const slug = route.params.slug;

const { data: post } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection("project").path(`/project/${slug}`).first();
});

// 404 if project not found
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

// SEO
useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
});

// ─── Tag Colors ──────────────────────────────────────────────────────────────
const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
];

const getTagColor = (index) => tagColors[index % tagColors.length];

// Fix: tags_len was broken — just use all tags directly
const visibleTags = computed(() => post.value?.tags || []);

// ─── Date Formatting ─────────────────────────────────────────────────────────
const formattedDate = computed(() => {
  if (!post.value?.date) return "";
  return new Date(post.value.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// ─── Copy Button ─────────────────────────────────────────────────────────────
onMounted(() => {
  const codeBlocks = document.querySelectorAll(".content pre");

  codeBlocks.forEach((pre) => {
    pre.style.position = "relative";

    const button = document.createElement("button");
    button.className = "copy-btn";
    button.setAttribute("aria-label", "Copy code");
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    `;

    button.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText ?? "";
      await navigator.clipboard.writeText(code);

      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      button.classList.add("copied");

      setTimeout(() => {
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        `;
        button.classList.remove("copied");
      }, 2000);
    });

    pre.appendChild(button);
  });
});
</script>

<template>
  <div
    v-if="post"
    class="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 pt-22 pb-20 sm:px-6"
  >
    <article class="mx-auto max-w-3xl">
      <h1 class="text-3xl md:text-4xl font-bold mb-5 text-white">
        {{ post.title }}
      </h1>

      <ElementsPic class="mx-auto" />

      <p class="text-gray-500 mt-5 text-lg italic">
        {{ post.description }}
      </p>

      <div class="text-gray-600 mb-4 text-sm font-mono">
        {{ formattedDate }}
      </div>

      <div class="flex flex-wrap gap-2 mt-4 mb-5">
        <span
          v-for="(tag, index) in visibleTags"
          :key="index"
          :class="['text-xs px-3 py-1 rounded-full border', getTagColor(index)]"
        >
          {{ tag }}
        </span>
      </div>

      <div class="content max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </div>
</template>

<style scoped>
:deep(.copy-btn) {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 0.375rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.05);
  color: #9ca3af;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease, color 0.15s ease, background 0.15s ease;
}

:deep(pre:hover .copy-btn) {
  opacity: 1;
}

:deep(.copy-btn:hover) {
  background: rgb(255 255 255 / 0.1);
  color: #e5e7eb;
}

:deep(.copy-btn.copied) {
  color: #86efac;
  border-color: rgb(134 239 172 / 0.3);
  opacity: 1;
}
</style>