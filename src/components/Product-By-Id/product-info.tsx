interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
  discount: number;
}

function ProductInfo({ title, price, discount }: ProductInfoProps) {
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className=" font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
        {title}
      </h1>
      <div className="text-xl text-palette-primary font-medium py-4 px-1">
        <span
          className={discount > 0 ? "line-through text-lg text-red-500" : ""}
        >
          Rs.{price}
        </span>
        <br />
        <span className="text-purple-800">
          {discount > 0 ? <span>Rs.{discountedPrice.toFixed(0)}</span> : ""}
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
