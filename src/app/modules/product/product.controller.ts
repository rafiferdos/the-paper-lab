import { Request, Response, NextFunction } from 'express'
import Product from '../product.model'
import { IProduct } from './product.interface'
import { createProductSchema, updateProductSchema } from './product.validation'
import { ZodError } from 'zod'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createProductSchema.parse(req.body)
    const product: IProduct = new Product(validatedData)
    await product.save()

    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: product,
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

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const query = searchTerm ? { $or: [{ name: searchTerm }, { brand: searchTerm }, { category: searchTerm }] } : {}
    const products = await Product.find(query)

    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      success: true,
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateProductSchema.parse(req.body)
    const product = await Product.findByIdAndUpdate(req.params.productId, validatedData, { new: true })
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: product,
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

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}