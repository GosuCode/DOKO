import { ANProduct } from "@/db/schema";
import { getSingleProductAction } from "../actions";

import EditProduct from "@/components/edit-product";

type EditProductPageProps = {
  params: Promise<{ productId: string }>;
};
const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { productId } = await params;
  const product = await getSingleProductAction(parseInt(productId));

  return (
    <div className="container">
      <EditProduct
        productId={parseInt(productId)}
        product={product[0] as ANProduct}
      />
    </div>
  );
};

export default EditProductPage;
