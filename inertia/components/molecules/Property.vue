<template>
  <Link :href="'/home/' + property.id">
    <Card
      style="overflow: hidden"
      :pt="{
        content: 'py-2',
        body: 'p-4',
        footer: 'pt-3',
        subtitle: 'text-surface-600 dark:text-surface-0/60',
      }"
    >
      <template #header>
        <Galleria
          :value="images"
          :numVisible="5"
          :circular="true"
          containerStyle="max-width: 640px"
          :showItemNavigators="true"
          :showThumbnails="false"
          :showItemNavigatorsOnHover="true"
          :showIndicators="true"
          :pt="{
            previousitembutton:
              'absolute translate-y-[-50%] top 50% inline-flex justify-center items-center overflow-hidden bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md opacity-0 group-hover:opacity-100 mx-2 top-1/2 mt-[-0.5rem] left-0 !absolute hover:bg-surface-0/10 hover:text-white focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
            nextitembutton:
              'absolute translate-y-[-50%] top 50% inline-flex justify-center items-center overflow-hidden bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md opacity-0 group-hover:opacity-100 mx-2 top-1/2 mt-[-0.5rem] right-0 !absolute hover:bg-surface-0/10 hover:text-white focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
            indicators:
              'absolute bottom-0 left-0 right-0 flex items-center justify-center p-4 order-2 z-10',
            indicatorbutton: ({ context }) => ({
              class: [
                'w-3 h-3',
                'rounded-full transition duration-200',
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
                // Conditional Appearance: Not Highlighted
                {
                  'bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600':
                    !context.highlighted,
                },
                // Conditional Appearance: Highlighted
                { 'bg-primary hover:bg-primary-hover': context.highlighted },
              ],
            }),
          }"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item.itemImageSrc"
              :alt="slotProps.item.alt"
              style="width: 100%; display: block"
            />
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item.thumbnailImageSrc"
              :alt="slotProps.item.alt"
              style="display: block"
            />
          </template>
        </Galleria>
      </template>
      <template #title
        ><h2 class="font-light">{{ property.price.toLocaleString() }}€</h2></template
      >
      <template #subtitle>
        <p>Yogyakarta, {{ property.location }}</p>
      </template>
      <template #content>
        <p>
          bedrooms: {{ property.bedroomNumber }} | bathrooms: {{ property.bathroomNumber }} | build
          m²: {{ property.buildingSurface }} | land m² {{ property.landSurface }}
        </p>
      </template>
      <template #footer>
        <div class="flex gap-3 mt-1">
          <Button label="Chat" severity="secondary" outlined class="w-full" icon="pi pi-comment" />
          <Button label="Call" class="w-full" icon="pi pi-phone" raised />
        </div>
      </template>
    </Card>
  </Link>
</template>

<script setup lang="ts">
import type PropertyPresented from '#types/property_presented'
import { toRefs } from 'vue'
import Card from 'primevue/card'
import Galleria from 'primevue/galleria'
import { Link } from '@inertiajs/vue3'
const props = defineProps<{
  property: PropertyPresented
}>()
const images = Array.from({ length: 5 }, (_, i) => ({
  itemImageSrc: `https://picsum.photos/300/200?random=${i}`,
  thumbnailImageSrc: `https://picsum.photos/300/200?random=${i}`,
  alt: `Image ${i + 1}`,
}))
let { property } = toRefs(props)
</script>

<style scoped></style>
