<script setup>
import Cards from '../Elements/Cards.vue';
import Heading from '../Elements/Heading.vue';

const blogData = [
  {
    title: "Understanding Vue 3",
    date: "Published: Jan 2025",
    description: "A beginner-friendly guide to Vue 3 and Composition API."
  },
  {
    title: "Tailwind CSS Tips",
    date: "Published: Feb 2025",
    description: "Useful Tailwind tricks to build responsive UIs faster."
  },
  {
    title: "Tailwind CSS Tips",
    date: "Published: Feb 2025",
    description: "Useful Tailwind tricks to build responsive UIs faster."
  },
  {
    title: "Understanding Vue 3",
    date: "Published: Jan 2025",
    description: "A beginner-friendly guide to Vue 3 and Composition API."
  }
]
</script>

<template>
  <div class="relative bg-[#0a0a0a] min-h-screen flex justify-center">
    
    <!-- Background grid -->
    <div
      class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none"
      style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 24px 24px;"
    ></div>

    <!-- CENTERED CONTENT -->
    <div class="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-8 lg:px-2">
      
      <Heading
        heading="Blogs"
        description="Things I have written recently"
      />

      <div
        class="
          grid
          grid-cols-1
          sm:grid-cols-2
    
          gap-6
          mt-8
        "
      >
        <Cards
          v-for="(blog, index) in blogData"
          :key="index"
          :title="blog.title"
          :date="blog.date"
          :description="blog.description"
        />
      </div>

      <h3 class="mt-6 text-blue-500 cursor-pointer hover:underline">
        View all →
      </h3>

    </div>
  </div>
</template>
