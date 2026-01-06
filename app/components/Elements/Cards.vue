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
  <div class="flex justify-center sm:px-4 md:px-5 ">
    <div
      class="
        w-full
        max-w-xs
        sm:max-w-sm
        md:max-w-md
        lg:max-w-full
        transition
        duration-300
        hover:bg-zinc-800
        bg-zinc-900
        backdrop-blur-md
        rounded-2xl
        p-5
        cursor-pointer
        shadow-lg
        group
        border-zinc-800 border-2
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

      
    </div>
  </div>
</template>

