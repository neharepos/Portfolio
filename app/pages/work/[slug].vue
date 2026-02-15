<script setup>
import { computed, ref } from "vue";
const route = useRoute();
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`work-${slug}`, () => {
  return queryCollection('work').path(`/work/${slug}`).first()
})


const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
];

const getTagColor = (index) => {
  return tagColors[index % tagColors.length];
};

const visibleTags = computed(() => {
  return post.value?.tags?.slice(0, 2) || [];
});

</script>

<template>
  <div
    v-if="post"
    class="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 pt-22 pb-20 sm:px-6"
  >
    <article class="mx-auto max-w-3xl">
      <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-5 text-white">
        {{ post.company }}
      </h1>

      <ElementsPic class="mx-auto" />

      <p class="text-gray-500 mt-5 text-lg font-quicksand">
        {{ post.description }}
      </p>

      <div class="text-gray-600 mb-4 text-sm font-mono">
        {{ post.date }}
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

      <div class="content prose prose-invert prose-gray max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </div>
</template>


<!-- <template> -->
  <!-- Render the blog post as Prose & Vue components -->
  <!-- <div  -->
  <!-- v-if="post" -->
  <!-- class="bg-[#0a0a0a] text-gray-300 mx-auto max-w-3xl px-4 sm:px-6"> -->
    <!-- <h1 class="text-3xl font-bold mb-4">{{post.company}}</h1> -->
    <!-- <ElementsPic/> -->
    <!-- <p class="text-gray-600 mb-6">{{ post.description }}</p> -->
    <!-- <h1 class="text-gray-600 mb-6">{{ post.startDate }}</h1> -->
    <!-- <div class="content"> -->
      <!-- <ContentRenderer :value="post" /> -->
    <!-- </div> -->
  <!-- </div> -->
<!-- </template> -->
