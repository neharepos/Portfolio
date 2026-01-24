<script setup>
import Heading from "../Elements/Heading.vue";
import WorkCard from "../Elements/WorkCard.vue";


const workData = await queryCollection('work').order('startDate', 'DESC').limit(2).all()
</script>

<template>
  <div class="relative -mt-5 bg-[#0a0a0a] py-12 md:py-3">
    
    <div
      class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none"
      style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 24px 24px;"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8 md:pb-10">
      <Heading 
        heading="Work" 
        description="Things I have worked upon" 
        class="mb-10"
      />

      <div class="flex flex-col gap-8">
        <NuxtLink
          v-for="(work, index) in workData"
          :key="work.path || index"
          :to="work.path" 
          class="group block transition-all hover:translate-x-1"
        >
          <WorkCard
            v-bind="work"
            :isLast="index === workData.length - 1"
          />
        </NuxtLink>
      </div>

      <!-- <div class="mt-10 flex justify-start sm:justify-start">
         <button class="border px-6 ml-8 py-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer">
           View all works
         </button>
      </div> -->

      <div class="mt-10 flex justify-start sm:justify-start">
   <NuxtLink 
     to="/work" 
     class="border px-6 ml-5 py-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer inline-block"
   >
     View all works
   </NuxtLink>
</div>

    </div>
  </div>
</template>