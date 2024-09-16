import { X } from "lucide-react";
import Link from "next/link";
import { getCartSubTotal } from "@/utils/getCartSubTotals";
import { ANCart } from "@/db/schema";
import DisplayImage from "../display-image";
import { Input } from "../ui/input";
import { getDiscountedPrice } from "@/utils/getDiscountedPrice";

async function CartTable({ cart }: { cart: ANCart[] }) {
  const cartItems = cart.map((item: ANCart) => ({
    ...item,
  }));
  const subtotal = getCartSubTotal(cartItems);

  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {cartItems.map((item) => (
            <tr
              key={item.id}
              className="text-sm sm:text-base text-gray-600 text-center"
            >
              <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                {/* <img
                  src="logo.svg"
                  alt={item.products.name}
                  height={64}
                  width={64}
                  className={`hidden sm:inline-flex`}
                /> */}
                <figure className="relative h-20 w-20">
                  <DisplayImage
                    public_id={item.products.image}
                    alt={item.products.name}
                  />
                </figure>
                <Link
                  href={`/products/${item.productId}`}
                  className="pt-1 hover:text-palette-dark"
                >
                  {/* {item.productTitle}, {item.variantTitle} */}
                  {item.products.name}
                </Link>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <Input
                  type="number"
                  inputMode="numeric"
                  id="variant-quantity"
                  name="variant-quantity"
                  min="1"
                  step="1"
                  max={10}
                  defaultValue={item.quantity}
                  className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                />
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                {/* <Price currency="$" num={item.variantPrice} numSize="text-lg" /> */}
                <span className="text-lg">
                  Rs.
                  {getDiscountedPrice(item.products.price, 60)}
                </span>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <button aria-label="delete-item">
                  <X className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                </button>
              </td>
            </tr>
          ))}
          {subtotal === 0 ? null : (
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <span className="text-xl">{subtotal}</span>
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
