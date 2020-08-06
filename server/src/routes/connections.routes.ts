import express from 'express'
import db from '../database/connection'

const connectionsRoutes = express.Router()

connectionsRoutes
  // Create Connection
  .post('/', async (req, resp) => {
    const { user_id } = req.body;

    try {
      await db('connections').insert({ user_id })
      return resp.status(201).send()
    } catch (error) {
      return resp.status(400).json({
        error: 'Unexpected error while creating new connection'
      })
    }
  })

  .get('/', async (req, resp) => {
    try {
      const totalCnn = await db('connections')
        .count('* as total')

      const { total } = totalCnn[0]

      return resp.json({ total })
    } catch (error) {
      return resp.status(400).json({
        error: 'Unexpected error while getting qty connections'
      })
    }
  })

export default connectionsRoutes
