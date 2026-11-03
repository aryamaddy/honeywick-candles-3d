# PRD — Honeywick Candles 3D E-commerce Website

> Product Requirements Document | Version 1.0 | 02 November 2026
> Language: Hinglish | Status: Planning draft, implementation-ready direction

## 1. Website ka vision

Honeywick ke liye ek warm, premium-but-approachable online store banana hai jahan customer scented aur decorative candles explore kare, fragrance/colour/pack choose kare aur easily order place kar sake. 3D experience brand ko memorable banayega; real photos product ki actual appearance samjhayengi.

**Brand:** Honeywick Candles  
**Catalogue tagline:** Your Daily Dose of Glow  
**Positioning:** Cozy spaces, cute decor, thoughtful gifts aur personalised celebration candles.

### Success ka matlab

- Visitor ko first screen par brand, product aur shopping action clear mile.
- Mobile par product discovery se checkout tak simple journey ho.
- Prices aur selected variants catalogue/business-approved data se match karein.
- Standard orders online complete hon aur custom/bulk requests owner tak pahunch sakein.
- 3D unavailable ho tab bhi poori shopping journey kaam kare.

## 2. Source material aur confirmed facts

Workspace mein `Product Catalogue..pdf` ke 6 pages aur 10 JPEG photos available hain. Catalogue mein brand, product prices, colours, fragrances, packaging aur customisation services di gayi hain. Photos mein candles, branded packaging aur personalised event candles dikh rahe hain.

### Catalogue se pricing reference

Neeche single item aur set ki alag prices hain. **Set of 2 ki price poore set ki hai, per-piece price nahi.**

| Product | Pack | Fragrance option | Catalogue price |
| --- | --- | --- | ---: |
| GOLU GLOW | Single | Without fragrance | ₹79 |
| GOLU GLOW | Single | Ladoo fragrance | ₹99 |
| GOLU GLOW | Single | Other fragrances | ₹89 |
| GOLU GLOW | Set of 2 | Without fragrance | ₹99 |
| GOLU GLOW | Set of 2 | Ladoo fragrance | ₹119 |
| GOLU GLOW | Set of 2 | Other fragrances | ₹109 |
| DELULU | Single | With fragrance | ₹249 |
| DELULU | Single | Without fragrance | ₹199 |
| BLOOM BABY | Single | With fragrance | ₹119 |
| BLOOM BABY | Single | Without fragrance | ₹99 |
| BLOOM BABY | Set of 2 | With fragrance | ₹199 |
| BLOOM BABY | Set of 2 | Without fragrance | ₹169 |
| BUBBLE GUM | Catalogue mein pack specified nahi | Fragrance inclusion unspecified | ₹219 |
| BOBA BABY | Catalogue mein pack specified nahi | Fragrance inclusion unspecified | ₹249 |

**Available fragrances, catalogue page 6:** Sandalwood, Lemongrass, Jasmine, Lavender, Mandarin Orange, Vanilla, Coffee aur English Rose. Ladoo fragrance GOLU GLOW ki pricing mein separately listed hai.

**Listed colours:** Yellow, Orange, Magenta, Green, Violet, Blue, Brown aur Red. Photos mein pink/white jaise shades bhi dikhte hain; inko automatically purchasable option nahi maana jayega. Har product ka actual colour/fragrance combination owner confirm karega.

**Custom services:** Wedding, birthday, baby shower aur special-occasion stickers; reference-based packaging; Pinterest-inspired candle requests.

**Social reference:** Catalogue mein Instagram handle `_honeywick_` diya hai; public link publish karne se pehle owner verify karega.

## 3. Target audience

| Audience | Unki need | Website ka response |
| --- | --- | --- |
| Home-decor shoppers | Room ke liye cute, aesthetic candles | Lifestyle photos, colour selection, shape collections |
| Fragrance shoppers | Preferred scent ya unscented candle | Fragrance filters aur clear selection |
| Gift buyers | Affordable, thoughtful present | Gift-ready presentation aur packaging enquiry |
| Event/bulk buyers | Personalised candles in quantity | Dedicated custom enquiry aur reference upload |

