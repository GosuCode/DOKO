import React from "react";
import {
  getRecommendationProductAction,
  getRecommendationsAction,
} from "./actions";
import { auth } from "@/auth";
import ProductCard from "@/components/product-card";

const RecommendationPage = async () => {
  const session = await auth();
  const curUser = session?.user;
  const recommendations = await getRecommendationsAction(curUser?.id ?? "");
  const recommendationProducts = await getRecommendationProductAction(
    recommendations.map((recommendation) => recommendation.product_id)
  );
  console.log("Recommended Products count", recommendationProducts.length);
  return (
    <>
      {recommendationProducts.length > 0 ? (
        <h1 className="ml-10 sm:ml-4 text-left text-2xl sm:text-4xl font-bold mt-14 underline">
          Recommendations
        </h1>
      ) : (
        ""
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 sm:space-x-2 space-y-4 mt-12">
        {recommendationProducts.map((recommendation) => (
          <div key={recommendation.id}>
            {curUser ? (
              <ProductCard product={recommendation} />
            ) : (
              "Buy products to see recommendations"
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendationPage;
