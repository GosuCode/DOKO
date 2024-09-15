import DisplayImage from "../display-image";

function ProductImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
      <div className="relative h-96">
        {/* <CldImage
          src={image}
          alt={name}
          className="transform duration-500 ease-in-out hover:scale-105"
        />  */}
        <DisplayImage public_id={image} alt={name} />
      </div>
    </div>
  );
}

export default ProductImage;
