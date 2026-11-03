# TRD — Honeywick Candles 3D E-commerce Website

> Technical Requirements Document | Version 1.0 | 02 November 2026
> Language: Hinglish | Status: Proposed architecture, abhi implementation nahi hui hai

## 1. Technical objective

SEO-friendly storefront, reliable commerce backend aur progressive 3D experience banana hai. Product information server-render hogi; cart aur interactive 3D client-side chalenge. 3D fail hone par purchase flow unaffected rehna chahiye.

Product scope/prices ke liye [Prd.md](Prd.md), visual behaviour ke liye [Design.md](Design.md) source documents hain.

## 2. Proposed stack

| Layer | Recommendation | Reason |
| --- | --- | --- |
| App | Next.js App Router + TypeScript | Server-rendered products, routing aur backend endpoints ek project mein |
| Styling | Tailwind CSS + CSS custom properties | Consistent tokens aur responsive layout |
| UI animation | Motion for React | Small entrance/transition effects aur reduced-motion support |
| 3D | Three.js + React Three Fiber + Drei | Interactive candle scene, model loading aur camera controls |
| Forms | React Hook Form + Zod | Typed forms aur shared validation schemas |
| Cart state | Zustand with persisted storage | Lightweight client cart; final calculation server par |
| Database/auth/storage | Supabase PostgreSQL, Auth, Storage | Products/orders, owner login aur image/reference storage |
| Payment | Razorpay hosted checkout | Proposed India-first payment integration |
| Transactional email | Resend | Order/enquiry emails with retry handling |
| Hosting | Vercel + Supabase | Next.js deployment aur managed database |
| Verification | Vitest + Playwright + automated accessibility checks | Pricing/payment logic aur real-user flows |

Implementation start par mutually compatible stable versions select karke lockfile commit hogi. Provider pricing, limits aur activation requirements setup ke waqt verify honge; ye document subscription-cost quote nahi hai.

## 3. System overview

```text
Browser
  ├─ Server-rendered Home / Shop / Product pages
  ├─ Client cart + forms
  └─ Lazy-loaded 3D scene
          │
Next.js server
  ├─ Catalogue reads / validated cart quotes
  ├─ Checkout + payment verification
  ├─ Order status + enquiry handlers
  └─ Authenticated owner actions
          │
          ├─ Supabase: Postgres + Auth + image storage
          ├─ Razorpay: hosted payments + signed webhooks
          └─ Resend: transactional notifications
```

Public product reads cached ho sakti hain. Checkout, stock checks, owner pages aur private order responses request-time aur non-public honge.

## 4. Proposed project structure

```text
src/
  app/
    (store)/                 # home, shop, products, cart, policies
    checkout/
    orders/[token]/
    admin/
    api/                     # checkout, payment, enquiry handlers
  components/
    layout/
    product/
    cart/
    three/                   # client-only 3D boundary
    ui/
  lib/
    catalogue/
    pricing/
    inventory/
    payments/
    validation/
    supabase/
  stores/cart.ts
  styles/
supabase/migrations/
scripts/import-catalogue.ts
public/images/products/
public/models/
tests/
```

Source PDF/JPEG files preserve rahenge. Web assets ki copies readable names mein export hongi; source ko overwrite nahi karenge.

## 5. Catalogue aur data model

| Entity | Important fields |
| --- | --- |
| `products` | id, slug, name, description, collection_id, status, specs, seo fields |
| `product_images` | product_id, storage_path, alt, sort_order, optional variant_id |
| `collections` | id, slug, title, description, sort_order |
| `product_variants` | id, product_id, sku, colour, scent_mode, scent_name, pack_size, price_paise, stock_qty, active |
| `product_models` | product_id, model_path, poster_path, approximate flag, approved colours |
| `orders` | id, public_reference, status, currency, immutable address snapshot, subtotal, shipping, tax, total, provider_order_id |
| `order_items` | order_id, variant_id, immutable name/options/price snapshots, quantity |
| `inventory_reservations` | order_id, variant_id, quantity, expires_at, reservation_status |
| `payment_events` | unique provider_event_id, provider_payment_id, order_id, verified status, received_at |
| `refunds` | order_id, provider_refund_id, amount_paise, status, reason |
| `custom_enquiries` | id, contact, occasion, quantity, required_date, message, reference_path, status |
| `notification_jobs` | unique event key, recipient, template, attempts, next_attempt_at, status |
| `business_settings` | shipping rules, tax configuration, support details, approved policy content |

### Pricing aur inventory rules

