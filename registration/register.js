const state = { currentStep: 1, totalSteps: 4, otpTimer: null, otpSeconds: 30 };

const stepTitles = {
  1: "Next: Contact Details →",
  2: "Next: Address →",
  3: "Next: Verify & Register →",
  4: "Create Account ✔"
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dob").max = new Date().toISOString().split("T")[0];
  bindPasswordToggle();
  bindPasswordStrength();
  bindPhoneRestrictions();
  bindOtpBoxes();
  bindNav();
  updateStepper();
});

// ===== NAV =====
function bindNav() {
  document.getElementById("nextBtn").addEventListener("click", handleNext);
  document.getElementById("backBtn").addEventListener("click", handleBack);
}

function handleNext() {
  if (!validateStep(state.currentStep)) {
    showToast("Please fix the errors before continuing", "error");
    return;
  }

  if (state.currentStep === state.totalSteps) {
    submitForm();
    return;
  }

  state.currentStep++;
  if (state.currentStep === 4) {
    prefillOtpStep();
    startOtpTimer();
    buildSummary();
  }
  showStep(state.currentStep);
}

function handleBack() {
  if (state.currentStep === 1) {
    showToast("Registration cancelled", "info");
    return;
  }
  state.currentStep--;
  showStep(state.currentStep);
}

function showStep(step) {
  document.querySelectorAll(".form-step").forEach(el => el.classList.remove("active"));
  document.querySelector(`[data-step-panel="${step}"]`).classList.add("active");

  document.getElementById("backBtn").textContent = step === 1 ? "Cancel" : "← Back";
  document.getElementById("nextBtn").textContent = stepTitles[step];
  updateStepper();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateStepper() {
  document.querySelectorAll(".step").forEach(stepEl => {
    const n = parseInt(stepEl.dataset.step);
    stepEl.classList.remove("active", "completed");
    if (n < state.currentStep) stepEl.classList.add("completed");
    else if (n === state.currentStep) stepEl.classList.add("active");
  });
  document.querySelectorAll(".step-line").forEach((line, i) => {
    line.classList.toggle("completed", i + 1 < state.currentStep);
  });
}

// ===== VALIDATION =====
function validateStep(step) {
  clearErrors(step);
  let valid = true;

  if (step === 1) {
    const fullName = val("fullName");
    const dob = val("dob");
    const gender = val("gender");
    const marital = val("maritalStatus");
    const email = val("email");
    const password = val("password");
    const confirmPassword = val("confirmPassword");
    const agree = document.getElementById("agreeTerms").checked;

    if (!fullName || fullName.trim().length < 2) valid = setError("fullName", "Please enter your full name") && false;
    if (!dob) valid = setError("dob", "Date of birth is required") && false;
    else {
      const age = calculateAge(dob);
      if (age < 13) valid = setError("dob", "You must be at least 13 years old") && false;
      else if (age > 120) valid = setError("dob", "Please enter a valid date of birth") && false;
    }
    if (!gender) valid = setError("gender", "Please select your gender") && false;
    if (!marital) valid = setError("maritalStatus", "Please select marital status") && false;
    if (!email) valid = setError("email", "Email is required") && false;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) valid = setError("email", "Enter a valid email address") && false;
    if (!password) valid = setError("password", "Password is required") && false;
    else if (!isStrongEnough(password)) valid = setError("password", "Password must be 8+ characters with letters, numbers & a symbol") && false;
    if (!confirmPassword) valid = setError("confirmPassword", "Please confirm your password") && false;
    else if (password !== confirmPassword) valid = setError("confirmPassword", "Passwords do not match") && false;
    if (!agree) valid = setError("agreeTerms", "You must agree to the Terms & Privacy Policy") && false;
  }

  if (step === 2) {
    const phone = val("phone");
    const altPhone = val("altPhone");
    const emergencyPhone = val("emergencyPhone");

    if (!phone) valid = setError("phone", "Phone number is required") && false;
    else if (!/^\d{10}$/.test(phone)) valid = setError("phone", "Enter a valid 10-digit number") && false;

    if (altPhone) {
      if (!/^\d{10}$/.test(altPhone)) valid = setError("altPhone", "Enter a valid 10-digit number") && false;
      else if (altPhone === phone) valid = setError("altPhone", "Alternate number must differ from primary") && false;
    }

    if (emergencyPhone && !/^\d{10}$/.test(emergencyPhone)) {
      valid = setError("emergencyPhone", "Enter a valid 10-digit number") && false;
    }
  }

  if (step === 3) {
    const addr1 = val("addr1");
    const city = val("city");
    const stateField = val("state");
    const pincode = val("pincode");

    if (!addr1) valid = setError("addr1", "Address is required") && false;
    if (!city) valid = setError("city", "City is required") && false;
    if (!stateField) valid = setError("state", "Please select a state") && false;
    if (!pincode) valid = setError("pincode", "Pincode is required") && false;
    else if (!/^\d{6}$/.test(pincode)) valid = setError("pincode", "Enter a valid 6-digit pincode") && false;
  }

  if (step === 4) {
    const otp = getOtpValue();
    if (otp.length !== 6) valid = setError("otp", "Please enter the complete 6-digit code") && false;
  }

  return valid;
}

function val(id) { return document.getElementById(id).value.trim(); }

