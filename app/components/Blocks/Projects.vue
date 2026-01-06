<script setup>
import Heading from "../Elements/Heading.vue";
import ProjectCard from "../Elements/ProjectCard.vue";

const blogData = [
  {
    title: "Shghjgjh",
    description: "this is a string",
    Date: "6 Jan 2024",
    tags: ["abc", "gfd", "yui"],
    status: "completed",
    role: "Stygyugyu",
    duration: "2 Months",
    github: "https//github/nish",
    live: "working",
  },
  {
    title: "Shghjgjhfcfcg",
    description: "this is a string.",
    Date: "9 Jan 2024",
    tags: ["abgfc", "gfvvd", "yuin"],
    status: "completed",
    role: "Stygyugyu",
    duration: "5 Months",
    github: "https//github/nish",
    live: "working",
  },
];
</script>

<template>
  <div class="bg-[#0a0a0a] -mt-2 sm:-mt-2 md:-mt-4">
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
          v-for="(blog, index) in blogData"
          :key="index"
          :title="blog.title"
          :description="blog.description"
          :Date="blog.Date"
          :tags="blog.tags"
          :status="blog.status"
          :role="blog.role"
          :duration="blog.duration"
          :github="blog.github"
          :live="blog.live"
        />
      </div>
    </div>
  </div>
</template>
