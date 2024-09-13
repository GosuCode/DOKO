import DisplayImage from "@/components/display-image";
import { database } from "@/db/database";
import { products } from "@/db/schema";

export default async function Home() {
  const allProducts = await database.select().from(products);

  return (
    <section>
      {allProducts.map((product) => (
        <div key={product.id}>
          {product.name}
          <DisplayImage public_id={product.public_id} />
        </div>
      ))}
    </section>
  );
}
