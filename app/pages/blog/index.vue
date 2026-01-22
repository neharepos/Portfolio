<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection("blog").order("date", "DESC").all();

const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
];
</script>

<template>
  <div class="bg-[#0a0a0a] min-h-screen">
    <div class="container mx-auto px-2 md:px-12 lg:px-30 xl:px-85 py-15">
      <ElementsHeading
        heading="Blogs"
        description="Things I have written recently"
      />
    </div>
    <div class="p-4 -mt-10 flex flex-col items-center gap-6">
      <NuxtLink
        v-for="blog in allPosts"
        :key="blog.path"
        :to="blog.path"
        class="w-full max-w-xl group"
      >
        <ElementsCards
          v-for="blog in allPosts"
          :key="index"
          :title="blog.title"
          :date="blog.date"
          :description="blog.description"
          :tags="blog.tags"
          class="w-full max-w-xl"
        />
      </NuxtLink>
    </div>
  </div>
</template>
