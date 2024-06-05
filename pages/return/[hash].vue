<template>
    <div class="flex-col flex items-center justify-center ">
        <p class="text-center w-[80%] max-[50px]">{{ reqData }}</p>
        <NuxtLink to="/profile" class="text-center rounded-md  border text-white bg-[#921CB0] px-4 py-1 mt-6">На главную
        </NuxtLink>
    </div>
</template>

<script setup>
const route = useRoute()
const reqData = ref();
async function returnLaptop() {
    const { data: laptop_return } = await useFetch("/api/rent/return", {
        method: "POST",
        body: {
            hash: route.params.hash,
        }
    })
    reqData.value = laptop_return.value;
}

await returnLaptop()
</script>
