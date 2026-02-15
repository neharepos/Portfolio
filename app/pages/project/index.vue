<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('project').order('duration', 'DESC').all()
</script>

<template>
  <div class="bg-[#0a0a0a] min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-18">
      
      <ElementsHeading
        heading="Projects"
        description="Things I have made recently"
        class="mb-10"
      />

      <div class="flex flex-col gap-8">
        <NuxtLink
          v-for="project in allPosts"
          :key="project.path"
          :to="project.path"
          class="block group"
        >
          <ElementsProjectCard
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
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
