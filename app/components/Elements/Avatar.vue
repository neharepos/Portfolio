<script setup>

// Define expected props, optionally with type validation
const props = defineProps({
    path: {
        type: String,
        required: true
    },
})
</script>

<template>
    <img class="w-10 h-10 rounded-full grayscale-80 hover:grayscale-10" :src="path" alt="avatar">
</template>