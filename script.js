// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (navbar && window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else if (navbar) {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ============================================
// NAVBAR DROPDOWN (CLICK) - "Soluciones de transporte"
// ============================================
document.querySelectorAll('.nav-dropdown').forEach(btn => {
  const trigger = btn.querySelector('.nav-dropdown > a');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) btn.classList.add('open');
    });
  }
});
// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// REVEAL ON SCROLL (Intersection Observer)
// ============================================
const revealElements = document.querySelectorAll(
  '.hero-content, .trust-item, .why-us-text, .stat-item, ' +
  '.tracking-left, .tracking-visual, .client-logo, .cta-inner, ' +
  '.contact-info, .contact-form-box, .section-header, .footer-grid, ' +
  '.services-intro, .service-card, ' +
  '.no-hero-bg, .no-hero-text, .no-indicator, .no-map, .no-map-copy, ' +
  '.no-map-quote, .no-area-card, .no-navy-inner'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ============================================
// STAT CARDS - ENTRADA ESCALONADA + CONTADORES
// (se ejecuta solo la primera vez que entra al viewport)
// ============================================
const statCards = document.querySelectorAll('.stats-grid .stat-card');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;

      // Animación 1: entrada escalonada (stagger por transition-delay en CSS)
      statCards.forEach(card => card.classList.add('stat-card-visible'));

      // Animación 4: contadores (inicia después de la entrada)
      setTimeout(animateCounters, 700);

      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) statsObserver.observe(statsSection);

statCards.forEach(card => {
  card.addEventListener('touchstart', () => card.classList.add('stat-glow-active'), { passive: true });
  card.addEventListener('touchend', () => {
    setTimeout(() => card.classList.remove('stat-glow-active'), 600);
  }, { passive: true });
});

function animateCounters() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.stat-card-body strong').forEach(el => {
    const target = parseFloat(el.dataset.target || '0');
    const text = el.textContent;
    const hasPlus = text.startsWith('+');
    const hasPercent = text.includes('%');

    if (reduceMotion || !target) {
      el.textContent = text;
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const display = current % 1 === 0
        ? Math.round(current).toString()
        : current.toFixed(1);
      el.textContent = (hasPlus ? '+' : '') + display + (hasPercent ? '%' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}



// ============================================
// TRACKING FORM INTERACTION
// ============================================
const trackingInput = document.querySelector('.tracking-form input');
if (trackingInput) {
  trackingInput.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.01)';
    this.parentElement.style.transition = 'transform 0.3s';
  });
  trackingInput.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
}

// ============================================
// CONTACT FORM INTERACTION
// ============================================
const contactInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
contactInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.borderColor = '#2563eb';
    this.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
  });
  input.addEventListener('blur', function() {
    this.style.borderColor = '#e2e8f0';
    this.style.boxShadow = 'none';
  });
});

// ============================================
// WHATSAPP BUTTON PULSE
// ============================================
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
  setInterval(() => {
    whatsappBtn.style.transform = 'scale(1.05)';
    setTimeout(() => {
      whatsappBtn.style.transform = 'scale(1)';
    }, 300);
  }, 4000);
}

// ============================================
// SEGUROS - CARRUSEL
// ============================================
const segCarousel = document.getElementById('segCarousel');
if (segCarousel) {
  const track = segCarousel.querySelector('.seg-carousel-track');
  const prev = segCarousel.querySelector('.seg-carousel-arrow--prev');
  const next = segCarousel.querySelector('.seg-carousel-arrow--next');
  const slides = track.querySelectorAll('.seg-slide');
  const slideGap = 12;

  function getSlideWidth() {
    if (slides.length === 0) return 0;
    const first = slides[0];
    const width = first.getBoundingClientRect().width;
    return width + slideGap;
  }

  function scrollBySlide(dir) {
    const step = getSlideWidth();
    track.scrollBy({ left: step * dir, behavior: 'smooth' });
  }

  if (prev) prev.addEventListener('click', () => scrollBySlide(-1));
  if (next) next.addEventListener('click', () => scrollBySlide(1));

  // Autoplay lento (4.5s), pausa al hacer hover
  let autoplayTimer = null;
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => scrollBySlide(1), 4500);
  }
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  segCarousel.addEventListener('mouseenter', stopAutoplay);
  segCarousel.addEventListener('mouseleave', startAutoplay);
  startAutoplay();
}

// ============================================
// SEGUROS - REVEAL DE BENEFICIOS
// ============================================
const segBenefits = document.querySelectorAll('.seg-benefit');
if (segBenefits.length) {
  const segBenefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        segBenefitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  segBenefits.forEach(b => segBenefitObserver.observe(b));
}

// ============================================
// TRANSPORTE AÉREO - CARRUSEL OPERACIÓN
// ============================================
const taCarousel = document.getElementById('taOpsCarousel');
if (taCarousel) {
  const taTrack = taCarousel.querySelector('.ta-ops-track');
  const taPrev = taCarousel.querySelector('.ta-ops-arrow--prev');
  const taNext = taCarousel.querySelector('.ta-ops-arrow--next');
  const taDots = document.querySelectorAll('.ta-ops-dot');
  const taSlides = taTrack.querySelectorAll('.ta-ops-slide');
  const taGap = 12;
  let taIndex = 0;

  function taSlideWidth() {
    if (taSlides.length === 0) return 0;
    return taSlides[0].getBoundingClientRect().width + taGap;
  }
  function taUpdateDots() {
    const total = taSlides.length;
    taDots.forEach((d, i) => d.classList.toggle('active', i === taIndex % total));
  }
  function taGo(dir) {
    const maxScroll = taTrack.scrollWidth - taTrack.clientWidth;
    const step = taSlideWidth();
    taTrack.scrollBy({ left: step * dir, behavior: 'smooth' });
    taIndex = (taIndex + dir + taSlides.length) % taSlides.length;
    taUpdateDots();
  }
  if (taPrev) taPrev.addEventListener('click', () => taGo(-1));
  if (taNext) taNext.addEventListener('click', () => taGo(1));
}

// ============================================
// TRANSPORTE AÉREO - REVEAL SCROLL
// ============================================
const taReveal = document.querySelectorAll('.ta-feature, .ta-solution-left, .ta-ops-head');
if (taReveal.length) {
  const taObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        taObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  taReveal.forEach(el => taObserver.observe(el));
}

// ============================================
// LOGÍSTICA INTEGRAL - CARRUSEL "POR QUÉ ELEGIRNOS"
// ============================================
const lgGallery = document.querySelector('.lg-why-gallery');
if (lgGallery) {
  const slides = lgGallery.querySelectorAll('.lg-why-slide');
  let lgIndex = 0;
  setInterval(() => {
    slides[lgIndex].classList.remove('lg-why-slide--active');
    lgIndex = (lgIndex + 1) % slides.length;
    slides[lgIndex].classList.add('lg-why-slide--active');
  }, 3500);
}
