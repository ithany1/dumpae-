import { useState, useEffect, useRef, createContext, useContext } from "react";

// ══════════════════════════════════════════════════════════════════
// 8 PREMIUM THEMES
// ══════════════════════════════════════════════════════════════════
const THEMES = {
  phoneking: {
    name:"PhoneKing",icon:"📱",
    bg:"#f8f9ff",surface:"#fff",card:"#fff",border:"#e2e8ff",
    accent:"#4f46e5",accent2:"#7c3aed",accentSoft:"#4f46e512",
    headerBg:"linear-gradient(135deg,#4f46e5,#7c3aed)",headerText:"#fff",
    gold:"#f59e0b",teal:"#06b6d4",purple:"#8b5cf6",
    text:"#1e1b4b",muted:"#6b7280",danger:"#ef4444",success:"#10b981",
    dark:false,radius:"10px",cardRadius:"14px",
    font:"'Plus Jakarta Sans',sans-serif",displayFont:"'Plus Jakarta Sans',sans-serif",
    heroBg:"linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4)",
  },
  aliexpress: {
    name:"AliExpress",icon:"🔴",
    bg:"#fff",surface:"#f5f5f5",card:"#fff",border:"#e8e8e8",
    accent:"#e62e04",accent2:"#ff6000",accentSoft:"#e62e0410",
    headerBg:"#e62e04",headerText:"#fff",
    gold:"#ffa500",teal:"#0099cc",purple:"#9b59b6",
    text:"#222",muted:"#888",danger:"#e62e04",success:"#1aad19",
    dark:false,radius:"4px",cardRadius:"6px",
    font:"'Nunito Sans',sans-serif",displayFont:"'Nunito Sans',sans-serif",
    heroBg:"linear-gradient(135deg,#e62e04,#ff6000)",
  },
  midnight: {
    name:"Midnight",icon:"🌑",
    bg:"#060610",surface:"#0d0d1a",card:"#12122a",border:"#1e1e3a",
    accent:"#6366f1",accent2:"#8b5cf6",accentSoft:"#6366f120",
    headerBg:"#0d0d1a",headerText:"#e0e0ff",
    gold:"#fbbf24",teal:"#22d3ee",purple:"#a78bfa",
    text:"#e0e0ff",muted:"#7070a0",danger:"#f87171",success:"#34d399",
    dark:true,radius:"14px",cardRadius:"18px",
    font:"'DM Sans',sans-serif",displayFont:"'Syne',sans-serif",
    heroBg:"linear-gradient(135deg,#6366f130,#8b5cf630)",
  },
  neon: {
    name:"Neon",icon:"⚡",
    bg:"#0a0a0a",surface:"#111",card:"#161616",border:"#00ff8820",
    accent:"#00ff88",accent2:"#00ccff",accentSoft:"#00ff8815",
    headerBg:"#0a0a0a",headerText:"#00ff88",
    gold:"#ffee00",teal:"#00ccff",purple:"#cc44ff",
    text:"#eeffee",muted:"#668866",danger:"#ff4444",success:"#00ff88",
    dark:true,radius:"6px",cardRadius:"8px",
    font:"'Share Tech Mono',monospace",displayFont:"'Share Tech Mono',monospace",
    heroBg:"linear-gradient(135deg,#00ff8815,#00ccff10)",
  },
  ocean: {
    name:"Ocean",icon:"🌊",
    bg:"#f0f8ff",surface:"#fff",card:"#fff",border:"#bde0fe",
    accent:"#0284c7",accent2:"#0ea5e9",accentSoft:"#0284c712",
    headerBg:"linear-gradient(135deg,#0284c7,#0ea5e9)",headerText:"#fff",
    gold:"#f59e0b",teal:"#06b6d4",purple:"#7c3aed",
    text:"#0c2a3e",muted:"#5b8fa8",danger:"#ef4444",success:"#10b981",
    dark:false,radius:"12px",cardRadius:"16px",
    font:"'DM Sans',sans-serif",displayFont:"'Syne',sans-serif",
    heroBg:"linear-gradient(135deg,#0284c7,#06b6d4)",
  },
  sunset: {
    name:"Sunset",icon:"🌅",
    bg:"#fff8f0",surface:"#fff",card:"#fff",border:"#fde8d0",
    accent:"#ea580c",accent2:"#f97316",accentSoft:"#ea580c12",
    headerBg:"linear-gradient(135deg,#ea580c,#f97316,#fbbf24)",headerText:"#fff",
    gold:"#fbbf24",teal:"#0d9488",purple:"#9333ea",
    text:"#1c0a00",muted:"#92400e",danger:"#dc2626",success:"#16a34a",
    dark:false,radius:"10px",cardRadius:"14px",
    font:"'Plus Jakarta Sans',sans-serif",displayFont:"'Syne',sans-serif",
    heroBg:"linear-gradient(135deg,#ea580c,#f97316,#fbbf24)",
  },
  forest: {
    name:"Forest",icon:"🌲",
    bg:"#f0faf0",surface:"#fff",card:"#fff",border:"#bbf7d0",
    accent:"#16a34a",accent2:"#22c55e",accentSoft:"#16a34a12",
    headerBg:"linear-gradient(135deg,#14532d,#16a34a)",headerText:"#fff",
    gold:"#eab308",teal:"#0d9488",purple:"#7e22ce",
    text:"#14532d",muted:"#4d7c5c",danger:"#dc2626",success:"#16a34a",
    dark:false,radius:"10px",cardRadius:"14px",
    font:"'DM Sans',sans-serif",displayFont:"'Syne',sans-serif",
    heroBg:"linear-gradient(135deg,#14532d,#16a34a,#22c55e)",
  },
  luxury: {
    name:"Luxury",icon:"👑",
    bg:"#0a0806",surface:"#12100e",card:"#1a1610",border:"#3a3020",
    accent:"#d4a853",accent2:"#f0c060",accentSoft:"#d4a85318",
    headerBg:"#0a0806",headerText:"#d4a853",
    gold:"#d4a853",teal:"#4dd0e1",purple:"#b39ddb",
    text:"#f5e6c8",muted:"#a08c60",danger:"#e57373",success:"#81c784",
    dark:true,radius:"8px",cardRadius:"12px",
    font:"'Cormorant Garamond',serif",displayFont:"'Cormorant Garamond',serif",
    heroBg:"linear-gradient(135deg,#d4a85318,#f0c06010)",
  },
};

