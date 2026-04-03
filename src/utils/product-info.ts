interface Product {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
  currency?: string;
}

interface Order {
  transaction_id?: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: Product[];
}


export const OG_PRICE = 99;
export const DISCOUNTED_PRICE = 99;
export const WEBINAR_NAME = "Deepak Choudhary Digital Wealth Domination Masterclass (ADX-FB)";
export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
export const RAZORPAY_PRODUCT_NAME="Digital Wealth Domination Masterclass"
export const RAZORPAY_DESCRIPTION=`${RAZORPAY_PRODUCT_NAME} from ${WEBINAR_NAME}`


export const PRODUCT : Product = {
    item_id : 'Digital Wealth Domination Masterclass',
    item_name : WEBINAR_NAME,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE,
    quantity : 1,
    currency: CURRENCY,

}

export const GA_PRODUCT : Product = {
    item_id : 'Digital Wealth Domination Masterclass GA',
    item_name : `${WEBINAR_NAME} GA`,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE,
    quantity : 1,
    currency: CURRENCY,

}


export const ORDER : Order = {
    value: DISCOUNTED_PRICE,
    currency: CURRENCY,
    items: [PRODUCT],
}
export const GA_ORDER : Order = {
    value: DISCOUNTED_PRICE,
    currency: CURRENCY,
    items: [GA_PRODUCT],
}