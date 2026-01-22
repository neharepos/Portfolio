<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('project').order('duration', 'DESC').all()
</script>

<template>
  <div class="bg-[#0a0a0a] min-h-screen">
    <div class="container mx-auto px-6 md:px-12 lg:px-18 max-w-6xl py-15">
  <ElementsHeading
    heading="Projects"
    description="Things I have made recently"
    class="mb-8"
  />
</div>

      <div class="flex p-4 -mt-15 flex-col items-center">
        <NuxtLink
        v-for="project in allPosts"
        :key="project.path"
        :to="project.path"
        class="w-full max-w-xl group"
      >
        
        <ElementsProjectCard
          v-for="(project, index) in allPosts"
          :key="index"
          :title="project.title"
          :description="project.description"
          :Date="project.Date"
          :tags="project.tags"
          :status="project.status"
          :role="project.role"
          :duration="project.duration"
          :github="project.github"
          :live="project.live"
          v-bind="project"
          class="w-full max-w-3xl"
        />
        </NuxtLink>
        </div>
  </div>
</template>