function setError(id, message) {
  const field = document.getElementById(id).closest(".form-field") || document.getElementById(id).closest(".otp-row")?.parentElement;
  const errEl = document.getElementById(`err-${id}`);
  if (errEl) errEl.textContent = message;
  if (field) field.classList.add("error");
  return false;
}

function clearErrors(step) {
  const panel = document.querySelector(`[data-step-panel="${step}"]`);
  panel.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
  panel.querySelectorAll(".form-field").forEach(f => f.classList.remove("error"));
  const otpErr = document.getElementById("err-otp");
  if (otpErr) otpErr.textContent = "";
}

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

// ===== PASSWORD =====
function bindPasswordToggle() {
  document.querySelectorAll(".toggle-eye").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = document.getElementById(eye.dataset.target);
      const isPwd = input.type === "password";
      input.type = isPwd ? "text" : "password";
      eye.textContent = isPwd ? "🙈" : "👁";
    });
  });
}

function bindPasswordStrength() {
  const pwd = document.getElementById("password");
  pwd.addEventListener("input", () => {
    const score = getPasswordScore(pwd.value);
    const fill = document.getElementById("strengthFill");
    const text = document.getElementById("strengthText");
    const colors = ["#D32F2F", "#D32F2F", "#f59e0b", "#f59e0b", "#2E7D32"];
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const pct = [10, 30, 55, 80, 100];
    fill.style.width = pct[score] + "%";
    fill.style.background = colors[score];
    text.textContent = pwd.value ? `Password strength: ${labels[score]}` : "Use 8+ characters with a mix of letters, numbers & symbols";
  });
}

function getPasswordScore(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

function isStrongEnough(pwd) {
  return pwd.length >= 8 && /[a-zA-Z]/.test(pwd) && /\d/.test(pwd);
}

// ===== PHONE RESTRICTIONS =====
function bindPhoneRestrictions() {
  ["phone", "altPhone", "emergencyPhone", "pincode"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "");
    });
  });
}

// ===== OTP =====
function bindOtpBoxes() {
  const boxes = document.querySelectorAll(".otp-box");
  boxes.forEach((box, i) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/\D/g, "");
      box.classList.toggle("filled", !!box.value);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
    });
    box.addEventListener("paste", (e) => {
      e.preventDefault();
      const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6).split("");
      digits.forEach((d, idx) => { if (boxes[idx]) { boxes[idx].value = d; boxes[idx].classList.add("filled"); } });
      if (digits.length) boxes[Math.min(digits.length, boxes.length) - 1].focus();
    });
  });

  document.getElementById("resendBtn").addEventListener("click", () => {
    startOtpTimer();
    showToast("A new verification code has been sent", "success");
  });
}

function getOtpValue() {
  return Array.from(document.querySelectorAll(".otp-box")).map(b => b.value).join("");
}

function prefillOtpStep() {
  const code = document.getElementById("countryCode1").value;
  const phone = val("phone");
  document.getElementById("otpPhoneDisplay").textContent = `${code} ${maskPhone(phone)}`;
}

function maskPhone(phone) {
  if (phone.length !== 10) return phone;
  return phone.slice(0, 2) + "XXXXXX" + phone.slice(-2);
}

function startOtpTimer() {
  clearInterval(state.otpTimer);
  state.otpSeconds = 30;
  const resendBtn = document.getElementById("resendBtn");
  const timerText = document.getElementById("resendTimerText");
  const timerEl = document.getElementById("resendTimer");
  resendBtn.disabled = true;
  timerText.style.display = "inline";

  state.otpTimer = setInterval(() => {
    state.otpSeconds--;
    timerEl.textContent = state.otpSeconds;
    if (state.otpSeconds <= 0) {
      clearInterval(state.otpTimer);
      timerText.style.display = "none";
      resendBtn.disabled = false;
    }
  }, 1000);
}

// ===== SUMMARY =====
function buildSummary() {
  const genderMap = { female: "Female", male: "Male", other: "Other", prefer_not: "Prefer not to say" };
  const maritalMap = { single: "Single", married: "Married", divorced: "Divorced", widowed: "Widowed" };
  const contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || "email";

  const rows = [
    ["Full Name", val("fullName")],
    ["Date of Birth", val("dob")],
    ["Gender", genderMap[val("gender")] || "-"],
    ["Blood Group", val("bloodGroup") || "Not specified"],
    ["Marital Status", maritalMap[val("maritalStatus")] || "-"],
    ["Email", val("email")],
    ["Phone", `${document.getElementById("countryCode1").value} ${val("phone")}`],
    ["Alternate Phone", val("altPhone") ? `${document.getElementById("countryCode2").value} ${val("altPhone")}` : "Not provided"],
    ["Preferred Contact", contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)],
    ["Address", `${val("addr1")}${val("addr2") ? ", " + val("addr2") : ""}`],
    ["City / State", `${val("city")}, ${val("state")}`],
    ["Pincode", val("pincode")],
    ["Country", val("country")]
  ];

  document.getElementById("summaryGrid").innerHTML = rows
    .map(([label, value]) => `<div><span>${label}</span><span>${value || "-"}</span></div>`)
    .join("");
}

// ===== SUBMIT =====
function submitForm() {
  const btn = document.getElementById("nextBtn");
  btn.disabled = true;
  btn.textContent = "Creating account...";

  setTimeout(() => {
    document.getElementById("successOverlay").classList.add("show");
    setTimeout(() => {
      showToast("Account created successfully!", "success");
    }, 400);
  }, 1200);
}

// ===== TOAST =====
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}