India-first, INR aur domestic shipping **planning assumptions** hain. Launch geography aur serviceable pincodes owner confirm karega. Planning documents Hinglish mein hain; storefront ki proposed copy simple English mein hogi, brand tone friendly rahegi.

## 4. MVP scope — pehla live version

### P0: Launch ke liye zaroori

1. **Home:** 3D hero, shop CTA, collection cards, featured products, gifting block aur brand story.
2. **Shop:** Saare approved products, search, price/fragrance/product-type filters, sorting aur clear empty state.
3. **Product detail:** Real gallery, price, approved options, quantity, availability, Add to Bag aur care information.
4. **3D:** Home par DELULU-inspired interactive jar candle; selected product page par matching approved 3D asset ho tab viewer.
5. **Cart:** Editable quantities, remove item, selected options, subtotal aur checkout action.
6. **Checkout:** Guest checkout, address, pincode validation, server-calculated shipping/tax/total aur online payment.
7. **Orders:** Verified confirmation, customer email aur secure order-status link.
8. **Custom gifting:** Occasion, quantity, required date, contact, message aur optional reference-image form.
9. **Information pages:** About, Candle Care, Contact, Shipping, Returns/Refunds, Privacy aur Terms.
10. **Owner dashboard:** Products/options/prices, stock, orders, fulfilment aur custom enquiries manage karna.
11. **Mobile, accessibility, SEO aur performance:** Launch ki basic quality requirements.

### P1: Initial launch ke baad

- Additional accurate 3D product models, especially BLOOM BABY aur GOLU GLOW.
- Customer accounts, wishlist, verified-purchase reviews aur reorder flow.
- Coupons, automatic courier integration aur richer sales reporting.
- Advanced gift builder, approved gift bundles aur personalisation preview.

P0 mein standard catalog products ka purchase aur custom orders ka enquiry workflow hoga. Custom request ki final pricing owner quote ke baad decide karega.

## 5. Site map

```text
Home /
Shop /shop
  Collection /collections/[slug]
  Product /products/[slug]
Cart /cart
Checkout /checkout
Order status /orders/[secure-token]
Custom gifting /custom-gifting
About /about
Candle care /candle-care
Contact /contact
Policies /policies/[slug]
Owner dashboard /admin
```

Proposed merchandising groups: Jar Candles, Floral Candles, Bubble Candles aur Festive Candles. Ye website organisation labels hain, catalogue mein diye hue official collection names nahi.

## 6. Main customer journeys

### A. Standard purchase

Home/Shop → Product → Pack choose → Fragrance mode aur applicable scent choose → Approved colour choose → Add to Bag → Cart → Address → Final total → Payment → Verified confirmation.

- Product listing par lowest available price ke saath `From` tabhi lagega jab prices vary karein.
- Product page par selected purchasable combination ki exact price dikhegi.
- Missing required option par customer ko wahi field highlight karke guide karenge.
- Out-of-stock combination add nahi hoga; available options browse ho sakenge.

### B. Custom/bulk order

Custom Gifting → Occasion/quantity/date/details → Optional reference image → Submit → Enquiry ID + next-step message → Owner review → Quote/follow-up.

Phone/WhatsApp number available nahi hai; verified business number milne ke baad WhatsApp CTA enable hoga. Initial enquiry database/dashboard mein save hogi, configured email channel se owner alert milega.

### C. 3D discovery

Hero pe product poster turant dikhega → Lightweight 3D scene ready hoga → Customer drag karke rotate kar sakega aur `Light the mood` se visual flame toggle kar sakega → `Shop DELULU` se product page khulega.

3D mein dikhaya colour tabhi cart option se connect hoga jab woh approved variant ho. Decorative preview ko inventory ya exact product dimensions ka promise nahi banayenge.

## 7. Feature-level business rules

