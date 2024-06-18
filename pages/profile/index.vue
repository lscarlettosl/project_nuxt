<template>
    <div class="mx-auto flex-col mt-5 ml-4">
        <p class="max-w-[90%] text-2xl text-center md:max-w-[100%] md:text-4xl  mt-1">Добро пожаловать, {{ user.name }}
            <hr class="md:hidden">
        </p>
        <div class="mx-auto">
            <p class="text-xl">Ваш email: {{ user.email }}</p>
        </div>
        <div v-if="taken">
            <p>Вы взяли ноутбук № - {{ $route.params.id }}</p>
        </div>
    </div>
</template>
  
<script setup>

import { ref } from 'vue';

const modalOpen = ref(false);
const modalType = ref('');

const openModal = (type) => {
    modalType.value = type;
    modalOpen.value = true;
};

const closeModal = () => {
    modalOpen.value = false;
};


const route = useRoute()
const auth = useAuth()
const user = ref((await auth.getSession()).user)
const { data: taken } = await useFetch("/api/getLaptopNumber", {
    method: 'POST',
    body: {
        id: route.params.id,
    },
})
</script>
