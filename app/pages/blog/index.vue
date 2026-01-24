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
    <div class="max-w-xl mx-auto px-1 py-18">
      
      <ElementsHeading
        heading="Blogs"
        description="Things I have written recently"
        class="mb-10" 
      />

      <div class="flex flex-col gap-6">
        <NuxtLink
          v-for="blog in allPosts"
          :key="blog.path"
          :to="blog.path"
          class="group block"
        >
          <ElementsCards
            :title="blog.title"
            :date="blog.date"
            :description="blog.description"
            :tags="blog.tags"
          />
        </NuxtLink>
      </div>
      
    </div>
  </div>
</template>