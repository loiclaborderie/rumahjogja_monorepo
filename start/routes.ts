/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const PropertiesController = () => import('#controllers/properties_controller')
import router from '@adonisjs/core/services/router'
router.on('/inertia').renderInertia('home', { version: 6 })
router.get('/', [PropertiesController, 'getAllPropertiesFilteredPresenter'])
