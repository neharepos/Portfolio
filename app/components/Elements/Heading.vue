<script setup>
    defineProps({
  heading: String,
  description: String
})
</script>

<template>
    <div>
            <h1 class="text-white text-4xl ml-4 p-2 font-semibold">
                <div class="inline-block group">
                    <a class="p-1 gap-2 cursor-default font-poppins"> {{heading}}
                        <!-- <span class='p-2 inline-block ml-[2px] w-6 h-6 transition-transform duration-300 group-hover:translate-x-2'>&#8594;</span> -->
                    </a>
                    <!-- <div
                        class="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    >
                    </div> -->
                </div>
            </h1>
            <div class='text-white ml-8 font-semibold font-quicksand'>
                <p>{{description}}</p>
            </div>
        </div>
</template>