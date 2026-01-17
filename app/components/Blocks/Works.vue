<script setup>
import Heading from "../Elements/Heading.vue";
import WorkCard from "../Elements/WorkCard.vue";

// const blogData = [
//   {
//     company: "asdf",
//     role:"softwaredev",
//     location:"Patna",
//     startDate:"6 jun",
//     endDate: "Jan 2025",
//     description: "A beginner-friendly guide to Vue 3 and Composition API.",
//     skills: ["abc", "gfd", "yui"]
//   },
//   {
//     company: "asdggvhf",
//     role:"softwaredev",
//     location:"Pune",
//     startDate:"9 jun",
//     endDate: "Feb 2025",
//     description: "Useful Tailwind tricks to build responsive UIs faster.",
//     skills: ["abcg", "gfdg", "yuia"]
//   }, 
//   {
//     company: "asdf",
//     role:"softwaredev",
//     location:"Patna",
//     startDate:"6 jun",
//     endDate: "Jan 2025",
//     description: "A beginner-friendly guide to Vue 3 and Composition API.",
//     skills: ["abc", "gfd", "yui"]
//   },
// ]
const workData = await queryCollection('work').order('date', 'DESC').limit(2).all()
</script>

<template>
  <div class="bg-[#0a0a0a] relative -mt-2 sm:-mt-22 md:-mt-22 lg:-mt-32">
    <div>
        <div
      class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none"
      style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 24px 24px;"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8">
      <Heading 
      heading="Work" 
      description="Things I have written recently" 
      class="mb-8"/>

      <WorkCard
          v-for="(work, index) in workData"
          :key="index"
          :company="work.company"
          :role="work.role"
          :location="work.location"
          :startDate="work.startDate"
          :endDate="work.endDate"
          :description="work.description"
          :skills="work.skills"
          v-bind="work"
          :isLast="index === workData.length - 1"
        />
        </div>
    </div>
  </div>
</template>
