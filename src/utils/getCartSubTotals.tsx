import { getDiscountedPrice } from "./getDiscountedPrice";

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0;
  } else {
    let totalPrice = 0;
    cart.reduce((total, item) => {
      const itemPrice = getDiscountedPrice(item.products.price, 60);
      return total + itemPrice * item.quantity;
    }, 0);
  }
}
