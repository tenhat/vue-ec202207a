<template>
  <HeaderComponent />
  <div :class="[isOrderShow ? 'hidden' : '']">
    <h1 class="mt-8 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">カートに注文がありません</h1>
    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">カートが空です。お買い物を続けましょう！</p>
    <a @click="goToHome" href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-curry rounded-lg hover:bg-curryHover focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
        ホームへ
        <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>

  <div :class="[isOrderShow ? '' : 'hidden']">
    <div class="mx-auto mt-8 p-4 w-full max-w-xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart</h5>
        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="orderItem in orderItems" :key="orderItem.id" class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="w-20 h-16 rounded-full" :src=orderItem.imagePath alt="Neil image">
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-gray-900 truncate dark:text-white">
                    {{orderItem.name}}
                </p>
                <ul class="text-sm text-gray-500 truncate dark:text-gray-400">
                  <li v-for="(topping, index) in orderItem.toppings" :key="index">
                    {{topping.name}}: {{topping.price}}円
                  </li>
                </ul>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {{orderItem.totalPrice}}円(税抜)
              </div>
              <div>
                <button @click="deleteOrderItem(orderItem.id)" class="cursor-pointer text-gray-400">削除</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hr class="my-8">
    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">計: {{totalOrderPrice}}円(税抜)</h1>
    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">カートに{{orderItems.length}}件の注文が入っています。</p>
    <a @click="goToConfirm" href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-curry rounded-lg hover:bg-curryHover focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
      Order
      <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

const cartUrl = "http://localhost:8000/orderItems";

export default {
  name: 'CartView',
  components: { HeaderComponent },
  data() {
    return {
      orderItems: [],
      totalOrderPrice: 0,
      isOrderShow: true,
    }
  },
  methods: {
    async deleteOrderItem(id) {
      await fetch(`http://localhost:8000/orderItems/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const response = await fetch(cartUrl).then(res => res.json());
      this.orderItems = response;
      this.totalOrderPrice = 0;
      this.orderItems.forEach(orderItem => {
        this.totalOrderPrice += orderItem.totalPrice;
      });
      if(this.orderItems.length === 0) {
        this.isOrderShow = false;
      }
    },
    async goToConfirm() {
      if(document.cookie) {
        this.$router.push('/confirm');
      } else {
        this.$router.push({
          name: 'login',
          query: {
            from: 'cart'
          }
        });
      }
    },
    goToHome () {
      this.$router.push('/');
    }
  },
  async created() {
    const response = await fetch(cartUrl).then(res => res.json());
    this.orderItems = response;
    this.orderItems.forEach(orderItem => {
      this.totalOrderPrice += orderItem.totalPrice;
    });
    if(this.orderItems.length === 0) {
        this.isOrderShow = false;
    }
  }
}
</script>
