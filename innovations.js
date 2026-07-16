/* =========================================================
   INNOVATIONS SECTION — behavior
   Scroll reveal · counter animation · particles · details modal
   ========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------
     1. SCROLL REVEAL
  ----------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* -----------------------------------------------------
     2. FOOTER COUNTER
  ----------------------------------------------------- */
  const counterEl = document.getElementById("counter");
  if (counterEl) {
    const target = 7;
    let hasCounted = false;

    if (prefersReducedMotion) {
      counterEl.textContent = target;
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasCounted) {
              hasCounted = true;
              let current = 0;
              const step = () => {
                current += 1;
                counterEl.textContent = current;
                if (current < target) requestAnimationFrame(() => setTimeout(step, 130));
              };
              step();
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counterObserver.observe(counterEl);
    }
  }

  /* -----------------------------------------------------
     3. AMBIENT PARTICLES
  ----------------------------------------------------- */
  if (!prefersReducedMotion) {
    const field = document.getElementById("particleField");
    if (field) {
      const COUNT = 26;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < COUNT; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.setProperty("--drift", (Math.random() * 40 - 20) + "px");
        p.style.animationDuration = (9 + Math.random() * 14) + "s";
        p.style.animationDelay = (Math.random() * 12) + "s";
        frag.appendChild(p);
      }
      field.appendChild(frag);
    }
  }

  /* -----------------------------------------------------
     4. DETAILS MODAL
  ----------------------------------------------------- */
  const DETAILS = {
    duster: {
      tag: "Research Concept",
      color: "#3B82F6", 
      title: "Electric Exhaustive Duster",
      desc: "A handheld, electric-powered dust removal device engineered for high suction efficiency, low weight, and fast deep-cleaning cycles. Designed as a more portable, energy-efficient alternative to bulky vacuum systems.",
      meta: { Category: "Home Appliances", Status: "Concept / Pre-patent", Focus: "Efficiency & Portability" }
    },
    hydrofit: {
      tag: "Research Concept",
      color: "#22C55E", 
      title: "HydroFit Cap",
      desc: "A smart bottle-cap concept that tracks daily water intake, reminds the user at healthy intervals, and syncs hydration data to a companion app — aimed at building better hydration habits passively.",
      meta: { Category: "Health & Wellness", Status: "Concept / Pre-patent", Focus: "Behavioral Health Tech" }
    },
    hece: {
      tag: "Research Concept",
      color: "#A855F7",
      title: "Hybrid Energy Cooking Engine (HECE)",
      desc: "A cooking system that draws from multiple energy sources — combining conventional and renewable inputs — to lower dependency on a single fuel type while improving overall cooking efficiency.",
      meta: { Category: "Sustainable Appliances", Status: "Concept / Pre-patent", Focus: "Multi-source Energy" }
    },
    locket: {
      tag: "Research Concept",
      color: "#F97316",
      title: "AI-Enabled Wearable Locket",
      desc: "A discreet wearable that pairs an AI safety layer with continuous health monitoring, designed to detect anomalies and provide real-time assistance or alerts to trusted contacts.",
      meta: { Category: "Wearables / Safety Tech", Status: "Concept / Pre-patent", Focus: "AI + Personal Safety" }
    },
    airvolt: {
      tag: "Research Concept",
      color: "#EAB308",
      title: "AirVolt Wireless Room-Power System",
      desc: "A room-scale wireless power delivery concept that removes the need for wired outlets for compatible devices, aiming to simplify how rooms are powered and wired in the future.",
      meta: { Category: "Power & Energy Systems", Status: "Concept / Pre-patent", Focus: "Wireless Power Transfer" }
    },
    extender: {
      tag: "Research Concept",
      color: "#EC4899",
      title: "Compact Dual-Mode Wi-Fi & Bluetooth Extender",
      desc: "A single compact device that boosts both Wi-Fi and Bluetooth range simultaneously, intended for dense homes or offices that need more stable dual-protocol connectivity without extra hardware.",
      meta: { Category: "Networking Hardware", Status: "Concept / Pre-patent", Focus: "Dual-protocol Range" }
    },
    projector: {
      tag: "Research Concept",
      title: "Mechanical Smart Projector",
      color: "#06B6D4", 
      desc: "A portable projector concept built around simplified mechanical components to reduce manufacturing cost, aiming to make quality projection more accessible without sacrificing durability.",
      meta: { Category: "Consumer Electronics", Status: "Concept / Pre-patent", Focus: "Affordability & Durability" }
    }
  };

  const overlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTag = document.getElementById("modalTag");
  const modalMeta = document.getElementById("modalMeta");
  const modalClose = document.getElementById("modalClose");

  let lastFocusedEl = null;

  function openModal(id) {
    const data = DETAILS[id];
    if (!data || !overlay) return;

    modalTag.textContent = data.tag;

modalTag.style.color = data.color;
modalTag.style.borderColor = data.color;
modalTag.style.backgroundColor = data.color + "20";
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalMeta.innerHTML = "";
    Object.entries(data.meta).forEach(([key, value]) => {
      const li = document.createElement("li");
      const label = document.createElement("b");
      label.textContent = key;
      li.appendChild(label);
      li.appendChild(document.createTextNode(value));
      modalMeta.appendChild(li);
    });

    lastFocusedEl = document.activeElement;
    overlay.hidden = false;
    modalClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.id));
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && !overlay.hidden) closeModal();
  });
})();
