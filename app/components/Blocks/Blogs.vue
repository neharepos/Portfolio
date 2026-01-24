<script setup>
import Cards from '../Elements/Cards.vue';
import Heading from '../Elements/Heading.vue';

// const blogData = [
//   {
//     title: "Understanding Vue 3",
//     date: "Published: Jan 2025",
//     description: "A beginner-friendly guide to Vue 3 and Composition API.",
//     tags: ["abc", "gfd", "yui"]
//   },
//   {
//     title: "Tailwind CSS Tips",
//     date: "Published: Feb 2025",
//     description: "Useful Tailwind tricks to build responsive UIs faster.",
//     tags: ["abcg", "gfdg", "yuia"]
//   },
//   {
//     title: "Tailwind CSS Tips",
//     date: "Published: Feb 2025",
//     description: "Useful Tailwind tricks to build responsive UIs faster.",
//     tags: ["abc", "gfd", "yui"]
//   },
//   {
//     title: "Understanding Vue 3",
//     date: "Published: Jan 2025",
//     description: "A beginner-friendly guide to Vue 3 and Composition API.",
//     tags: ["abcg", "gfdg", "yuia"]
//   }
// ]

const blogData = await queryCollection('blog').order('date', 'DESC').limit(4).all()
</script>

<template>
  <div class="relative bg-[#0a0a0a] py-1 md:py-2">
    
    <div
      class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none"
      style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 24px 24px;"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8">
      
      <Heading
        heading="Blogs"
        description="Things I have written recently"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <NuxtLink
          v-for="blog in blogData"
          :key="blog.path"
          :to="blog.path"
          class="group block transition-transform hover:scale-[1.01]"
        >
        <Cards
          v-bind="blog" 
          class="h-full"
        />
        </NuxtLink>
      </div>

      <!-- <div class="mt-10 flex justify-start sm:justify-start">
         <button class="border px-6 ml-5 py-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer">
           View all blogs
         </button>
      </div> -->

      <div class="mt-10 flex justify-start sm:justify-start">
   <NuxtLink 
     to="/blog" 
     class="border px-6 ml-5 py-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl transition-all cursor-pointer inline-block"
   >
     View all blogs
   </NuxtLink>
</div>
      
    </div>
  </div>
</template>