<template>
  <HeaderComponent />
  <div @click="hideToppingList">
    <div class="mt-24">
      <h2 class="text-4xl font-extrabold dark:text-white">{{ name }}</h2>
      <img class="max-w-lg h-auto rounded-lg mx-auto mt-8" :src=imagePath alt="image description">
      <p class="my-8 text-lg text-gray-500 w-2/3 block mx-auto">{{ description }}</p>
      <p class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">合計金額: {{ totalPrice }}円(税抜)</p>
    </div>
  </div>
  <ToppingList :addToppingPrice="addToppingPrice" :toppingList="toppingList" :isShowTopping="isShowTopping" :toggleShowTopping="toggleShowTopping" />
  <div @click="hideToppingList">
    <a @click="addToCart" class="mb-24 mt-4 cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-curry rounded-lg hover:bg-curryHover focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Add to Your Cart
      <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ToppingList from '@/components/ToppingList.vue';
const toppingUrl = "http://localhost:8000/topping";
const cartUrl = "http://localhost:8000/orderItems";

export default {
  data() {
    return {
      id: this.$route.query.id,
      name: this.$route.query.name,
      description: this.$route.query.description,
      price: Number(this.$route.query.price),
      imagePath: this.$route.query.imagePath,
      isShowTopping: false,
      toppingList: [],
      checkedToppingList: [],
      totalPrice: Number(this.$route.query.price),
    };
  },
  methods: {
    hideToppingList() {
      this.isShowTopping = false;
    },
    toggleShowTopping() {
      this.isShowTopping = !this.isShowTopping;
    },
    addToppingPrice() {
      this.checkedToppingList = this.toppingList.filter(topping => topping.checked === true);
      let toppingPrice = 0;
      this.checkedToppingList.forEach(checkedTopping => {
          toppingPrice += checkedTopping.price;
      });
      this.totalPrice = this.price + toppingPrice;
    },
    async addToCart() {
      await fetch(cartUrl, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          price: this.price,
          totalPrice: this.totalPrice,
          toppings: this.checkedToppingList,
          imagePath: this.imagePath
        })
      });
      this.$router.push("/");
    }
  },  
  computed: {
  },
  async created() {
    const response = await fetch(toppingUrl).then(res => res.json());
    this.toppingList = response;
  },
  components: { HeaderComponent, ToppingList }
}
</script>

<style>

</style>
