<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import PropertiesController from '#controllers/properties_controller'
import { toRefs } from 'vue'
import Property from '~/components/Property.vue'

const props = defineProps<{
  properties: InferPageProps<
    PropertiesController,
    'getAllPropertiesFilteredPresenter'
  >['properties']
}>()
const { properties } = toRefs(props)
</script>

<template>
  <div class="container">
    <ul id="propertyDisplay">
      <li v-for="property in properties.data" :key="property.id">
        <Property :property="property" />
      </li>
    </ul>

    <span>
      Learn more about AdonisJS and Inertia.js by visiting the
      <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
    </span>
  </div>
</template>
