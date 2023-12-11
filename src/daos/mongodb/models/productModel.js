import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  // _id: String,
  name: { type: String, required: true, index: true },
  description: { type: String },
  category: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  owner: { type: String, default: 'admin' },
  status: { type: Boolean, default: true, required: true },

});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model("products", productSchema);
