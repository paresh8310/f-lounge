/**
 * ============================================================
 * F.LOUNGE — CENTRAL CONFIGURATION (single source of truth)
 * ============================================================
 * Every business value lives here. Verified data is marked.
 * PLACEHOLDER values are clearly flagged and MUST be replaced
 * before launch — nothing unverified is presented as fact.
 *
 * Verified sources:
 *  - Justdial listing (supplied screenshot): name, category,
 *    Abbigere/Jalahalli location, 08:30–22:30 hours, 5.0/5 rating
 *    from 8 ratings.
 *  - Instagram handle: @f.lounge__ (verified handle from brief).
 *
 * HOW TO UPDATE CONTENT:
 *  - Gallery images: edit the arrays below. Each entry takes a
 *    local path (drop files into /public/media) or a full URL,
 *    plus optional post link / caption / label.
 *  - All strings here are editable without touching components.
 */

export const BUSINESS = {
  name: "F.LOUNGE",
  displayName: "F.Lounge",
  type: "Readymade Garment Retailer",
  tagline: "Your fit. Your energy.",
  locality: "Abbigere / Jalahalli",
  city: "Bengaluru",
  region: "Karnataka",
  /** PLACEHOLDER — replace with the exact verified store address. */
  addressFull: "" as string, // e.g. "Shop No. __, Main Road, Abbigere, Bengaluru 560090"
  /** PLACEHOLDER — replace with the verified phone number (display form). */
  phoneDisplay: "" as string,
  /** PLACEHOLDER — replace with the verified WhatsApp number in international format, digits only. */
  whatsappNumber: "" as string, // e.g. "919876543210"
  hoursLines: ["Open Daily", "8:30 AM – 10:30 PM"],
  /** Rating as displayed on the supplied Justdial screenshot — NOT a live rating. */
  rating: {
    value: "5.0",
    scale: "5",
    count: 8,
    source: "Justdial",
    sourceUrl: "https://www.justdial.com/Bangalore/F-Lounge-Jalahalli/080PXX80-XX80-241024200043-L4Z6_BZDET",
  },
  instagram: {
    handle: "f.lounge__",
    url: "https://www.instagram.com/f.lounge__/",
  },
  justdialUrl: "https://www.justdial.com/Bangalore/F-Lounge-Jalahalli/080PXX80-XX80-241024200043-L4Z6_BZDET",
} as const;

export const HAS_ADDRESS = BUSINESS.addressFull.trim().length > 0;
export const HAS_PHONE = BUSINESS.phoneDisplay.trim().length > 0;
export const HAS_WHATSAPP = BUSINESS.whatsappNumber.trim().length > 0;

/** WhatsApp click-to-chat. Returns a graceful null when the number is not configured yet. */
export function whatsappLink(message?: string): string | null {
  if (!HAS_WHATSAPP) return null;
  const text = message ?? WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi F.LOUNGE! I'm interested in this outfit. Could you share the available sizes, price, and more details?";

export function productEnquiryMessage(productName: string): string {
  return `Hi F.LOUNGE! I'm interested in "${productName}" from your website. Could you share the available sizes, price, and more details?`;
}

/** Maps / directions. Without a verified address we point to the Justdial listing instead of inventing a pin. */
export const MAPS_DIRECTIONS_URL = HAS_ADDRESS
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.addressFull)}`
  : BUSINESS.justdialUrl;
export const MAPS_LISTING_URL = HAS_ADDRESS
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.addressFull)}`
  : BUSINESS.justdialUrl;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Looks", href: "#looks" },
  { label: "Instagram", href: "#instagram" },
  { label: "Visit Us", href: "#visit" },
] as const;

export const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/**
 * ============================================================
 * GALLERIES — replace entries with real photographs.
 * Each `src` can be a local path under /public/media or a URL.
 * `postUrl` links the image to the original Instagram post.
 * ============================================================
 */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  label?: string;
  postUrl?: string;
  caption?: string;
}

/** Editorial lookbook — placeholder entries until real photos are supplied. */
export const LOOKBOOK: GalleryItem[] = [
  { id: "look-1", src: "/media/look-1.jpg", alt: "Lookbook look 1", label: "LOOK 01" },
  { id: "look-2", src: "/media/look-2.jpg", alt: "Lookbook look 2", label: "LOOK 02" },
  { id: "look-3", src: "/media/look-3.jpg", alt: "Lookbook look 3", label: "LOOK 03" },
  { id: "look-4", src: "/media/look-4.jpg", alt: "Lookbook look 4", label: "LOOK 04" },
  { id: "look-5", src: "/media/look-5.jpg", alt: "Lookbook look 5", label: "LOOK 05" },
  { id: "look-6", src: "/media/look-6.jpg", alt: "Lookbook look 6", label: "LOOK 06" },
];

/** Instagram gallery fallback — real post URLs to be supplied by the owner. */
export const INSTAGRAM_POSTS: GalleryItem[] = [
  { id: "ig-1", src: "/media/ig-1.jpg", alt: "F.LOUNGE on Instagram — post 1" },
  { id: "ig-2", src: "/media/ig-2.jpg", alt: "F.LOUNGE on Instagram — post 2" },
  { id: "ig-3", src: "/media/ig-3.jpg", alt: "F.LOUNGE on Instagram — post 3" },
  { id: "ig-4", src: "/media/ig-4.jpg", alt: "F.LOUNGE on Instagram — post 4" },
  { id: "ig-5", src: "/media/ig-5.jpg", alt: "F.LOUNGE on Instagram — post 5" },
  { id: "ig-6", src: "/media/ig-6.jpg", alt: "F.LOUNGE on Instagram — post 6" },
];

/** Store / experience photos — real store photos to be supplied by the owner. */
export const STORE_PHOTOS: GalleryItem[] = [
  { id: "store-1", src: "/media/store-1.jpg", alt: "Inside F.LOUNGE store" },
  { id: "store-2", src: "/media/store-2.jpg", alt: "F.LOUNGE storefront" },
  { id: "store-3", src: "/media/store-3.jpg", alt: "F.LOUNGE racks and displays" },
];

/**
 * Categories — actual merchandise categories, editable as the
 * catalogue becomes verified. Empty price/stock = never shown.
 */
export interface Category {
  id: string;
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { id: "women", name: "Women", blurb: "Kurtas, co-ords, dresses & more" },
  { id: "men", name: "Men", blurb: "Shirts, tees, trousers & more" },
  { id: "kids", name: "Kids", blurb: "Everyday fits for the little ones" },
  { id: "new", name: "New In", blurb: "The latest drops in store" },
];

/** NOTE: No prices, stock, sizes or discounts are configured — the brief
 *  forbids inventing them. Add a `products` array here when verified
 *  catalogue data is available; product WhatsApp CTAs already accept
 *  any name via productEnquiryMessage(). */

/** AI assistant backend — set to a secure server route (e.g. "/api/assistant") to enable
 *  server-side AI. Kept empty so the chat runs fully locally with verified data only. */
export const AI_ASSISTANT_ENDPOINT = "";
