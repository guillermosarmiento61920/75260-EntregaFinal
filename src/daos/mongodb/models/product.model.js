// product.model.js
import { Schema, model } from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// productSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', productSchema);

