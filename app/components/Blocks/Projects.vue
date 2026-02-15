<script setup>
import Heading from "../Elements/Heading.vue";
import ProjectCard from "../Elements/ProjectCard.vue";


const projectData = await queryCollection('project').order('duration', 'DESC').limit(2).all()
</script>


<template>
  <div class="bg-[#0a0a0a] relative -mt-1 sm:-mt-1 md:-mt-1">
    <div>
      <div
        class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none"
        style="
          background-image: radial-gradient(#3f3f46 1px, transparent 1px);
          background-size: 24px 24px;
        "
      ></div>

      <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
        <Heading
          heading="Projects"
          description="Things I have written recently"
          class="mb-8"
        />
        
        <div class="flex flex-col gap-6">
          <NuxtLink
            v-for="(project, index) in projectData"
            :key="index"
            :to="project.path"
            class="group block transition-all hover:translate-y-[-2px]"
          >
            <ProjectCard
              v-bind="project"
              :Date="project.Date" 
            />
          </NuxtLink>
        </div>
      </div>
      
      <div class="mx-auto max-w-6xl px-4 sm:px-8">
        <div class="mt-8 flex justify-start">
          <NuxtLink 
            to="/project" 
            class="border px-6 ml-7 py-2 mb-8 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer inline-block"
          >
            View all projects
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>