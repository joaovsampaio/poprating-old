import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

type StarRatingProps = {
  setStarRating: (rating: number) => void;
  postRating?: number;
};

export const StarRating = ({ setStarRating, postRating }: StarRatingProps) => {
  const [rating, setRating] = useState(postRating || 0);
  const [hover, setHover] = useState(0);

  useEffect(() => setStarRating(rating), [rating, setStarRating]);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating)
                ? "text-purple-600"
                : "text-purple-300 dark:text-purple-200"
            }
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
            }}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>
              <StarIcon className="h-6 w-6" />
            </span>
          </button>
        );
      })}
      <p className="text-slate-400 max-lg:hidden">
        Clique duplo na estrela zera
      </p>
      <button
        type="button"
        onClick={() => {
          setRating(0);
          setHover(0);
        }}
        className="text-slate-400 block lg:hidden"
      >
        Zerar Estrelas
      </button>
    </div>
  );
};

type StarPost = {
  getRating: number;
};

export const StarPost = ({ getRating }: StarPost) => {
  const [rating, setRating] = useState(0);
  const hover = 0;

  useEffect(() => setRating(getRating), [getRating]);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div
            key={index}
            className={
              index <= (hover || rating)
                ? "text-purple-600"
                : "text-purple-300 dark:text-purple-200"
            }
          >
            <span>
              <StarIcon className="h-6 w-6" />
            </span>
          </div>
        );
      })}
    </div>
  );
};
