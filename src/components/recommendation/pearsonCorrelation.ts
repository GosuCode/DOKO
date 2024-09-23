export function pearsonCorrelation(prefs: Record<string, Record<number, number>>, user1: string, user2: string) {
  const commonProducts: number[] = [];
  for (const product in prefs[user1]) {
      if (product in prefs[user2]) {
        commonProducts.push(Number(product)); // Convert product to number
      }
    }

    const n = commonProducts.length;
    if (n === 0) return 0; // No common products

    let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
    commonProducts.forEach(product => {
      const rating1 = prefs[user1][product];
      const rating2 = prefs[user2][product];

      sum1 += rating1;
      sum2 += rating2;

      sum1Sq += Math.pow(rating1, 2);
      sum2Sq += Math.pow(rating2, 2);

      pSum += rating1 * rating2;
    });

    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));

    if (den === 0) return 0;

    return num / den;
  }