interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
}

function ProductInfo({ title, price }: ProductInfoProps) {
  return (
    <div className=" font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
        {title}
      </h1>
      <div className="text-xl text-palette-primary font-medium py-4 px-1">
        <span className="text-purple-800">Rs.{price}</span>
      </div>
    </div>
  );
}

export default ProductInfo;
