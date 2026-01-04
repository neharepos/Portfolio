<script setup>
    import { ref } from 'vue'
    defineProps({
  title: String,
  date: String,
  description: String
})
const cardRef = ref(null)
</script>

<template>
  <div class="flex justify-center sm:px-4 md:px-5">
    <div
      class="
        w-full
        max-w-xs
        sm:max-w-sm
        md:max-w-md
        lg:max-w-full
        transition
        duration-300
        hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]
        bg-zinc-900
        backdrop-blur-md
        rounded-2xl
        p-5
        cursor-pointer
        shadow-lg
        group
      "
    >
      <h2 class="font-bold text-lg sm:text-xl text-white font-poppins">
        {{ title }}
      </h2>

      <h3 class="text-sm text-gray-400 mt-1">
        {{ date }}
      </h3>

      <p class="text-gray-400 mt-3 font-quicksand">
        {{ description }}
      </p>

      <span class="inline-flex items-center text-blue-500 mt-4">
        Read
        <span
          class="ml-1 transition-transform duration-300 group-hover:translate-x-2"
        >
          →
        </span>
      </span>
    </div>
  </div>
</template>