// ══════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════════════════════
const TR = {
  en:{
    appName:"DUMPAE",appTag:"PHONES",
    home:"Home",store:"Store",vendors:"Vendors",about:"About",contact:"Contact",
    privacy:"Privacy",pos:"POS",admin:"Admin",
    cats:"Categories",brands:"Brands",deals:"Deals",
    searchPlaceholder:"Search phones, accessories, brands...",
    addCart:"Add to Cart",buyNow:"Buy Now",viewAll:"View All",visitStore:"Visit Store",
    onlyLeft:"Only",left:"left!",reviews:"reviews",inStock:"In Stock",outStock:"Out of Stock",
    cartTitle:"Cart",emptyCart:"Your cart is empty",
    subtotal:"Subtotal",tax:"Tax (8%)",discount:"Discount",total:"Total",
    secureCheckout:"🔒 Checkout",continueShopping:"Continue Shopping",
    shopNow:"Shop Now",learnMore:"Learn More",seeDeals:"See Deals",
    featuredBrands:"Featured Brands",topPicks:"Top Picks",
    bestSellers:"Best Sellers",newArrivals:"New Arrivals",flashDeals:"⚡ Flash Deals",
    whyUs:"Why Shop With Us",
    r1t:"Genuine Products",r1d:"100% authentic accessories from verified suppliers",
    r2t:"Same-Day Delivery",r2d:"Order before 2PM for same-day delivery in Dar es Salaam",
    r3t:"Easy Returns",r3d:"30-day hassle-free returns on all products",
    r4t:"Expert Support",r4d:"Our phone accessories specialists help you 24/7",
    aboutTitle:"About DUMPAE Phones",
    aboutMission:"Our Mission",aboutMissionText:"DUMPAE Phones was founded to bring the widest selection of genuine phone accessories to Tanzania. From budget-friendly essentials to premium gear, we stock everything for every phone.",
    aboutVision:"Our Vision",aboutVisionText:"To be East Africa's most trusted phone accessories destination, with the best prices, fastest delivery, and genuine products every time.",
    aboutStats:[["2022","Founded"],["500+","Products"],["50k+","Orders"],["4.9★","Rating"]],
    aboutTeamTitle:"Our Team",
    team:[{name:"Hassan Juma",role:"CEO & Founder",emoji:"👨‍💼"},{name:"Amina Saleh",role:"Operations",emoji:"👩‍💼"},{name:"David Mbeki",role:"Tech Lead",emoji:"👨‍💻"},{name:"Fatuma Ali",role:"Customer Care",emoji:"👩‍🎨"}],
    contactTitle:"Contact Us",contactDesc:"We're here to help — reach out any time!",
    contactName:"Your Name",contactEmail:"Email",contactMsg:"Message",contactSend:"Send Message",
    phoneNum:"+255 744 000 000",addressVal:"Kariakoo, Dar es Salaam",hoursVal:"Mon–Sat 8AM–8PM",
    privacyTitle:"Privacy Policy",privacyUpdated:"Last Updated: January 1, 2026",
    privacySections:[
      {title:"Information We Collect",body:"We collect name, email, address, payment info, and browsing data to provide our services."},
      {title:"How We Use It",body:"To process orders, personalize your experience, send deals (with consent), and improve our platform."},
      {title:"Data Sharing",body:"We never sell your data. We share only with vendors and payment processors under confidentiality agreements."},
      {title:"Security",body:"256-bit SSL encryption protects all transactions and personal data on our platform."},
      {title:"Your Rights",body:"Access, correct, or delete your data at any time by emailing privacy@dumpae.co.tz."},
      {title:"Contact",body:"Email privacy@dumpae.co.tz or write to DUMPAE Phones, Kariakoo, Dar es Salaam, Tanzania."},
    ],
    posTitle:"Point of Sale",posDesc:"Fast checkout for your retail store",
    currentOrder:"Current Order",noItems:"No items",tapToAdd:"Tap to add",
    discLabel:"Discount",clearOrder:"Clear",charge:"Charge",
    cash:"Cash",card:"Card",mobile:"Mobile",
    orderComplete:"Order Complete!",newOrder:"New Order",paidVia:"Paid via",orderNo:"Order",
    dashTitle:"Admin Dashboard",dashDesc:"Platform overview — last 30 days",
    revenue:"Revenue",orders:"Orders",customers:"Customers",listed:"Products",avgRating:"Rating",
    vendorPerf:"Vendor Performance",recentOrders:"Recent Orders",
    orderCol:"Order",custCol:"Customer",vendCol:"Vendor",prodCol:"Product",
    amtCol:"Amount",statusCol:"Status",timeCol:"Time",
    theme:"Theme",language:"Language",currency:"Currency",
    sortPopular:"Popular",sortRating:"Top Rated",sortLow:"Price ↑",sortHigh:"Price ↓",sortNew:"Newest",
    products:"products",
    followUs:"Follow Us",newsletter:"Newsletter",newsletterSub:"Get the best phone deals in your inbox",
    subscribe:"Subscribe",emailPlaceholder:"Enter your email",
    footerCopy:"© 2026 DUMPAE Phones · Dar es Salaam, Tanzania",
    relatedProducts:"Related Products",productDetails:"Product Details",specifications:"Specifications",
    color:"Color",storage:"Storage",brand:"Brand",compatibility:"Compatibility",material:"Material",
    addedToCart:"Added to cart!",quickView:"Quick View",compare:"Compare",share:"Share",
    megaMenu:{
      cats:"Categories",brands:"All Brands",deals:"Today's Deals",
      subCats:[
        {label:"Cases & Covers",icon:"📱",sub:["iPhone Cases","Samsung Cases","Xiaomi Cases","Infinix Cases","Techno Cases","Universal Cases"]},
        {label:"Chargers & Power",icon:"🔌",sub:["Fast Chargers","Wireless Chargers","Power Banks","Car Chargers","Solar Chargers","Multi-Port Hubs"]},
        {label:"Audio",icon:"🎵",sub:["TWS Earbuds","Wired Earphones","Bluetooth Speakers","Headphones","Microphones","Audio Adapters"]},
        {label:"Cables & Data",icon:"🔗",sub:["USB-C Cables","Lightning Cables","Micro USB","OTG Adapters","Data Transfer","Extension Cables"]},
        {label:"Screen Protection",icon:"🔲",sub:["Tempered Glass","Privacy Glass","Anti-Glare","Full Coverage","Camera Protectors","Curved Glass"]},
        {label:"Mounts & Holders",icon:"🧲",sub:["Car Mounts","Desk Stands","Ring Holders","Selfie Sticks","Tripods","Wall Mounts"]},
        {label:"Smartwatches",icon:"⌚",sub:["Smart Bands","Watch Straps","Charging Docks","Screen Protectors","Watch Cases","Sports Bands"]},
        {label:"Photography",icon:"📸",sub:["Camera Lenses","Ring Lights","Stabilizers","Macro Lenses","Wide Angle","Photography Kits"]},
      ],
      brandList:[
        {name:"Apple",icon:"🍎"},{name:"Samsung",icon:"📲"},{name:"Xiaomi",icon:"⚡"},
        {name:"Infinix",icon:"∞"},{name:"Techno",icon:"📡"},{name:"OPPO",icon:"🔵"},
        {name:"Vivo",icon:"🎵"},{name:"Realme",icon:"🔶"},{name:"Itel",icon:"📟"},{name:"Nokia",icon:"📻"},
      ],
    },
    heroSlides:[
      {title:"Tanzania's #1 Phone Accessories Store",sub:"1000+ products for all brands · Same-day delivery Dar es Salaam",btn:"Shop Now",emoji:"📱"},
      {title:"TWS Earbuds Starting at TSh 25,000",sub:"Premium sound quality. True wireless freedom. All brands.",btn:"Shop Audio",emoji:"🎵"},
      {title:"Flash Sale: 65W Chargers from $9.99",sub:"Charge your phone in 30 minutes. Limited stock — grab yours now!",btn:"Shop Chargers",emoji:"⚡"},
      {title:"Samsung & iPhone Cases — 500+ Designs",sub:"Slim, rugged, wallet, clear & designer cases for every style",btn:"Browse Cases",emoji:"🛡"},
    ],
  },
  sw:{
    appName:"DUMPAE",appTag:"SIMU",
    home:"Nyumbani",store:"Duka",vendors:"Wauuzaji",about:"Kuhusu",contact:"Wasiliana",
    privacy:"Faragha",pos:"POS",admin:"Msimamizi",
    cats:"Kategoria",brands:"Bidhaa",deals:"Matoleo",
    searchPlaceholder:"Tafuta simu, vifaa, brand...",
    addCart:"Ongeza Kikapuni",buyNow:"Nunua Sasa",viewAll:"Ona Zote",visitStore:"Tembelea Duka",
    onlyLeft:"Zimebaki",left:"tu!",reviews:"tathmini",inStock:"Ipo Stokuni",outStock:"Imekwisha",
    cartTitle:"Kikapu",emptyCart:"Kikapu chako kiko tupu",
    subtotal:"Jumla Ndogo",tax:"Kodi (8%)",discount:"Punguzo",total:"Jumla",
    secureCheckout:"🔒 Checkout",continueShopping:"Endelea Kununua",
    shopNow:"Nunua Sasa",learnMore:"Jifunze Zaidi",seeDeals:"Ona Matoleo",
    featuredBrands:"Brand Maarufu",topPicks:"Bidhaa Bora",
    bestSellers:"Zinazouzwa Zaidi",newArrivals:"Bidhaa Mpya",flashDeals:"⚡ Matoleo ya Haraka",
    whyUs:"Kwa Nini Sisi",
    r1t:"Bidhaa Halisi",r1d:"Vifaa 100% halisi kutoka wasambazaji waliohakikishwa",
    r2t:"Utoaji Siku Hiyo",r2d:"Agiza kabla ya saa 8 asubuhi kupata utoaji siku hiyo Dar es Salaam",
    r3t:"Marejesho Rahisi",r3d:"Bidhaa zinarudishwa bila shida ndani ya siku 30",
    r4t:"Msaada wa Wataalamu",r4d:"Wataalamu wetu wa vifaa vya simu wanakusaidia 24/7",
    aboutTitle:"Kuhusu DUMPAE Simu",
    aboutMission:"Dhamira Yetu",aboutMissionText:"DUMPAE Phones ilianzishwa kuleta anuwai kubwa ya vifaa halisi vya simu Tanzania. Kutoka bidhaa za bei nafuu hadi za hali ya juu, tuna kila kitu kwa kila simu.",
    aboutVision:"Maono Yetu",aboutVisionText:"Kuwa sehemu inayoaminika zaidi ya vifaa vya simu Afrika Mashariki, na bei bora, utoaji wa haraka, na bidhaa halisi kila wakati.",
    aboutStats:[["2022","Kuanzishwa"],["500+","Bidhaa"],["50k+","Maagizo"],["4.9★","Kiwango"]],
    aboutTeamTitle:"Timu Yetu",
    team:[{name:"Hassan Juma",role:"Mkurugenzi",emoji:"👨‍💼"},{name:"Amina Saleh",role:"Shughuli",emoji:"👩‍💼"},{name:"David Mbeki",role:"Teknolojia",emoji:"👨‍💻"},{name:"Fatuma Ali",role:"Wateja",emoji:"👩‍🎨"}],
    contactTitle:"Wasiliana Nasi",contactDesc:"Tuko hapa kukusaidia — wasiliana wakati wowote!",
    contactName:"Jina Lako",contactEmail:"Barua Pepe",contactMsg:"Ujumbe",contactSend:"Tuma Ujumbe",
    phoneNum:"+255 744 000 000",addressVal:"Kariakoo, Dar es Salaam",hoursVal:"Jumatatu–Jumamosi 8AM–8PM",
    privacyTitle:"Sera ya Faragha",privacyUpdated:"Ilisasishwa: Januari 1, 2026",
    privacySections:[
      {title:"Taarifa Tunazokusanya",body:"Tunakusanya jina, barua pepe, anwani, malipo, na data ya kuvinjari kutoa huduma zetu."},
      {title:"Jinsi Tunavyoitumia",body:"Kusindika maagizo, kuboresha uzoefu, kutuma matoleo (kwa idhini), na kuboresha jukwaa."},
      {title:"Kushiriki Data",body:"Hatuuzi data yako. Tunashiriki tu na wauuzaji na wasindikaji wa malipo."},
      {title:"Usalama",body:"SSL ya 256-bit inalinda miamala yote na data ya kibinafsi kwenye jukwaa letu."},
      {title:"Haki Zako",body:"Fikia, rekebisha, au futa data yako wakati wowote kwa kuandika privacy@dumpae.co.tz."},
      {title:"Wasiliana",body:"Tuma barua pepe privacy@dumpae.co.tz au andika DUMPAE Phones, Kariakoo, Dar es Salaam."},
    ],
    posTitle:"Mauzo ya Dukani",posDesc:"Checkout ya haraka kwa duka lako",
    currentOrder:"Agizo la Sasa",noItems:"Hakuna bidhaa",tapToAdd:"Gusa kuongeza",
    discLabel:"Punguzo",clearOrder:"Futa",charge:"Lipisha",
    cash:"Taslimu",card:"Kadi",mobile:"Simu",
    orderComplete:"Agizo Limekamilika!",newOrder:"Agizo Jipya",paidVia:"Imelipwa kwa",orderNo:"Agizo",
    dashTitle:"Dashibodi ya Msimamizi",dashDesc:"Muhtasari wa jukwaa — siku 30 zilizopita",
    revenue:"Mapato",orders:"Maagizo",customers:"Wateja",listed:"Bidhaa",avgRating:"Kiwango",
    vendorPerf:"Utendaji wa Wauuzaji",recentOrders:"Maagizo ya Hivi Karibuni",
    orderCol:"Agizo",custCol:"Mteja",vendCol:"Muuzaji",prodCol:"Bidhaa",
    amtCol:"Kiasi",statusCol:"Hali",timeCol:"Wakati",
    theme:"Mandhari",language:"Lugha",currency:"Sarafu",
    sortPopular:"Maarufu",sortRating:"Iliyopimwa",sortLow:"Bei ↑",sortHigh:"Bei ↓",sortNew:"Mpya",
    products:"bidhaa",
    followUs:"Tufuate",newsletter:"Jarida",newsletterSub:"Pata matoleo bora ya simu kwenye barua pepe yako",
    subscribe:"Jiandikishe",emailPlaceholder:"Ingiza barua pepe",
    footerCopy:"© 2026 DUMPAE Phones · Dar es Salaam, Tanzania",
    relatedProducts:"Bidhaa Zinazohusiana",productDetails:"Maelezo ya Bidhaa",specifications:"Vipimo",
    color:"Rangi",storage:"Hifadhi",brand:"Brand",compatibility:"Mwafaka",material:"Nyenzo",
    addedToCart:"Imeongezwa!",quickView:"Angalia Haraka",compare:"Linganisha",share:"Shiriki",
    megaMenu:{
      cats:"Kategoria",brands:"Brand Zote",deals:"Matoleo ya Leo",
      subCats:[
        {label:"Vifuniko",icon:"📱",sub:["Vifuniko iPhone","Vifuniko Samsung","Vifuniko Xiaomi","Vifuniko Infinix","Vifuniko Techno","Vifuniko Vya Jumla"]},
        {label:"Vichaji & Nguvu",icon:"🔌",sub:["Vichaji vya Haraka","Vichaji Bila Waya","Benki za Nguvu","Vichaji vya Gari","Vichaji vya Jua","Hub za Bandari"]},
        {label:"Sauti",icon:"🎵",sub:["Earbuds TWS","Earphones za Nyaya","Spika za Bluetooth","Vichwa vya Sauti","Maikrofoni","Adapta za Sauti"]},
        {label:"Nyaya & Data",icon:"🔗",sub:["Nyaya USB-C","Nyaya Lightning","Micro USB","Adapta OTG","Uhamisho wa Data","Nyaya za Kurefusha"]},
        {label:"Kinga za Skrini",icon:"🔲",sub:["Kioo cha Ugumu","Kioo cha Faragha","Anti-Glare","Ufunikaji Kamili","Kinga za Kamera","Kioo cha Curved"]},
        {label:"Vishikilio",icon:"🧲",sub:["Vishikilio vya Gari","Stendi za Meza","Vishikilio vya Pete","Vijiti vya Selfie","Tripodi","Vishikilio vya Ukuta"]},
        {label:"Saa Mahiri",icon:"⌚",sub:["Bendi za Mahiri","Mikanda ya Saa","Vituo vya Kuchaji","Kinga za Skrini","Maboksi","Mikanda ya Michezo"]},
        {label:"Upigaji Picha",icon:"📸",sub:["Lenzi za Kamera","Taa za Pete","Viimarishaji","Lenzi za Macro","Wide Angle","Vifaa vya Picha"]},
      ],
      brandList:[
        {name:"Apple",icon:"🍎"},{name:"Samsung",icon:"📲"},{name:"Xiaomi",icon:"⚡"},
        {name:"Infinix",icon:"∞"},{name:"Techno",icon:"📡"},{name:"OPPO",icon:"🔵"},
        {name:"Vivo",icon:"🎵"},{name:"Realme",icon:"🔶"},{name:"Itel",icon:"📟"},{name:"Nokia",icon:"📻"},
      ],
    },
    heroSlides:[
      {title:"Duka Nambari Moja la Vifaa vya Simu Tanzania",sub:"Bidhaa 1000+ kwa brand zote · Utoaji siku hiyo Dar es Salaam",btn:"Nunua Sasa",emoji:"📱"},
      {title:"Earbuds TWS Kuanzia TSh 25,000",sub:"Ubora wa sauti wa hali ya juu. Uhuru wa kweli bila waya.",btn:"Nunua Sauti",emoji:"🎵"},
      {title:"Mauzo ya Haraka: Vichaji 65W kutoka TSh 26,000",sub:"Chaji simu yako kwa dakika 30. Stoki ndogo — chukua yako sasa!",btn:"Nunua Vichaji",emoji:"⚡"},
      {title:"Vifuniko Samsung & iPhone — Miundo 500+",sub:"Slim, imara, wallet, wazi & wabunifu kwa kila mtindo",btn:"Vinjari Vifuniko",emoji:"🛡"},
    ],
  },
};

// ══════════════════════════════════════════════════════════════════
// CURRENCY
// ══════════════════════════════════════════════════════════════════
const CURRENCIES = {
  USD:{symbol:"$",rate:1,flag:"🇺🇸",dec:true},
  TZS:{symbol:"TSh",rate:2600,flag:"🇹🇿",dec:false},
};
const fp = (usd,cur) => {
  const c=CURRENCIES[cur], v=usd*c.rate;
  return c.dec?`${c.symbol}${v.toFixed(2)}`:`${c.symbol} ${Math.round(v).toLocaleString()}`;
};

// ══════════════════════════════════════════════════════════════════
// CONTEXT
// ══════════════════════════════════════════════════════════════════
const Ctx = createContext({});
const useC = () => useContext(Ctx);

