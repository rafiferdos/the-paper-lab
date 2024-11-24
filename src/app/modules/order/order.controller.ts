import { Request, Response, NextFunction } from 'express'
import Order from '../order.model'
import Product from '../product.model'
import { IOrder } from './order.interface'
import { createOrderSchema } from './order.validation'
import { ZodError } from 'zod'

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createOrderSchema.parse(req.body)
    const { email, product: productId, quantity } = validatedData

    const product = await Product.findById(productId)
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
      return
    }

    if (product.quantity < quantity) {
      res.status(400).json({
        message: 'Insufficient stock',
        success: false,
        error: 'Insufficient stock',
        stack: new Error().stack,
      })
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

    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors,
        stack: error.stack,
      })
    } else {
      next(error)
    }
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
      data: {
        totalRevenue: revenue[0]?.totalRevenue || 0,
      },
    })
  } catch (error) {
    next(error)
  }
}