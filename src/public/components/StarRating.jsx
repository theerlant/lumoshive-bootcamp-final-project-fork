import { StarHalfIcon, StarIcon } from "lucide-react";

export const StarRating = ({ rating = 3.6 }) => {
  const fullStar = Math.floor(rating);
  const shouldHalfStar = rating - fullStar > 0.5;

  return (
    <div className="relative">
      <div className="flex gap-0.25">
        {/* Empty Stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="text-transparent fill-black/25" />
        ))}
      </div>
      <div className="absolute top-0 left-0 z-10 flex gap-0.25">
        {Array.from({ length: fullStar }).map((_, i) => (
          <StarIcon key={i} className="text-transparent fill-[#FFAD33]" />
        ))}
        {shouldHalfStar ? (
          <StarHalfIcon className="text-transparent fill-[#FFAD33]" />
        ) : null}
      </div>
    </div>
  );
};
