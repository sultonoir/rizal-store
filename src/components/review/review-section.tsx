"use client";

import React, { useState, useCallback } from "react";
import { ReviewerProps } from "@/types";
import PaginationState from "../ui/pagination-state";
import { cn } from "@/lib/utils";
import ReviewStats from "./review-stats";
import ReviewCard from "./review-card";

interface Props {
  slug: string;
  initialData: ReviewerProps;
}

export const ReviewerSection = ({ slug, initialData }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [ratingData, setRatingData] = useState<ReviewerProps | null>(
    initialData,
  );

  // Fetch data function
  const handlePageChange = useCallback(
    async (page: number) => {
      setIsPending(true);
      try {
        const response = await fetch(`/api/rating/${slug}?page=${page}`);
        if (!response.ok) setRatingData(null);
        const data = (await response.json()) as ReviewerProps;
        document
          .getElementById("reviews")
          ?.scrollIntoView({ behavior: "smooth" });
        setRatingData(data);
      } catch (error) {
        if (error instanceof Error) setRatingData(null);
        setRatingData(null);
      } finally {
        setIsPending(false);
      }
    },
    [slug],
  );

  // Handle pagination change

  if (!ratingData) return null;

  return (
    <div
      id="reviews"
      className={cn("scroll-mt-28 bg-background", {
        "min-h-fit": ratingData.pagination.pages <= 7,
      })}
    >
      <div className="relative w-full">
        <h1 className="mb-8 text-4xl font-bold">Customer Reviews</h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Review Stats */}
          <div className="order-1 mb-8 w-full flex-none lg:order-2 lg:max-w-sm">
            <ReviewStats {...ratingData.stats} />
          </div>
          {/* Review List */}
          <div
            className={cn(
              "order-2 mb-8 grid w-full gap-1 divide-y md:grid-cols-1 lg:order-1",
              {
                'opacity-50' : isPending === true
              }
            )}
          >
            {ratingData.ratings.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.user.name}
                value={review.value}
                image={review.user.image}
                message={review.message}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <PaginationState
          currentPage={ratingData.pagination.current}
          totalPages={ratingData.pagination.pages}
          onPageChange={handlePageChange}
          siblingsCount={1}
        />
      </div>
    </div>
  );
};