- Money integer **paise** mein store hogi; display INR mein. Example: ₹249 = `24900` paise.
- Catalogue ki 14 rows **pricing combinations** hain, final SKU count nahi. Approved colours/scents se actual SKUs expand honge.
- `scent_mode`: `unscented`, `ladoo`, `standard`; `scent_name` sirf applicable case mein required hoga.
- Pack size SKU ka part hoga. Set-of-2 SKU ka `stock_qty` available packs count karega.
- MVP mein single aur set stock owner separately allocate karega; same physical pieces ko dono inventories mein count nahi karna. Shared stock pooling future enhancement hai.
- BUBBLE GUM/BOBA BABY ki unresolved options ko guess karke seed nahi karenge; owner confirmation tak draft status rahega.
- SKU price database se aayegi. Browser ke submitted price, stock aur total par trust nahi hoga.
- Existing order item prices aur descriptions product edits ke baad bhi snapshots se stable rahenge.
- Tax-inclusive/exclusive calculation owner-approved rule se hogi; catalogue dekhkar tax rate assume nahi hoga.

## 6. API aur server contracts

| Operation | Input | Output / behaviour |
| --- | --- | --- |
| `GET /api/products` | Search, filters, sort, pagination | Active catalogue only; filter values validated |
| `POST /api/cart/quote` | Variant IDs, quantities, destination | Current prices, stock, shipping, tax, final total |
| `POST /api/checkout` | Cart, address, email, idempotency key | Local pending order + provider checkout order |
| `POST /api/payments/verify` | Provider response identifiers/signature | Server verification aur current local order status |
| `POST /api/webhooks/razorpay` | Raw signed event body | Idempotent reconciliation aur order state update |
| `GET /api/orders/[token]` | High-entropy scoped token | Limited order status, sensitive details masked |
| `POST /api/custom-enquiries` | Validated form + optional upload reference | Enquiry ID; notification job enqueue |
| Owner server actions | Authenticated validated mutations | Product/stock/order updates; catalogue cache invalidation |

Invalid input par field errors; stock/price conflicts par updated quote; rate limit par retry guidance; provider unavailable ho toh safe retry state milega. Double-click aur network retries same idempotency key ke saath duplicate checkout create nahi karenge.

## 7. Checkout aur payment lifecycle

1. Server cart variants, quantity limits, address aur serviceability validate karega.
2. Transaction/conditional update ke through stock reservation hogi; negative availability allow nahi hogi.
3. Local pending order aur immutable line items create honge. Provider order failure par reservation safely release hogi.
4. Razorpay order server-calculated amount ke saath create hoga; customer hosted checkout use karega.
5. Client return par signature verify karke provider payment/order ka amount, currency aur captured status check hoga. Browser-only success paid status nahi banayega.
6. Signed webhook same reconciliation routine use karega. Unique provider events/payment IDs aur guarded state transitions duplicate processing rokenge.
7. Verified captured payment par transactionally order `paid`, reservation consumed aur notification queued hogi.
8. Pending/failed/abandoned payment mein reservation configurable timeout ke baad scheduled worker se release hogi. Status changes par pending payments provider se reconcile honge.
9. Agar payment reservation expiry ke baad capture hota hai, server stock atomically recheck karega; unavailable ho toh `payment_review` aur owner alert/refund workflow, false fulfilment promise nahi.

**Order states:** `pending_payment`, `paid`, `payment_review`, `processing`, `shipped`, `delivered`, `cancelled`, `refund_pending`, `refunded`.

Failed payment attempt order ko turant permanently cancel nahi karega; retry possible rahegi. Valid paid state ko late failed event downgrade nahi karega. Prepaid cancellation/refund provider outcome ke saath reconcile hogi; stock release/restock har event par sirf ek baar hoga.

Confirmation page pending verification ke dauraan `Payment verification in progress` show karegi. Owner dashboard sirf verified paid orders ko fulfilment ke liye ready dikhayega. Scheduled reconciliation missed webhooks aur incomplete checkout operations recover karegi.

## 8. 3D implementation strategy

### Initial hero

- DELULU jar procedural geometry ya optimised GLB se: glass shell, wax, wick, approved label texture aur lightweight flame.
- Warm lighting, soft shadow, limited drag rotation; product stable angle par initially dikhe.
- Flame visual toggle hoga; actual burning, melting ya fragrance simulation ka claim nahi.
- BUBBLE GUM procedural spheres se later model ho sakta hai; complex petals/ladoo ko accurate asset modelling ki zaroorat hogi.

### Loading aur fallback

- Poster server-rendered hoga; canvas client-only dynamic import ke through first content ke baad mount hoga.
- Sirf WebGL capability detect karna enough nahi: context loss, load timeout aur model failure error boundary bhi handle hogi.
- Mobile par conservative quality, capped device-pixel-ratio, fewer effects; data-saver aur reduced-motion par poster default.
- Reduced-motion visitor explicit `Explore 3D` action se viewer open kar sakta hai; autoplay off rahega.
- Offscreen/background scene pause; idle par demand rendering; flame active ho toh limited update rate.
- Mobile vertical scroll capture nahi hoga; rotate gesture limited aur camera zoom disabled by default.
- 3D ke saare product-selection controls equivalent HTML buttons mein available honge.

### Asset budgets — targets

