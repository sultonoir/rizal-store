import React from "react";
import { ReviewerSection } from "./review-section";
import { getReviews } from "@/server/reviews/reviews-service";

const ReviewServer = async ({ slug }: { slug: string }) => {
  const reviews = await getReviews({ slug });
  return <ReviewerSection initialData={reviews} slug={slug} />;
};

export default ReviewServer;
