import React from "react";
import { trackSubscribe } from "@/utils/gtm";
import {
  CURRENCY_SYMBOL,
  OG_PRICE,
  DISCOUNTED_PRICE,
} from "@/utils/product-info";

interface SubscribeButtonProps {
  ogPrice?: string;
  price?: string;
  label?: string;
  ctaLocation?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const SubscribeButton = ({
  ogPrice = `${CURRENCY_SYMBOL}${OG_PRICE}`,
  price = `${CURRENCY_SYMBOL}${DISCOUNTED_PRICE}`,
  label = "Book Your Seat @",
  ctaLocation = "unknown",
  href = "#checkout",
  onClick,
  className = "",
}: SubscribeButtonProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // ✅ GTM tracking
    trackSubscribe({
      label,
      ctaLocation,
      price,
    });

    // optional custom handler
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`
        inline-block text-center
        ${className || `
          w-full max-w-lg mx-auto
          bg-cta hover:bg-cta-hover
          text-cta-foreground
          rounded-full py-5 px-8
          font-heading font-bold text-xl md:text-2xl
          transition-all duration-300
          shadow-cta hover:shadow-xl
        `}
      `}
    >
      <span>{label}</span>

      
    </a>
  );
};

export default SubscribeButton;