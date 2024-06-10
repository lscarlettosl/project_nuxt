<template>
    <div class=" mx-auto mt-5 ml-4">
        <p class="max-w-[80%] text-2xl mt-2 text-center md:max-w-[100%] md:text-4xl  ">Добро пожаловать, {{
            user.name }}
            <hr class="md:hidden">
        </p>
        <div class="mx-auto">
            <p class="text-xl">Ваш email: {{ user.email }}</p>
        </div>
        <div v-if="taken">
            <p>Вы взяли ноутбук № - {{ $route.params.id }}</p>
        </div>






        <div class="mt-5 max-w-[80%] md:max-w-[100%] flex flex-col items-center mx-center">
            <button @click="openModal('takeLaptop')" class="rounded-md border text-white  m-2 bg-[#921CB0] ">
                Как взять ноутбук?
            </button>
            <button @click="openModal('returnLaptop')" class="rounded-md border text-white m-2 bg-[#921CB0] ">
                Как вернуть ноутбук?
            </button>

            <div v-if="modalOpen" class="modal">
                <div class="modal-content">
                    <button class="text-2xl mt-5" @click="closeModal">𐌢</button>
                    <p v-if="modalType === 'takeLaptop'"
                        class="text-xl max-w-[90%] md:max-w-[100%] border bg-[#E6E8EA] border-black rounded-md p-2">
                        Для того
                        чтобы взять
                        ноутбук, вам необходимо пройти в аудиторию 8-613, после чего взять ноутбук и отсканировать
                        Qr-код. После этих действий вас перенаправит в окно авторизации и вам будет необходимо войти в
                        профиль,
                        затем у вас появится окно где будет кнопка "Взять ноутбук"</p>
                    <p v-if="modalType === 'returnLaptop'"
                        class="text-xl max-w-[90%] md:max-w-[100%] border bg-[#E6E8EA] border-black rounded-md p-2">
                        Для
                        возврата
                        ноутбука вам необходимо пройти в кабинет 8-613 и на компьютере администратора нажать на кнопку
                        "Вернуть" рядом с Вашим номером ноутбука. После чего необходимо отсканировать QR-код и Вас
                        перенаправит на
                        страницу возврата ноутбука.</p>
                </div>
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