// ══════════════════════════════════════════════════════════════════
// PRODUCTS WITH MULTIPLE IMAGES (emoji arrays)
// ══════════════════════════════════════════════════════════════════
const PRODUCTS = [
  {id:1,name:"iPhone 15 Pro Max Case - Carbon",nameSw:"Kifuniko cha iPhone 15 Pro Max - Carbon",
   images:["📱","🛡","⬛","🔳"],colors:["⬛ Black","⬜ Clear","🟤 Brown","🔵 Navy"],
   brand:"Apple",compat:"iPhone 15 Pro Max",material:"Carbon Fiber",
   vendor:"TechShield",price:19.99,oldPrice:34.99,cat:"Cases",rating:4.8,reviews:5621,stock:200,discount:43,isNew:true,isBest:true,vc:"#6366f1"},
  {id:2,name:"65W GaN Fast Charger",nameSw:"Kichaji cha Haraka GaN 65W",
   images:["🔌","⚡","🔋","🔆"],colors:["⬛ Black","⬜ White"],
   brand:"Anker",compat:"All USB-C devices",material:"GaN Technology",
   vendor:"PowerHub",price:24.99,oldPrice:44.99,cat:"Chargers",rating:4.9,reviews:8901,stock:150,discount:44,isNew:false,isBest:true,vc:"#f59e0b"},
  {id:3,name:"TWS Pro Earbuds ANC",nameSw:"Earbuds TWS Pro ANC",
   images:["🎵","🎧","👂","🔊"],colors:["⬛ Black","⬜ White","🔵 Blue"],
   brand:"Sony",compat:"All Bluetooth 5.0+ devices",material:"Silicone Tips",
   vendor:"AudioZone",price:49.99,oldPrice:89.99,cat:"Audio",rating:4.9,reviews:7201,stock:85,discount:44,isNew:false,isBest:true,vc:"#06b6d4"},
  {id:4,name:"Braided USB-C Cable 2m",nameSw:"Nyaya ya USB-C Nyuzi 2m",
   images:["🔗","🔌","⬛","🧵"],colors:["⬛ Black","🔴 Red","🔵 Blue","⚪ White"],
   brand:"Baseus",compat:"USB-C devices",material:"Nylon Braided",
   vendor:"CablePro",price:8.99,oldPrice:14.99,cat:"Cables",rating:4.6,reviews:4310,stock:500,discount:40,isNew:true,isBest:false,vc:"#10b981"},
  {id:5,name:"20000mAh Slim Power Bank",nameSw:"Benki ya Nguvu Slim 20000mAh",
   images:["🔋","⚡","📲","💡"],colors:["⬛ Black","⬜ White","🔵 Blue"],
   brand:"Xiaomi",compat:"All USB devices",material:"Aluminum Alloy",
   vendor:"PowerHub",price:34.99,oldPrice:59.99,cat:"Power Banks",rating:4.8,reviews:2980,stock:60,discount:42,isNew:false,isBest:true,vc:"#f59e0b"},
  {id:6,name:"Tempered Glass Screen Protector",nameSw:"Kioo cha Kinga cha Skrini",
   images:["🔲","📱","✨","🔳"],colors:["Clear","Privacy","Anti-Glare"],
   brand:"Spigen",compat:"Samsung S24 Ultra",material:"9H Tempered Glass",
   vendor:"TechShield",price:8.99,oldPrice:14.99,cat:"Screen Protectors",rating:4.5,reviews:8901,stock:500,discount:40,isNew:false,isBest:false,vc:"#6366f1"},
  {id:7,name:"Magnetic Car Phone Mount",nameSw:"Kishikilio cha Simu cha Sumaku Garini",
   images:["🧲","🚗","📱","⬛"],colors:["⬛ Black","⚪ Silver"],
   brand:"Aukey",compat:"All phones with case",material:"Premium Aluminum",
   vendor:"MountPro",price:14.99,oldPrice:24.99,cat:"Mounts",rating:4.7,reviews:3120,stock:120,discount:40,isNew:true,isBest:true,vc:"#ea580c"},
  {id:8,name:"Smartwatch Band 44mm",nameSw:"Mkanda wa Saa Mahiri 44mm",
   images:["⌚","🏃","⬛","🔵"],colors:["⬛ Black","🔵 Navy","🔴 Red","🟢 Green","🟤 Brown"],
   brand:"Samsung",compat:"Samsung Galaxy Watch 4/5/6",material:"Silicone Sport",
   vendor:"WristStyle",price:9.99,oldPrice:19.99,cat:"Smartwatches",rating:4.4,reviews:1890,stock:200,discount:50,isNew:false,isBest:false,vc:"#8b5cf6"},
  {id:9,name:"Ring Light 10 inch LED",nameSw:"Taa ya Pete 10 Inchi LED",
   images:["📸","💡","🔆","🎬"],colors:["⬜ White"],
   brand:"Yunteng",compat:"All phones & cameras",material:"Aluminum + ABS",
   vendor:"PhotoGear",price:29.99,oldPrice:49.99,cat:"Photography",rating:4.6,reviews:2340,stock:45,discount:40,isNew:true,isBest:false,vc:"#f59e0b"},
  {id:10,name:"Samsung Galaxy S24 Case - Military",nameSw:"Kifuniko Samsung Galaxy S24 - Kijeshi",
   images:["📱","🛡","💪","⬛"],colors:["⬛ Black","🟢 Green","🔵 Blue"],
   brand:"Samsung",compat:"Samsung Galaxy S24",material:"TPU + Polycarbonate",
   vendor:"TechShield",price:22.99,oldPrice:39.99,cat:"Cases",rating:4.7,reviews:3200,stock:180,discount:42,isNew:false,isBest:true,vc:"#6366f1"},
  {id:11,name:"Wireless Charging Pad 15W",nameSw:"Pedi ya Kuchaji Bila Waya 15W",
   images:["🔋","⭕","📱","✨"],colors:["⬛ Black","⬜ White"],
   brand:"Belkin",compat:"Qi-enabled phones",material:"Fabric + Rubber",
   vendor:"PowerHub",price:18.99,oldPrice:32.99,cat:"Chargers",rating:4.8,reviews:5600,stock:90,discount:42,isNew:false,isBest:true,vc:"#f59e0b"},
  {id:12,name:"Selfie Stick Tripod Bluetooth",nameSw:"Vijiti vya Selfie Tripodi Bluetooth",
   images:["🤳","📷","📸","🎬"],colors:["⬛ Black","⚪ Silver","🔴 Red"],
   brand:"Joby",compat:"All smartphones",material:"Aluminum Alloy",
   vendor:"PhotoGear",price:19.99,oldPrice:34.99,cat:"Mounts",rating:4.5,reviews:4500,stock:75,discount:43,isNew:true,isBest:false,vc:"#ea580c"},
  {id:13,name:"Xiaomi Case - MagSafe Compatible",nameSw:"Kifuniko Xiaomi - Inaoana na MagSafe",
   images:["📱","🧲","⬛","🌀"],colors:["⬛ Black","🔵 Blue","🟣 Purple"],
   brand:"Xiaomi",compat:"Xiaomi 14 Pro",material:"Magsafe Silicone",
   vendor:"TechShield",price:16.99,oldPrice:28.99,cat:"Cases",rating:4.6,reviews:2100,stock:95,discount:41,isNew:true,isBest:false,vc:"#6366f1"},
  {id:14,name:"Gaming Earphones Hi-Fi",nameSw:"Earphones za Gaming Hi-Fi",
   images:["🎮","🎧","🔊","🎵"],colors:["⬛ Black","🔴 Red"],
   brand:"JBL",compat:"All 3.5mm devices",material:"Aluminum Housing",
   vendor:"AudioZone",price:29.99,oldPrice:54.99,cat:"Audio",rating:4.7,reviews:3890,stock:55,discount:45,isNew:false,isBest:true,vc:"#06b6d4"},
  {id:15,name:"OTG USB-C Hub 7-in-1",nameSw:"Hub USB-C OTG 7-in-1",
   images:["🔗","💻","📱","🖥"],colors:["⬛ Space Grey","⚪ Silver"],
   brand:"Anker",compat:"USB-C laptops & phones",material:"Aluminum",
   vendor:"CablePro",price:39.99,oldPrice:69.99,cat:"Cables",rating:4.9,reviews:6700,stock:40,discount:43,isNew:false,isBest:true,vc:"#10b981"},
  {id:16,name:"Privacy Screen Protector iPhone",nameSw:"Kinga ya Skrini ya Faragha iPhone",
   images:["🔲","🕵","📱","🔳"],colors:["Privacy Black"],
   brand:"Apple",compat:"iPhone 14/15 series",material:"Tempered Glass",
   vendor:"TechShield",price:12.99,oldPrice:22.99,cat:"Screen Protectors",rating:4.4,reviews:2890,stock:300,discount:43,isNew:true,isBest:false,vc:"#6366f1"},
];

const POS_ITEMS = [
  {id:1,name:"Phone Case Basic",nameSw:"Kifuniko cha Msingi",price:9.99,image:"📱",cat:"Cases",catSw:"Vifuniko"},
  {id:2,name:"USB-C Cable 1m",nameSw:"Nyaya USB-C 1m",price:4.99,image:"🔗",cat:"Cables",catSw:"Nyaya"},
  {id:3,name:"Screen Protector",nameSw:"Kinga ya Skrini",price:6.99,image:"🔲",cat:"Protection",catSw:"Kinga"},
  {id:4,name:"Car Charger 20W",nameSw:"Kichaji cha Gari 20W",price:12.99,image:"🔌",cat:"Chargers",catSw:"Vichaji"},
  {id:5,name:"TWS Earbuds Basic",nameSw:"Earbuds TWS Msingi",price:19.99,image:"🎵",cat:"Audio",catSw:"Sauti"},
  {id:6,name:"Phone Stand Desktop",nameSw:"Stendi ya Meza",price:8.99,image:"🧲",cat:"Mounts",catSw:"Vishikilio"},
  {id:7,name:"10000mAh Power Bank",nameSw:"Benki ya Nguvu 10000mAh",price:24.99,image:"🔋",cat:"Power",catSw:"Nguvu"},
  {id:8,name:"Selfie Ring Light",nameSw:"Taa ya Selfie",price:14.99,image:"📸",cat:"Photography",catSw:"Picha"},
  {id:9,name:"Fast Charger 33W",nameSw:"Kichaji cha Haraka 33W",price:14.99,image:"⚡",cat:"Chargers",catSw:"Vichaji"},
  {id:10,name:"Wired Earphones",nameSw:"Earphones za Nyaya",price:9.99,image:"🎧",cat:"Audio",catSw:"Sauti"},
  {id:11,name:"Phone Cleaning Kit",nameSw:"Seti ya Kusafisha Simu",price:4.99,image:"🧹",cat:"Accessories",catSw:"Vifaa"},
  {id:12,name:"OTG Adapter",nameSw:"Adapta OTG",price:3.99,image:"🔌",cat:"Cables",catSw:"Nyaya"},
];

const BRANDS = [
  {name:"Apple",icon:"🍎",color:"#555"},
  {name:"Samsung",icon:"📲",color:"#1428a0"},
  {name:"Xiaomi",icon:"⚡",color:"#ff6900"},
  {name:"Anker",icon:"🔋",color:"#00a0dc"},
  {name:"Baseus",icon:"🔌",color:"#1c1c1c"},
  {name:"Spigen",icon:"🛡",color:"#1a73e8"},
  {name:"Sony",icon:"🎵",color:"#000"},
  {name:"Belkin",icon:"📡",color:"#e5003d"},
  {name:"JBL",icon:"🔊",color:"#f70"},
  {name:"Aukey",icon:"⚙",color:"#c00"},
];

const PHONE_CATS = [
  {id:"Cases",icon:"📱",color:"#6366f1",en:"Cases & Covers",sw:"Vifuniko"},
  {id:"Chargers",icon:"🔌",color:"#f59e0b",en:"Chargers",sw:"Vichaji"},
  {id:"Audio",icon:"🎵",color:"#06b6d4",en:"Audio & Sound",sw:"Sauti"},
  {id:"Cables",icon:"🔗",color:"#10b981",en:"Cables & Data",sw:"Nyaya"},
  {id:"Power Banks",icon:"🔋",color:"#f59e0b",en:"Power Banks",sw:"Benki za Nguvu"},
  {id:"Screen Protectors",icon:"🔲",color:"#6366f1",en:"Screen Protection",sw:"Kinga za Skrini"},
  {id:"Mounts",icon:"🧲",color:"#ea580c",en:"Mounts & Stands",sw:"Vishikilio"},
  {id:"Smartwatches",icon:"⌚",color:"#8b5cf6",en:"Smartwatches",sw:"Saa Mahiri"},
  {id:"Photography",icon:"📸",color:"#f59e0b",en:"Photography",sw:"Upigaji Picha"},
];

