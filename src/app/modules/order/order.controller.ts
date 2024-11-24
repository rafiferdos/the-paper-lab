import { Request, Response, NextFunction } from 'express'
import Order from './../order.model'
import Product from './../product.model'
import { IOrder } from './order.interface'

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, product: productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
        data: {},
      })
      return
    }

    if (product.quantity < quantity) {
      res.status(400).json({
        message: 'Insufficient stock',
        success: false,
        data: {},
      })
    }

    const totalPrice = product.price * quantity

    const order: IOrder = new Order({
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

    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

export const calculateRevenue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ])

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: revenue[0]?.totalRevenue || 0,
    })
  } catch (error) {
    next(error)
  }
}