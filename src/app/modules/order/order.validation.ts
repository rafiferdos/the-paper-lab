// order.validation.ts
import { z } from 'zod'

export const createOrderSchema = z.object({
  email: z.string().email(),
  product: z.string().nonempty(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0, 'Total price cannot be negative'),
})
