import { database } from "@/db/database";
import { products } from "@/db/schema";

export default async function Home() {
  const allProducts = await database.select().from(products);

  return (
    <section>
      {allProducts.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </section>
  );
}
