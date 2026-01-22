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

      <div class="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Heading
          heading="Projects"
          description="Things I have written recently"
          class="mb-8"
        />
        <ProjectCard
          v-for="(project, index) in projectData"
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
        />
      </div>
      
      <!-- <div class="mt-8 flex justify-start sm:justify-start">
         <button class="border px-6 ml-15 py-2 mb-8 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer">
           View all projects
         </button>
      </div> -->

    <div class="mx-auto max-w-6xl px-4 sm:px-8">
  
  <div class="mt-8 flex justify-start">
    <NuxtLink 
      to="/project" 
      class="border px-6 ml-5 py-2 mb-8 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer inline-block"
    >
      View all projects
    </NuxtLink>
  </div>

</div>
    
    
    </div>
  </div>
</template>
