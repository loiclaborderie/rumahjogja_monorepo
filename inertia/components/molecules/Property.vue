<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <!-- <img alt="user header" src="/images/usercard.png" /> -->
    </template>
    <template #title
      ><h1>{{ property.name }} - {{ property.price }}€</h1></template
    >
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type PropertyPresented from '#types/property_presented'
import { toRefs } from 'vue'
import Card from 'primevue/card'
const props = defineProps<{
  property: PropertyPresented
}>()
let { property } = toRefs(props)
</script>

<style scoped></style>
