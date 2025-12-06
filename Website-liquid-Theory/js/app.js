/* Utilities */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("year").textContent = new Date().getFullYear();

/* Navbar mobile */
const navToggle = document.getElementById("navToggle");
const desktopNav = document.getElementById("desktopNav");
const mobileNav = document.getElementById("mobileNav");

if (desktopNav && mobileNav && navToggle) {
  mobileNav.innerHTML = desktopNav.innerHTML;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    mobileNav.classList.toggle("mobile-open");
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navToggle.classList.remove("open");
      mobileNav.classList.remove("mobile-open");
    }
  });
}

/* Hero liquid animation */
const heroLiquid = document.getElementById("heroLiquid");
if (heroLiquid) {
  let direction = 1;
  let height = 55;

  setInterval(() => {
    height += direction * 4;
    if (height > 80) {
      height = 80;
      direction = -1;
    } else if (height < 45) {
      height = 45;
      direction = 1;
    }
    heroLiquid.style.height = height + "%";
  }, 1800);
}

/* Drinks data (add your own image filenames in images/) */
const drinks = [
  {
    id: "neon-citrus-fizz",
    name: "Neon Citrus Fizz",
    type: "mocktail",
    abv: "0%",
    price: 9,
    short: "Lime, tonic, chlorophyll glow. Crisp, bright, long highball.",
    profile: ["Citrus", "Herbal", "Sparkling"],
    signature: true,
    // image: "images/neon-citrus-fizz.jpg",
    image: "images/image1.jpg",   // Neon Citrus Fizz

    details: {
      build: [
        "Highball glass with ice",
        "Fresh lime + house citrus cordial",
        "Zero-proof 'botanical gin' layer",
        "Topped with dry tonic and a chlorophyll float",
      ],
      garnish: "Dehydrated lime wheel + basil crown",
      flavour:
        "Bright, zesty and refreshing. Think classic G&T, completely alcohol-free.",
    },
  },
  {
    id: "midnight-cold-brew",
    name: "Midnight Cold Brew",
    type: "mocktail",
    abv: "0%",
    price: 10,
    short: "Nitro cold brew, vanilla, smoked salt and cocoa bitters.",
    profile: ["Coffee", "Dessert-style", "Velvety"],
    signature: true,
    // image: "images/midnight-cold-brew.jpg",
    image: "images/image2.jpg",   // Neon Citrus Fizz

    details: {
      build: [
        "Rocks glass, clear ice",
        "Vanilla + salted caramel reduction",
        "Nitro cold brew shaken hard",
        "Finished with cocoa & orange bitters",
      ],
      garnish: "Cocoa dust + orange peel expressed over the glass",
      flavour:
        "Dessert-leaning, rich but not too sweet. Like a tiramisu in a glass, minus the hangover.",
    },
  },
  {
    id: "spiced-smoke-highball",
    name: "Spiced Smoke Highball",
    type: "low-abv",
    abv: "6%",
    price: 12,
    short: "Smoked cinnamon, ginger beer and a light rum base.",
    profile: ["Spicy", "Smoky", "Long drink"],
    signature: false,
    // image: "images/spiced-smoke-highball.jpg",
    image: "images/image3.jpg",   // Neon Citrus Fizz

    details: {
      build: [
        "Highball glass with an ice spear",
        "Light rum and smoked cinnamon syrup",
        "Fresh lime, topped with ginger beer",
      ],
      garnish: "Smoked cinnamon stick at service",
      flavour:
        "Warm, spicy and aromatic without being heavy. Perfect early-evening starter.",
    },
  },
  {
    id: "umi-sour",
    name: "Umi Sour",
    type: "cocktail",
    abv: "18%",
    price: 14,
    short: "Japanese whisky, yuzu, umeshu and a salted foam cap.",
    profile: ["Sour", "Layered", "Modern classic"],
    signature: false,
    // image: "images/umi-sour.jpg",
    image: "images/gallery-4.jpg", // Umi Sour

    details: {
      build: [
        "Double rocks, large clear cube",
        "Japanese whisky + umeshu + yuzu syrup",
        "Short shake with aquafaba for foam",
      ],
      garnish: "Salted foam cap and yuzu peel",
      flavour:
        "Sharp citrus and plum sweetness balanced by a gentle whisky backbone.",
    },
  },
  {
    id: "desert-lime-soda",
    name: "Desert Lime Soda",
    type: "mocktail",
    abv: "0%",
    price: 8,
    short:
      "House lime shrub, sparkling water, a whisper of smoked salt.",
    profile: ["Citrus", "Light", "Sessionable"],
    signature: false,
    image: "images/desert-lime-soda.jpg",
    details: {
      build: [
        "Collins glass, pebble ice",
        "House lime shrub",
        "Topped with highly carbonated soda",
      ],
      garnish: "Thin lime ribbon & smoked salt rim (half)",
      flavour:
        "Super refreshing, low sugar, high sparkle. Great 'all-night' option.",
    },
  },
  {
    id: "signal-noise-old-fashioned",
    name: "Signal / Noise Old Fashioned",
    type: "cocktail",
    abv: "22%",
    price: 15,
    short:
      "Rewired Old Fashioned with split base and cacao bitters.",
    profile: ["Spirit-forward", "Classic", "Chocolate"],
    signature: true,
    image: "images/signal-noise-old-fashioned.jpg",
    details: {
      build: [
        "Rocks glass, big cube",
        "Split base bourbon + rum",
        "Dem sugar, cacao and orange bitters",
      ],
      garnish: "Orange twist, expressed and discarded",
      flavour:
        "Familiar Old Fashioned profile with a subtle chocolate note that doesn’t dominate.",
    },
  },
];

