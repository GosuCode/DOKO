// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { database } from "@/db/database";
// import { products } from "@/db/schema";
// import DisplayImage from "@/components/display-image";
// import { eq } from "drizzle-orm";
// import { notFound } from "next/navigation";

// const SingleProduct = async (id: number) => {
//   const product = await database
//     .select()
//     .from(products)
//     .where(eq(products.id, id));

//   if (product === undefined) notFound();
//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>{product.name}</CardTitle>
//           <CardDescription>{product.userId}</CardDescription>
//         </CardHeader>
//         <CardContent className="relative w-full h-[160px]">
//           <DisplayImage public_id={product.image} />
//         </CardContent>
//         <CardFooter>
//           <p>{product.price}</p>
//           <p>{product.quantity}</p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SingleProduct;
