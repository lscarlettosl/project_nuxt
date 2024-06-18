<template>
    <div class="mx-auto mt-14 p-5 md:w-[80%] ">
        <p class="text-left text-2xl">
            Добро пожаловать, {{ user.name }}
        </p>
        <p class="text-left">Ваш email: {{ user.email }}</p>
        <p class="text-left" v-if="taken">
            Вы взяли ноутбук № : {{ $route.params.id }}
        </p>

        <div class="md:flex md:flex-col">
            <button @click="openModal('takeLaptop')"
                class="mt-4 rounded-md bg-[#921CB0] w-[100%] md:max-w-[20%] py-1 text-white">
                Как взять ноутбук?
            </button>
            <button @click="openModal('returnLaptop')"
                class="mt-4 rounded-md bg-[#921CB0] w-[100%] md:max-w-[20%]  py-1 text-white">
                Как вернуть ноутбук?
            </button>
        </div>

        <div v-if="modalOpen" class="modal">

            <div class="modal-content">

                <button class="text-4xl text-red-600" @click="closeModal">𐌢</button>

                <p v-if="modalType === 'takeLaptop'"
                    class=" mx-auto border bg-[#E6E8EA] md:max-w-[50%] border-black rounded-md p-2">
                    Для того чтобы взять ноутбук, вам необходимо пройти в аудиторию 8-613, после чего взять ноутбук и
                    отсканировать Qr-код. После этих действий вас перенаправит в окно авторизации и вам будет необходимо
                    войти в профиль, затем у вас появится окно где будет кнопка "Взять ноутбук"
                </p>
                <p v-if="modalType === 'returnLaptop'"
                    class=" mx-auto border bg-[#E6E8EA] md:max-w-[50%] border-black rounded-md p-2">
                    Для возврата ноутбука вам необходимо пройти в кабинет 8-613 и на компьютере администратора нажать на
                    кнопку "Вернуть" рядом с Вашим номером ноутбука. После чего необходимо отсканировать QR-код и Вас
                    перенаправит на страницу возврата ноутбука.
                </p>
            </div>
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
