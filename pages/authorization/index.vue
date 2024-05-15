<template>
  <div class="flex flex-1 flex-col justify-center bg-[#f0f0f0] text-center">
    <h1 class="text-[20px] mb-5 xm:text-[50px] text-purple-900">Авторизация</h1>
    <form @submit.prevent="login" class="mx-auto flex w-[400px] flex-col gap-y-5">
      <input class="placeholder-text-center m-1 rounded-md px-4 py-2" type="text" v-model="email" placeholder="Email" />
      <input class="m-1 rounded-md px-4 py-2" type="password" v-model="password" placeholder="Пароль" />
      <button
        class="mx-auto w-[150px] sm:w-[200px] ld:w-[200px] lg:w-[200px] xl:w-[200px] rounded-md bg-black py-[10px] text-center text-white"
        type="submit">
        Войти
      </button>
    </form>
  </div>
</template>


<script setup>

const { signIn } = useAuth()
definePageMeta({
  auth: {
    unauthenticatedOnly: true,

  },
})

const email = ref('')
const password = ref('')

function login() {
  signIn('credentials', {
    email: email.value,
    password: password.value,
    redirect: false
  })
}
</script>