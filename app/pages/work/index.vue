<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('work').order('startDate', 'DESC').all()
</script>

<template>
    <div class="bg-[#0a0a0a] min-h-screen ">
      
        <div class="container mx-auto px-8 md:px-12 lg:px-18 max-w-6xl py-15 ">
        <ElementsHeading 
      heading="Work" 
      description="Things I have written recently" />
      </div>

      <div class="p-4 flex flex-col -mt-12 items-center">
      <NuxtLink
        v-for="project in allPosts"
        :key="project.path"
        :to="project.path"
        class="w-full max-w-xl group"
      >
      <ElementsWorkCard
          v-for="(work, index) in allPosts"
          :key="index"
          :company="work.company"
          :role="work.role"
          :location="work.location"
          :startDate="work.startDate"
          :endDate="work.endDate"
          :description="work.description"
          :skills="work.skills"
          v-bind="work"
          :isLast="index === allPosts.length - 1"
          class="w-full max-w-3xl"
        />
        </NuxtLink>
        </div>
    </div>

</template>