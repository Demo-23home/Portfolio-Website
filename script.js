// ======================================================
// ⚙️ GLOBAL CONSTANTS
// ======================================================
const THEME_KEY = "theme";
const DARK_CLASS = "dark-mode";

// ======================================================
// 🌙 DARK MODE (clean + scalable + icon sync)
// ======================================================
const themeButtons = document.querySelectorAll(
  "#theme-toggle, #theme-toggle-mobile"
);

// Apply saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark") {
  document.body.classList.add(DARK_CLASS);
}

// Update button icons
const updateThemeIcons = () => {
  const isDark = document.body.classList.contains(DARK_CLASS);

  themeButtons.forEach((btn) => {
    if (btn) {
      btn.textContent = isDark ? "☀️" : "🌙";
    }
  });
};

// Toggle theme
const toggleTheme = () => {
  const isDark = document.body.classList.toggle(DARK_CLASS);
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  updateThemeIcons();
};

// Attach listeners
themeButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
});

// Initial icon state
updateThemeIcons();

// ======================================================
// 🎬 PAGE LOADER
// ======================================================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";

  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
});

// ======================================================
// ⚡ SMOOTH SCROLL (anchor links)
// ======================================================
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    e.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ======================================================
// 🎯 SCROLL REVEAL (IntersectionObserver)
// ======================================================
const revealElements = document.querySelectorAll(
  ".details-container, .section__text, .title, .text-container"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => {
    el.classList.add("fade-in");
    revealObserver.observe(el);
  });
}

// ======================================================
// 📱 MOBILE MENU
// ======================================================
const menuBtn = document.querySelector(".hamburger-icon");
const menu = document.querySelector(".menu-links");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
  });
}

// ======================================================
// 🎨 ACTIVE NAV LINK ON SCROLL
// ======================================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const setActiveNav = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveNav);