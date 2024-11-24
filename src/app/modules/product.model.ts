import mongoose, { Schema } from 'mongoose'
import { IProduct, Category } from './product/product.interface'

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IProduct>('Product', productSchema)
