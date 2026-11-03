import { Product, FragranceOption, ColorOption, FragranceMode } from '../types';

export const FRAGRANCES: FragranceOption[] = [
  { id: 'vanilla', name: 'Warm Vanilla', description: 'Sweet, buttery, comforting bakery note with subtle caramel hints.', notes: 'Vanilla Bean, Cream, Brown Sugar', badge: 'Best Loved' },
  { id: 'english-rose', name: 'English Rose', description: 'Fresh morning garden dew with soft, romantic blooming rose petals.', notes: 'Damask Rose, Dewy Greens, Musk' },
  { id: 'lavender', name: 'Calming Lavender', description: 'Soothing French lavender blossoms for peaceful sleep and relaxation.', notes: 'French Lavender, Bergamot, Clary Sage', badge: 'Relaxing' },
  { id: 'coffee', name: 'Morning Espresso', description: 'Rich dark roasted coffee beans with dark cocoa and toasted hazelnut.', notes: 'Arabica Coffee, Roasted Cocoa, Nutmeg' },
  { id: 'lemongrass', name: 'Fresh Lemongrass', description: 'Crisp, uplifting zesty citrus that revitalizes and clears room odors.', notes: 'Lemongrass, Lime Zest, Eucalyptus' },
  { id: 'sandalwood', name: 'Mysore Sandalwood', description: 'Earthy, velvety, meditative Indian sandalwood with sacred warmth.', notes: 'Sandalwood, Amber, Cedar' },
  { id: 'jasmine', name: 'Night Jasmine (Mogra)', description: 'Exquisite white floral blossoms with sweet, divine Indian summer aroma.', notes: 'Indian Mogra, Honeysuckle, White Florals' },
  { id: 'mandarin-orange', name: 'Mandarin Orange', description: 'Bright, juicy sun-kissed citrus bursting with positive energy.', notes: 'Mandarin, Tangerine, Orange Blossom' },
  { id: 'ladoo', name: 'Motichoor Ladoo', description: 'Festive pure desi ghee, golden besan pearls, cardamom, and saffron notes.', notes: 'Desi Ghee, Roasted Besan, Cardamom, Saffron', badge: 'Festive Exclusive' },
];

