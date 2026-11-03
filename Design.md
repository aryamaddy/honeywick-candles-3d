# Design — Honeywick Candles 3D Storefront

> Design Direction & UI/UX Specification | Version 1.0 | 02 November 2026
> Language: Hinglish | Status: Proposed direction

## 1. Overall look and feel

**Creative concept: “A little glow, a lot of feeling.”**

Website ek cozy candle boutique jaisi feel karegi: creamy background, blush pink accents, deep berry buttons, warm photography aur elegant editorial typography. Honeywick ke existing pink logo aur real photos se identity niklegi.

Visual balance: spacious layout + cute product shapes + ek focused interactive 3D moment. Shopping controls hamesha clear aur immediately usable rahenge.

**Keywords:** Warm, playful, intimate, giftable, tactile, approachable premium.

## 2. Brand foundations

- Name: **Honeywick Candles**.
- Primary catalogue line: **Your Daily Dose of Glow**.
- Logo: Existing Honeywick mark retain hoga; clean SVG/transparent source preferred.
- Voice: Friendly, short aur comforting. Product names catalogue jaise rahenge.
- Proposed storefront language: Simple English; Hinglish localisation later owner preference par.
- Copy examples: `Find your little glow`, `Made for your cozy corners`, `Gifts with a personal touch`.
- Burn hours, wax composition, organic/non-toxic claims aur customer ratings verified data ke baad hi show honge.

## 3. Colour system

Ye proposed digital tokens hain; exact logo colour sampling aur contrast checks implementation mein honge.

| Token | Hex | Usage |
| --- | --- | --- |
| `cream` | `#FFF8F0` | Main page background |
| `surface` | `#FFFFFF` | Forms, cards, product panels |
| `blush` | `#F5D6DC` | Section tints aur selected soft surfaces |
| `rose` | `#D87591` | Decorative detail, non-text accents |
| `berry` | `#8E2949` | Primary buttons, active links, selected borders |
| `cocoa` | `#34231F` | Headings aur main body text |
| `muted` | `#715E57` | Secondary copy |
| `honey` | `#E7AA51` | Flame-inspired illustration highlights |
| `border` | `#DCCBC3` | Decorative dividers; input outlines may need darker contrast |
| `success` | `#2F654B` | Success message text/icon |
| `error` | `#A12B36` | Validation error text/icon |

Primary CTA: berry fill + white text. Cream/blush panels par cocoa text. Pale pink/gold ko small-text colour nahi banayenge. Selected/error states text/icon/border se bhi communicate honge, sirf colour se nahi.

## 4. Typography, spacing aur shape

| Element | Proposed choice |
| --- | --- |
| Display/headings | Cormorant Garamond, medium/semibold |
| Body, forms, navigation | Manrope, regular/medium |
| Hero title | Desktop 64–80 px; mobile 40–48 px; fluid sizing |
| Section title | Desktop 36–48 px; mobile 28–34 px |
| Body copy | 16 px minimum, approximately 1.6 line-height |
| UI labels | 14–16 px; compact but readable |
| Content max width | Approximately 1280 px |
| Desktop grid | 12 columns, 24 px gap |
| Mobile padding | 16–20 px |
| Section spacing | Desktop 80–112 px; mobile 48–64 px |
| Card radius | 16–20 px |
| Button/input radius | 10–12 px; filter pills fully rounded |

Fonts self-host/subset honge, fallback fonts aur `font-display: swap` use hoga. Script typography existing logo/decorative signature tak limited rahegi.

## 5. Homepage structure

### Desktop wireframe

```text
┌──────────────────────────────────────────────────────────────┐
│ Optional owner-approved announcement                         │
│ LOGO       Shop  Collections  Custom Gifting  About    Bag(0) │
├───────────────────────────┬──────────────────────────────────┤
│ Your Daily Dose of Glow   │                                  │
│ A little glow.            │     Interactive DELULU jar        │
│ A softer space.           │     Soft shadow + warm halo      │
│ Short supporting copy     │                                  │
│ [Shop Candles]            │     [Light the mood]              │
│ [Explore Custom Gifting]  │     Drag to explore               │
├───────────────────────────┴──────────────────────────────────┤
│ Shop by shape: Jar / Floral / Bubble / Festive                │
│ Meet Your Next Glow: real-photo product cards                │
│ Gifting split panel: packaging photo + enquiry CTA           │
│ Find Your Fragrance: approved scent chips                    │
│ Our Story: short Honeywick introduction                      │
│ Footer: contact / care / policies / Instagram                │
└──────────────────────────────────────────────────────────────┘
```

