export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0;
  } else {
    let totalPrice = 0;
    cart.forEach(
      (item) =>
        (totalPrice +=
          parseInt(item.quantity) * parseFloat(item.products.price))
    );
    return Math.round(totalPrice * 100) / 100;
  }
}
