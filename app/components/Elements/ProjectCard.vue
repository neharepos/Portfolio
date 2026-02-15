<script setup>
const props = defineProps({
  title: String,
  description: String,
  date: String, // Ensure case matches your data (Date vs date)
  tags: { type: Array, default: () => [] },
  status: { type: String, default: "completed" },
  role: String,
  duration: String,
  github: String,
  live: String
});

const tagColors = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
];
</script>

<template>
  <div class="px-12 pb-1">
    <div
      class="relative pl-4 pb-12 pt-4 pr-10 mb-4 group rounded border-zinc-800 border-2 hover:bg-zinc-900"
    >
      <div class="flex flex-col gap-2">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <div class="flex items-center gap-3">
              <h2
                class="text-2xl font-bold font-poppins text-white tracking-tight transition-colors"
              >
                {{ title }}
              </h2>
              <span
                v-if="status"
                :class="[
                  'relative inline-flex h-3 w-3 rounded-full',
                  status === 'working'
                    ? 'bg-amber-500'
                    : status === 'completed'
                      ? 'bg-blue-600'
                      : 'bg-gray-400',
                ]"
              >
      
                <span
                  v-if="status === 'working'"
                  class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"
                ></span>
              </span>
            </div>

            <div class="flex items-center gap-2 mt-1 text-sm">
              <span v-if="role" class="text-gray-400 font-medium font-mono">{{
                role
              }}</span>
              <span v-if="role" class="text-gray-400">|</span>
              <span class="text-gray-400 italic font-mono">{{ duration || date }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 text-zinc-400">
            <a
              v-if="github"
              :href="github"
              target="_blank"
              class="hover:text-white transition-colors"
              title="View Source"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
            <a
              v-if="live"
              :href="live"
              target="_blank"
              class="hover:text-blue-600 transition-colors"
              title="Live Demo"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                ></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        <p class="text-gray-400 font-quicksand leading-relaxed max-w-3xl mt-2">
          {{ description }}
        </p>

        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            :class="[
              'px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border rounded-md transition-all duration-300',
              tagColors[index % tagColors.length],
            ]"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
