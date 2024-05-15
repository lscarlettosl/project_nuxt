<template>
  <header class="bg-purple-700">
    <div class="my-auto max-w-auto flex items-center justify-between ">
      <img class="w-[200px] h-[100px]" src="public/images/logo.png"><img>
      <button @click="signOut()">Выйти</button>
      <NuxtLink to="./admin/history">История ноутбуков</NuxtLink>
    </div>
  </header>
</template>

<script setup>
const { signOut } = useAuth()
</script>
