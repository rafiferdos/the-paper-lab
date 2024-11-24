// product.validation.ts
import { z } from 'zod'
import { Category } from './product.interface'

export const createProductSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  category: z.nativeEnum(Category, { message: 'Invalid category' }),
  description: z.string().nonempty('Description is required'),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean(),
})

export const updateProductSchema = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().min(0, 'Price cannot be negative').optional(),
  category: z.nativeEnum(Category, { message: 'Invalid category' }).optional(),
  description: z.string().optional(),
  quantity: z.number().min(0, 'Quantity cannot be negative').optional(),
  inStock: z.boolean().optional(),
})