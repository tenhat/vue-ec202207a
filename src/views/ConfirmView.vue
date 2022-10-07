<template>
  <HeaderComponent />
  <div class="mx-auto mt-8 p-4 w-full max-w-xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart</h5>
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
          </div>
        </li>
      </ul>
    </div>
  </div>
  <hr class="my-8">
  
  <form>
    <div class="w-full max-w-xl mx-auto">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
              <input v-model="deliveryFirstName" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required="">
          </div>
          <div>
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
              <input v-model="deliveryLastName" type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required="">
          </div>
          <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
              <input v-model="deliveryPhone" type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required="">
          </div>
      </div>
      <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
          <input v-model="deliveryEmail" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required="">
      </div> 
      
      <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delivery time</p>
      <div class="flex flex-wrap mb-4 justify-center">
        <div class="flex items-center mr-4">
            <input checked :id=0 type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label :for=0 class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">10</label>
        </div>
        <div v-for="(time, index) in deliveryTimes" :key="index" class="flex items-center mr-4">
            <input :id="index" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label :for="index" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{time}}</label>
        </div>
      </div>

    </div>
  </form>

  <hr class="my-8">

  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">計: {{totalOrderPrice}}円(税抜)</h1>
  <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">カートに{{orderItems.length}}件の注文が入っています。</p>
  <a @click="goToThankYou" href="#" class="mb-16 w-1/2 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
    Confirm
  </a>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

const cartUrl = "http://localhost:8000/orderItems";
const userUrl = "http://localhost:8000/users";

const cookieName = document.cookie
  .split('; ')
  .find((row) => row.startsWith('name'))
  .split('=')[1];


export default {
    components: { HeaderComponent },
    data() {
    return {
      orderItems: [],
      totalOrderPrice: 0,
      deliveryFirstName: '',
      deliveryLastName: '',
      deliveryPhone: '',
      deliveryEmail: '',
      deliveryTimes: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    }
  },
  methods: {
    goToThankYou() {
      this.orderItems.forEach(async(orderItem) => {
        await fetch(`http://localhost:8000/orderItems/${orderItem.id}`, {
          method: 'delete',
        });
      })
      this.$router.push('/thankyou');
    }
  },
  async created() {
    const orderResponse = await fetch(cartUrl).then(res => res.json());
    this.orderItems = orderResponse;
    this.orderItems.forEach(orderItem => {
      this.totalOrderPrice += orderItem.totalPrice;
    });
    const usersResponse = await fetch(userUrl).then(res => res.json());
    const loginUser = usersResponse.find(userResponse => {
      return userResponse.name === cookieName;
    });
    console.log(loginUser)
    this.deliveryFirstName = loginUser.name.split(' ')[1];
    this.deliveryLastName = loginUser.name.split(' ')[0];
    this.deliveryPhone = loginUser.phone;
    this.deliveryEmail = loginUser.email;
  }
}
</script>
