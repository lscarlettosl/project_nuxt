<template>
  <div class="flex flex-1 flex-col justify-center bg-[#f0f0f0] text-center">
    <h1 class="mb-5 text-[50px] text-purple-900">Авторизация</h1>
    <form @submit.prevent="login" class="mx-auto flex w-[400px] flex-col gap-y-5">
      <input
        class="placeholder-text-center m-1 rounded-md px-4 py-2"
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        class="m-1 rounded-md px-4 py-2"
        type="password"
        v-model="password"
        placeholder="Пароль"
        required
      />
      <button
        class="mx-auto w-[60px] rounded-md bg-black py-[10px] text-center text-white hover:bg-green-800 hover:text-black"
        type="submit"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        console.log("Email:", this.email);
        console.log("Пароль:", this.password);
      },
    },
  };
</script>
