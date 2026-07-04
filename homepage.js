document.addEventListener("DOMContentLoaded", () => {
  bindMobileNav();
  bindScrollSpy();
  bindScrollIndicator();
  bindHeroCta();
  bindFeatureCards();
  bindNavAuthButtons();
  bindContactForm();
});

// ===== MOBILE NAV TOGGLE =====
function bindMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const navbar = document.getElementById("navbar");
  toggle.addEventListener("click", () => navbar.classList.toggle("mobile-open"));

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => navbar.classList.remove("mobile-open"));
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function bindScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) current = section.id;
    });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  });
}

// ===== SCROLL INDICATOR =====
function bindScrollIndicator() {
  document.getElementById("scrollIndicator").addEventListener("click", () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  });
}

// ===== HERO CTA =====
function bindHeroCta() {
  document.getElementById("getStartedBtn").addEventListener("click", () => {
    showToast("Redirecting to registration...", "info");
  });
}

// ===== FEATURE CARDS =====
function bindFeatureCards() {
  const featureMessages = {
    appointment: "Redirecting to Appointment Scheduling...",
    doctors: "Redirecting to Find Doctors...",
    camps: "Redirecting to Medical Camps...",
    reports: "Redirecting to View Reports..."
  };
  document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", () => {
      showToast(featureMessages[card.dataset.feature] || "Loading...", "info");
    });
  });
}

// ===== LOGIN / REGISTER =====
function bindNavAuthButtons() {
  document.getElementById("loginBtn").addEventListener("click", () => showToast("Redirecting to Login...", "info"));
  document.getElementById("registerBtn").addEventListener("click", () => showToast("Redirecting to Registration...", "info"));
}

// ===== CONTACT FORM =====
function bindContactForm() {
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateContactForm()) {
      showToast("Please fix the errors before submitting", "error");
      return;
    }

    const btn = document.getElementById("sendMessageBtn");
    btn.disabled = true;
    btn.textContent = "Sending...";

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Send Message";
      document.getElementById("contactForm").reset();
      showToast("Message sent successfully! We'll get back to you soon.", "success");
    }, 1000);
  });

  ["cfName", "cfEmail", "cfPhone", "cfMessage"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => clearFieldError(id));
  });
}

function validateContactForm() {
  let valid = true;
  clearFieldError("cfName"); clearFieldError("cfEmail"); clearFieldError("cfPhone"); clearFieldError("cfMessage");

  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const phone = document.getElementById("cfPhone").value.trim();
  const message = document.getElementById("cfMessage").value.trim();

  if (!name || name.length < 2) { setFieldError("cfName", "Please enter your name"); valid = false; }
  if (!email) { setFieldError("cfEmail", "Email is required"); valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError("cfEmail", "Enter a valid email address"); valid = false; }
  if (phone && !/^\d{10}$/.test(phone)) { setFieldError("cfPhone", "Enter a valid 10-digit number"); valid = false; }
  if (!message || message.length < 5) { setFieldError("cfMessage", "Please enter a message (min 5 characters)"); valid = false; }

  return valid;
}

function setFieldError(id, msg) {
  document.getElementById(id).closest(".form-field").classList.add("error");
  document.getElementById(`err-${id}`).textContent = msg;
}
function clearFieldError(id) {
  document.getElementById(id).closest(".form-field").classList.remove("error");
  document.getElementById(`err-${id}`).textContent = "";
}

// ===== TOAST =====
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.3s"; setTimeout(() => toast.remove(), 300); }, 3000);
}
