<template>
  <HeaderComponent />
  <div class="mt-40">
    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">ご注文ありがとうございます！</h1>
    <p class="mb-6 text-md font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      ご登録いただきましたメールアドレス宛にご注文確認メールをお送りさせていただきましたのでご確認お願いいたします。
      また、ご注文内容に誤りがある、確認メールが届かない場合にはお手数ですが当店までご連絡をお願い申し上げます。
    </p>
    <a @click="goToHome" href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-curry rounded-lg hover:bg-curryHover focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
      Home
      <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
export default {
    components: { HeaderComponent },
    methods: {
      goToHome() {
        this.$router.push('/');
      }
    }
}
</script>

<style>

</style>
