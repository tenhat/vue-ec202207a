<template>
  <HeaderComponent />
  <div @click="hideToppingList">
    <div class="mt-24">
      <h2 class="text-4xl font-extrabold dark:text-white">{{ name }}</h2>
      <img class="max-w-lg h-auto rounded-lg mx-auto mt-8" :src=imagePath alt="image description">
      <p class="my-8 text-lg text-gray-500 w-2/3 block mx-auto">{{ description }}</p>
      <p class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">{{ price }}円(税抜)</p>
    </div>
    <ToppingList :isShowTopping="isShowTopping" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ToppingList from '@/components/ToppingList.vue';
export default {
  data() {
    return {
      id: this.$route.query.id,
      name: this.$route.query.name,
      description: this.$route.query.description,
      price: this.$route.query.price,
      imagePath: this.$route.query.imagePath,
      isShowTopping: false
    };
  },
  methods: {
    hideToppingList() {
      this.isShowTopping = false;
    }
  },  
  components: { HeaderComponent, ToppingList }
}
</script>

<style>

</style>
