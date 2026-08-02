// Carousel Auto-scroll Functionality
const carouselTrack = document.querySelector('.carousel-track');
const indicators = document.querySelectorAll('.indicator');
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
let autoScrollInterval;
const autoScrollDelay = 5000; // 5 seconds

function goToSlide(index) {
  if (carouselTrack && slides.length > 0) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Initialize carousel
if (carouselTrack && slides.length > 0) {
  // Start auto-scroll
  startAutoScroll();
  
  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);
  }
  
  // Click on indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoScroll();
      goToSlide(index);
      startAutoScroll();
    });
  });
}

// ========== NAVIGATION ==========
const navham = document.querySelector(".navham");
const navList = document.querySelector(".navlist");

if (navham && navList) {
  navham.addEventListener("click", () => {
    navham.classList.toggle("active");
    navList.classList.toggle("active");
  });
}

if (navList && navham) {
  document.querySelectorAll(".nav-link").forEach((links) => {
    navList.classList.remove("active");
    navham.classList.remove("active");
  });
}

// Dropdown
let navItems = document.querySelectorAll(".nav-items");

navItems.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    let child = menu.querySelectorAll(":scope *");

    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      navItems.forEach((sub) => {
        sub.classList.remove("active");
        sub.removeAttribute("style");
      });
      menu.removeAttribute("style");
      child.forEach((x) => {
        x.removeAttribute("style");
      });
    } else {
      navItems.forEach((sub) => {
        sub.classList.remove("active");
        sub.setAttribute("style", "opacity:1");
      });
      menu.removeAttribute("style");
      child.forEach((x) => {
        x.removeAttribute("style");
      });
      menu.classList.add("active");
    }
  });
});

// ========== CAROUSEL ==========
(function() {
  const container = document.querySelector('.carousel-container');
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  let isHovered = false;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    if (!isHovered) {
      autoPlayInterval = setInterval(nextSlide, 6000);
    }
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  if (container) {
    container.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoPlay();
    });
    container.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(i);
      startAutoPlay();
    });
  });

  // Touch / Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (container) {
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  startAutoPlay();
})();

// ========== MODALS ==========
const membersModal = document.querySelector(".open-imgs");
const imgs = document.querySelectorAll(".members-imgs > img");
const closeImgs = document.querySelector(".close-imgs");
const openImgs = document.querySelector(".open-imgs > img");

if (membersModal && closeImgs && openImgs) {
  let currentValue = -1;

  imgs.forEach((image, index) => {
    image.addEventListener("click", (n) => {
      currentValue = index;
      membersModal.classList.toggle("active");
      openImgs.src = n.target.src;
    });
  });

  closeImgs.addEventListener("click", () => {
    membersModal.classList.remove("active");
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      membersModal.classList.remove("active");
    }
  });

  const carouselButtons = document.querySelectorAll(".carousel");

  carouselButtons.forEach((buttons) => {
    let x = 0;
    if (buttons.classList.contains("prev")) {
      x = -1;
    } else {
      x = 1;
    }

    buttons.addEventListener("click", () => {
      if (imgs[currentValue + x]) {
        openImgs.src = imgs[currentValue + x].src;
        currentValue += x;
      }
    });
  });
}

// ========== CAROUSEL LOGIC (Add to main.js) ==========

(function() {
  const container = document.querySelector('.carousel-container');
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  let isHovered = false;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    // Only start if not currently hovered
    if (!isHovered) {
      autoPlayInterval = setInterval(nextSlide, 6000);
    }
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Hover: stop autoplay
  if (container) {
    container.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoPlay();
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(i);
      startAutoPlay();
    });
  });

  // Touch / Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (container) {
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Start autoplay
  startAutoPlay();
})();