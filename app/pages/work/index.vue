<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('work').order('startDate', 'DESC').all()
</script>

<template>
  <div class="bg-[#0a0a0a] min-h-screen">
    <div class="max-w-4xl mx-auto px-6 md:px-8 py-18">
      
      <ElementsHeading 
        heading="Work" 
        description="Things I have written recently" 
        class="mb-10"
      />

      <div class="flex flex-col gap-6">
        <NuxtLink
          v-for="(work, index) in allPosts"
          :key="work.path"
          :to="work.path"
          class="block group"
        >
          <ElementsWorkCard
            :company="work.company"
            :role="work.role"
            :location="work.location"
            :startDate="work.startDate"
            :endDate="work.endDate"
            :description="work.description"
            :skills="work.skills"
            v-bind="work"
            :isLast="index === allPosts.length - 1"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>