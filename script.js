// ===============================
// 🌙 DARK MODE (with persistence)
// ===============================
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle theme
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// ===============================
// 🎬 PAGE LOADER
// ===============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }
});

// ===============================
// ⚡ SMOOTH SCROLL (anchor links)
// ===============================
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // skip if it's just "#"
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===============================
// 🎯 SCROLL REVEAL (IntersectionObserver)
// ===============================
const revealElements = document.querySelectorAll(
  ".details-container, .section__text, .title, .text-container",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((el) => {
  el.classList.add("fade-in");
  revealObserver.observe(el);
});

// ===============================
// 📱 MOBILE MENU (if you have one)
// ===============================
const menuBtn = document.querySelector(".hamburger-icon");
const menu = document.querySelector(".menu-links");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
  });
}

// ===============================
// 🎨 OPTIONAL: ACTIVE NAV LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