### Hero details

- Approximately 45% text / 55% product stage on desktop.
- Soft cream-to-blush radial background, subtle candle pedestal/shadow.
- Existing tagline above large title; one short paragraph below.
- Main CTA `Shop Candles`; secondary link `Explore Custom Gifting`.
- Product-specific `Shop DELULU` link stage ke paas accessible hoga.
- Initial visual real DELULU poster hoga; model ready hote hi smooth reveal.
- Approximate geometry par small `Illustrative 3D preview` caption; real photo gallery link visible.
- No artificial bestseller label, urgency timer ya invented discount.

### Mobile homepage

Compact header → Hero title/copy → Main CTA → Product stage → Collection tiles → Product grid → Gifting/story → Footer.

Stage approximately 280–340 px high hoga, final device layout ke hisaab se. Hero CTA dekhne ke liye customer ko 3D load ka wait nahi karna padega.

## 6. Shop aur product-card design

- Desktop: 3-column product grid, filters sidebar ya compact filter row.
- Mobile: 2-column grid, Filter/Sort buttons bottom-sheet open karenge.
- Five products ke initial catalogue mein unnecessary pagination nahi; future growth ke liye support ready.
- Product image 4:5 frame; logo, wick aur main candle silhouette crop nahi honge.
- Card: image → name → short type label → price / `From ₹…` → `Choose Options`.
- Options required hone par direct ambiguous Add-to-Bag button nahi dikhayenge.
- Hover par optional alternate real photo; touch par hover dependency nahi.
- Approved sellable colours hi swatches mein; more colours ka count readable hoga.
- Results count, applied-filter chips, `Clear all` aur useful no-results message available honge.

## 7. Product detail page

### Desktop layout

```text
Breadcrumb
┌────────────────────────────────┬────────────────────────────┐
│ Main real product photo        │ Product name               │
│                                │ Selected price             │
│ Gallery thumbnails             │ Short approved description │
│ [Photos] [3D, if available]     │ Pack: [Single] [Set of 2]   │
│                                │ Fragrance mode + scent      │
│                                │ Colour swatches + names     │
│                                │ Quantity / Availability     │
│                                │ [Add to Bag]                │
│                                │ Shipping/policy summary     │
└────────────────────────────────┴────────────────────────────┘
Details / Candle Care / Shipping & Returns
Related products
```

- Photos default tab hoga. Matching approved 3D asset available ho tabhi 3D tab dikhega.
- Pack, fragrance mode, scent aur colour ke required controls clearly labelled honge.
- Unscented select karne par named-fragrance control remove/reset hoga.
- GOLU GLOW ka ladoo option standard-fragrance tier se visually clear rahega.
- Selected price update screen readers ko announce hoga; layout jump nahi karega.
- Set photo ke paas actual pack label hoga; single variant ko image ki wajah se set na samjhein.
- Mobile: swipeable gallery, details below, bottom sticky Add-to-Bag with selected price.
- Incomplete option par CTA correct field tak guide karega; unavailable SKU par `Out of stock` reason milega.
- Decorative 3D flame toggle ke paas UI controls honge; scene ko operate karna purchase ke liye required nahi.

## 8. Cart, checkout aur order status

### Cart

- Desktop side drawer + accessible full `/cart` page; mobile par full-width view.
- Har line: photo, product, colour, fragrance, pack size, pack quantity, price aur remove.
- Set-of-2 line example: `1 pack · 2 candles`; cart quantity control packs update karega.
- Subtotal ke neeche shipping/tax pending ho toh clear note; checkout quote ke baad exact breakdown.
- Empty state: `Your bag needs a little glow` + `Explore Candles`.
- Cart update aur Add-to-Bag success small toast/live region se communicate honge.

