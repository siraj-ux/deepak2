import { trackAddToCart } from "@/utils/gtm";
import { CURRENCY_SYMBOL, OG_PRICE, DISCOUNTED_PRICE, PRODUCT } from "@/utils/product-info";

interface AddToCartButtonProps {
  ogPrice?: string;
  price?: string;
  label?: React.ReactNode; // Updated to allow strings or Icons/Spinners
  ctaLocation?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit"; // Added to support form submission
  disabled?: boolean; // Added to support loading states
}

const AddToCartButton = ({
  label = "Book Your Seat",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: AddToCartButtonProps) => {

  const handleClick = () => {
    // This triggers the GTM tracking logic you already have
    trackAddToCart(PRODUCT);
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        font-heading font-bold transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default AddToCartButton;