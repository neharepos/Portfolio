<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('blog').order('date', 'DESC').all()
</script>

<template>
  <div class="bg-[#0a0a0a] min-h-screen ">

    
  <div class="container mx-auto px-6 md:px-12 lg:px-30 xl:px-85 py-10">
  <ElementsHeading
        heading="Blogs"
        description="Things I have written recently"
      />
    </div>
    <div class="p-4 mt-2 flex flex-col items-center gap-6">
  <ElementsCards
          v-for="blog in allPosts"
          :key="index"
          :title="blog.title"
          :date="blog.date"
          :description="blog.description"
          :tags="blog.tags"
          class="w-full max-w-xl"
        />
        </div>
    </div>
</template>

