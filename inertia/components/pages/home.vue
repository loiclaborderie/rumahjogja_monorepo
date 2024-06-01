<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import type PropertiesController from '#controllers/properties_controller'
import { ref, toRefs, watch, computed } from 'vue'
import Property from '../molecules/Property.vue'
import Paginator from 'primevue/paginator'
import { router } from '@inertiajs/vue3'
import { HomeFilters } from '../../composable/home_filters'

const props = defineProps<{
  properties: InferPageProps<PropertiesController, 'getAllPropertiesFiltered'>['properties']
  queryFilters: InferPageProps<PropertiesController, 'getAllPropertiesFiltered'>['queryFilters']
}>()
const { properties } = toRefs(props)
const { filters, updateFilters } = HomeFilters()

updateFilters(props.queryFilters)
console.log('new props', props.queryFilters)

const screenSize = ref(window.innerWidth)
const paginatorMessage = computed(() => {
  if (screenSize.value > 450) {
    let currentMax =
      properties.value.page.current * properties.value.page.perPage > properties.value.page.total
        ? properties.value.page.total
        : properties.value.page.current * properties.value.page.perPage
    return `Showing ${(properties.value.page.current - 1) * properties.value.page.perPage} to ${currentMax} of ${properties.value.page.total}`
  }
  return `${properties.value.page.current} - ${Math.ceil(properties.value.page.total / properties.value.page.perPage)}`
})

const currentPage = ref((properties.value.page.current - 1) * properties.value.page.perPage)

watch(currentPage, async (newItemNumbers) => {
  console.log('current page has changed ?')
  const pageNumber = newItemNumbers / properties.value.page.perPage + 1
  filters.page = pageNumber
  redirectionWithFilters(false)
})

function redirectionWithFilters(pageReset = true) {
  console.log('querying agan', filters, props.queryFilters)
  if (filters.search === '') {
    filters.search = undefined
  }
  if (pageReset) {
    filters.page = undefined
  }
  router.get('/homes', filters)
}
</script>

<template>
  <div class="searchFilters">
    <select @change="redirectionWithFilters(true)" v-model="filters.sortBy">
      <option value="price_asc">Price (low to high)</option>
      <option value="price_desc">Price (high to low)</option>
      <option value="newest">Newest</option>
    </select>
    <form id="extraFilters" @submit.prevent="redirectionWithFilters(true)">
      <input type="text" v-model="filters.search" placeholder="Search" />
      <input type="number" placeholder="min price (in €)" min="10000" v-model="filters.minPrice" />
      <input type="number" placeholder="max price (in €)" min="10000" v-model="filters.maxPrice" />
      <input type="number" placeholder="bathrooms (min)" min="1" v-model="filters.minRooms" />
      <input type="number" placeholder="bathrooms (max)" min="1" v-model="filters.maxRooms" />
      <input type="number" placeholder="floors (min)" min="0" v-model="filters.minFloor" />
      <input type="number" placeholder="floors (max)" min="0" v-model="filters.maxFloor" />
      <input type="number" placeholder="m² min" min="9" v-model="filters.minBuildingSurface" />
      <input type="number" placeholder="m² max" min="9" v-model="filters.maxBuildingSurface" />
      <input
        type="number"
        placeholder="bathrooms (min)"
        min="10000"
        v-model="filters.minBathrooms"
      />
      <input
        type="number"
        placeholder="bathrooms (max)"
        min="10000"
        v-model="filters.maxBathrooms"
      />

      <button type="submit">Find my property</button>
    </form>
  </div>
  <div class="container mx-auto mt-10">
    <ul id="propertyDisplay">
      <Property :property="property" v-for="property in properties.data" :key="property.id" />
    </ul>

    <span>
      Learn more about AdonisJS and Inertia.js by visiting the
      <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
    </span>
  </div>
  <Paginator
    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    :currentPageReportTemplate="paginatorMessage"
    :rows="properties.page.perPage"
    :totalRecords="properties.page.total"
    v-model:first="currentPage"
  />
</template>

<style scoped>
#propertyDisplay {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 80%;
  min-width: 300px;
}
</style>
