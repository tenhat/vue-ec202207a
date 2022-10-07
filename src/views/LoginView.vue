<template>
  <HeaderComponent />
  <h2 class="mt-20 mb-8 text-4xl font-extrabold dark:text-white">ログイン</h2>  

  <div class="w-full max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">

    <p v-show="isFailed" class="block mb-2 text-sm font-medium text-red-600">メールアドレスまたはパスワードが正しくありません</p>

    <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
    <div :class="[isFailed ? 'outline rounded-lg' : 'none']" class="relative mb-6">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      </div>
      <input v-model="email" type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@website.com">
    </div>
    <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
    <div :class="[isFailed ? 'outline rounded-lg' : 'none']" class="flex">
      <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <font-awesome-icon icon="fa-solid fa-key" />
      </span>
      <input v-model="password" type="password" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password">
    </div>
    <button @click="confirmLogin" class="bg-curry hover:bg-curryHover text-white px-8 py-1 rounded-lg mt-8">Login</button>
  </div>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
const userURL = "http://localhost:8000/users";

export default {
    components: { HeaderComponent },
    data() {
      return {
        email: '',
        password: '',
        isFailed: false,
      }
    },
    methods: {
      async confirmLogin() {
        const users = await fetch(userURL).then(res => res.json());
        users.forEach(user => {
          if(this.email === user.email && this.password === user.password) {
            document.cookie = `id=${user.id}; max-age=86400`;
            document.cookie = `name=${user.name}; max-age=86400`;
            if(this.$route.query.from) {
              this.$router.push('/cart');
            } else {
              this.$router.push('/');
            }
          } else {
            this.isFailed = true;
          }
        });
      }
    }
}
</script>

<style>

</style>
