<script setup>
// This query fetches all documents from the 'content' collection.
const allPosts = await queryCollection('blog').order('date', 'DESC').all()
</script>

<template>
  <div>
    <div v-for="post in allPosts" :key="post._id">
        <h2>
          <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        </h2>
        <p>{{ post.description }}</p>
    </div>
  </div>
</template>