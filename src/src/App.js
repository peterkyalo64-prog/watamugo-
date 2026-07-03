import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "groceries", label: "Groceries", icon: "🛒", color: "#4CAF50" },
  { id: "food", label: "Food & Meals", icon: "🍽️", color: "#FF5722" },
  { id: "produce", label: "Fresh Produce", icon: "🥦", color: "#8BC34A" },
  { id: "seafood", label: "Fish & Seafood", icon: "🐟", color: "#03A9F4" },
  { id: "water", label: "Water & Gas", icon: "💧", color: "#00BCD4" },
  { id: "household", label: "Household", icon: "🏠", color: "#9C27B0" },
];

const VENDORS = [
  {
    id: 1, name: "Carrefour Watamu", category: "groceries", rating: 4.7, reviews: 120,
    delivery: "20–35 min", minOrder: 500, image: "🏪",
    items: [
      { id: 101, name: "Unga wa Ugali 2kg", price: 180, unit: "pack" },
      { id: 102, name: "Cooking Oil 1L", price: 220, unit: "bottle" },
      { id: 103, name: "Sugar 1kg", price: 150, unit: "pack" },
      { id: 104, name: "Milk 500ml", price: 65, unit: "pack" },
      { id: 105, name: "Rice 2kg", price: 260, unit: "pack" },
      { id: 106, name: "Bread", price: 55, unit: "loaf" },
    ],
  },
  {
    id: 2, name: "Mama Pima Kitchen", category: "food", rating: 4.9, reviews: 88,
    delivery: "25–40 min", minOrder: 300, image: "👩‍🍳",
    items: [
      { id: 201, name: "Nyama Choma + Ugali", price: 550, unit: "plate" },
      { id: 202, name: "Pilau (Large)", price: 320, unit: "plate" },
      { id: 203, name: "Chips + Kuku", price: 450, unit: "plate" },
      { id: 204, name: "Biryani (Large)", price: 380, unit: "plate" },
      { id: 205, name: "Samosa (6 pcs)", price: 120, unit: "pack" },
      { id: 206, name: "Mandazi (6 pcs)", price: 80, unit: "pack" },
    ],
  },
  {
    id: 3, name: "Watamu Fresh Market", category: "produce", rating: 4.8, reviews: 64,
    delivery: "15–30 min", minOrder: 200, image: "🥬",
    items: [
      { id: 301, name: "Tomatoes 1kg", price: 80, unit: "kg" },
      { id: 302, name: "Sukuma Wiki (bunch)", price: 30, unit: "bunch" },
      { id: 303, name: "Onions 1kg", price: 90, unit: "kg" },
      { id: 304, name: "Avocados (3 pcs)", price: 60, unit: "pack" },
      { id: 305, name: "Bananas (bunch)", price: 100, unit: "bunch" },
      { id: 306, name: "Mangoes (5 pcs)", price: 150, unit: "pack" },
    ],
  },
  {
    id: 4, name: "Bahari Fish Point", category: "seafood", rating: 5.0, reviews: 43,
    delivery: "20–35 min", minOrder: 400, image: "🎣",
    items: [
      { id: 401, name: "Fresh Tilapia 1kg", price: 380, unit: "kg" },
      { id: 402, name: "Prawns 500g", price: 650, unit: "pack" },
      { id: 403, name: "Octopus 1kg", price: 420, unit: "kg" },
      { id: 404, name: "Crab (2 pcs)", price: 800, unit: "pack" },
      { id: 405, name: "Fried Fish (2 pcs)", price: 280, unit: "plate" },
      { id: 406, name: "Smoked Mackerel", price: 200, unit: "pack" },
    ],
  },
  {
    id: 5, name: "Al Hashimiya Store", category: "groceries", rating: 4.6, reviews: 97,
    delivery: "20–30 min", minOrder: 300, image: "🏬",
    items: [
      { id: 501, name: "Water 20L Jerican", price: 120, unit: "jerican" },
      { id: 502, name: "Gas Refill 6kg", price: 1200, unit: "cylinder" },
      { id: 503, name: "Eggs (30 pcs tray)", price: 480, unit: "tray" },
      { id: 504, name: "Butter 250g", price: 180, unit: "pack" },
      { id: 505, name: "Tea Leaves 250g", price: 130, unit: "pack" },
      { id: 506, name: "Wheat Flour 2kg", price: 200, unit: "pack" },
    ],
  },
  {
    id: 6, name: "Blue Marmalade Deli", category: "food", rating: 4.8, reviews: 55,
    delivery: "30–45 min", minOrder: 500, image: "🥗",
    items: [
      { id: 601, name: "Grilled Snapper", price: 950, unit: "plate" },
      { id: 602, name: "Pasta Arrabiata", price: 680, unit: "plate" },
      { id: 603, name: "Club Sandwich", price: 450, unit: "plate" },
      { id: 604, name: "Fresh Juice (500ml)", price: 180, unit: "bottle" },
      { id: 605, name: "Chocolate Brownie", price: 220, unit: "piece" },
      { id: 606, name: "Caesar Salad", price: 520, unit: "bowl" },
    ],
  },
];

