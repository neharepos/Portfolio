<script setup>
import { computed } from "vue";

const props = defineProps({
  role: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  skills: {
    type: Array,
    default: () => [],
  },
  isLast: Boolean,
});

const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
];

const duration = computed(
  () => `${props.startDate} — ${props.endDate || "Present"}`
);
</script>

<template>
  <div class="relative px-12 pb-1">
    <div
      v-if="!isLast"
      class="absolute left-7 top-10 h-full w-px bg-zinc-700"
      style="height: calc(100% - (-1rem));"
    ></div>
    <div class="absolute left-5 top-5 z-10">
      <span
        class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 border border-blue-400"
      >
        <span class="w-2 h-2 rounded-full bg-black"></span>
      </span>
    </div>

    
   

    <div
      class="relative pl-4 pb-4 pt-4 pr-10 border-2 border-zinc-800 rounded-2xl transition duration-300 hover:bg-zinc-900"
    >
      <div class="flex flex-col gap-1">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div>
            <h3
              class="text-2xl font-poppins font-bold text-zinc-100 tracking-tight leading-none"
            >
              {{ role }}
            </h3>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-blue-400 font-medium font-mono">{{ company }}</span>
              <span class="text-zinc-600">•</span>
              <span class="text-zinc-500 text-sm italic">{{ location }}</span>
            </div>
          </div>

          <div
            class="text-sm font-mono text-zinc-500 bg-zinc-800/50 px-3 md:min-w-55 py-1 rounded-full border border-zinc-600/50 self-start"
          >
            {{ duration }}
          </div>
        </div>

        <p class="mt-4 text-gray-400 font-quicksand leading-relaxed max-w-4xl">
          {{ description }}
        </p>

        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="(skill, index) in skills"
            :key="skill"
            :class="[
              'px-3 py-1 text-[11px] uppercase tracking-wider  font-mono font-semibold border rounded-md transition-all cursor-default',
              tagColors[index % tagColors.length],
            ]"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
