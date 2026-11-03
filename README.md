# 🕯️ Honeywick Candles — 3D E-Commerce Platform

> **"Your Daily Dose of Glow"**  
> An artisanal 3D WebGL e-commerce experience for handcrafted scented & decorative soy candles.

---

## ✨ Overview

**Honeywick Candles** is a world-class, responsive 3D e-commerce storefront built with **React, TypeScript, Three.js, and Tailwind CSS**. It brings artisanal candle shopping to life through real-time 3D interactive product rendering, dynamic candle flame lighting, full variant customization (pack sizes, fragrance modes, wax color swatches), and a seamless shopping cart & checkout experience.

---

## 🌟 Key Features

### 1. 🕯️ Interactive 3D WebGL Studio (Three.js)
* **Real-time 3D Jar Candle (DELULU):** Physically based glass shader (transmission, refraction, thickness), natural soy wax fill, centered braided cotton wick, and branded Honeywick emblem.
* **Procedural Animated Flame:** Organic flame flicker, warm point light cast, and subtle light aura.
* **Interactive Controls:**
  * 360° mouse & touch drag-to-rotate with physics damping.
  * **"Light the Mood"** button to ignite / extinguish the flame with audio effects.
  * Real-time wax color shade switcher.
* **3D Bubble Cube Mode:** Geometric 27-sphere bubble candle visualization.
* **Progressive Fallback:** Automatic graceful fallback to studio photography when WebGL is unavailable.

### 2. 🛍️ Artisanal Catalogue & Pricing Matrix
* **DELULU (₹199 - ₹249):** Signature luxury clear tumbler jar candle.
* **GOLU GLOW (₹79 - ₹119):** Festive Indian Motichoor ladoo candles with silver vark.
* **BLOOM BABY (₹99 - ₹199):** Hand-sculpted Peony flower candle in botanical shades.
* **BUBBLE GUM (₹219):** Scandinavian 27-sphere pastel bubble cube candle.
* **BOBA BABY (₹249):** Cream bubble cube candle with hand-painted red hearts.
* **Catalogue Fragrances:** Warm Vanilla, English Rose, Calming Lavender, Morning Espresso, Fresh Lemongrass, Mysore Sandalwood, Night Jasmine, Mandarin Orange, and Motichoor Ladoo.

### 3. 🛒 Complete E-Commerce Experience
* **Dynamic PDP:** Live pack selection (Single vs Set of 2), conditional fragrance picker, color swatches, and instant price recalculation.
* **Shopping Bag & Cart Drawer:** Slide-over cart, free shipping progress bar (Goal: ₹499), and coupon code support (`GLOW10`, `HONEYWICK`).
* **Multi-Step Checkout:** Address capture with Indian PIN code validation, delivery calculations, and simulated payment methods (UPI, Cards, NetBanking, COD).
* **Order Confirmation:** Celebratory confetti animation, unique order reference, and live fulfillment timeline.
* **Custom Gifting Portal:** Wedding & event favors quotation form with auto-generated Enquiry IDs.
* **Candle Care & Policies:** Detailed 6-step candle care guide, Our Story, contact forms, and shipping/return policies.
* **Owner Dashboard (`/admin`):** Real-time store analytics, order status management, and custom leads pipeline.

---

## 🚀 Quick Start

### Prerequisites
* Node.js (v18+)
* npm (v9+)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryamaddy/honeywick-candles-3d.git
   cd honeywick-candles-3d/honeywick-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 Repository Structure

```
├── Design.md                 # UI/UX & Design Tokens specification
├── Prd.md                    # Product Requirements Document
├── Trd.md                    # Technical Architecture Document
├── Product Catalogue..pdf    # Original brand catalogue
├── honeywick-store/          # Complete React + Vite + Three.js web application
│   ├── public/               # Studio photography, catalogue pages, logo SVG
│   ├── src/
│   │   ├── components/
│   │   │   ├── three/        # Interactive 3D WebGL candle scenes
│   │   │   ├── layout/       # Navbar, Footer, Announcement banner
│   │   │   ├── home/         # Hero, Collections, Fragrance bar, Gifting banner
│   │   │   ├── product/      # Product cards, Badges
│   │   │   └── cart/         # Cart Drawer
│   │   ├── context/          # CartContext, NavigationContext, StoreDataContext
│   │   ├── data/             # Catalogue items, pricing rules, fragrances, colors
│   │   ├── pages/            # Home, Shop, PDP, Cart, Checkout, Admin, Care, etc.
│   │   └── types/            # TypeScript interfaces
│   └── package.json
└── README.md
```

---

## 🎨 Brand Identity

* **Primary Background:** Cream (`#FFF8F0`)
* **Accents:** Blush (`#F5D6DC`) & Rose (`#D87591`)
* **Primary Action:** Berry (`#8E2949`)
* **Headings:** Cormorant Garamond (Editorial serif)
* **Body / UI:** Manrope (Modern geometric sans-serif)

---

## 📄 License
Crafted with ❤️ for Honeywick Candles.
