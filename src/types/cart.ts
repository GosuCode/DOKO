import { TProduct } from "./product";

export type TCartItem = {
    id: number;
    userId: string;
    productId: number;
    quantity: number;
    subtotal: number;
    products: TProduct;
  }