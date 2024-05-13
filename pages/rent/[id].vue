<template>
  Вы взяли ноутбук - {{ $route.params.id }}
  <button @click="rent" class="bg-red-400 p-4">Взать ноутбук</button>
  <p v-if="reqData">Запрос отработал</p>
</template>

<script setup>
  const route = useRoute();
  const reqData = ref("");
  async function rent(active) {
    const { data, pending, error, refresh } = await useFetch("/api/rent/take", {
      method: "POST",
      body: {
        id: route.params.id,
      },
    });

    reqData.value = data.value;
  }
</script>