// ══════════════════════════════════════════════════════════════════
// GLOBAL CSS
// ══════════════════════════════════════════════════════════════════
function GlobalCSS(){
  const {th}=useC();
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=Nunito+Sans:wght@400;600;700;800&family=Cormorant+Garamond:wght@400;600;700&family=Share+Tech+Mono&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:${th.font};background:${th.bg};color:${th.text};}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:${th.surface};}
    ::-webkit-scrollbar-thumb{background:${th.accent};border-radius:2px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    @keyframes glow{0%,100%{box-shadow:0 0 8px ${th.accent}40}50%{box-shadow:0 0 20px ${th.accent}80}}
    .fade-up{animation:fadeUp 0.4s ease both;}
    .fade-in{animation:fadeIn 0.3s ease both;}
    input:focus,textarea:focus{outline:none!important;border-color:${th.accent}!important;}
    select{outline:none;}
  `}</style>;
}

// ══════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════
function Stars({r,n}){
  const {th,t}=useC();
  return <span style={{display:"inline-flex",alignItems:"center",gap:4}}>
    <span style={{color:th.gold,fontSize:12}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}</span>
    <span style={{color:th.muted,fontSize:11}}>{r} {n?`(${n.toLocaleString()} ${t.reviews})`:""}</span>
  </span>;
}

function Badge({children,color,bg}){
  const {th}=useC();
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 8px",borderRadius:20,fontSize:10,fontWeight:800,letterSpacing:"0.3px",color:color||th.accent,background:bg||(th.accent+"18")}}>{children}</span>;
}

// ══════════════════════════════════════════════════════════════════
// MULTI-IMAGE PRODUCT CARD
// ══════════════════════════════════════════════════════════════════
function ProductCard({p,onAdd,onQuickView}){
  const {th,t,lang,cur}=useC();
  const [imgIdx,setImgIdx]=useState(0);
  const [wished,setWished]=useState(false);
  const [added,setAdded]=useState(false);
  const name=lang==="sw"?p.nameSw:p.name;

  const handleAdd=(e)=>{
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    setTimeout(()=>setAdded(false),1400);
  };

  return(
    <div style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,overflow:"hidden",
      position:"relative",transition:"all 0.25s",display:"flex",flexDirection:"column"}}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 36px ${p.vc}25`;e.currentTarget.style.borderColor=p.vc+"55";e.currentTarget.style.transform="translateY(-3px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";}}>

      {/* Badges */}
      <div style={{position:"absolute",top:10,left:10,zIndex:3,display:"flex",flexDirection:"column",gap:4}}>
        {p.discount>0&&<Badge color="#fff" bg={th.danger}>-{p.discount}%</Badge>}
        {p.isNew&&<Badge color="#fff" bg={th.teal}>NEW</Badge>}
        {p.isBest&&<Badge color="#fff" bg={th.gold}>⭐ BEST</Badge>}
      </div>

      {/* Wishlist */}
      <button onClick={(e)=>{e.stopPropagation();setWished(!wished);}} style={{position:"absolute",top:10,right:10,zIndex:3,background:wished?"#fff":th.dark?"#ffffff20":"#f0f0f0",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:16,transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {wished?"❤️":"🤍"}
      </button>

      {/* Image Area with thumbnail strip */}
      <div style={{background:`linear-gradient(135deg,${p.vc}15,${p.vc}05)`,padding:"8px 8px 0",position:"relative"}}>
        {/* Main image display */}
        <div style={{height:150,display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,transition:"all 0.2s",cursor:"pointer"}}
          onClick={()=>onQuickView&&onQuickView(p)}>
          {p.images[imgIdx]}
        </div>
        {/* Thumbnail strip */}
        <div style={{display:"flex",gap:5,justifyContent:"center",padding:"8px 0 6px"}}>
          {p.images.map((img,i)=>(
            <button key={i} onMouseEnter={()=>setImgIdx(i)} onClick={e=>{e.stopPropagation();setImgIdx(i);}} style={{width:36,height:36,borderRadius:8,border:`2px solid ${i===imgIdx?p.vc:th.border}`,background:i===imgIdx?p.vc+"15":th.surface,cursor:"pointer",fontSize:20,transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {img}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{padding:"12px 14px",flex:1,display:"flex",flexDirection:"column",gap:6}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <Badge color={p.vc} bg={p.vc+"18"}>{p.brand}</Badge>
          <Badge color={th.muted} bg={th.border}>{lang==="sw"?(PHONE_CATS.find(c=>c.id===p.cat)||{sw:p.cat}).sw:p.cat}</Badge>
        </div>
        <div style={{fontSize:14,fontWeight:700,color:th.text,lineHeight:1.35,flex:1}}>{name}</div>
        <Stars r={p.rating} n={p.reviews}/>
        {/* Color swatches */}
        {p.colors&&p.colors.length>1&&(
          <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:th.muted}}>{t.color}:</span>
            {p.colors.slice(0,5).map((c,i)=>(
              <span key={i} title={c} style={{fontSize:10,color:th.muted,cursor:"pointer",padding:"1px 5px",borderRadius:10,border:`1px solid ${th.border}`,background:th.bg}}>{c.split(" ")[0]}</span>
            ))}
            {p.colors.length>5&&<span style={{fontSize:10,color:th.muted}}>+{p.colors.length-5}</span>}
          </div>
        )}
        {/* Compatibility */}
        <div style={{fontSize:11,color:th.muted,lineHeight:1.3}}>✓ {p.compat}</div>
        {/* Price */}
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:2}}>
          <span style={{fontSize:19,fontWeight:800,color:th.accent,fontFamily:th.displayFont}}>{fp(p.price,cur)}</span>
          {p.oldPrice&&<span style={{fontSize:12,color:th.muted,textDecoration:"line-through"}}>{fp(p.oldPrice,cur)}</span>}
        </div>
        {p.stock<20&&<div style={{fontSize:11,color:th.danger,fontWeight:700}}>⚡ {t.onlyLeft} {p.stock} {t.left}</div>}
        {/* CTA */}
        <div style={{display:"flex",gap:6,marginTop:4}}>
          <button onClick={handleAdd} style={{flex:1,padding:"9px 6px",border:"none",borderRadius:th.radius,cursor:"pointer",
            background:added?th.success:`linear-gradient(135deg,${th.accent},${th.accent2})`,
            color:"#fff",fontWeight:700,fontSize:13,fontFamily:th.font,transition:"all 0.25s"}}
            onMouseEnter={e=>{if(!added){e.currentTarget.style.opacity="0.88";}}}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {added?`✅ ${t.addedToCart}`:`🛒 ${t.addCart}`}
          </button>
          <button onClick={()=>onQuickView&&onQuickView(p)} style={{padding:"9px 12px",borderRadius:th.radius,border:`1.5px solid ${th.accent}`,background:"transparent",color:th.accent,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=th.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=th.accent;}}>
            👁
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// QUICK VIEW MODAL (multi-image gallery)
// ══════════════════════════════════════════════════════════════════
function QuickViewModal({p,onClose,onAdd}){
  const {th,t,lang,cur}=useC();
  const [imgIdx,setImgIdx]=useState(0);
  const [selColor,setSelColor]=useState(0);
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  const name=lang==="sw"?p.nameSw:p.name;
  const related=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);

  const handleAdd=()=>{
    for(let i=0;i<qty;i++) onAdd(p);
    setAdded(true);
    setTimeout(()=>setAdded(false),1500);
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}
      onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"#000000aa",backdropFilter:"blur(8px)"}}/>
      <div style={{position:"relative",background:th.card,borderRadius:th.cardRadius,maxWidth:900,width:"100%",maxHeight:"90vh",overflow:"auto",boxShadow:"0 32px 80px #00000060",border:`1px solid ${th.border}`}}
        onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,zIndex:10,background:th.border,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:18,color:th.muted,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          {/* Left: Image Gallery */}
          <div style={{background:`linear-gradient(135deg,${p.vc}12,${p.vc}04)`,padding:"32px",display:"flex",flexDirection:"column",alignItems:"center",gap:16,borderRadius:`${th.cardRadius} 0 0 ${th.cardRadius}`}}>
            <div style={{fontSize:120,transition:"all 0.3s"}}>{p.images[imgIdx]}</div>
            <div style={{display:"flex",gap:8}}>
              {p.images.map((img,i)=>(
                <button key={i} onClick={()=>setImgIdx(i)} style={{width:56,height:56,borderRadius:10,border:`2.5px solid ${i===imgIdx?p.vc:th.border}`,background:i===imgIdx?p.vc+"18":th.surface,cursor:"pointer",fontSize:28,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                  {img}
                </button>
              ))}
            </div>
            {/* Share/Compare */}
            <div style={{display:"flex",gap:8}}>
              {[{icon:"📤",lbl:t.share},{icon:"⚖",lbl:t.compare}].map(a=>(
                <button key={a.lbl} style={{padding:"6px 14px",borderRadius:th.radius,border:`1px solid ${th.border}`,background:"transparent",color:th.muted,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:th.font}}>{a.icon} {a.lbl}</button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div style={{padding:"28px 28px 28px 24px",display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Badge color={p.vc} bg={p.vc+"18"}>{p.brand}</Badge>
              {p.isNew&&<Badge color="#fff" bg={th.teal}>NEW</Badge>}
              {p.isBest&&<Badge color="#fff" bg={th.gold}>⭐ BEST</Badge>}
            </div>
            <h2 style={{fontFamily:th.displayFont,fontSize:20,fontWeight:800,color:th.text,lineHeight:1.3}}>{name}</h2>
            <Stars r={p.rating} n={p.reviews}/>

            {/* Price */}
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
              <span style={{fontSize:28,fontWeight:800,color:th.accent,fontFamily:th.displayFont}}>{fp(p.price,cur)}</span>
              {p.oldPrice&&<><span style={{fontSize:16,color:th.muted,textDecoration:"line-through"}}>{fp(p.oldPrice,cur)}</span>
              <Badge color="#fff" bg={th.danger}>-{p.discount}% OFF</Badge></>}
            </div>

            {/* Specs */}
            <div style={{background:th.surface,borderRadius:th.radius,padding:"14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[
                {icon:"📱",label:t.compatibility,value:p.compat},
                {icon:"🏷",label:t.brand,value:p.brand},
                {icon:"🧵",label:t.material,value:p.material},
                {icon:"📦",label:p.stock>20?t.inStock:t.onlyLeft,value:p.stock>20?"✅":p.stock+" "+t.left},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",flexDirection:"column",gap:2}}>
                  <span style={{fontSize:10,color:th.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.4px"}}>{s.icon} {s.label}</span>
                  <span style={{fontSize:13,fontWeight:600,color:th.text}}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Colors */}
            {p.colors&&<div>
              <div style={{fontSize:12,fontWeight:600,color:th.muted,marginBottom:8}}>{t.color}: <span style={{color:th.text}}>{p.colors[selColor]}</span></div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {p.colors.map((c,i)=>(
                  <button key={i} onClick={()=>setSelColor(i)} style={{padding:"5px 12px",borderRadius:20,border:`2px solid ${i===selColor?p.vc:th.border}`,background:i===selColor?p.vc+"18":th.bg,cursor:"pointer",fontSize:12,fontWeight:600,color:i===selColor?p.vc:th.muted,transition:"all 0.2s"}}>
                    {c}
                  </button>
                ))}
              </div>
            </div>}

            {/* Qty */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:12,fontWeight:600,color:th.muted}}>Qty:</span>
              <div style={{display:"flex",alignItems:"center",gap:8,background:th.surface,borderRadius:th.radius,padding:"4px 8px",border:`1px solid ${th.border}`}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{width:28,height:28,borderRadius:6,background:th.border,border:"none",color:th.text,cursor:"pointer",fontWeight:700,fontSize:16}}>−</button>
                <span style={{minWidth:28,textAlign:"center",fontWeight:800,fontSize:16,color:th.text}}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{width:28,height:28,borderRadius:6,background:th.accent,border:"none",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:16}}>+</button>
              </div>
              <span style={{fontSize:12,color:th.muted}}>Total: <strong style={{color:th.accent}}>{fp(p.price*qty,cur)}</strong></span>
            </div>

            {/* Buttons */}
            <div style={{display:"flex",gap:8}}>
              <button onClick={handleAdd} style={{flex:1,padding:"13px",borderRadius:th.radius,border:"none",cursor:"pointer",
                background:added?th.success:`linear-gradient(135deg,${th.accent},${th.accent2})`,
                color:"#fff",fontWeight:700,fontSize:15,fontFamily:th.font,transition:"all 0.25s"}}>
                {added?`✅ ${t.addedToCart}`:`🛒 ${t.addCart}`}
              </button>
              <button style={{padding:"13px 20px",borderRadius:th.radius,border:`2px solid ${th.accent}`,background:"transparent",color:th.accent,cursor:"pointer",fontWeight:700,fontSize:15,fontFamily:th.font,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=th.accent;e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=th.accent;}}>
                {t.buyNow}
              </button>
            </div>

            {/* Trust badges */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap",paddingTop:8,borderTop:`1px solid ${th.border}`}}>
              {["🔒 Secure","🚀 Fast Delivery","↩️ 30-Day Return","✅ Genuine"].map(b=>(
                <span key={b} style={{fontSize:11,color:th.muted,fontWeight:600}}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length>0&&(
          <div style={{padding:"20px 28px",borderTop:`1px solid ${th.border}`}}>
            <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:16}}>{t.relatedProducts}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {related.map(r=>{
                const rn=lang==="sw"?r.nameSw:r.name;
                return(
                  <div key={r.id} style={{background:th.surface,borderRadius:th.radius,padding:"12px",cursor:"pointer",border:`1px solid ${th.border}`,transition:"all 0.2s",textAlign:"center"}}
                    onClick={()=>{onClose();setTimeout(()=>{},100);}}>
                    <div style={{fontSize:40,marginBottom:6}}>{r.images[0]}</div>
                    <div style={{fontSize:12,fontWeight:600,color:th.text,marginBottom:4,lineHeight:1.2}}>{rn}</div>
                    <div style={{fontSize:13,fontWeight:800,color:th.accent}}>{fp(r.price,cur)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MEGA MENU NAVIGATION
// ══════════════════════════════════════════════════════════════════
function MegaMenu({onNav,onCatFilter}){
  const {th,t,lang}=useC();
  const [open,setOpen]=useState(null); // "cats"|"brands"|"deals"
  const ref=useRef(null);
  const mm=t.megaMenu;

  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(null);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  const menuTriggers=[
    {key:"cats",label:`${t.cats} ▾`,icon:"📦"},
    {key:"brands",label:`${t.brands} ▾`,icon:"🏷"},
    {key:"deals",label:`⚡ ${t.deals}`,icon:"🔥"},
  ];

  return(
    <div ref={ref} style={{position:"relative",zIndex:500}}>
      <div style={{display:"flex",gap:2}}>
        {menuTriggers.map(m=>(
          <button key={m.key}
            onMouseEnter={()=>setOpen(m.key)}
            onClick={()=>setOpen(open===m.key?null:m.key)}
            style={{padding:"8px 14px",borderRadius:th.radius==="4px"?0:8,border:"none",cursor:"pointer",fontFamily:th.font,fontWeight:700,fontSize:13,
              background:open===m.key?"#ffffff30":"transparent",color:"#fff",
              transition:"all 0.15s",display:"flex",alignItems:"center",gap:5}}>
            {m.label}
          </button>
        ))}
      </div>

      {/* DROPDOWN PANEL */}
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,
          background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,
          boxShadow:`0 20px 60px #00000030`,minWidth:open==="cats"?780:open==="brands"?400:360,
          animation:"fadeUp 0.2s ease"}}
          onMouseLeave={()=>setOpen(null)}>

          {open==="cats"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,padding:"8px"}}>
              {mm.subCats.map(sc=>(
                <div key={sc.label} style={{padding:"12px 10px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${th.border}`}}>
                    <span style={{fontSize:18}}>{sc.icon}</span>
                    <span style={{fontWeight:700,fontSize:13,color:th.text}}>{sc.label}</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    {sc.sub.map(s=>(
                      <span key={s} onClick={()=>{setOpen(null);onNav("store");}} style={{fontSize:12,color:th.muted,cursor:"pointer",padding:"2px 4px",borderRadius:4,transition:"all 0.15s"}}
                        onMouseEnter={e=>{e.currentTarget.style.color=th.accent;e.currentTarget.style.background=th.accent+"10";}}
                        onMouseLeave={e=>{e.currentTarget.style.color=th.muted;e.currentTarget.style.background="transparent";}}>
                        → {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {open==="brands"&&(
            <div style={{padding:"16px"}}>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:14,color:th.text,marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${th.border}`}}>
                {mm.brands}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
                {mm.brandList.map(b=>(
                  <button key={b.name} onClick={()=>{setOpen(null);onNav("store");}} style={{padding:"12px 8px",borderRadius:th.radius,border:`1px solid ${th.border}`,background:th.bg,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent;e.currentTarget.style.background=th.accent+"10";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.background=th.bg;}}>
                    <span style={{fontSize:24}}>{b.icon}</span>
                    <span style={{fontSize:12,fontWeight:600,color:th.text}}>{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {open==="deals"&&(
            <div style={{padding:"16px",width:340}}>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:14,color:th.text,marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${th.border}`}}>
                ⚡ {mm.deals}
              </div>
              {PRODUCTS.filter(p=>p.discount>=40).slice(0,4).map(p=>{
                const n=lang==="sw"?p.nameSw:p.name;
                return(
                  <div key={p.id} onClick={()=>{setOpen(null);onNav("store");}} style={{display:"flex",gap:10,alignItems:"center",padding:"10px",borderRadius:th.radius,cursor:"pointer",transition:"all 0.15s",marginBottom:4}}
                    onMouseEnter={e=>e.currentTarget.style.background=th.surface}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:32,flexShrink:0}}>{p.images[0]}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:600,color:th.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{n}</div>
                      <div style={{display:"flex",gap:6,alignItems:"center",marginTop:2}}>
                        <span style={{fontSize:13,fontWeight:800,color:th.accent}}>{fp(p.price,cur)}</span>
                        <Badge color="#fff" bg={th.danger}>-{p.discount}%</Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={()=>{setOpen(null);onNav("store");}} style={{width:"100%",padding:"10px",marginTop:8,borderRadius:th.radius,border:`1px solid ${th.accent}`,background:"transparent",color:th.accent,fontWeight:700,cursor:"pointer",fontSize:13,fontFamily:th.font}}>
                {t.seeDeals} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// HERO SLIDESHOW
// ══════════════════════════════════════════════════════════════════
function HeroSlideshow({onNav}){
  const {th,t,lang}=useC();
  const [slide,setSlide]=useState(0);
  const timer=useRef(null);
  const slides=t.heroSlides;

  const GRADS=[
    `linear-gradient(135deg,${th.accent},${th.accent2})`,
    `linear-gradient(135deg,#1a1a3e,#2d2d6e)`,
    `linear-gradient(135deg,${th.teal},${th.accent})`,
    `linear-gradient(135deg,${th.gold},${th.accent2})`,
  ];

  useEffect(()=>{
    timer.current=setInterval(()=>setSlide(s=>(s+1)%slides.length),4800);
    return()=>clearInterval(timer.current);
  },[]);

  const go=i=>{clearInterval(timer.current);setSlide(i);timer.current=setInterval(()=>setSlide(s=>(s+1)%slides.length),4800);};
  const sl=slides[slide];

  return(
    <div style={{position:"relative",borderRadius:th.cardRadius,overflow:"hidden",marginBottom:32}}>
      <div style={{background:GRADS[slide],minHeight:320,padding:"56px 52px",display:"flex",alignItems:"center",position:"relative",transition:"background 0.6s ease"}}>
        <div style={{position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",fontSize:200,opacity:0.1,pointerEvents:"none",filter:"blur(2px)"}}>{sl.emoji}</div>
        <div style={{position:"relative",zIndex:2,maxWidth:580}}>
          <div style={{display:"inline-block",background:"#ffffff22",backdropFilter:"blur(8px)",padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:800,color:"#fff",marginBottom:18,letterSpacing:"1px",textTransform:"uppercase"}}>
            {lang==="sw"?"⚡ MATOLEO YA LEO":"⚡ TODAY'S DEALS"}
          </div>
          <h1 style={{fontFamily:th.displayFont,fontSize:40,fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:16}}>{sl.title}</h1>
          <p style={{color:"#ffffffcc",fontSize:16,lineHeight:1.6,marginBottom:28}}>{sl.sub}</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={()=>onNav("store")} style={{padding:"14px 30px",borderRadius:th.radius,border:"none",cursor:"pointer",fontFamily:th.font,fontWeight:800,fontSize:15,background:"#fff",color:th.accent,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px #00000030";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              {sl.btn} →
            </button>
            <button onClick={()=>onNav("about")} style={{padding:"14px 24px",borderRadius:th.radius,border:"2px solid #fff",background:"transparent",color:"#fff",fontFamily:th.font,fontWeight:700,fontSize:15,cursor:"pointer"}}>
              {t.learnMore}
            </button>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div style={{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:5}}>
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>go(i)} style={{width:i===slide?32:8,height:8,borderRadius:4,border:"none",cursor:"pointer",background:i===slide?"#fff":"#ffffff55",transition:"all 0.3s",padding:0}}/>
        ))}
      </div>
      {["◀","▶"].map((a,i)=>(
        <button key={a} onClick={()=>go((slide+(i?1:-1)+slides.length)%slides.length)} style={{position:"absolute",top:"50%",transform:"translateY(-50%)",[i?"right":"left"]:14,background:"#ffffff25",backdropFilter:"blur(6px)",border:"none",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:"#fff",fontSize:18,zIndex:5,transition:"all 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.background="#ffffff50"}
          onMouseLeave={e=>e.currentTarget.style.background="#ffffff25"}>
          {a}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ANNOUNCEMENT TICKER
// ══════════════════════════════════════════════════════════════════
function Ticker(){
  const {th,lang}=useC();
  const items=lang==="sw"
    ?["📱 Vifuniko Vipya vya iPhone 15 - IMEFIKA","⚡ Vichaji 65W GaN - Orodha Ndogo","🔋 Power Bank 20000mAh - TSh 91,000","🎧 TWS ANC Earbuds - Bei Bora","🚚 Utoaji Bure - Maagizo juu ya TSh 26,000","✅ Bidhaa Halisi 100% - Tumhakikishiwa"]
    :["📱 New iPhone 15 Cases — Just Arrived","⚡ 65W GaN Charger — Limited Stock","🔋 20000mAh Power Bank — $34.99","🎧 TWS ANC Earbuds — Best Price","🚚 Free Delivery on Orders Over $10","✅ 100% Genuine Products — Guaranteed"];
  const txt=items.join("      ⬥      ");
  return(
    <div style={{background:th.accent,overflow:"hidden",padding:"7px 0"}}>
      <div style={{display:"flex",animation:"ticker 28s linear infinite",whiteSpace:"nowrap"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#fff",padding:"0 20px",letterSpacing:"0.3px"}}>{txt}      ⬥      {txt}</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SETTINGS BAR (top)
// ══════════════════════════════════════════════════════════════════
function SettingsBar({thKey,setThKey,lang,setLang,cur,setCur}){
  const {th,t}=useC();
  return(
    <div style={{background:th.dark?"#000000bb":"#00000020",borderBottom:"1px solid #ffffff15",padding:"5px 20px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",minHeight:34}}>
      <span style={{color:"#ffffffbb",fontWeight:600,fontSize:10,letterSpacing:"0.5px"}}>{t.theme}:</span>
      {Object.entries(THEMES).map(([k,v])=>(
        <button key={k} onClick={()=>setThKey(k)} title={v.name} style={{padding:"2px 9px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:10,background:thKey===k?"#fff":"#ffffff18",color:thKey===k?th.accent:"#fff",transition:"all 0.2s"}}>
          {v.icon} {v.name}
        </button>
      ))}
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {[["en","🇬🇧"],["sw","🇹🇿"]].map(([k,f])=>(
          <button key={k} onClick={()=>setLang(k)} style={{padding:"2px 9px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:10,background:lang===k?"#fff":"#ffffff18",color:lang===k?th.accent:"#fff",transition:"all 0.2s"}}>{f} {k.toUpperCase()}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {Object.entries(CURRENCIES).map(([k,v])=>(
          <button key={k} onClick={()=>setCur(k)} style={{padding:"2px 9px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:10,background:cur===k?"#fff":"#ffffff18",color:cur===k?th.accent:"#fff",transition:"all 0.2s"}}>{v.flag} {k}</button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// STORE PAGE (phone accessories specialised)
// ══════════════════════════════════════════════════════════════════
function StorePage({onAdd,onQV}){
  const {th,t,lang,cur}=useC();
  const [cat,setCat]=useState("All");
  const [brand,setBrand]=useState("All");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("popular");
  const [priceMin,setPriceMin]=useState(0);
  const [priceMax,setPriceMax]=useState(500);

  const cats=["All",...new Set(PRODUCTS.map(p=>p.cat))];
  const brands=["All",...BRANDS.map(b=>b.name)];

  const filtered=PRODUCTS
    .filter(p=>cat==="All"||p.cat===cat)
    .filter(p=>brand==="All"||p.brand===brand)
    .filter(p=>p.price>=priceMin&&p.price<=priceMax)
    .filter(p=>{
      const n=lang==="sw"?p.nameSw:p.name;
      return n.toLowerCase().includes(search.toLowerCase())||p.brand.toLowerCase().includes(search.toLowerCase())||p.cat.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a,b)=>sort==="price-low"?a.price-b.price:sort==="price-high"?b.price-a.price:sort==="rating"?b.rating-a.rating:sort==="newest"?(b.isNew?1:0)-(a.isNew?1:0):b.reviews-a.reviews);

  return(
    <div>
      {/* Category icon strip */}
      <div style={{display:"flex",gap:10,marginBottom:24,overflowX:"auto",paddingBottom:4}}>
        <button onClick={()=>setCat("All")} style={{flexShrink:0,padding:"10px 18px",borderRadius:th.cardRadius,border:`2px solid ${cat==="All"?th.accent:th.border}`,background:cat==="All"?th.accent+"15":th.card,cursor:"pointer",fontWeight:700,fontSize:13,color:cat==="All"?th.accent:th.muted,fontFamily:th.font,transition:"all 0.2s"}}>
          📦 {lang==="sw"?"Zote":"All"}
        </button>
        {PHONE_CATS.map(c=>{
          const lbl=lang==="sw"?c.sw:c.en;
          const active=cat===c.id;
          return(
            <button key={c.id} onClick={()=>setCat(c.id)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"10px 16px",borderRadius:th.cardRadius,border:`2px solid ${active?c.color:th.border}`,background:active?c.color+"15":th.card,cursor:"pointer",transition:"all 0.2s",minWidth:90}}>
              <span style={{fontSize:24}}>{c.icon}</span>
              <span style={{fontSize:11,fontWeight:700,color:active?c.color:th.muted,whiteSpace:"nowrap"}}>{lbl}</span>
            </button>
          );
        })}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:20}}>
        {/* Filters Sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"18px"}}>
            <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:14}}>🔍 {lang==="sw"?"Chuja":"Filter"}</div>
            {/* Brand */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:th.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>{t.brand}</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {brands.map(b=>(
                  <label key={b} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:brand===b?th.accent:th.text,fontWeight:brand===b?700:400}}>
                    <input type="radio" name="brand" checked={brand===b} onChange={()=>setBrand(b)} style={{accentColor:th.accent,cursor:"pointer"}}/>
                    {b==="All"?"All Brands":b}
                  </label>
                ))}
              </div>
            </div>
            {/* Price Range */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:th.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>
                {lang==="sw"?"Safu ya Bei":"Price Range"}: {fp(priceMin,cur)} – {fp(priceMax,cur)}
              </div>
              <input type="range" min={0} max={500} value={priceMax} onChange={e=>setPriceMax(+e.target.value)} style={{width:"100%",accentColor:th.accent,cursor:"pointer"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:th.muted}}>
                <span>{fp(0,cur)}</span><span>{fp(500,cur)}</span>
              </div>
            </div>
            {/* Rating */}
            <div style={{marginTop:14}}>
              <div style={{fontSize:12,fontWeight:700,color:th.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>{lang==="sw"?"Kiwango":"Rating"}</div>
              {[4,3,2,1].map(r=>(
                <label key={r} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:4,fontSize:12,color:th.text}}>
                  <input type="checkbox" style={{accentColor:th.accent}}/>
                  <span style={{color:th.gold}}>{"★".repeat(r)}{"☆".repeat(5-r)}</span> & {lang==="sw"?"Zaidi":"up"}
                </label>
              ))}
            </div>
          </div>

          {/* Brands block */}
          <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"16px"}}>
            <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:14,color:th.text,marginBottom:12}}>{t.brands}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {BRANDS.slice(0,8).map(b=>(
                <button key={b.name} onClick={()=>setBrand(b.name===brand?"All":b.name)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:th.radius,border:`1px solid ${brand===b.name?th.accent:th.border}`,background:brand===b.name?th.accent+"15":th.bg,cursor:"pointer",width:"100%",transition:"all 0.15s"}}>
                  <span style={{fontSize:18}}>{b.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,color:brand===b.name?th.accent:th.text}}>{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {/* Search + Sort bar */}
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{flex:1,minWidth:180,position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPlaceholder}
                style={{width:"100%",padding:"11px 14px 11px 40px",borderRadius:th.radius,border:`1.5px solid ${th.border}`,background:th.card,color:th.text,fontSize:13,fontFamily:th.font,transition:"border 0.2s"}}
                onFocus={e=>e.target.style.borderColor=th.accent}
                onBlur={e=>e.target.style.borderColor=th.border}/>
            </div>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"11px 14px",borderRadius:th.radius,border:`1.5px solid ${th.border}`,background:th.card,color:th.text,fontSize:13,fontFamily:th.font,cursor:"pointer"}}>
              <option value="popular">{t.sortPopular}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="price-low">{t.sortLow}</option>
              <option value="price-high">{t.sortHigh}</option>
              <option value="newest">{t.sortNew}</option>
            </select>
            <span style={{fontSize:12,color:th.muted,whiteSpace:"nowrap"}}>{filtered.length} {t.products}</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:16}}>
            {filtered.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onQuickView={onQV}/>)}
          </div>
          {filtered.length===0&&(
            <div style={{textAlign:"center",padding:"60px 0",color:th.muted}}>
              <div style={{fontSize:56,marginBottom:12}}>📭</div>
              <div style={{fontSize:18,fontWeight:700}}>{lang==="sw"?"Hakuna bidhaa zilizopatikana":"No products found"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════
function HomePage({onNav,onAdd,onQV}){
  const {th,t,lang,cur}=useC();

  return(
    <div>
      <HeroSlideshow onNav={onNav}/>

      {/* Category strip */}
      <div style={{marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h2 style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text}}>{t.cats}</h2>
          <button onClick={()=>onNav("store")} style={{background:"transparent",border:`1px solid ${th.accent}`,borderRadius:th.radius,padding:"6px 14px",color:th.accent,fontWeight:600,cursor:"pointer",fontSize:13,fontFamily:th.font}}>{t.viewAll} →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:12}}>
          {PHONE_CATS.map(c=>(
            <div key={c.id} onClick={()=>onNav("store")} style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,padding:"18px 10px",textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${c.color}25`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:34,marginBottom:8}}>{c.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:th.text,lineHeight:1.2}}>{lang==="sw"?c.sw:c.en}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div style={{marginBottom:36}}>
        <h2 style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text,marginBottom:16}}>{t.featuredBrands}</h2>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
          {BRANDS.map(b=>(
            <div key={b.name} style={{flexShrink:0,background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,padding:"14px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,cursor:"pointer",transition:"all 0.2s",minWidth:90}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";}}>
              <span style={{fontSize:28}}>{b.icon}</span>
              <span style={{fontSize:11,fontWeight:700,color:th.text}}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Deal Banner */}
      <div style={{borderRadius:th.cardRadius,padding:"28px 36px",marginBottom:36,background:th.dark?`linear-gradient(135deg,${th.accent}22,${th.accent2}11)`:`linear-gradient(135deg,${th.accent},${th.accent2})`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:140,opacity:0.1}}>⚡</div>
        <div style={{fontFamily:th.displayFont,fontSize:26,fontWeight:800,color:th.dark?th.accent:"#fff",marginBottom:6}}>{t.flashDeals}</div>
        <div style={{color:th.dark?th.muted:"#ffffffcc",marginBottom:18,fontSize:14}}>{lang==="sw"?"Matoleo ya muda mfupi — yanasasishwa kila masaa 24":"Time-limited deals — refreshed every 24 hours"}</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {PRODUCTS.filter(p=>p.discount>=43).slice(0,3).map(p=>(
            <div key={p.id} onClick={()=>onQV(p)} style={{background:"#ffffff18",backdropFilter:"blur(8px)",borderRadius:th.radius,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"all 0.2s",border:"1px solid #ffffff20"}}
              onMouseEnter={e=>e.currentTarget.style.background="#ffffff28"}
              onMouseLeave={e=>e.currentTarget.style.background="#ffffff18"}>
              <span style={{fontSize:28}}>{p.images[0]}</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:2}}>{lang==="sw"?p.nameSw:p.name}</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{fp(p.price,cur)}</span>
                  <span style={{fontSize:10,fontWeight:800,background:"#ff444488",color:"#fff",padding:"1px 6px",borderRadius:10}}>-{p.discount}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div style={{marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h2 style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text}}>🏆 {t.bestSellers}</h2>
          <button onClick={()=>onNav("store")} style={{background:"transparent",border:`1px solid ${th.accent}`,borderRadius:th.radius,padding:"6px 14px",color:th.accent,fontWeight:600,cursor:"pointer",fontSize:13,fontFamily:th.font}}>{t.viewAll} →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {PRODUCTS.filter(p=>p.isBest).slice(0,4).map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onQuickView={onQV}/>)}
        </div>
      </div>

      {/* Why Us */}
      <div style={{marginBottom:36}}>
        <h2 style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text,marginBottom:18}}>{t.whyUs}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
          {[{i:"🔒",t:t.r1t,d:t.r1d},{i:"🚀",t:t.r2t,d:t.r2d},{i:"↩️",t:t.r3t,d:t.r3d},{i:"💬",t:t.r4t,d:t.r4d}].map(r=>(
            <div key={r.t} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px",textAlign:"center",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 24px ${th.accent}20`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:38,marginBottom:10}}>{r.i}</div>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:6}}>{r.t}</div>
              <div style={{fontSize:13,color:th.muted,lineHeight:1.6}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div style={{marginBottom:36}}>
        <h2 style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text,marginBottom:18}}>🌐 {t.followUs}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
          {[
            {name:"Facebook",icon:"📘",handle:"@DumpaePhones",color:"#1877f2",followers:"12.4K"},
            {name:"Instagram",icon:"📸",handle:"@dumpae.phones",color:"#e1306c",followers:"8.9K"},
            {name:"TikTok",icon:"🎵",handle:"@dumpae",color:"#00f2ea",followers:"22.1K"},
            {name:"WhatsApp",icon:"💬",handle:"+255 744 000 000",color:"#25d366",followers:"Chat"},
            {name:"YouTube",icon:"▶️",handle:"DUMPAE Phones",color:"#ff0000",followers:"3.1K"},
            {name:"Twitter/X",icon:"🐦",handle:"@DumpaePhones",color:"#1da1f2",followers:"5.3K"},
          ].map(s=>(
            <div key={s.name} style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,padding:"18px 14px",textAlign:"center",cursor:"pointer",borderTop:`3px solid ${s.color}`,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}30`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:32,marginBottom:8}}>{s.icon}</div>
              <div style={{fontWeight:800,fontSize:13,color:th.text,marginBottom:3}}>{s.name}</div>
              <div style={{fontSize:11,color:s.color,fontWeight:600,marginBottom:4}}>{s.handle}</div>
              <div style={{fontSize:11,color:th.muted}}>{s.followers}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection/>
    </div>
  );
}

function NewsletterSection(){
  const {th,t}=useC();
  const [email,setEmail]=useState("");
  const [sent,setSent]=useState(false);
  return(
    <div style={{borderRadius:th.cardRadius,padding:"32px",marginBottom:8,border:`1px solid ${th.border}`,background:th.card,textAlign:"center"}}>
      <div style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:th.text,marginBottom:6}}>📧 {t.newsletter}</div>
      <div style={{color:th.muted,marginBottom:18,fontSize:14}}>{t.newsletterSub}</div>
      {sent?(
        <div style={{color:th.success,fontWeight:700,fontSize:16}}>✅ Subscribed successfully!</div>
      ):(
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.emailPlaceholder}
            style={{padding:"11px 18px",borderRadius:th.radius,border:`1.5px solid ${th.border}`,background:th.bg,color:th.text,fontSize:14,fontFamily:th.font,minWidth:260}}/>
          <button onClick={()=>{if(email)setSent(true);}} style={{padding:"11px 22px",borderRadius:th.radius,border:"none",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:th.font}}>
            📧 {t.subscribe}
          </button>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// VENDORS PAGE
// ══════════════════════════════════════════════════════════════════
const VENDORS_DATA=[
  {name:"TechShield",logo:"🛡",rating:4.9,products:85,sales:"8.2K",badge:"Top Seller",color:"#6366f1",desc:"Premium phone cases & screen protectors"},
  {name:"PowerHub",logo:"⚡",rating:4.8,products:62,sales:"6.1K",badge:"Verified",color:"#f59e0b",desc:"Chargers, power banks & accessories"},
  {name:"AudioZone",logo:"🎵",rating:4.9,products:48,sales:"5.4K",badge:"Premium",color:"#06b6d4",desc:"Earbuds, headphones & speakers"},
  {name:"CablePro",logo:"🔗",rating:4.7,products:90,sales:"7.8K",badge:"Best Value",color:"#10b981",desc:"Cables, adapters & connectivity"},
  {name:"MountPro",logo:"🧲",rating:4.6,products:35,sales:"3.2K",badge:"New",color:"#ea580c",desc:"Mounts, stands & holders"},
  {name:"PhotoGear",logo:"📸",rating:4.8,products:28,sales:"2.9K",badge:"Specialist",color:"#f59e0b",desc:"Phone photography equipment"},
  {name:"WristStyle",logo:"⌚",rating:4.5,products:44,sales:"4.1K",badge:"Trending",color:"#8b5cf6",desc:"Smartwatch bands & accessories"},
];

function VendorsPage(){
  const {th,t,lang,cur}=useC();
  return(
    <div>
      <h2 style={{fontFamily:th.displayFont,fontSize:26,fontWeight:800,color:th.text,marginBottom:6}}>{t.visitStore}</h2>
      <p style={{color:th.muted,marginBottom:24,fontSize:14}}>{lang==="sw"?"Wauuzaji wetu waliohakikishwa wa vifaa vya simu":"Our verified phone accessories vendors"}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {VENDORS_DATA.map(v=>(
          <div key={v.name} style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px",display:"flex",gap:16,alignItems:"center",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=v.color;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${v.color}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:56,height:56,borderRadius:th.radius,fontSize:28,display:"flex",alignItems:"center",justifyContent:"center",background:v.color+"20",border:`2px solid ${v.color}40`,flexShrink:0}}>{v.logo}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <span style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text}}>{v.name}</span>
                <span style={{fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:20,background:v.color+"20",color:v.color}}>{v.badge}</span>
              </div>
              <div style={{fontSize:12,color:th.muted,marginBottom:4}}>{v.desc}</div>
              <div style={{fontSize:12,color:th.muted,marginBottom:4}}>{v.products} {t.products} · {v.sales} {t.orders}</div>
              <Stars r={v.rating}/>
            </div>
            <button style={{padding:"7px 14px",borderRadius:th.radius,border:`1.5px solid ${th.accent}`,background:"transparent",color:th.accent,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:th.font,flexShrink:0,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=th.accent;e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=th.accent;}}>
              {t.visitStore}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ABOUT, CONTACT, PRIVACY — compact
// ══════════════════════════════════════════════════════════════════
function AboutPage(){
  const {th,t,lang}=useC();
  return(
    <div className="fade-up">
      <div style={{borderRadius:th.cardRadius,padding:"40px",marginBottom:28,background:th.heroBg,color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:160,opacity:0.08}}>📱</div>
        <h1 style={{fontFamily:th.displayFont,fontSize:32,fontWeight:800,marginBottom:10}}>{t.aboutTitle}</h1>
        <p style={{opacity:0.9,fontSize:16,lineHeight:1.7,maxWidth:580}}>{t.aboutMissionText}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:28}}>
        {t.aboutStats.map(([v,l])=>(
          <div key={l} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px",textAlign:"center"}}>
            <div style={{fontFamily:th.displayFont,fontSize:30,fontWeight:800,color:th.accent,marginBottom:6}}>{v}</div>
            <div style={{fontSize:13,color:th.muted,fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
        {[{icon:"🎯",title:t.aboutMission,text:t.aboutMissionText},{icon:"🌍",title:t.aboutVision,text:t.aboutVisionText}].map(x=>(
          <div key={x.title} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"24px"}}>
            <div style={{fontSize:32,marginBottom:10}}>{x.icon}</div>
            <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:16,color:th.text,marginBottom:8}}>{x.title}</div>
            <p style={{color:th.muted,lineHeight:1.7,fontSize:14}}>{x.text}</p>
          </div>
        ))}
      </div>
      <div style={{marginBottom:28}}>
        <h3 style={{fontFamily:th.displayFont,fontWeight:700,fontSize:18,color:th.text,marginBottom:16}}>{t.aboutTeamTitle}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
          {t.team.map(m=>(
            <div key={m.name} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px",textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:10}}>{m.emoji}</div>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:14,color:th.text,marginBottom:4}}>{m.name}</div>
              <div style={{fontSize:12,color:th.muted}}>{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage(){
  const {th,t}=useC();
  const [form,setForm]=useState({name:"",email:"",msg:""});
  const [sent,setSent]=useState(false);
  return(
    <div className="fade-up">
      <h2 style={{fontFamily:th.displayFont,fontSize:24,fontWeight:800,color:th.text,marginBottom:6}}>{t.contactTitle}</h2>
      <p style={{color:th.muted,marginBottom:24}}>{t.contactDesc}</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"28px"}}>
          {sent?(
            <div style={{textAlign:"center",padding:"40px 0"}}>
              <div style={{fontSize:56,marginBottom:12}}>✅</div>
              <div style={{fontFamily:th.displayFont,fontSize:20,fontWeight:800,color:th.success,marginBottom:8}}>Message Sent!</div>
              <button onClick={()=>{setSent(false);setForm({name:"",email:"",msg:""}); }} style={{padding:"10px 20px",borderRadius:th.radius,border:"none",background:th.accent,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:th.font}}>Send Another</button>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[{k:"name",l:t.contactName,t:"text"},{k:"email",l:t.contactEmail,t:"email"}].map(f=>(
                <div key={f.k}>
                  <label style={{fontSize:12,fontWeight:600,color:th.muted,display:"block",marginBottom:6}}>{f.l}</label>
                  <input type={f.t} value={form[f.k]} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))}
                    style={{width:"100%",padding:"11px 14px",borderRadius:th.radius,border:`1.5px solid ${th.border}`,background:th.bg,color:th.text,fontSize:14,fontFamily:th.font}}
                    onFocus={e=>e.target.style.borderColor=th.accent}
                    onBlur={e=>e.target.style.borderColor=th.border}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:12,fontWeight:600,color:th.muted,display:"block",marginBottom:6}}>{t.contactMsg}</label>
                <textarea value={form.msg} onChange={e=>setForm(x=>({...x,msg:e.target.value}))} rows={5}
                  style={{width:"100%",padding:"11px 14px",borderRadius:th.radius,border:`1.5px solid ${th.border}`,background:th.bg,color:th.text,fontSize:14,fontFamily:th.font,resize:"vertical"}}
                  onFocus={e=>e.target.style.borderColor=th.accent}
                  onBlur={e=>e.target.style.borderColor=th.border}/>
              </div>
              <button onClick={()=>{if(form.name&&form.email&&form.msg)setSent(true);}}
                style={{padding:"12px",borderRadius:th.radius,border:"none",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:th.font}}>
                {t.contactSend} →
              </button>
            </div>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[{icon:"📞",l:t.contactPhone||"Phone",v:t.phoneNum},{icon:"📍",l:t.contactAddress||"Address",v:t.addressVal},{icon:"🕐",l:t.contactHours||"Hours",v:t.hoursVal},{icon:"📧",l:"Email",v:"hello@dumpae.co.tz"}].map(i=>(
            <div key={i.l} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"18px",display:"flex",gap:14,alignItems:"center"}}>
              <span style={{fontSize:26,flexShrink:0}}>{i.icon}</span>
              <div><div style={{fontSize:11,fontWeight:600,color:th.muted,textTransform:"uppercase",marginBottom:3}}>{i.l}</div><div style={{fontWeight:600,color:th.text,fontSize:14}}>{i.v}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyPage(){
  const {th,t}=useC();
  return(
    <div className="fade-up" style={{maxWidth:780}}>
      <h2 style={{fontFamily:th.displayFont,fontSize:24,fontWeight:800,color:th.text,marginBottom:4}}>{t.privacyTitle}</h2>
      <p style={{color:th.muted,marginBottom:24,fontSize:13}}>{t.privacyUpdated}</p>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {t.privacySections.map((s,i)=>(
          <div key={i} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:th.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,flexShrink:0}}>{i+1}</div>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text}}>{s.title}</div>
            </div>
            <p style={{color:th.muted,lineHeight:1.75,fontSize:14,paddingLeft:36}}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// POS PAGE
// ══════════════════════════════════════════════════════════════════
function POSPage(){
  const {th,t,lang,cur}=useC();
  const [cart,setCart]=useState([]);
  const [cat,setCat]=useState("all");
  const [disc,setDisc]=useState(0);
  const [pay,setPay]=useState("cash");
  const [receipt,setReceipt]=useState(null);
  const [orderNum,setOrderNum]=useState(3001);

  const posCats=[{k:"all",en:"All",sw:"Zote"},{k:"Cases",en:"Cases",sw:"Vifuniko"},{k:"Chargers",en:"Chargers",sw:"Vichaji"},{k:"Audio",en:"Audio",sw:"Sauti"},{k:"Cables",en:"Cables",sw:"Nyaya"},{k:"Power",en:"Power",sw:"Nguvu"}];
  const items=cat==="all"?POS_ITEMS:POS_ITEMS.filter(p=>p.cat===cat);
  const addItem=p=>setCart(c=>{const f=c.find(i=>i.id===p.id);return f?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}];});
  const upd=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const dAmt=sub*(disc/100);
  const tax=(sub-dAmt)*0.08;
  const total=sub-dAmt+tax;

  const checkout=()=>{
    if(!cart.length)return;
    setReceipt({cart,sub,dAmt,tax,total,orderNum,pay,time:new Date().toLocaleTimeString()});
    setCart([]);setOrderNum(n=>n+1);setDisc(0);
  };

  if(receipt)return(
    <div style={{display:"flex",justifyContent:"center",padding:"32px 0"}}>
      <div style={{maxWidth:380,width:"100%",background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:32,textAlign:"center"}}>
        <div style={{fontSize:52}}>✅</div>
        <div style={{fontFamily:th.displayFont,fontSize:20,fontWeight:800,color:th.text,marginTop:12}}>{t.orderComplete}</div>
        <div style={{color:th.muted,fontSize:13,margin:"4px 0 20px"}}>{t.orderNo} #{receipt.orderNum} · {receipt.time}</div>
        <div style={{borderTop:`1px solid ${th.border}`,padding:"12px 0"}}>
          {receipt.cart.map(i=>(
            <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13,color:th.text}}>
              <span>{i.image} {lang==="sw"?i.nameSw:i.name} ×{i.qty}</span>
              <span style={{fontWeight:600}}>{fp(i.price*i.qty,cur)}</span>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${th.border}`,paddingTop:12,fontSize:13}}>
          <div style={{display:"flex",justifyContent:"space-between",color:th.muted,marginBottom:5}}><span>{t.subtotal}</span><span>{fp(receipt.sub,cur)}</span></div>
          {receipt.dAmt>0&&<div style={{display:"flex",justifyContent:"space-between",color:th.success,marginBottom:5}}><span>{t.discount}</span><span>-{fp(receipt.dAmt,cur)}</span></div>}
          <div style={{display:"flex",justifyContent:"space-between",color:th.muted,marginBottom:10}}><span>{t.tax}</span><span>{fp(receipt.tax,cur)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:th.displayFont,fontWeight:800,fontSize:20,color:th.text}}><span>{t.total}</span><span style={{color:th.accent}}>{fp(receipt.total,cur)}</span></div>
        </div>
        <div style={{color:th.muted,fontSize:12,marginTop:10}}>{t.paidVia} {receipt.pay.toUpperCase()}</div>
        <button onClick={()=>setReceipt(null)} style={{marginTop:18,width:"100%",padding:"12px",borderRadius:th.radius,border:"none",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:th.font}}>🔄 {t.newOrder}</button>
      </div>
    </div>
  );

  return(
    <div>
      <h2 style={{fontFamily:th.displayFont,fontSize:24,fontWeight:800,color:th.text,marginBottom:4}}>{t.posTitle}</h2>
      <p style={{color:th.muted,marginBottom:20,fontSize:14}}>{t.posDesc}</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 330px",gap:20,minHeight:580}}>
        <div>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
            {posCats.map(c=>(
              <button key={c.k} onClick={()=>setCat(c.k)} style={{padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:th.font,transition:"all 0.2s",background:cat===c.k?th.accent:th.card,color:cat===c.k?"#fff":th.muted}}>
                {lang==="sw"?c.sw:c.en}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
            {items.map(p=>(
              <button key={p.id} onClick={()=>addItem(p)} style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,padding:"16px 10px",cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";}}>
                <span style={{fontSize:32}}>{p.image}</span>
                <span style={{fontFamily:th.font,fontWeight:600,fontSize:12,color:th.text,lineHeight:1.2,textAlign:"center"}}>{lang==="sw"?p.nameSw:p.name}</span>
                <span style={{fontFamily:th.displayFont,fontWeight:800,color:th.accent,fontSize:14}}>{fp(p.price,cur)}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{background:th.card,border:`1.5px solid ${th.border}`,borderRadius:th.cardRadius,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${th.border}`}}>
            <div style={{fontFamily:th.displayFont,fontWeight:800,fontSize:16,color:th.text}}>🧾 {t.currentOrder}</div>
            <div style={{fontSize:11,color:th.muted}}>{t.orderNo} #{orderNum}</div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
            {!cart.length?(
              <div style={{textAlign:"center",padding:"44px 0",color:th.muted}}>
                <div style={{fontSize:36,marginBottom:8}}>📱</div>
                <div style={{fontWeight:600,fontSize:14}}>{t.noItems}</div>
                <div style={{fontSize:12}}>{t.tapToAdd}</div>
              </div>
            ):cart.map(i=>(
              <div key={i.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${th.border}60`}}>
                <span style={{fontSize:20}}>{i.image}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:600,color:th.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{lang==="sw"?i.nameSw:i.name}</div>
                  <div style={{fontSize:12,color:th.accent,fontWeight:700}}>{fp(i.price*i.qty,cur)}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <button onClick={()=>upd(i.id,-1)} style={{width:24,height:24,borderRadius:6,background:th.border,border:"none",color:th.text,cursor:"pointer",fontWeight:700}}>−</button>
                  <span style={{fontSize:13,fontWeight:700,color:th.text,minWidth:16,textAlign:"center"}}>{i.qty}</span>
                  <button onClick={()=>upd(i.id,1)} style={{width:24,height:24,borderRadius:6,background:th.accent,border:"none",color:"#fff",cursor:"pointer",fontWeight:700}}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:"12px 14px",borderTop:`1px solid ${th.border}`}}>
            <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:11,color:th.muted,marginRight:4}}>{t.discLabel}:</span>
              {[0,5,10,15,20].map(d=>(
                <button key={d} onClick={()=>setDisc(d)} style={{padding:"3px 8px",borderRadius:8,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:disc===d?th.accent:th.border,color:disc===d?"#fff":th.muted}}>{d}%</button>
              ))}
            </div>
            <div style={{fontSize:12,display:"flex",justifyContent:"space-between",color:th.muted,marginBottom:4}}><span>{t.subtotal}</span><span style={{color:th.text}}>{fp(sub,cur)}</span></div>
            {disc>0&&<div style={{fontSize:12,display:"flex",justifyContent:"space-between",color:th.success,marginBottom:4}}><span>{t.discount}({disc}%)</span><span>-{fp(dAmt,cur)}</span></div>}
            <div style={{fontSize:12,display:"flex",justifyContent:"space-between",color:th.muted,marginBottom:10}}><span>{t.tax}</span><span style={{color:th.text}}>{fp(tax,cur)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:th.displayFont,fontWeight:800,fontSize:18,color:th.text,marginBottom:12}}><span>{t.total}</span><span style={{color:th.accent}}>{fp(total,cur)}</span></div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[["cash","💵",t.cash],["card","💳",t.card],["mobile","📱",t.mobile]].map(([m,ic,lb])=>(
                <button key={m} onClick={()=>setPay(m)} style={{flex:1,padding:"7px 4px",borderRadius:th.radius,border:`1.5px solid ${pay===m?th.accent:th.border}`,background:pay===m?th.accent+"18":"transparent",color:pay===m?th.accent:th.muted,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:th.font,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <span style={{fontSize:15}}>{ic}</span>{lb}
                </button>
              ))}
            </div>
            <button onClick={checkout} disabled={!cart.length} style={{width:"100%",padding:"13px",borderRadius:th.radius,border:"none",cursor:cart.length?"pointer":"not-allowed",background:cart.length?`linear-gradient(135deg,${th.accent},${th.accent2})`:`${th.border}`,color:cart.length?"#fff":th.muted,fontWeight:700,fontSize:14,fontFamily:th.font}}>
              ✅ {t.charge} {fp(total,cur)}
            </button>
            {cart.length>0&&<button onClick={()=>setCart([])} style={{width:"100%",marginTop:7,padding:"7px",background:"none",border:"none",color:th.danger,fontSize:12,cursor:"pointer",fontWeight:600}}>🗑 {t.clearOrder}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════
const MONTHLY=[18,24,32,28,45,52,61,58,72,84,91,108];
function AdminPage(){
  const {th,t,lang,cur}=useC();
  const max=Math.max(...MONTHLY);
  const months=lang==="sw"?["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const kpis=[
    {icon:"💰",label:t.revenue,v:fp(52300,cur),d:18,c:th.accent},
    {icon:"🛒",label:t.orders,v:"2,841",d:12,c:th.teal},
    {icon:"👤",label:t.customers,v:"9,204",d:22,c:th.purple},
    {icon:"📦",label:t.listed,v:"516",d:8,c:th.gold},
    {icon:"⭐",label:t.avgRating,v:"4.81★",d:1,c:th.gold},
    {icon:"🏪",label:lang==="sw"?"Wauuzaji":"Vendors",v:"7 Active",d:0,c:th.success},
  ];
  const recentOrders=[
    {id:"#4291",c:"James M.",p:"iPhone 15 Case",a:19.99,s:"Delivered"},
    {id:"#4290",c:"Amina S.",p:"65W GaN Charger",a:24.99,s:"Processing"},
    {id:"#4289",c:"Peter K.",p:"TWS Earbuds ANC",a:49.99,s:"Shipped"},
    {id:"#4288",c:"Grace A.",p:"Power Bank 20K",a:34.99,s:"Delivered"},
    {id:"#4287",c:"David O.",p:"Braided Cable 2m",a:8.99,s:"Pending"},
  ];
  const sc={Delivered:th.success,Processing:th.accent,Shipped:th.teal,Pending:th.gold};
  const ss={Delivered:"Imetolewa",Processing:"Inashughulikiwa",Shipped:"Imesafirishwa",Pending:"Inasubiri"};
  return(
    <div>
      <h2 style={{fontFamily:th.displayFont,fontSize:24,fontWeight:800,color:th.text,marginBottom:4}}>{t.dashTitle}</h2>
      <p style={{color:th.muted,marginBottom:24,fontSize:14}}>{t.dashDesc}</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:14,marginBottom:28}}>
        {kpis.map((k,i)=>(
          <div key={i} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <span style={{fontSize:28}}>{k.icon}</span>
              {k.d!==0&&<span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,background:(k.d>0?th.success:th.danger)+"20",color:k.d>0?th.success:th.danger}}>{k.d>0?"↑":"↓"}{Math.abs(k.d)}%</span>}
            </div>
            <div style={{fontFamily:th.displayFont,fontSize:22,fontWeight:800,color:k.c,marginBottom:4}}>{k.v}</div>
            <div style={{fontSize:12,color:th.muted}}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:20,marginBottom:24}}>
        <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px"}}>
          <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:20}}>{lang==="sw"?"Mauzo ya Kila Mwezi":"Monthly Sales Overview"}</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:5,height:140}}>
            {MONTHLY.map((v,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <span style={{fontSize:8,color:th.muted,fontWeight:600}}>{fp(v*1000,cur).replace(/\.00$/,"")}</span>
                <div style={{width:"100%",height:`${(v/max)*100}%`,minHeight:4,borderRadius:4,background:`linear-gradient(180deg,${th.accent},${th.accent2})`,transition:"height 0.8s ease"}}/>
                <span style={{fontSize:8,color:th.muted}}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px"}}>
          <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:16}}>{t.vendorPerf}</div>
          {VENDORS_DATA.map(v=>{
            const pct=Math.round((parseFloat(v.sales)/8.2)*100);
            return(
              <div key={v.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:16,width:22}}>{v.logo}</span>
                <span style={{fontSize:11,fontWeight:600,color:th.text,minWidth:70}}>{v.name}</span>
                <div style={{flex:1,height:6,background:th.border,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:v.color,borderRadius:3}}/>
                </div>
                <span style={{fontSize:10,color:th.muted,minWidth:34}}>{v.sales}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:th.cardRadius,padding:"22px"}}>
        <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:15,color:th.text,marginBottom:16}}>{t.recentOrders}</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{borderBottom:`1px solid ${th.border}`}}>
                {[t.orderCol,t.custCol,t.prodCol,t.amtCol,t.statusCol,t.timeCol].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 10px",color:th.muted,fontWeight:600,fontSize:11,textTransform:"uppercase"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o,idx)=>{
                const times=["2m","8m","15m","28m","45m"];
                const s=lang==="sw"?ss[o.s]:o.s;
                const c=sc[o.s]||th.muted;
                return(
                  <tr key={o.id} style={{borderBottom:`1px solid ${th.border}30`}}>
                    <td style={{padding:"11px 10px",fontWeight:700,color:th.accent}}>{o.id}</td>
                    <td style={{padding:"11px 10px",color:th.text}}>{o.c}</td>
                    <td style={{padding:"11px 10px",color:th.text}}>{o.p}</td>
                    <td style={{padding:"11px 10px",fontWeight:700,color:th.text}}>{fp(o.a,cur)}</td>
                    <td style={{padding:"11px 10px"}}><span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,background:c+"20",color:c}}>{s}</span></td>
                    <td style={{padding:"11px 10px",color:th.muted}}>{times[idx]} ago</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// CART DRAWER
// ══════════════════════════════════════════════════════════════════
function CartDrawer({cart,onClose,onUpd}){
  const {th,t,lang,cur}=useC();
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  return(
    <div style={{position:"fixed",inset:0,zIndex:9000,display:"flex",justifyContent:"flex-end"}}>
      <div onClick={onClose} style={{flex:1,background:"#00000055",backdropFilter:"blur(4px)"}}/>
      <div style={{width:380,background:th.surface,borderLeft:`1px solid ${th.border}`,display:"flex",flexDirection:"column",boxShadow:"-8px 0 32px #00000020"}}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${th.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:th.displayFont,fontWeight:800,fontSize:18,color:th.text}}>🛒 {t.cartTitle} ({cart.length})</div>
          <button onClick={onClose} style={{background:th.border,border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:18,color:th.muted,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 18px"}}>
          {!cart.length?(
            <div style={{textAlign:"center",padding:"60px 0",color:th.muted}}>
              <div style={{fontSize:48,marginBottom:12}}>📱</div>
              <div style={{fontWeight:600}}>{t.emptyCart}</div>
            </div>
          ):cart.map(i=>{
            const name=lang==="sw"?i.nameSw:i.name;
            return(
              <div key={i.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:`1px solid ${th.border}40`,alignItems:"center"}}>
                <div style={{width:48,height:48,borderRadius:10,background:`${i.vc}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{i.images?i.images[0]:i.image}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:13,color:th.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{name}</div>
                  <div style={{fontSize:11,color:th.muted}}>{i.brand}</div>
                  <div style={{color:th.accent,fontWeight:700,fontSize:14}}>{fp(i.price*i.qty,cur)}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <button onClick={()=>onUpd(i.id,-1)} style={{width:28,height:28,borderRadius:8,background:th.border,border:"none",color:th.text,cursor:"pointer",fontWeight:700}}>−</button>
                  <span style={{fontWeight:800,color:th.text,minWidth:16,textAlign:"center"}}>{i.qty}</span>
                  <button onClick={()=>onUpd(i.id,1)} style={{width:28,height:28,borderRadius:8,background:th.accent,border:"none",color:"#fff",cursor:"pointer",fontWeight:700}}>+</button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:"16px 18px",borderTop:`1px solid ${th.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:th.displayFont,fontWeight:800,fontSize:20,color:th.text,marginBottom:14}}>
            <span>{t.total}</span><span style={{color:th.accent}}>{fp(total,cur)}</span>
          </div>
          <button style={{width:"100%",padding:"14px",borderRadius:th.radius,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,color:"#fff",fontWeight:700,fontSize:15,fontFamily:th.font}}>
            {t.secureCheckout}
          </button>
          <button onClick={onClose} style={{width:"100%",marginTop:8,padding:"10px",borderRadius:th.radius,border:`1px solid ${th.border}`,background:"transparent",color:th.muted,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:th.font}}>
            {t.continueShopping}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════
function Footer({onNav}){
  const {th,t,lang}=useC();
  const isDark=th.dark||th===THEMES.luxury;
  const socials=[{i:"📘",c:"#1877f2"},{i:"📸",c:"#e1306c"},{i:"🎵",c:"#00f2ea"},{i:"💬",c:"#25d366"},{i:"▶️",c:"#ff0000"},{i:"🐦",c:"#1da1f2"}];
  return(
    <footer style={{borderTop:`1px solid ${th.border}`,background:isDark?"#050508":th.surface,padding:"36px 24px 20px",marginTop:48}}>
      <div style={{maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:28,marginBottom:28}}>
          <div>
            <div style={{fontFamily:th.displayFont,fontWeight:800,fontSize:22,color:th.accent,marginBottom:6}}>📱 DUMPAE {lang==="sw"?"SIMU":"PHONES"}</div>
            <div style={{color:th.muted,fontSize:13,lineHeight:1.7,marginBottom:14}}>{lang==="sw"?"Duka nambari moja la vifaa vya simu Tanzania. Bidhaa halisi, bei bora, utoaji wa haraka.":"Tanzania's #1 phone accessories store. Genuine products, best prices, fast delivery."}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {socials.map((s,i)=>(
                <button key={i} style={{width:34,height:34,borderRadius:8,border:"none",cursor:"pointer",fontSize:18,background:s.c+"20",color:s.c,transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=s.c;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=s.c+"20";e.currentTarget.style.color=s.c;}}>
                  {s.i}
                </button>
              ))}
            </div>
          </div>
          {[
            {title:lang==="sw"?"Viungo":"Quick Links",items:[["home","🏠 "+t.home],["store","🛍 "+t.store],["vendors","🏪 "+t.vendors],["about","ℹ️ "+t.about],["contact","📞 "+t.contact]]},
            {title:lang==="sw"?"Kategoria":"Categories",items:[["store","📱 Cases"],["store","🔌 Chargers"],["store","🎵 Audio"],["store","🔗 Cables"],["store","🔋 Power Banks"]]},
            {title:lang==="sw"?"Msaada":"Support",items:[["privacy","🔒 "+t.privacy],["contact","💬 "+t.contact],["about","ℹ️ "+t.about],["pos","🧾 "+t.pos],["admin","📊 "+t.admin]]},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontFamily:th.displayFont,fontWeight:700,fontSize:14,color:th.text,marginBottom:14}}>{col.title}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {col.items.map(([p,l])=>(
                  <span key={l} onClick={()=>onNav(p)} style={{fontSize:13,color:th.muted,cursor:"pointer",transition:"color 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.color=th.accent}
                    onMouseLeave={e=>e.currentTarget.style.color=th.muted}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${th.border}40`,paddingTop:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:12,color:th.muted}}>{t.footerCopy}</div>
          <div style={{display:"flex",gap:12}}>
            {["🔒 SSL","✅ Genuine","🇹🇿 Tanzania","📱 Phone Experts"].map(b=>(
              <span key={b} style={{fontSize:11,color:th.muted,fontWeight:600}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════
export default function App(){
  const [thKey,setThKey]=useState("phoneking");
  const [lang,setLang]=useState("en");
  const [cur,setCur]=useState("USD");
  const [page,setPage]=useState("home");
  const [cart,setCart]=useState([]);
  const [showCart,setShowCart]=useState(false);
  const [qvProduct,setQvProduct]=useState(null);

  const th=THEMES[thKey];
  const t=TR[lang];
  const ctx={th,t,lang,cur};

  const addCart=p=>setCart(c=>{const f=c.find(i=>i.id===p.id);return f?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}];});
  const updCart=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const nav=p=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});};

  const NAV_SIMPLE=[
    {id:"home",label:t.home,icon:"🏠"},
    {id:"vendors",label:t.vendors,icon:"🏪"},
    {id:"about",label:t.about,icon:"ℹ️"},
    {id:"contact",label:t.contact,icon:"📞"},
    {id:"privacy",label:t.privacy,icon:"🔒"},
    {id:"pos",label:t.pos,icon:"🧾"},
    {id:"admin",label:t.admin,icon:"📊"},
  ];

  const headerBg=typeof th.headerBg==="string"&&th.headerBg.startsWith("linear")?th.headerBg:th.headerBg;

  return(
    <Ctx.Provider value={ctx}>
      <GlobalCSS/>
      <div style={{minHeight:"100vh",background:th.bg,fontFamily:th.font}}>

        {/* SETTINGS BAR */}
        <div style={{background:headerBg,position:"sticky",top:0,zIndex:300,boxShadow:"0 2px 20px #00000030"}}>
          <SettingsBar thKey={thKey} setThKey={setThKey} lang={lang} setLang={setLang} cur={cur} setCur={setCur}/>
          <Ticker/>

          {/* MAIN NAV */}
          <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",height:60,gap:16}}>
            {/* Logo */}
            <div onClick={()=>nav("home")} style={{fontFamily:th.displayFont,fontWeight:800,fontSize:22,display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
              <span style={{fontSize:26}}>📱</span>
              <div>
                <div style={{color:"#fff",letterSpacing:-0.5,lineHeight:1}}>DUMPAE</div>
                <div style={{fontSize:9,fontWeight:800,color:"#ffffffaa",letterSpacing:"2px",lineHeight:1}}>{lang==="sw"?"SIMU":"PHONES"}</div>
              </div>
            </div>

            {/* Shop + Mega Menu */}
            <div style={{display:"flex",alignItems:"center",gap:2}}>
              <button onClick={()=>nav("store")} style={{padding:"8px 14px",borderRadius:th.radius==="4px"?0:8,border:"none",cursor:"pointer",fontFamily:th.font,fontWeight:700,fontSize:13,
                background:page==="store"?"#ffffff30":"transparent",color:"#fff",transition:"all 0.15s",display:"flex",alignItems:"center",gap:5,
                borderBottom:page==="store"?"2px solid #fff":"2px solid transparent"}}>
                🛍 {t.store}
              </button>
              <MegaMenu onNav={nav} onCatFilter={()=>nav("store")}/>
            </div>

            {/* Simple Nav items */}
            <nav style={{display:"flex",gap:1,flex:1}}>
              {NAV_SIMPLE.map(n=>(
                <button key={n.id} onClick={()=>nav(n.id)} style={{padding:"8px 10px",borderRadius:th.radius==="4px"?0:7,border:"none",cursor:"pointer",fontFamily:th.font,fontWeight:600,fontSize:12,display:"flex",alignItems:"center",gap:4,transition:"all 0.15s",whiteSpace:"nowrap",
                  background:page===n.id?"#ffffff25":"transparent",color:"#fff",opacity:page===n.id?1:0.8,
                  borderBottom:page===n.id?"2px solid #fff":"2px solid transparent"}}>
                  <span style={{fontSize:13}}>{n.icon}</span>{n.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:16,background:"#ffffff20",color:"#fff"}}>
                {CURRENCIES[cur].flag} {cur}
              </span>
              <button onClick={()=>setShowCart(true)} style={{background:"#ffffff20",border:"1px solid #ffffff30",borderRadius:th.radius,padding:"8px 14px",cursor:"pointer",color:"#fff",fontSize:14,display:"flex",alignItems:"center",gap:7,fontFamily:th.font,fontWeight:700,transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#ffffff35"}
                onMouseLeave={e=>e.currentTarget.style.background="#ffffff20"}>
                🛒
                {cartCount>0&&<span style={{background:"#fff",color:th.accent,borderRadius:20,fontSize:11,fontWeight:800,padding:"1px 7px"}}>{cartCount}</span>}
              </button>
              <div style={{width:36,height:36,borderRadius:th.radius,background:"#ffffff20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>👤</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main style={{maxWidth:1400,margin:"0 auto",padding:"28px 20px"}}>
          {page==="home"&&<HomePage onNav={nav} onAdd={addCart} onQV={setQvProduct}/>}
          {page==="store"&&<StorePage onAdd={addCart} onQV={setQvProduct}/>}
          {page==="vendors"&&<VendorsPage/>}
          {page==="about"&&<AboutPage/>}
          {page==="contact"&&<ContactPage/>}
          {page==="privacy"&&<PrivacyPage/>}
          {page==="pos"&&<POSPage/>}
          {page==="admin"&&<AdminPage/>}
        </main>

        <Footer onNav={nav}/>
      </div>

      {showCart&&<CartDrawer cart={cart} onClose={()=>setShowCart(false)} onUpd={updCart}/>}
      {qvProduct&&<QuickViewModal p={qvProduct} onClose={()=>setQvProduct(null)} onAdd={addCart}/>}
    </Ctx.Provider>
  );
}
