import Product from '../product.model'
import { IProduct } from './product.interface'

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  const product = new Product(productData)
  await product.save()
  return product
}

export const getAllProducts = async (
  searchTerm?: string,
): Promise<IProduct[]> => {
  const query = searchTerm
    ? {
        $or: [
          { name: searchTerm },
          { brand: searchTerm },
          { category: searchTerm },
        ],
      }
    : {}
  return await Product.find(query)
}

export const getProductById = async (
  productId: string,
): Promise<IProduct | null> => {
  return await Product.findById(productId)
}

export const updateProduct = async (
  productId: string,
  updateData: Partial<IProduct>,
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true })
}

export const deleteProduct = async (
  productId: string,
): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(productId)
}