| Area | Requirement |
| --- | --- |
| Catalogue | Product name, description, gallery, active options, price aur stock owner-editable ho |
| Pack pricing | Set of 2 ko ek sellable pack samjhein; cart quantity 2 ka matlab do packs/four candles |
| Fragrances | Unscented par scent selection hide ho; GOLU GLOW ka ladoo pricing tier alag ho |
| Availability | Har sellable SKU ka approved colour/scent/pack combination aur inventory ho |
| Photos | Shared lifestyle image ko actual selected colour ka proof na dikhaya jaye |
| Shipping | Pincode aur cart rules se checkout se pehle charge/availability clear ho |
| Payment | UPI/cards/netbanking provider support ke hisaab se; failed/pending par retry/status action ho |
| Order truth | Browser success message se paid mark na ho; server verification mandatory ho |
| Custom quote | Unconfirmed customisation surcharge ya delivery promise auto-generate na ho |
| Policies | Shipping time, tax treatment, return conditions aur cancellation rules owner approve kare |

## 8. Content aur asset readiness

### Available

- Five named products aur fourteen catalogue pricing rows.
- Product/lifestyle imagery, packaging references aur custom-event reference photo.
- Existing Honeywick logo artwork photos/catalogue ke andar.

### Build ke dauraan prepare karna hai

- High-resolution transparent logo/SVG, photo crops aur web-optimised exports.
- Photo-to-product mapping, alt text aur image focal-point selection.
- Product dimensions, wax type, weight, burn time aur tested care instructions.
- Har product ke approved sellable combinations, current stock aur confirmed live prices.
- DELULU hero ka 3D model/scene, approved label texture aur static fallback.

Single-view photos accurate 360° geometry provide nahi karti. Hero ka first model reference-inspired banega; exact replica ke liye measurements aur multiple-angle photos/model asset chahiye.

## 9. Acceptance criteria

- [ ] Five catalogue products approved data ke saath discoverable hain; unresolved products checkout ke liye hidden/disabled hain.
- [ ] Fourteen source price rows sahi import hui hain; set pricing double-charge nahi hoti.
- [ ] Required options aur stock validate hote hain; cart refresh ke baad retain hota hai.
- [ ] Server subtotal, shipping, tax aur final total calculate karta hai.
- [ ] Successful, failed aur pending payment journeys tested hain; duplicate event se duplicate order/stock deduction nahi hota.
- [ ] Custom request dashboard mein reference image aur enquiry ID ke saath milti hai.
- [ ] 3D load fail/reduced motion/WebGL unavailable par usable poster aur shopping CTA milta hai.
- [ ] Mobile, keyboard navigation, readable contrast aur forms ke error states verified hain.
- [ ] Policy/contact content real business details se complete hai.
- [ ] Owner product update aur order fulfilment independently kar sakta hai.

## 10. Build roadmap

| Phase | Work | Exit condition |
| --- | --- | --- |
| 1. Product readiness | Catalogue mapping, stock/variants, shipping rules, logo | Approved product data aur unresolved items ki clear list |
| 2. Visual foundation | Homepage/PDP mobile-desktop designs, design tokens | Design direction approved |
| 3. Storefront prototype | Responsive pages, gallery, filters, local cart, hero 3D | End-to-end browsing preview |
| 4. Commerce backend | Database, dashboard, checkout, payments, enquiries | Sandbox orders verified |
| 5. Launch preparation | Content, SEO, accessibility, performance, live configuration | Acceptance checklist complete |

Estimated effort: approximately **3–5 working weeks**, assuming assets/feedback timely milte hain aur ek experienced developer implementation karta hai. Accurate sculpted 3D modelling, provider activation aur owner approvals ka time separately depend karega.

## 11. Launch se pehle owner decisions

1. Catalogue prices current hain? Tax-inclusive hain ya tax separately add hoga?
2. BUBBLE GUM aur BOBA BABY ka pack size aur fragrance pricing kya hai?
3. Product-wise colours/scents, stock aur made-to-order lead times kya hain?
4. Shipping geography, charges, dispatch estimate, return/refund rules aur COD availability kya hogi? Proposed MVP prepaid hai.
5. Business email, phone, address, social link, domain aur payment-provider account details kya hain?
6. Logo source file, product specifications aur accurate 3D ke liye extra reference angles available hain?

## 12. Launch ke baad measurement

Product views, Add-to-Bag rate, checkout starts, verified purchases, payment failures aur custom enquiries track karenge. Pehle 30 days baseline collect karke conversion targets set honge. Fabricated ratings, sales numbers aur unverified quality claims publish nahi honge.

## Related documents

- [Technical plan](Trd.md)
- [Design direction](Design.md)
