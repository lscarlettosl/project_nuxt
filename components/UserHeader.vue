<template>
  <header class="bg-purple-700">
    <div class="xm:text-[50px]my-auto flex max-w-[1800px] items-center justify-between">
      <img class="h-[100px] w-[200px]" src="public/images/logo.png" /><img />
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
  const { signOut } = useAuth();
</script>
