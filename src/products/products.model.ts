import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  Item_Name: {type: String, required: true},
  Item_description: {type: String, required: true},
  Item_price:{type: Number, required: true}
});

export interface Product extends mongoose.Document {
     id: string,
     title: string,
     description: string,
     price: number,
}
