<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import type PropertiesController from '#controllers/properties_controller'
import { ref, toRefs, watch, computed } from 'vue'
import Property from '../molecules/Property.vue'
import Paginator from 'primevue/paginator'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  properties: InferPageProps<
    PropertiesController,
    'getAllPropertiesFilteredPresenter'
  >['properties']
}>()
const { properties } = toRefs(props)
const screenSize = ref(window.innerWidth)
const paginatorMessage = computed(() => {
  if (screenSize.value > 450) {
    return `Showing ${properties.value.page.current} to ${properties.value.page.perPage} of ${properties.value.page.total}`
  }
  return `${properties.value.page.current} - ${Math.ceil(properties.value.page.total / properties.value.page.perPage)}`
})

const currentPage = ref((properties.value.page.current - 1) * properties.value.page.perPage)

watch(currentPage, async (newItemNumbers) => {
  const pageNumber = newItemNumbers / properties.value.page.perPage + 1
  router.get('/homes', { page: pageNumber }, { only: ['properties'] })
})
</script>

<template>
  <div class="container mx-auto">
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
