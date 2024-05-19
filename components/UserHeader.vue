<template>
  <header class="bg-purple-700">
    <div class="my-auto flex items-center justify-between max-w-[1800px] ">
      <img class="w-[200px] h-[100px]" src="public/images/logo.png"><img>
      <NuxtLink to="/authorization">Главная</NuxtLink>
      <NuxtLink to="/admin">Админ</NuxtLink>
      <NuxtLink to="/profile">Профиль</NuxtLink>
      <NuxtLink to="/rent/1">Взять ноут 1</NuxtLink>
      <NuxtLink to="/admin/history">История ноутбуков</NuxtLink>
      <button @click="signOut()">Выйти</button>
    </div>
  </header>
</template>

<script setup>
const { signOut } = useAuth()
</script>