const ACTIVE_ORDERS = [
  { id: "WG-2841", customer: "James Omondi", items: "Nyama Choma + Pilau", total: 870, status: "picked_up", rider: "Brian M.", time: "12 min ago", zone: "Turtle Bay" },
  { id: "WG-2840", customer: "Sarah Lodge", items: "Groceries (6 items)", total: 1240, status: "on_the_way", rider: "Kevin O.", time: "8 min ago", zone: "Watamu Village" },
  { id: "WG-2839", customer: "Marco (Airbnb)", items: "Fresh Fish + Prawns", total: 1030, status: "delivered", rider: "Brian M.", time: "35 min ago", zone: "Gede Road" },
];

// ── THEME ─────────────────────────────────────────────────────────────────────
const C = {
  primary: "#00A86B",       // Kenyan green — coast, nature, go
  primaryDark: "#007A4D",
  accent: "#FF6B35",        // sunset orange — warmth, food, energy
  dark: "#1A1A2E",
  mid: "#6B7280",
  light: "#F0FDF4",
  border: "#E5E7EB",
  white: "#FFFFFF",
  bg: "#F9FAFB",
  warning: "#F59E0B",
  success: "#10B981",
  danger: "#EF4444",
};

export default function WatamuGo() {
  const [view, setView] = useState("home");           // home | vendor | cart | tracking | dispatch | vendor_dash
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [cart, setCart] = useState({});               // { itemId: qty }
  const [cartVendor, setCartVendor] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [role, setRole] = useState("customer");       // customer | dispatch | vendor
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderStep, setOrderStep] = useState(1);

  // ── CART HELPERS ──
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const vendor = VENDORS.find(v => v.items.some(i => i.id === Number(id)));
    const item = vendor?.items.find(i => i.id === Number(id));
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (item, vendor) => {
    if (cartVendor && cartVendor.id !== vendor.id) {
      if (!window.confirm(`Your cart has items from ${cartVendor.name}. Clear cart and start fresh with ${vendor.name}?`)) return;
      setCart({});
    }
    setCartVendor(vendor);
    setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[itemId] > 1) next[itemId]--;
      else delete next[itemId];
      if (Object.keys(next).length === 0) setCartVendor(null);
      return next;
    });
  };

  const deliveryFee = cartTotal < 1000 ? 200 : cartTotal < 2500 ? 300 : 400;
  const filteredVendors = activeCategory === "all" ? VENDORS : VENDORS.filter(v => v.category === activeCategory);

  // ── STYLES ──
  const s = {
    app: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: "100vh", background: C.bg, color: C.dark },
    nav: { background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200 },
    logo: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
    logoText: { fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px" },
    logoGo: { color: C.primary },
    navRight: { display: "flex", alignItems: "center", gap: 10 },
    btn: (v = "primary", size = "md") => ({
      padding: size === "sm" ? "6px 14px" : size === "lg" ? "14px 28px" : "10px 20px",
      borderRadius: 8,
      border: v === "outline" ? `1.5px solid ${C.border}` : "none",
      background: v === "primary" ? C.primary : v === "accent" ? C.accent : v === "outline" ? C.white : v === "ghost" ? "transparent" : v === "danger" ? C.danger : C.dark,
      color: v === "outline" || v === "ghost" ? C.dark : C.white,
      fontWeight: 700, fontSize: size === "sm" ? 12 : 14,
      cursor: "pointer", transition: "opacity 0.15s",
      display: "inline-flex", alignItems: "center", gap: 6,
    }),
    cartBtn: { background: C.primary, border: "none", borderRadius: 10, padding: "10px 18px", color: C.white, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, position: "relative" },
    badge: { background: C.accent, color: C.white, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 },
    hero: { background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 60%, #00C896 100%)`, padding: "48px 20px 56px", color: C.white, position: "relative", overflow: "hidden" },
    heroTitle: { fontSize: 36, fontWeight: 900, letterSpacing: "-1px", marginBottom: 8, lineHeight: 1.1 },
    heroSub: { fontSize: 16, opacity: 0.9, marginBottom: 28, maxWidth: 440 },
    heroSearch: { background: C.white, borderRadius: 12, padding: "6px 6px 6px 16px", display: "flex", alignItems: "center", gap: 8, maxWidth: 480, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" },
    heroInput: { border: "none", outline: "none", fontSize: 15, flex: 1, color: C.dark },
    heroSearchBtn: { background: C.accent, border: "none", borderRadius: 8, padding: "10px 18px", color: C.white, fontWeight: 700, fontSize: 14, cursor: "pointer" },
    heroStats: { display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" },
    heroStat: { textAlign: "center" },
    heroStatVal: { fontSize: 24, fontWeight: 900 },
    heroStatLabel: { fontSize: 12, opacity: 0.8 },
    section: { padding: "28px 20px", maxWidth: 1100, margin: "0 auto" },
    sectionTitle: { fontSize: 18, fontWeight: 800, marginBottom: 16, color: C.dark },
    catScroll: { display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, marginBottom: 24 },
    catChip: (active, color) => ({
      padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${active ? color : C.border}`,
      background: active ? color : C.white, color: active ? C.white : C.dark,
      fontWeight: 600, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
      display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
    }),
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
    card: { background: C.white, borderRadius: 14, overflow: "hidden", cursor: "pointer", border: `1px solid ${C.border}`, transition: "transform 0.15s, box-shadow 0.15s" },
    cardHeader: (color) => ({ background: `linear-gradient(135deg, ${color}22, ${color}11)`, padding: "24px 20px", fontSize: 48, textAlign: "center", borderBottom: `1px solid ${C.border}` }),
    cardBody: { padding: 16 },
    cardTitle: { fontWeight: 700, fontSize: 15, marginBottom: 4 },
    cardMeta: { color: C.mid, fontSize: 12, display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 },
    tag: (color) => ({ background: `${color}18`, color: color, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700 }),
    // Vendor page
    vendorHero: { background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, padding: "28px 20px", color: C.white },
    itemCard: { background: C.white, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, border: `1px solid ${C.border}` },
    qtyCtrl: { display: "flex", alignItems: "center", gap: 8 },
    qtyBtn: { width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${C.primary}`, background: C.white, color: C.primary, fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    qtyVal: { fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" },
    // Cart
    cartRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` },
    // Tracking
    trackCard: { background: C.white, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` },
    progressBar: { height: 6, background: C.border, borderRadius: 3, overflow: "hidden", margin: "12px 0" },
    progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, borderRadius: 3, transition: "width 0.5s" }),
    stepRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
    stepDot: (done) => ({ width: 24, height: 24, borderRadius: "50%", background: done ? C.primary : C.border, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 12, fontWeight: 700, flexShrink: 0 }),
    // Dispatch
    dispatchCard: (status) => ({
      background: C.white, borderRadius: 14, padding: 18, marginBottom: 14,
      border: `2px solid ${status === "delivered" ? C.success : status === "on_the_way" ? C.primary : C.warning}`,
    }),
    statusBadge: (status) => ({
      background: status === "delivered" ? "#D1FAE5" : status === "on_the_way" ? "#DCFCE7" : "#FEF3C7",
      color: status === "delivered" ? C.success : status === "on_the_way" ? C.primaryDark : C.warning,
      borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700,
    }),
    // Sidebar
    sidebar: { width: 200, background: C.white, borderRight: `1px solid ${C.border}`, padding: "20px 0", minHeight: "calc(100vh - 64px)" },
    sideItem: (active) => ({ padding: "11px 20px", cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.primary : C.dark, background: active ? C.light : "transparent", borderLeft: `3px solid ${active ? C.primary : "transparent"}`, transition: "all 0.12s" }),
  };

  // ── VIEWS ──────────────────────────────────────────────────────────────────

  const Navbar = () => (
    <nav style={s.nav}>
      <div style={s.logo} onClick={() => { setView("home"); setRole("customer"); }}>
        <span style={{ fontSize: 24 }}>🛵</span>
        <span style={s.logoText}>Watamu<span style={s.logoGo}>Go</span></span>
      </div>
      <div style={s.navRight}>
        {role === "customer" && cartCount > 0 && (
          <button style={s.cartBtn} onClick={() => setView("cart")}>
            🛒 Cart
            <span style={s.badge}>{cartCount}</span>
            <span style={{ opacity: 0.8, fontWeight: 400 }}>KES {cartTotal.toLocaleString()}</span>
          </button>
        )}
        {role === "customer" && (
          <button style={s.btn("outline", "sm")} onClick={() => { setRole("dispatch"); setView("dispatch"); }}>Dispatch</button>
        )}
        {role === "customer" && (
          <button style={s.btn("ghost", "sm")} onClick={() => { setRole("vendor"); setView("vendor_dash"); }}>Vendor Login</button>
        )}
        {role !== "customer" && (
          <button style={s.btn("outline", "sm")} onClick={() => { setRole("customer"); setView("home"); }}>← Customer View</button>
        )}
      </div>
    </nav>
  );

  const HomeView = () => (
    <div>
      <div style={s.hero}>
        <div style={{ maxWidth: 600 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, opacity: 0.8, marginBottom: 12, textTransform: "uppercase" }}>🌊 Watamu · Kilifi County</div>
          <div style={s.heroTitle}>Everything Watamu,<br />delivered to your door</div>
          <div style={s.heroSub}>Groceries, fresh fish, meals, water and more — delivered fast by local riders you can trust.</div>
          <div style={s.heroSearch}>
            <span>🔍</span>
            <input style={s.heroInput} placeholder="Search for food, groceries, fish..." />
            <button style={s.heroSearchBtn}>Search</button>
          </div>
          <div style={s.heroStats}>
            {[["30+", "Vendors"], ["15–40", "Min delivery"], ["KES 150+", "Delivery fee"], ["M-Pesa", "Payments"]].map(([val, label]) => (
              <div key={label} style={s.heroStat}>
                <div style={s.heroStatVal}>{val}</div>
                <div style={s.heroStatLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={s.section}>
        {/* Categories */}
        <div style={s.sectionTitle}>What are you looking for?</div>
        <div style={s.catScroll}>
          <div style={s.catChip(activeCategory === "all", C.dark)} onClick={() => setActiveCategory("all")}>All</div>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={s.catChip(activeCategory === cat.id, cat.color)} onClick={() => setActiveCategory(cat.id)}>
              {cat.icon} {cat.label}
            </div>
          ))}
        </div>

        {/* Vendors */}
        <div style={s.sectionTitle}>{activeCategory === "all" ? "All Vendors" : CATEGORIES.find(c => c.id === activeCategory)?.label}</div>
        <div style={s.grid}>
          {filteredVendors.map(vendor => {
            const cat = CATEGORIES.find(c => c.id === vendor.category);
            return (
              <div key={vendor.id} style={s.card}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                onClick={() => { setSelectedVendor(vendor); setView("vendor"); }}
              >
                <div style={s.cardHeader(cat?.color || C.primary)}>{vendor.image}</div>
                <div style={s.cardBody}>
                  <div style={s.cardTitle}>{vendor.name}</div>
                  <div style={s.cardMeta}>
                    <span>⭐ {vendor.rating} ({vendor.reviews})</span>
                    <span>🕐 {vendor.delivery}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={s.tag(cat?.color || C.primary)}>{cat?.label}</span>
                    <span style={s.tag(C.mid)}>Min KES {vendor.minOrder}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div style={{ marginTop: 48, background: C.white, borderRadius: 16, padding: 28, border: `1px solid ${C.border}` }}>
          <div style={s.sectionTitle}>How WatamuGo works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { icon: "📱", title: "Place your order", desc: "Choose a vendor and add items to your cart" },
              { icon: "✅", title: "Confirm & pay", desc: "Pay securely via M-Pesa STK push" },
              { icon: "🛵", title: "Rider picks up", desc: "A local rider collects your order" },
              { icon: "📦", title: "Delivered fast", desc: "Hot food and fresh groceries at your door" },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center", padding: "16px 8px" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const VendorView = () => {
    const v = selectedVendor;
    if (!v) return null;
    const cat = CATEGORIES.find(c => c.id === v.category);
    return (
      <div>
        <div style={s.vendorHero}>
          <button style={{ ...s.btn("ghost"), color: C.white, paddingLeft: 0, marginBottom: 12 }} onClick={() => setView("home")}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontS
