"use server";

import { reviews } from "@/db/schema";
import { database } from "@/db/database";
import { getRecommendations } from "./getRecommendationos";

// Fetch data from the database
export async function getData() {
  try {
    // Step 1: Query the database to get all reviews
    const data = await database.select()
      .from(reviews)
      .execute();

    // Step 2: Process the data into userRatings object
    const userRatings: Record<string, Record<number, number>> = {};

    data.forEach((entry: { userId: string, productId: number, rating: number }) => {
      if (!userRatings[entry.userId]) {
        userRatings[entry.userId] = {};
      }
      userRatings[entry.userId][entry.productId] = entry.rating;
    });

    // Example usage:
    const recommendations = getRecommendations(userRatings, 'cab84f22-93ca-4a6b-aa23-9cb6a1b901ca');
    console.log("Recommendations for 'cab84f22-93...':", recommendations);

    return recommendations;

  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw new Error("Failed to fetch recommendations.");
  }
}