### Checkout

- Minimal header aur guest-first flow; account creation mandatory nahi.
- Desktop address/contact form + side order summary; mobile stacked form + collapsible summary with total visible.
- Fields: email, full name, phone, address, optional address line, city, state aur pincode.
- Pincode check ke baad serviceability, shipping charge aur approved delivery estimate show hoga.
- Provider payment open hone se pehle exact payable total visible hoga.
- Main action `Pay ₹[total]`; processing par clear loading aur duplicate-click prevention.
- Errors field ke paas + top summary mein; entered data retry par preserve rahega.

### Order status screens

- Verified paid: reference number, summary, email confirmation aur next steps.
- Pending: `We're checking your payment` + status refresh guidance.
- Failed: helpful reason when available + retry without duplicate charge/order assumptions.
- Shipped: owner-entered courier/tracking link where available.
- Refund pending/refunded: actual verified state aur relevant next step.

## 9. Custom gifting page

Top: Packaging/lifestyle photo + `Little candles. Personal stories.`

Services: Wedding favours, birthday/baby-shower stickers, reference-based packaging aur custom-design enquiries. Specific MOQ, extra charges aur turnaround tabhi mention honge jab owner provide karega.

Form fields:

- Name, email aur phone.
- Occasion, approximate quantity aur required date.
- Preferred candle/design, packaging idea aur message.
- Optional JPEG/PNG/WebP reference, maximum 5 MB.
- Required privacy acknowledgement with linked policy.

Submit CTA: `Request a Custom Quote`. Success screen enquiry ID show karegi. Photo attach karne se direct custom order confirmed nahi hoga; owner follow-up aur quote process explain hoga.

## 10. Supplied photos ka usage map

Neeche filenames workspace root ke relative hain. Names original hi rakhe gaye hain taaki source mapping clear ho.

| Source file | Photo content | Proposed placement |
| --- | --- | --- |
| `WhatsApp Image 2026-10-30 at 21.50.29.jpeg` | GOLU GLOW pair, unlit | Product gallery, festive collection |
| `WhatsApp Image 2026-10-30 at 21.50.30.jpeg` | GOLU GLOW pair, lit | Alternate gallery, festive storytelling |
| `WhatsApp Image 2026-10-30 at 21.50.30 (1).jpeg` | Red/violet BLOOM BABY, unlit | Product gallery, floral collection |
| `WhatsApp Image 2026-10-30 at 21.50.30 (2).jpeg` | Red/violet BLOOM BABY, lit | Alternate gallery/lifestyle section |
| `WhatsApp Image 2026-10-30 at 21.50.31.jpeg` | DELULU jar with Honeywick label, lit | Hero poster candidate, PDP primary image |
| `WhatsApp Image 2026-10-30 at 21.50.31 (1).jpeg` | DELULU jar, unlit | Gallery, label/shape reference for 3D |
| `WhatsApp Image 2026-10-30 at 21.50.31 (2).jpeg` | Pink/blue BUBBLE GUM candles | Product card/gallery, bubble collection |
| `WhatsApp Image 2026-10-30 at 21.50.32.jpeg` | White heart-detail BOBA BABY | Product card/gallery |
| `WhatsApp Image 2026-10-30 at 21.50.32 (1).jpeg` | Honeywick branded gift boxes | Gifting banner aur packaging section |
| `WhatsApp Image 2026-10-30 at 21.50.32 (2).jpeg` | Personalised event candles | Custom gifting reference, owner-cleared crop only |

Photos appearance reference hain, colour availability list nahi. Pair/group photo pack size define nahi karti; selected SKU ka pack label authoritative hoga. Personalised photo ke names/dates public showcase mein use karne se pehle owner clearance chahiye.

### Image treatment

