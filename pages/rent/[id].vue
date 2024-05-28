<template>
  <div v-if="avaible" class="text-center">
    Вы взяли ноутбук - {{ $route.params.id }}
    <button @click="rent" class="bg-red-400 p-4">Взять ноутбук</button>
    <p v-if="status" class="text-center">{{ status }}</p>
  </div>
  <div v-else>
    <p class="text-center">Ноутбук уже взяли</p>
  </div>
</template>

<script setup>
const route = useRoute();
const status = ref('')

const { data: avaible } = await useFetch('/api/rent/checkAvaibility', {
  method: 'POST',
  body: {
    id: route.params.id,
  },
})


async function rent(active) {
  const { data, pending, error, refresh } = await useFetch("/api/rent/take", {
    method: "POST",
    body: {
      id: route.params.id,
    },
  });

  if (data.value === 'Laptop limit error') {
    status.value = 'Вы не можете взять больше 3 ноутбуков!'
  }
  else if (data.value === 'ok') {
    status.value === 'Запрос отработал'
  }
}
</script>
