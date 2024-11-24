import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  email: string
  product: mongoose.Types.ObjectId
  quantity: number
  totalPrice: number
}

const orderSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IOrder>('Order', orderSchema)