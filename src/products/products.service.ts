import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModule } from './products.module';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.ProductModel({
      title: title,
      description: description,
      price,
    });
    const result = await newProduct.save();
    // console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.ProductModel.find().exec();
    //  console.log(result);
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    };
  }


  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }


 async deleteProduct(prodId: string) {
   const result = await this.ProductModel.deleteOne({_id: prodId}).exec();
   if (result.deletedCount === 0){
    throw new NotFoundException('could not find product');
   }
   console.log(result);
   
  }


  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.ProductModel.findById(id) ;
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
      if (!product) {
        throw new NotFoundException('Could not find product');
      }
      return product;
    }
  }

