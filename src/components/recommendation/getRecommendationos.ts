import { pearsonCorrelation } from "./pearsonCorrelation";

export function getRecommendations(prefs: Record<string, Record<number, number>>, targetUser: string) {
    const totals: Record<number, number> = {};
    const simSums: Record<number, number> = {};

    // Iterate over every other user in the dataset
    for (const otherUser in prefs) {
      if (otherUser === targetUser) continue;

      const similarity = pearsonCorrelation(prefs, targetUser, otherUser);
      if (similarity <= 0) continue;

      // Iterate over the other user's product ratings
      for (const product in prefs[otherUser]) {
        const productId = Number(product); // Convert product to number
        // If the target user hasn't rated this product
        if (!(productId in prefs[targetUser])) {
          if (!totals[productId]) totals[productId] = 0;
          totals[productId] += prefs[otherUser][productId] * similarity;

          if (!simSums[productId]) simSums[productId] = 0;
          simSums[productId] += similarity;
        }
      }
    }
    // Create a ranked list of recommendations
    const rankings = [];
    for (const product in totals) {
      rankings.push({ product_id: Number(product), score: totals[product] / simSums[product] });
    }

    rankings.sort((a, b) => b.score - a.score);
    return rankings;
  }