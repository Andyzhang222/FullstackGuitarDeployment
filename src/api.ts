import { Router } from 'express'

import healthCheck from 'routes/healthcheck/healthCheck.router'
import product from 'routes/products/healthCheck.router'


const router: Router = Router()
router.use(healthCheck)
router.use(product)

export default router