- Warm natural colour grading maintain; product ka actual colour materially change nahi hoga.
- Shop cards consistent crop/framing; lifestyle panels original scene ka context preserve karenge.
- Text ko busy photo par directly rakhne ke bajaye solid panel ya readable overlay.
- Source JPEG untouched; responsive exports alag folders mein.
- Informative alt text example: `Two orange Golu Glow candles on a brass tray`; decorative images ka empty alt.

## 11. 3D art direction aur motion

| Element | Visual behaviour |
| --- | --- |
| Jar | Soft glass highlights, warm cream wax, approved Honeywick label |
| Stage | Simple cream pedestal + subtle contact shadow |
| Flame | Small warm visual effect, explicit on/off control |
| Rotation | Gentle drag, sensible angle limits, reset-view button |
| Auto-motion | Optional short settle effect; no endless spinning product |
| Desktop interaction | Pointer drag; scroll wheel camera ko hijack nahi karega |
| Mobile interaction | Intentional drag, vertical page scroll preserved |
| Fallback | Same-size poster + shopping CTA, no blank loading box |

UI micro-interactions approximately 150–250 ms, section reveals 300–450 ms. Small displacement/fade only; no scroll hijacking, mandatory intro loader ya flashing flame. `prefers-reduced-motion` par entrances/parallax/auto-motion off.

3D product material aur brand label real photos ke close honge, lekin reference-inspired model ko exact dimensions/finish ka promise nahi banayenge.

## 12. Responsive behaviour

| Viewport | Layout decision |
| --- | --- |
| 320–639 px | Single-column page sections, 2-column cards where readable, mobile menu/filter sheets |
| 640–1023 px | 2-column products, flexible hero, gifting stacked/split as space allows |
| 1024 px+ | Split hero/PDP, 3-column shop grid, full navigation |

320 px par overflow ya clipped controls nahi hone chahiye; long product text ki wajah se zaroorat ho toh cards single-column ho sakte hain. Checkout controls keyboard/safe-area se overlap nahi honge. Sticky CTA footer/policy links ko cover nahi karegi.

## 13. Component aur state checklist

- Header, mobile navigation, footer, breadcrumbs aur announcement strip.
- Product card, gallery, variant selector, labelled colour swatch aur quantity stepper.
- Primary/secondary/link buttons: default, hover, focus, disabled, loading.
- Filter chips, filter sheet, sort control aur result summary.
- Cart drawer, line item, empty state, price breakdown aur checkout form.
- Toast/live region, error summary, inline validation aur confirmation panel.
- 3D viewer: poster, loading, ready, unsupported, error aur reduced-motion states.
- Enquiry upload: empty, uploading, preview, invalid, remove aur success states.
- Owner dashboard: products, inventory editing, orders/fulfilment aur enquiry-detail screens.

Owner dashboard ka visual treatment simpler hoga: clear tables, status badges, searchable orders aur explicit save feedback; storefront ki warm typography/colour tokens consistent rahengi.

## 14. Accessibility requirements

- Touch targets ideally at least 44×44 px; compact controls mein adequate spacing.
- Keyboard-visible focus, logical heading order, skip-to-content aur semantic landmarks.
- Drawer/modal focus trap, Escape-to-close aur trigger par focus return.
- Labelled form fields; placeholder label ka replacement nahi hoga.
- Colour swatches ke accessible names, selected text aur border/icon feedback.
- Canvas ke bahar accessible product description aur equivalent controls.
- Zoom 200%, screen-reader flow, reduced-motion aur portrait/landscape checks.
- Illustrated stage mein kabhi readable product price/navigation canvas-only nahi hogi.

## 15. Design handoff aur review gates

1. Colour/type/component direction review.
2. Homepage + product page desktop/mobile mockups.
3. Shop, cart, checkout aur custom-gifting layouts.
4. 3D storyboard + poster + fallback review.
5. Interactive responsive prototype aur complete error/empty/loading states.
6. Real content ke saath accessibility, image accuracy aur performance review.

Design accepted jab customer bina guidance ke product identify kare, correct pack/scent/colour choose kare, final total samjhe aur order/custom enquiry complete kar sake.

## Related documents

- [Product scope and catalogue](Prd.md)
- [Technical architecture](Trd.md)
