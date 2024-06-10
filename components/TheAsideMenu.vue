<template>

    <button type="button" @click="toggleMenu" :class="{ 'is-active': menuOpen }"
        class="menu-toggle md:hidden fixed right-5 top-5">Menu</button>
    <aside id="asidee" :class="{ 'hidden': !menuOpen, 'md:w-80': menuOpen }"
        class="w-full md:h-auto h-full fixed md:static  md:w-80 py-10 px-5 md:flex flex-col bg-[#E6E8EA] rounded-xl">

        <div><img class="w-[150px] lg: w-[200px]" src="public/images/logo.png" /><img /></div>
        <div class="xm:text-[50px]my-auto flex max-w-[1800px] flex-col  ">
            <p class=" mb-5 mt-7 text-slate-400 text-lg">Действия</p>
            <div class="ml-5 text-xl" id="tableButtons"></div>
            <div class="flex flex-col gap-y-6 ">

                <NuxtLink class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl" to="/authorization"><img
                        class="w-5 font-bold" src="/images/home.svg" alt="">Главная
                </NuxtLink>

                <NuxtLink class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl" to="/admin"><img
                        src="/images/export.svg" alt="">Админ
                </NuxtLink>

                <NuxtLink class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl" to="/profile"><img
                        src="/images/profile.svg" class="w-5" alt="">Профиль
                </NuxtLink>

                <NuxtLink class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl" to="/rent/1"><img
                        src="/images/export.svg" alt="">Взять
                    ноут 1
                </NuxtLink>

            </div>
            <p class="mb-5 mt-7 text-slate-400 text-xl md:text-xl lg:text-lg">Другое</p>
            <div class="flex flex-col gap-y-6">

                <NuxtLink class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl" to="/admin/history"><img
                        src="/images/history.svg" alt="">История ноутбуков</NuxtLink>
                <button class="flex gap-x-[18px] ml-5 text-xl md:text-xl lg:text-xl text-red-600"
                    @click="signOut()"><img src="/images/exit.svg" alt="">Выйти</button>
            </div>
        </div>
        <div>

        </div>
    </aside>

</template>

<script setup>




const { signOut } = useAuth();
const menuOpen = ref(false);
const { signIn } = useAuth();
import { ref } from 'vue';

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>





<style scoped>
.menu-toggle {
    z-index: 10;
    width: 30px;
    height: 26px;
    background: transparent;
    border-top: 4px solid;
    border-bottom: 4px solid;
    color: #921CB0;
    ;
    font-size: 0;
    transition: all 0.25s ease-in-out;
}

.menu-toggle:before,
.menu-toggle:after {
    content: "";
    display: block;
    width: 100%;
    height: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: currentColor;
    transform: translate(-50%, -50%);
    transition: transform 0.25s ease-in-out;
}

button:hover {
    color: #921CB0;
}

button.is-active {
    border-color: transparent;
}

button.is-active:before {
    transform: translate(-50%, -50%) rotate(45deg);
}

button.is-active:after {
    transform: translate(-50%, -50%) rotate(-45deg);
}


button {
    border: none;
    cursor: pointer;
    outline: none;
}
</style>