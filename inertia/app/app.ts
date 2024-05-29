import '../css/app.css'
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import Galleria from 'primevue/galleria'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primevue/resources/primevue.min.css'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `/inertia/components/pages/${name}.vue`,
      import.meta.glob<DefineComponent>('/inertia/components/pages/**/*.vue')
    )
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(PrimeVue)
      .component('Card', Card)
      .component('Button', Button)
      .component('Paginator', Paginator)
      .component('Galleria ', Galleria)
      .mount(el)
  },
})
