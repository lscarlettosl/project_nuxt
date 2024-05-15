<template>
  <UserHeader />
  <NuxtPage />
  <TheFooter />
</template>

<script setup>
const { data } = useAuth()

</script>

<style>
#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
