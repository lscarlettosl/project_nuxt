<template>
  <div class="flex flex-1 flex-col justify-center bg-[#f0f0f0] text-center">
    <h1 class="xm:text-[50px] mb-5 text-[20px] text-black">Войдите в свой профиль</h1>
    <form @submit.prevent="login" class="mx-auto flex w-[400px] flex-col gap-y-3">
      <input
        class="placeholder-text-center m-1 rounded-md px-4 py-2"
        type="text"
        v-model="email"
        placeholder="Ваша почта или телефон"
      />
      <input
        class="m-1 rounded-md px-4 py-2"
        type="password"
        v-model="password"
        placeholder="Ваш пароль"
      /><button
        class="ld:w-[200px] text- mx-auto w-[150px] rounded-md py-[10px] text-center text-purple-700 sm:w-[200px] lg:w-[200px] xl:w-[200px]"
        type="submit"
      >
        Забыли пароль?
      </button>
      <button
        class="ld:w-[200px] mx-auto w-[150px] rounded-md bg-purple-700 py-[10px] text-center text-white sm:w-[200px] lg:w-[200px] xl:w-[200px]"
        type="submit"
      >
        Войти
      </button>

      <p v-if="showErrorMessage" class="text-red-500">Неправильный логин или пароль</p>
    </form>
  </div>
</template>

<script setup>
  const router = useRouter();
  const route = useRoute();
  const { signIn } = useAuth();
  definePageMeta({
    auth: {
      unauthenticatedOnly: true,
    },
  });

  const email = ref("");
  const password = ref("");
  const showErrorMessage = ref(false);

  async function login(e) {
    try {
      e.preventDefault();
      const response = await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false,
      });
      if (!response?.error) {
        window.location.href = route.query.callbackUrl;
      } else {
        showErrorMessage.value = true;
      }
    } catch (error) {}
  }
</script>
