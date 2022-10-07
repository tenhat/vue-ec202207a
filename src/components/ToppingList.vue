<template>
  <div class="relative">
    <button @click="toggleShowTopping" id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" class="w-28 h-8 mb-8 inline-flex justify-center items-center py-2 px-4 text-sm font-medium hover:text-white text-center bg-gradient-to-br from-curry to-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      <span class="inline-flex bg-background rounded-md px-4 py-1 hover:bg-opacity-0">
        Topping <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </span>
    </button>
    <!-- Dropdown menu -->
    <div v-show="isShowTopping" id="dropdownSearch" class="top-10 left-1/2 z-10 w-60 bg-white rounded shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style="position: absolute; margin: 0px; transform: translateX(calc(-50%));">
        <div class="p-3">
          <label for="input-group-search" class="sr-only">Search</label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="input-group-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search topping">
          </div>
        </div>
        <ul class=" overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
          <li v-for="(topping) in toppingList" :key="topping.id">
            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input @change="addToppingPrice" v-model="topping.checked" :id=topping.id type="checkbox" :value=topping.name class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label :for=topping.id class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{topping.name}}</label>
            </div>
          </li>
        </ul>
    </div>
  </div>

</template>

<script>


export default {
  name: 'ToppingList',
  props: {
    isShowTopping: Boolean,
    toggleShowTopping: Function,
    toppingList: Array,
    addToppingPrice: Function
  },
  data() {
    return {
    }
  },
  methods: {
  },

}
</script>

<style>

</style>
