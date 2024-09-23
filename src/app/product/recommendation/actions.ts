"use server";

import { products, reviews } from "@/db/schema";
import { database } from "@/db/database";
import { inArray } from "drizzle-orm";

export async function getRecommendationsAction(userId: string) {
  const data = await database.select().from(reviews).execute();

  const userRatings: Record<string, Record<number, number>> = {};

  data.forEach((entry: { userId: string; productId: number; rating: number }) => {
    if (!userRatings[entry.userId]) {
      userRatings[entry.userId] = {};
    }
    userRatings[entry.userId][entry.productId] = entry.rating;
  });

  // console.log("User Ratings:", JSON.stringify(userRatings, null, 2));

  function pearsonCorrelation(
    prefs: Record<string, Record<number, number>>,
    user1: string,
    user2: string
  ) {
    const commonProducts: number[] = [];
    for (const product in prefs[user1]) {
      if (product in prefs[user2]) {
        commonProducts.push(Number(product));
      }
    }

    const n = commonProducts.length;
    if (n === 0) return 0;

    let sum1 = 0,
      sum2 = 0,
      sum1Sq = 0,
      sum2Sq = 0,
      pSum = 0;
    commonProducts.forEach((product) => {
      const rating1 = prefs[user1][product];
      const rating2 = prefs[user2][product];

      sum1 += rating1;
      sum2 += rating2;

      sum1Sq += Math.pow(rating1, 2);
      sum2Sq += Math.pow(rating2, 2);

      pSum += rating1 * rating2;
    });

    const num = pSum - (sum1 * sum2) / n;
    const den = Math.sqrt(
      (sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n)
    );

    if (den === 0) return 0;

    return num / den;
  }

  function getRecommendations(
    prefs: Record<string, Record<number, number>>,
    targetUser: string
  ) {
    const totals: Record<number, number> = {};
    const simSums: Record<number, number> = {};

    for (const otherUser in prefs) {
      if (otherUser === targetUser) continue;

      const similarity = pearsonCorrelation(prefs, targetUser, otherUser);
      if (similarity <= 0) continue;

      for (const product in prefs[otherUser]) {
        const productId = Number(product); 
        if (!(productId in prefs[targetUser])) {
          if (!totals[productId]) totals[productId] = 0;
          totals[productId] += prefs[otherUser][productId] * similarity;

          if (!simSums[productId]) simSums[productId] = 0;
          simSums[productId] += similarity;
        }
      }
    }
    
    const rankings = [];
    for (const product in totals) {
      rankings.push({
        product_id: Number(product),
        score: totals[product] / simSums[product],
      });
    }

    rankings.sort((a, b) => b.score - a.score);
    // console.log("Rankings:", JSON.stringify(rankings, null, 2));
    return rankings;
  }

  const recommendations = getRecommendations(
    userRatings,
    userId
  );
  // console.log(
  //   "Recommendations for '" + userId + "':",
  //   recommendations
  // );

  return recommendations;
}


export async function getRecommendationProductAction(productIds: number[]) {
  const recommendationProducts = await database
    .select()
    .from(products)
    .where(inArray(products.id, productIds));
  return recommendationProducts;
}
