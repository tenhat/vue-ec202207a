<template>
  <HeaderComponent />
  <div class="mt-8 p-8 w-2/3 mx-auto">
    <h2 class="font-bold text-xl mb-4">商品を検索する</h2>
    <div class="relative">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input v-model="searchValue" type="search" id="search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
      <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-curry hover:bg-curryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
  </div>
  <div class="w-4/5 mx-auto grid gap-8 grid-cols-2 md:grid-cols-3 mt-8 justify-items-center">
    <div  @click="showDetail(curryItem)" v-for="curryItem in curryItems" :key="curryItem.id" class="relative pb-12 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8">
      <a>
        <img class="rounded-t-lg" :src="curryItem.imagePath" alt="curryItem" />
      </a>
      <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{curryItem.name}}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{curryItem.price}}円(税抜)</p>
        <a class="absolute bottom-4 w-32 right-1/2 translate-x-1/2 cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-curry rounded-lg hover:bg-curryHover focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderComponent from "../components/HeaderComponent.vue";
  const itemsUrl = "http://localhost:8000/items";
  
  export default {
    name: "SearchedHomeView",
    components: {
    HeaderComponent,
},
    data() {
      return {
        searchValue: "",
        curryItems: "",
      };
    },
    async created() {
      const response = await fetch(itemsUrl).then((res) => res.json());
      this.curryItems = response;
    },
    methods: {
      showDetail({name, description, price, imagePath, id}) {
        this.$router.push({
          name: 'details',
          query: {
            id: id,
            name: name,
            description: description,
            price: price,
            imagePath: imagePath,
          }
        });
      }
    }
  };
  </script>
  
