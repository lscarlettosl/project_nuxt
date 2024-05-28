<template>
    <div v-if="laptops">

        Вы возвозравщаете нубук с хэшем - {{ $route.params.hash }}
        <p>Вы уверены что хотите вернуть ноутбук № {{ laptops.laptop.number }}</p>
        <div>
            <button @click="rent($route.params.hash)" v-if="!reqData"
                class="rounded-md border border-purple-700 bg-purple-500 px-4 py-1">
                Вернуть
            </button>
            <p v-else>Ноутбук возвращен</p>
        </div>
    </div>
    <div v-else>
        <p>Аренда не найдена</p>
    </div>
</template>

<script setup>
const route = useRoute()
const { data: laptops } = await useFetch("/api/getLaptopNumber", {
    method: 'POST',
    body: {
        hash: route.params.hash
    }
});
const reqData = ref();

async function rent(hash) {
    const { data } = await useFetch("/api/rent/return", {
        method: "POST",
        body: {
            hash: hash,
        },

    })
    if (!laptops) {
        return 'Ноутбук не найден'
    }

    reqData.value = data.value;
}
</script>
