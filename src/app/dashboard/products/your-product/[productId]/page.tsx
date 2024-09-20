import { ANProduct } from "@/db/schema";
import { getSingleProductAction } from "../actions";

import EditProduct from "@/components/edit-product";

type EditProductPageProps = {
  params: { productId: number };
};
const EditProductPage = async ({
  params: { productId },
}: EditProductPageProps) => {
  const product = await getSingleProductAction(productId);

  return (
    <div className="container">
      <EditProduct productId={productId} product={product[0] as ANProduct} />
    </div>
  );
};

export default EditProductPage;