export const COLORS: ColorOption[] = [
  { id: 'cream', name: 'Classic Cream / Ivory', hex: '#FDFBF7' },
  { id: 'blush-pink', name: 'Blush Pink', hex: '#F7C5D1' },
  { id: 'tangy-orange', name: 'Tangy Orange (Ladoo)', hex: '#FF7F11' },
  { id: 'sunshine-yellow', name: 'Sunshine Yellow', hex: '#FFD166' },
  { id: 'rose-red', name: 'Ruby Rose Red', hex: '#D62246' },
  { id: 'lilac-violet', name: 'Lilac Violet', hex: '#B892FF' },
  { id: 'sky-blue', name: 'Pastel Baby Blue', hex: '#A0C4FF' },
  { id: 'mint-green', name: 'Mint Green', hex: '#B7E4C7' },
  { id: 'magenta', name: 'Warm Magenta', hex: '#D81159' },
  { id: 'cocoa-brown', name: 'Cocoa Brown', hex: '#583101' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'delulu',
    slug: 'delulu',
    name: 'DELULU',
    tagline: 'Signature Luxury Tumbler Jar Candle',
    category: 'jar',
    categoryLabel: 'Jar Candles',
    basePrice: 199,
    hasPriceRange: true,
    minPrice: 199,
    maxPrice: 249,
    description: 'Our flagship clear glass tumbler candle hand-poured with 100% natural soy wax and adorned with the signature Honeywick pastel emblem.',
    longDescription: 'DELULU is crafted for your cozy evenings, deep reading sessions, or weekend self-care rituals. Poured into a heavy thermal tumbler with an organic cotton wick, it casts a soft, mesmerizing glow while gently releasing clean, non-toxic aromas that fill your room without overwhelming the senses.',
    images: [
      '/images/products/delulu-hero-lit.jpeg',
      '/images/products/delulu-unlit.jpeg',
      '/images/products/honeywick-packaging.jpeg'
    ],
    has3DModel: true,
    default3DType: 'jar',
    availablePacks: ['Single'],
    fragranceModes: ['without_fragrance', 'with_fragrance'],
    availableColors: [
      { id: 'cream', name: 'Natural Soy Cream', hex: '#FFF8F0' },
      { id: 'blush-pink', name: 'Blush Rose', hex: '#F7C5D1' },
      { id: 'soft-honey', name: 'Honey Glow', hex: '#F9DE9C' },
      { id: 'lavender', name: 'Lavender Mist', hex: '#E2D9F3' }
    ],
    variants: [
      { pack: 'Single', fragranceMode: 'without_fragrance', price: 199 },
      { pack: 'Single', fragranceMode: 'with_fragrance', price: 249 }
    ],
    burnTime: '35 - 40 hours',
    waxType: '100% Natural Organic Soy Wax',
    weight: '200g (7.0 oz)',
    dimensions: '8.0 cm (H) x 7.5 cm (W)',
    careTips: [
      'Allow wax to melt to the edge on first burn (2-3 hours) to prevent tunneling.',
      'Trim the cotton wick to 1/4 inch before relighting.',
      'Keep away from direct drafts, open windows, pets, and children.',
      'Repurpose the premium glass tumbler once wax is depleted.'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'golu-glow',
    slug: 'golu-glow',
    name: 'GOLU GLOW',
    tagline: 'Festive Motichoor Ladoo Candle with Silver Vark',
    category: 'festive',
    categoryLabel: 'Festive Candles',
    basePrice: 79,
    hasPriceRange: true,
    minPrice: 79,
    maxPrice: 119,
    description: 'An artisanal Indian festive tribute candle sculpted into a delicious Motichoor Ladoo with silver vark flakes and authentic aromas.',
    longDescription: 'Nothing whispers celebration and warmth like Golu Glow. Modeled after traditional Indian Motichoor ladoos with intricate sphere bead textures and genuine edible-grade silver vark highlights. Light it on your puja thali, diwali dinner table, or present it as thoughtful festive mithai favors.',
    images: [
      '/images/products/golu-glow-thali.jpeg',
      '/images/products/golu-glow-lit.jpeg',
      '/images/products/custom-favors.jpeg'
    ],
    has3DModel: true,
    default3DType: 'bubble',
    availablePacks: ['Single', 'Set of 2'],
    fragranceModes: ['without_fragrance', 'ladoo', 'with_fragrance'],
    availableColors: [
      { id: 'tangy-orange', name: 'Kesari Ladoo Orange', hex: '#FF7F11' },
      { id: 'sunshine-yellow', name: 'Motichoor Gold', hex: '#FFD166' },
      { id: 'rose-red', name: 'Pooja Red', hex: '#D62246' },
      { id: 'cream', name: 'Kaju Katli Cream', hex: '#FFF8F0' }
    ],
    variants: [
      { pack: 'Single', fragranceMode: 'without_fragrance', price: 79 },
      { pack: 'Single', fragranceMode: 'ladoo', price: 99 },
      { pack: 'Single', fragranceMode: 'with_fragrance', price: 89 },
      { pack: 'Set of 2', fragranceMode: 'without_fragrance', price: 99 },
      { pack: 'Set of 2', fragranceMode: 'ladoo', price: 119 },
      { pack: 'Set of 2', fragranceMode: 'with_fragrance', price: 109 }
    ],
    burnTime: '4 - 5 hours per ladoo',
    waxType: 'Soy-Paraffin artisan decorative blend for structural detail',
    weight: '85g per piece',
    dimensions: '5.5 cm diameter',
    careTips: [
      'Always place on heat-resistant thali or candle coaster before lighting.',
      'The decorative side wax drips naturally like sacred ghee lamps.',
      'Store in a cool dry space away from direct sunlight to preserve colors.'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'bloom-baby',
    slug: 'bloom-baby',
    name: 'BLOOM BABY',
    tagline: 'Sculptural Peony Blossom Candle',
    category: 'floral',
    categoryLabel: 'Floral Candles',
    basePrice: 99,
    hasPriceRange: true,
    minPrice: 99,
    maxPrice: 199,
    description: 'A botanical masterpiece sculpted with dozens of delicate, textured blooming flower petals that illuminate like an ethereal garden.',
    longDescription: 'Bloom Baby captures the ephemeral beauty of fresh blossoming peonies. Every petal is textured to mimic real floral petals. Whether placed unlit on a stack of art books or glowing softly on your dresser, it fills the air with visual poetry and romantic warmth.',
    images: [
      '/images/products/bloom-baby-duo.jpeg',
      '/images/products/bloom-baby-lit.jpeg',
      '/images/products/honeywick-packaging.jpeg'
    ],
    has3DModel: false,
    availablePacks: ['Single', 'Set of 2'],
    fragranceModes: ['without_fragrance', 'with_fragrance'],
    availableColors: [
      { id: 'lilac-violet', name: 'Wild Lilac', hex: '#B892FF' },
      { id: 'rose-red', name: 'Crimson Peony', hex: '#D62246' },
      { id: 'blush-pink', name: 'Soft Sakura Pink', hex: '#F7C5D1' },
      { id: 'cream', name: 'Alabaster White', hex: '#FFF8F0' },
      { id: 'mint-green', name: 'Dewy Sage', hex: '#B7E4C7' }
    ],
    variants: [
      { pack: 'Single', fragranceMode: 'without_fragrance', price: 99 },
      { pack: 'Single', fragranceMode: 'with_fragrance', price: 119 },
      { pack: 'Set of 2', fragranceMode: 'without_fragrance', price: 169 },
      { pack: 'Set of 2', fragranceMode: 'with_fragrance', price: 199 }
    ],
    burnTime: '8 - 10 hours',
    waxType: 'Natural botanical soy blend',
    weight: '120g per piece',
    dimensions: '7.5 cm (W) x 5.0 cm (H)',
    careTips: [
      'Burn on a rimmed ceramic dish to catch melting floral petals.',
      'Snuff out flame rather than blowing to preserve petal contours.',
      'Looks equally breathtaking as permanent home sculpture.'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'bubble-gum',
    slug: 'bubble-gum',
    name: 'BUBBLE GUM',
    tagline: 'Modern Geometric Cube Bubble Candle',
    category: 'bubble',
    categoryLabel: 'Bubble Candles',
    basePrice: 219,
    hasPriceRange: false,
    minPrice: 219,
    maxPrice: 219,
    description: 'The contemporary 27-sphere Scandinavian bubble cube candle in dreamy pastels, blending playful pop aesthetics with calming aromas.',
    longDescription: 'Bubble Gum is the design icon of modern home decor. Composed of 27 smooth spheres unified into a chic cube, it adds instant playful character and cozy Scandinavian warmth to bedside tables, work desks, and photo flat-lays.',
    images: [
      '/images/products/bubble-gum-pastels.jpeg',
      '/images/products/honeywick-packaging.jpeg'
    ],
    has3DModel: true,
    default3DType: 'bubble',
    availablePacks: ['Single'],
    fragranceModes: ['with_fragrance'],
    availableColors: [
      { id: 'blush-pink', name: 'Bubblegum Pink', hex: '#F7C5D1' },
      { id: 'sky-blue', name: 'Pastel Baby Blue', hex: '#A0C4FF' },
      { id: 'cream', name: 'Milky White', hex: '#FFF8F0' },
      { id: 'lilac-violet', name: 'Pastel Lavender', hex: '#B892FF' },
      { id: 'sunshine-yellow', name: 'Buttercup Yellow', hex: '#FFD166' }
    ],
    variants: [
      { pack: 'Single', fragranceMode: 'with_fragrance', price: 219 }
    ],
    burnTime: '12 - 15 hours',
    waxType: '100% Premium Soy Wax',
    weight: '150g',
    dimensions: '6.0 cm x 6.0 cm x 6.0 cm',
    careTips: [
      'Place on a flat ceramic coaster or marble tray before lighting.',
      'Allow outer bubbles to soften slowly for a whimsical melting effect.',
      'Trim wick to 5mm before every burn.'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'boba-baby',
    slug: 'boba-baby',
    name: 'BOBA BABY',
    tagline: 'Artisanal Bubble Candle with Hand-Painted Hearts',
    category: 'bubble',
    categoryLabel: 'Bubble Candles',
    basePrice: 249,
    hasPriceRange: false,
    minPrice: 249,
    maxPrice: 249,
    description: 'A romantic off-white bubble cube candle hand-decorated with dainty painted ruby red love hearts on each sphere.',
    longDescription: 'Boba Baby is pure sweetness poured into wax. Each individual bubble is carefully hand-stamped and painted with petite ruby hearts. Created as an affectionate gift for anniversaries, Valentine’s, best friends, or to remind yourself of love and joy daily.',
    images: [
      '/images/products/boba-baby-hearts.jpeg',
      '/images/products/honeywick-packaging.jpeg'
    ],
    has3DModel: true,
    default3DType: 'bubble',
    availablePacks: ['Single'],
    fragranceModes: ['with_fragrance'],
    availableColors: [
      { id: 'cream', name: 'Ivory Cream with Ruby Hearts', hex: '#FFF8F0' }
    ],
    variants: [
      { pack: 'Single', fragranceMode: 'with_fragrance', price: 249 }
    ],
    burnTime: '12 - 15 hours',
    waxType: '100% Organic Soy Wax with Eco-friendly Mineral Pigments',
    weight: '155g',
    dimensions: '6.0 cm x 6.0 cm x 6.0 cm',
    careTips: [
      'Keep away from high heat sources to preserve the delicate hand-painted hearts.',
      'Always burn atop a heatproof candle dish.',
      'A beloved gifting favorite for birthdays, anniversaries, and bridal showers.'
    ],
    inStock: true,
    featured: true
  }
];

export const COLLECTIONS = [
  {
    id: 'all',
    slug: 'all',
    title: 'All Candles',
    count: 5,
    description: 'Explore the complete Honeywick hand-poured artisanal candle collection.'
  },
  {
    id: 'jar',
    slug: 'jar',
    title: 'Jar Candles',
    count: 1,
    tagline: 'Long burn time & ambient glass tumbler glow',
    image: '/images/products/delulu-hero-lit.jpeg',
    description: 'Classic clear tumbler glass jars featuring high scent throw and cozy, soothing radiance.'
  },
  {
    id: 'floral',
    slug: 'floral',
    title: 'Floral Botanical',
    count: 1,
    tagline: 'Hand-sculpted petals that bloom in light',
    image: '/images/products/bloom-baby-duo.jpeg',
    description: 'Intricately molded peony and floral sculptural candles that double as statement home decor.'
  },
  {
    id: 'bubble',
    slug: 'bubble',
    title: 'Bubble Cubes',
    count: 2,
    tagline: 'Playful Scandinavian aesthetic decor',
    image: '/images/products/bubble-gum-pastels.jpeg',
    description: 'Whimsical 27-sphere bubble candles in dreamy pastels and hand-painted romantic hearts.'
  },
  {
    id: 'festive',
    slug: 'festive',
    title: 'Festive & Favors',
    count: 1,
    tagline: 'Motichoor ladoos & celebration specials',
    image: '/images/products/golu-glow-thali.jpeg',
    description: 'Handcrafted celebratory candles honoring Indian traditions, puja warmth, and sweet milestones.'
  }
];

/**
 * Calculates exact catalogue price according to PRD & TRD matrix
 */
export function calculateVariantPrice(
  product: Product,
  pack: 'Single' | 'Set of 2',
  fragranceMode: FragranceMode
): number {
  const match = product.variants.find(
    v => v.pack === pack && v.fragranceMode === fragranceMode
  );
  if (match) return match.price;

  // Fallback to closest match or base price
  const packMatch = product.variants.find(v => v.pack === pack);
  if (packMatch) return packMatch.price;

  return product.basePrice;
}
