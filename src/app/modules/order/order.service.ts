import Order from '../order.model'
import Product from '../product.model'
import { IOrder } from './order.interface'

export const createOrder = async (
  email: string,
  productId: string,
  quantity: number,
): Promise<IOrder> => {
  const product = await Product.findById(productId)
  if (!product) {
    throw new Error('Product not found')
  }

  if (product.quantity < quantity) {
    throw new Error('Insufficient stock')
  }

  const totalPrice = product.price * quantity

  const order = new Order({
    email,
    product: productId,
    quantity,
    totalPrice,
  })

  await order.save()

  product.quantity -= quantity
  if (product.quantity === 0) {
    product.inStock = false
  }
  await product.save()

  return order
}

export const calculateRevenue = async (): Promise<number> => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ])

  return revenue[0]?.totalRevenue || 0
}
