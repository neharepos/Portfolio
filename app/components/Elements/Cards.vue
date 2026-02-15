<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  title: String,
  date: String,
  description: String,
  tags: {
    type: Array,
    default: () => [],
  },
});

const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
];

const getTagColor = (index) => {
  return tagColors[index % tagColors.length];
};

const cardRef = ref(null);

const visibleTags = computed(() => {
  return props.tags.slice(0, 2);
});

const extraCount = computed(() => {
  return Math.max(props.tags.length - 2, 0);
});
</script>

<template>
  <div class="flex justify-center sm:px-4 md:px-5">
    <div
      class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full transition duration-300 hover:bg-zinc-900 backdrop-blur-md rounded-2xl p-5 cursor-pointer shadow-lg group border-zinc-800 border-2"
    >
      <h2 class="font-bold font-poppins text-lg sm:text-xl text-white">
        {{ title }}
      </h2>

      <h3 class="text-sm font-mono mt-1 text-gray-400">
        {{ date }}
      </h3>

      <p class="text-gray-400 mt-3 font-quicksand">
        {{ description }}
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="(tag, index) in visibleTags"
          :key="index"
          :class="['text-xs font-mono px-3 py-1 rounded-full border', getTagColor(index)]"
        >
          {{ tag }}
        </span>

        <span
          v-if="extraCount > 0"
          class="text-xs px-3 py-1 rounded-full bg-zinc-700 text-gray-300 border border-zinc-600 cursor-pointer"
        >
          +{{ extraCount }}
        </span>
      </div>
    </div>
  </div>
</template>
