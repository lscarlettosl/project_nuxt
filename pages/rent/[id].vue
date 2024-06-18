<template>
  <div v-if="avaible" class="mx-auto flex flex-col gap-y-5 items-center justify-center">
    <p class="text-center w-[80%] max-[50px]">Нажмите чтобы взять ноутбук № - {{ $route.params.id }}</p>
    <button @click="rent" class="rounded-md bg-[#921CB0] px-8 py-3 text-white">Взять
      ноутбук</button>
    <p v-if="status" class="text-center">{{ status }}</p>
  </div>

  <div v-else class="text-center flex items-center text-2xl mx-auto">
    <p class="text-center mt-6">Ноутбук уже взяли</p>
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