/* Drinks rendering */
const drinksGrid = document.getElementById("drinksGrid");
const favList = document.getElementById("favList");

function formatType(type) {
  if (type === "mocktail") return "Zero-proof";
  if (type === "low-abv") return "Low-ABV";
  return "Cocktail";
}

function renderDrinks(filter = "all") {
  if (!drinksGrid) return;
  drinksGrid.innerHTML = "";

  const filtered = drinks.filter((d) => {
    if (filter === "all") return true;
    if (filter === "low-abv") return d.type === "low-abv";
    return d.type === filter;
  });

  filtered.forEach((drink) => {
    const card = document.createElement("article");
    card.className = "drink-card";
    card.dataset.id = drink.id;

    const isFav = isFavourite(drink.id);

    card.innerHTML = `
      ${drink.image ? `
        <div class="drink-image-wrapper">
          <img src="${drink.image}" alt="${drink.name}" class="drink-image" />
        </div>
      ` : ""}

      <div class="drink-header">
        <div>
          <div class="drink-name">${drink.name}</div>
          <div class="drink-desc">${drink.short}</div>
        </div>
        <div>
          <div class="drink-type">${formatType(drink.type)}</div>
        </div>
      </div>

      <div class="drink-footer">
        <div>
          <span class="drink-price">$${drink.price}</span>
          <span style="margin-left: .3rem; font-size: .76rem; color: var(--muted);">${drink.abv} ABV</span>
          ${drink.signature
            ? '<span class="badge-chip" style="margin-left: .35rem;">Signature</span>'
            : ""}
        </div>
        <button class="fav-btn ${isFav ? "active" : ""}" data-fav-btn="${drink.id}" title="Toggle favourite">
          <span>${isFav ? "♥" : "♡"}</span>
        </button>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn")) return;
      openModal(drink);
    });

    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavourite(drink.id);
    });

    drinksGrid.appendChild(card);
  });
}

/* Filters */
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    renderDrinks(filter);
  });
});

/* Favourites (localStorage) */
const FAV_KEY = "liquidTheoryFavourites";

function getFavourites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setFavourites(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  renderFavourites();
  renderDrinks(
    document.querySelector(".filter-btn.active")?.dataset.filter || "all"
  );
}

function isFavourite(id) {
  return getFavourites().includes(id);
}

function toggleFavourite(id) {
  const favs = getFavourites();
  const idx = favs.indexOf(id);
  if (idx > -1) {
    favs.splice(idx, 1);
  } else {
    favs.push(id);
  }
  setFavourites(favs);
}

function renderFavourites() {
  if (!favList) return;
  const favs = getFavourites();
  favList.innerHTML = "";

  if (!favs.length) {
    favList.innerHTML =
      '<div class="fav-empty">No favourites yet. Tap the heart on any drink to save it.</div>';
    return;
  }

  favs.forEach((id) => {
    const drink = drinks.find((d) => d.id === id);
    if (!drink) return;
    const item = document.createElement("div");
    item.className = "fav-item";
    item.innerHTML = `
      <div>
        <div class="fav-name">${drink.name}</div>
        <div style="font-size:.76rem; color:var(--muted);">${formatType(
          drink.type
        )} • ${drink.abv}</div>
      </div>
      <div class="fav-pill">$${drink.price}</div>
    `;
    item.addEventListener("click", () => openModal(drink));
    favList.appendChild(item);
  });
}

/* Modal */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalBody = document.getElementById("modalBody");
const modalPrice = document.getElementById("modalPrice");
const modalExtra = document.getElementById("modalExtra");

function openModal(drink) {
  if (!modalBackdrop) return;

  modalTitle.textContent = drink.name;
  modalType.textContent = `${formatType(drink.type)} • ${drink.abv} ABV`;
  modalPrice.textContent = `$${drink.price}`;

  modalBody.innerHTML = `
    <div>
      <strong>Build:</strong>
      <ul>
        ${drink.details.build
          .map((step) => `<li>${step}</li>`)
          .join("")}
      </ul>
    </div>
    <div style="margin-top:.35rem;">
      <strong>Garnish:</strong> ${drink.details.garnish}
    </div>
    <div style="margin-top:.35rem;">
      <strong>Flavour:</strong> ${drink.details.flavour}
    </div>
    <div class="modal-tags">
      ${drink.profile.map((p) => `<span>${p}</span>`).join("")}
      ${
        drink.signature
          ? '<span>Signature menu item</span>'
          : '<span>Easy to batch for events</span>'
      }
    </div>
  `;

  modalExtra.textContent =
    drink.type === "mocktail"
      ? "Perfect for dry events or mixed-crowd menus."
      : "Ask about batching options for larger guest counts.";

  modalBackdrop.classList.add("show");
}

function closeModal() {
  modalBackdrop?.classList.remove("show");
}

modalClose?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* Forms */
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterError = document.getElementById("newsletterError");
const newsletterNote = document.getElementById("newsletterNote");

newsletterForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = newsletterEmail.value.trim();
  newsletterError.textContent = "";

  if (!value) {
    newsletterError.textContent = "Please enter your email.";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    newsletterError.textContent = "That doesn’t look like a valid email.";
    return;
  }

  newsletterNote.textContent = "Subscribed — check your inbox soon.";
  newsletterNote.classList.add("success");
  newsletterForm.reset();
});

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = ["name", "email", "date", "guests", "eventType"];
  let valid = true;

  fields.forEach((id) => {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    if (errorEl) errorEl.textContent = "";

    if (!input.value.trim()) {
      valid = false;
      if (errorEl) errorEl.textContent = "This field is required.";
    } else if (
      id === "email" &&
      !/^\S+@\S+\.\S+$/.test(input.value.trim())
    ) {
      valid = false;
      if (errorEl) errorEl.textContent = "Please enter a valid email.";
    } else if (id === "guests") {
      const num = Number(input.value);
      if (Number.isNaN(num) || num < 1) {
        valid = false;
        if (errorEl)
          errorEl.textContent = "Please enter a valid guest count.";
      }
    }
  });

  if (!valid) return;

  contactStatus.textContent =
    "Request captured locally — in production this would hit your inbox or CRM.";
  contactStatus.classList.add("success");
  contactForm.reset();
});

/* Initial render */
renderDrinks("all");
renderFavourites();
