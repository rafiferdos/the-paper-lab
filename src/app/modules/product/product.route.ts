// product.route.ts
import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product.controller'

const router = Router()

// Create a new product
router.post('/', createProduct)

// Get all products
router.get('/', getAllProducts)

// Get a product by ID
router.get('/:productId', getProductById)

// Update a product by ID
router.put('/:productId', updateProduct)

// Delete a product by ID
router.delete('/:productId', deleteProduct)

export default router
