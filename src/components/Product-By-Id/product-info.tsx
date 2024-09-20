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
        <span className="line-through text-lg text-red-500">
          Rs.{discountedPrice}
        </span>{" "}
        <br />
        <span className="text-purple-800">Rs.{price}</span>
      </div>
    </div>
  );
}

export default ProductInfo;
