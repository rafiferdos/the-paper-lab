// product.controller.ts
import { Request, Response, NextFunction } from 'express'
import { createProductSchema, updateProductSchema } from './product.validation'
import { ZodError } from 'zod'
import * as productService from './product.service'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createProductSchema.parse(req.body)
    const product = await productService.createProduct(validatedData)

    res.status(201).json({
      message: 'Product created successfully',
      status: true,
      data: product,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        status: false,
        error: error.errors,
        stack: error.stack,
      })
    } else {
      next(error)
    }
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const products = await productService.getAllProducts(searchTerm)

    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productService.getProductById(req.params.productId)
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        status: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = updateProductSchema.parse(req.body)
    const product = await productService.updateProduct(
      req.params.productId,
      validatedData,
    )
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        status: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: product,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        status: false,
        error: error.errors,
        stack: error.stack,
      })
    } else {
      next(error)
    }
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productService.deleteProduct(req.params.productId)
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        status: false,
        error: 'Resource not found',
        stack: new Error().stack,
      })
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
