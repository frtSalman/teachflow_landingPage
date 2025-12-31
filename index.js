// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Counter Animation
const counters = document.querySelectorAll(".stat-number");
const speed = 200;

const countUp = (counter) => {
  const target = +counter.getAttribute("data-target");
  const count = +counter.innerText;
  const increment = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => countUp(counter), 10);
  } else {
    counter.innerText = target.toLocaleString("tr-TR");
  }
};

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      countUp(counter);
      observer.unobserve(counter);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

counters.forEach((counter) => {
  observer.observe(counter);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector(".navbar-nav");
  navMenu.classList.toggle("show");
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navMenu = document.querySelector(".navbar-nav");
      navMenu.classList.remove("show");
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  }
});

// Button click animations
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Loading prevention
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Add loading state to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("no-loading")) {
      const originalText = this.innerHTML;
      this.innerHTML =
        '<span class="spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Yükleniyor...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 1500);
    }
  });
});

// Hero Slider
const slides = document.querySelector(".hero-slides");
const slideImages = document.querySelectorAll(".hero-slides img");

let currentIndex = 0;
const totalSlides = slideImages.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 3500);

// --- Deneme Sürümü Modal İşlemleri ---

// Modalı açan fonksiyon

// Form gönderimi (Submission)
/* document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trialForm");

  if (!form) {
    console.warn("trialForm bulunamadı");
    return;
  }

  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Yükleniyor durumu
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gönderiliyor...';

    const formData = {
      fullName: document.getElementById("fullName")?.value || "",
      email: document.getElementById("email")?.value || "",
      branch: document.getElementById("branch")?.value || "",
      city: document.getElementById("city")?.value || "",
      source: "TeachFlow Landing Page",
      date: new Date().toISOString(),
    };

    const webhookURL =
      "https://n8n.teachflow.net/webhook/teachflow-trial-request";

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Sunucu hatası: ${response.status}`);

      // Başarılı
      feedback.style.display = "block";
      feedback.className = "mt-3 text-center text-success fw-bold";
      feedback.innerHTML =
        '<i class="bi bi-check-circle-fill"></i> İsteğiniz alındı! Size döneceğiz.';
      form.reset();

      setTimeout(() => {
        // Modalı kapat
        const modalEl = document.getElementById("trialModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        // Butonu eski haline getir
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        feedback.style.display = "none";
      }, 2000);
    } catch (err) {
      console.error("Hata:", err);
      feedback.style.display = "block";
      feedback.className = "mt-3 text-center text-danger";
      feedback.innerText = "Bir hata oluştu. Lütfen tekrar deneyin.";

      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}); */
// END OF FILE - Make sure there is NO extra '}' after this line
