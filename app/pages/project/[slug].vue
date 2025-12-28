<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('project').path(`/project/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
