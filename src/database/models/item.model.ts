import mongoose, { Schema } from "mongoose";

interface Item {
  name: string
  price: number
  category: string
  stock: number
}

const ItemSchema: Schema = new Schema<Item>({
  name: { type: String, unique: true },
  price: { type: Number },
  category: { type: String },
  stock: { type: Number }
})

const itemModel = mongoose.model<Item>("items", ItemSchema)

export default itemModel;