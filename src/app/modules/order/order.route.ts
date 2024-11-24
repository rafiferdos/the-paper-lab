import { Router } from 'express'
import { createOrder, calculateRevenue } from './order.controller'

const router = Router()

// Create a new order
router.post('/', createOrder)

// Calculate total revenue
router.get('/revenue', calculateRevenue)

export default router