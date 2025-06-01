"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [notHelpfulReviews, setNotHelpfulReviews] = useState<string[]>([]);

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const markReviewAsHelpful = (reviewId: string) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews((prev) => [...prev, reviewId]);
      // Remove from not helpful if it's there
      setNotHelpfulReviews((prev) => prev.filter((id) => id !== reviewId));
    }
  };

  const markReviewAsNotHelpful = (reviewId: string) => {
    if (!notHelpfulReviews.includes(reviewId)) {
      setNotHelpfulReviews((prev) => [...prev, reviewId]);
      // Remove from helpful if it's there
      setHelpfulReviews((prev) => prev.filter((id) => id !== reviewId));
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">No reviews available</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-medium">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Based on {totalReviews} reviews
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.includes(review.id);
          const isHelpful = helpfulReviews.includes(review.id);
          const isNotHelpful = notHelpfulReviews.includes(review.id);

          return (
            <div
              key={review.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{review.author}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="mt-2 font-medium">{review.title}</h3>
              <div className="mt-1">
                <p
                  className={`text-gray-600 ${
                    !isExpanded && review.content.length > 150
                      ? "line-clamp-2"
                      : ""
                  }`}
                >
                  {review.content}
                </p>
                {review.content.length > 150 && (
                  <button
                    onClick={() => toggleReviewExpansion(review.id)}
                    className="mt-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              <div className="mt-3 flex items-center space-x-4 text-sm">
                <span>Was this review helpful?</span>
                <button
                  onClick={() => markReviewAsHelpful(review.id)}
                  className={`flex items-center space-x-1 ${
                    isHelpful ? "font-medium text-green-600" : "text-gray-500"
                  }`}
                >
                  <span>Yes</span>
                  <span>({review.helpful + (isHelpful ? 1 : 0)})</span>
                </button>
                <button
                  onClick={() => markReviewAsNotHelpful(review.id)}
                  className={`flex items-center space-x-1 ${
                    isNotHelpful ? "font-medium text-red-600" : "text-gray-500"
                  }`}
                >
                  <span>No</span>
                  <span>({review.notHelpful + (isNotHelpful ? 1 : 0)})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Write a Review</Button>
      </div>
    </div>
  );
}
