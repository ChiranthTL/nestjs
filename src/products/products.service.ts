import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }
  getSingleProduct(productId: string) {
   const product = this.findProduct(productId);
    return { ...product };
  }
  updateProduct(productId: string, title: string, description: string, price: number){
    const product = this.findProduct(productId);
  }
    private findProduct(id: string) {
      const product = this.products.find((prod) => prod.id === id);
   if (!product) {
     throw new NotFoundException('Could not find product');
   }
   return product;
  }
}