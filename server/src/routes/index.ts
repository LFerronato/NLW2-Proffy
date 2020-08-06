import express from 'express'

import classesRoutes from './classes.routes'
import connectionsRoutes from './connections.routes'

const routes = express.Router()
routes
  // Classes Routes
  .use('/classes', classesRoutes)
  // Connections Routes
  .use('/connections', connectionsRoutes)

export default routes
