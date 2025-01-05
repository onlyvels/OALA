import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface LikeButtonProps {
  count: number;
  isLiked: boolean;
  onLike: () => void;
  disabled?: boolean;
}

export function LikeButton({ count, isLiked, onLike, disabled }: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled || isLiked) return;
    
    setIsAnimating(true);
    onLike();
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-1.5 text-gray-500 transition-colors",
        isLiked ? "text-pink-600" : "hover:text-pink-600",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className="relative inline-block">
        <Heart
          className={cn(
            "w-5 h-5 transition-all duration-300 ease-out",
            isLiked && "fill-pink-600 stroke-pink-600",
            isAnimating && "animate-like-button"
          )}
        />
        {isAnimating && (
          <span className="absolute inset-0 animate-like-ping">
            <Heart className="w-5 h-5 stroke-pink-600" />
          </span>
        )}
      </span>
      <span className={cn(
        "text-sm transition-all",
        isAnimating && "animate-like-count"
      )}>
        {count}
      </span>
    </button>
  );
}