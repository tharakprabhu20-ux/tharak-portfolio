// ==========================================================================
// PORTFOLIO INTERACTIVITY & ANIMATION CONTROLLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle with LocalStorage persistence
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    document.body.classList.add("light");
    if (themeToggle) themeToggle.innerHTML = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      themeToggle.innerHTML = isLight ? "☀️" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      const isOpen = navLinks.classList.contains("nav-active");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        if (menuToggle) menuToggle.innerHTML = "☰";
      });
    });
  }

  // 3. Scroll Progress & Back to Top
  const progressBar = document.getElementById("progress-bar");
  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (topBtn) {
      if (scrollTop > 350) {
        topBtn.style.display = "flex";
      } else {
        topBtn.style.display = "none";
      }
    }
  });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 4. Subtle Cursor Follower Glow
  const glow = document.getElementById("ambient-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

  // 5. Dynamic Typewriter Effect for Multi-role titles
  const typewriterElement = document.getElementById("typewriter-text");
  if (typewriterElement) {
    const roles = [
      "AI & Data Science Student",
      "Full-Stack Web Developer",
      "Event Tech & AI Specialist",
      "Modern Web Craftsman"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const holdTime = 1800;

    const typeRole = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, holdTime);
        return;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }

      const speed = isDeleting ? deleteSpeed : typeSpeed;
      setTimeout(typeRole, speed);
    };

    typeRole();
  }

  // 6. Intersection Observer for Scroll Sliding / Fade Animations
  const revealElements = document.querySelectorAll(
    ".reveal-item, .reveal-slide-left, .reveal-slide-right"
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});