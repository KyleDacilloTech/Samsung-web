# Galaxy Store (Samsung-inspired demo)

Responsive storefront built with plain HTML, CSS and JavaScript. No build step.
Works with touch (swipe), mouse (hover, drag) and keyboard (Tab, Enter, arrow keys, Esc).

## Run it
Open `index.html`, or use VS Code "Live Server". To host free: GitHub repo > Settings > Pages > deploy from `main`.

## Structure
```
index.html
css/style.css
js/data.js    <- edit menus, products, footer links
js/main.js    <- all interactions
images/
  hero/        hero-1.jpg, hero-2.jpg, hero-3.jpg            (1920x900, JPG)
  categories/  phones, tvs, appliances, computing,
               wearables, audio                              (.png, 600x600)
  products/    phone-ultra, phone-fold, tv-neo, watch,
               buds, tablet, fridge, laptop                  (.png, 800x800, transparent)
  promos/      promo-1.jpg, promo-2.jpg                      (1200x900, JPG)
```
File names must match exactly. Missing images fall back to soft gradients.

## Notes
- Logo is text. Replace it with your own SVG in `index.html` if you like.
- Search and cart are demo-only (no backend).
- Not affiliated with Samsung. Use images you have the rights to use.

## Pages (v2)
`index.html` home, `shop.html` (categories, search, sort, price filter), `product.html?id=...`, `cart.html` (saved in the browser, demo checkout), `support.html` (searchable FAQ).
Add an item to `PRODUCTS` in `js/data.js` and it gets its own product page automatically.

Extra product images (.png in `images/products/`): phone-plus, phone-flip, tv-frame, tv-crystal, washer, monitor, ring, soundbar.
A missing product image falls back to its category image, then to a gradient.

## Galaxy AI page + 404 (v3)
`explore.html` has keyboard-friendly tabs and a before/after photo slider. `404.html` is served by GitHub Pages for unknown URLs.
Images for it go in `images/explore/` (JPG): ai-hero, translate, search, photo, notes, before, after. Missing ones show gradients.

## Compare + search suggestions (v4)
Use the Compare button on product cards (up to 3), then open `compare.html` for a side-by-side spec table. The header search now suggests products as you type.
