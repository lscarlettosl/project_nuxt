<template>
  <UserHeader />
  <div class="flex flex-1">
    <aside v-if="data" id="asidee" class="flex flex-col">
      <button>Выйти</button>
    </aside>
    <NuxtPage />
  </div>
  <TheFooter />
</template>

<script setup>
  const { data } = useAuth();
</script>

<style>
  #__nuxt {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .dt-buttons {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start !important;
  }

  .dt-buttons button {
    display: block !important;
  }
</style>