- Initial hero model/geometry + compressed textures: approximately 2 MB transfer ke andar target.
- Above-the-fold product poster: approximately 200 KB ya lower, quality/device ke hisaab se.
- Heavy 3D runtime initial storefront JS bundle ka part nahi hoga.
- GLB use hone par geometry compression, KTX2 textures aur real-device visual check karenge.
- Accurate model na ho toh `3D preview is illustrative` caption; actual product photos always accessible.

## 9. Media preparation

- JPEG inputs se responsive AVIF/WebP exports aur suitable JPEG fallback generate karenge.
- Image manifest source filename → product → role → output path → alt text map karega.
- `next/image` ke through width/height, responsive sizes aur lazy loading; sirf primary hero media priority hogi.
- Logo photo se blindly crop karke final master nahi maanenge; owner SVG/transparent artwork preferred hai.
- Custom event labels waali supplied image marketing use se pehle owner clearance legi; private names/dates ko design copy mein reuse nahi karenge.
- Uploaded references private bucket mein; random keys, short-lived signed access aur access-controlled owner view.

## 10. Access, validation aur operational reliability

- Public access active products tak; admin ke liye Supabase Auth aur server-verified owner role.
- Database RLS, role checks aur private storage policies migration ka part hongi.
- Service-role key, payment secret, webhook secret aur mail API key sirf server environment mein rahenge.
- Server actions par session/origin checks; public forms aur checkout par rate limiting aur abuse protection.
- Reference uploads: JPEG/PNG/WebP only, maximum 5 MB, extension ke saath content validation; arbitrary URL fetch nahi.
- Form lengths/quantity bounds server-validated; user text HTML ki tarah execute nahi hoga.
- Order token random, high-entropy aur time-limited hoga; sequential order number se private lookup nahi milega. Renewal verified email se.
- Logs mein payment credentials, full addresses aur customer reference uploads include nahi honge.
- Retention durations owner approve karega; order-record retention aur expired enquiry/upload cleanup separately configure honge.
- Email failure order ko unpaid nahi banayega; notification jobs retry hongi aur failure owner ko visible hoga.
- Database backup/restore availability provider plan ke against verify karke pre-launch restore exercise karenge.

## 11. Environment configuration

```dotenv
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
ORDER_FROM_EMAIL=
OWNER_NOTIFICATION_EMAIL=
CRON_SECRET=
```

`.env.example` mein names/placeholders honge; real values `.env.local`/hosting secrets mein. Test aur live payment keys/environments separate rahenge. Verified sender domain aur owner login launch configuration ka part hain.

## 12. SEO, accessibility aur performance requirements

- Unique titles/descriptions, canonical URLs, sitemap, robots rules aur product sharing images.
- Accurate Product/Offer structured data: live price, stock aur INR. Fake ratings/reviews include nahi hongi.
- Cart/checkout/admin/private order pages search indexing se excluded rahengi.
- Semantic HTML, accessible dialogs, keyboard control, focus restoration, visible errors aur status announcements.
- WCAG 2.2 AA target: normal text contrast 4.5:1, large text/UI non-text contrast applicable standards ke according.
- Mobile Core Web Vitals targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 where field data available.
- Pre-launch lab tests throttled mobile par; post-launch field results separately monitor honge. Targets ko measured result ke bina achieved nahi bolenge.

## 13. Verification plan

| Check | Meaningful scenarios |
| --- | --- |
| Pricing unit checks | All 14 source rows, set pricing, quantity, unscented rules, tax/shipping rounding |
| Inventory integration | Simultaneous last-stock checkout, release timeout, late paid event, no double deduction |
| Payment integration | Signature rejection, amount mismatch, captured vs pending, duplicate/out-of-order events, refunds |
| Store E2E | Search → options → cart → quote → sandbox checkout → verified status |
| Failure E2E | Price change, unavailable pincode, lost network, failed payment, out-of-stock |
| Custom enquiry | Required fields, invalid upload, successful save, owner visibility |
| Owner access | Unauthenticated/unauthorised mutation rejection, valid update, public cache refresh |
| 3D/accessibility | WebGL off, reduced motion, load failure, keyboard flow, mobile scrolling |

Implementation ke baad expected scripts: `lint`, `typecheck`, `test`, `test:e2e`, `build`. Actual commands scaffold/package configuration ke saath define aur verify honge; abhi ye scripts exist nahi karti.

## 14. Delivery gates

1. Approved catalogue seed + image mapping review.
2. Responsive storefront + cart + poster/3D preview review.
3. Database migrations, role policies aur owner dashboard verification.
4. Sandbox payment, inventory race/retry aur email verification.
5. Policy/business content complete; secrets, backups, performance aur accessibility checks.
6. Owner-approved deployment, custom domain aur live payment configuration.

Launch ke liye required external inputs: payment-provider onboarding, verified email/domain, business policies, product stock/specs aur deployment accounts. Local prototype in inputs ka wait kiye bina ban sakta hai.
