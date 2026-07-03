// ===== MOCK ACCOUNT (simulating a backend record) =====
const MOCK_ACCOUNT = {
  email: "kaushik.t@gmail.com",
  phone: "9876543210",
  altPhone: "8765432145",
  password: "Curonex@123"
};

const state = {
  failedAttempts: 0,
  maxAttempts: 5,
  lockoutTimer: null,
  lockoutSeconds: 60,
  isLocked: false,
  resendTimer: null,
  resendSeconds: 30,
  recoveryMethod: "email"
};

document.addEventListener("DOMContentLoaded", () => {
  restoreRememberedUser();
  bindLoginForm();
  bindPasswordToggle();
  bindForgotPasswordModal();
  bindSocialButtons();
  bindNavButtons();
});

// ===== LOGIN FORM =====
function bindLoginForm() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (state.isLocked) {
      showToast("Account is locked. Please wait before trying again.", "error");
      return;
    }
    if (!validateLoginForm()) return;
    attemptLogin();
  });

  document.getElementById("identifier").addEventListener("input", () => clearFieldError("identifier"));
  document.getElementById("password").addEventListener("input", () => clearFieldError("password"));
}

function validateLoginForm() {
  clearFieldError("identifier");
  clearFieldError("password");
  let valid = true;

  const identifier = document.getElementById("identifier").value.trim();
  const password = document.getElementById("password").value;

  if (!identifier) {
    setFieldError("identifier", "Email or phone number is required");
    valid = false;
  } else {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier.replace(/\D/g, ""));
    if (!isEmail && !isPhone) {
      setFieldError("identifier", "Enter a valid email address or 10-digit phone number");
      valid = false;
    }
  }

  if (!password) {
    setFieldError("password", "Password is required");
    valid = false;
  }

  return valid;
}

function attemptLogin() {
  const btn = document.getElementById("loginBtn");
  const btnText = document.getElementById("loginBtnText");
  btn.disabled = true;
  btn.classList.add("loading");
  btnText.textContent = "Logging in";

  const identifier = document.getElementById("identifier").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  setTimeout(() => {
    const matchesIdentifier = identifier === MOCK_ACCOUNT.email || identifier.replace(/\D/g, "") === MOCK_ACCOUNT.phone;
    const matchesPassword = password === MOCK_ACCOUNT.password;

    if (matchesIdentifier && matchesPassword) {
      state.failedAttempts = 0;
      if (rememberMe) {
        localStorage.setItem("curonex_remember", identifier);
      } else {
        localStorage.removeItem("curonex_remember");
      }
      btnText.textContent = "Success!";
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => {
        showToast("Redirecting to dashboard...", "info");
      }, 1200);
    } else {
      state.failedAttempts++;
      btn.disabled = false;
      btn.classList.remove("loading");
      btnText.textContent = "Login";

      if (state.failedAttempts >= state.maxAttempts) {
        lockAccount();
      } else {
        const remaining = state.maxAttempts - state.failedAttempts;
        setFieldError("password", "Incorrect email/phone or password");
        showToast(`Login failed. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`, "error");
      }
    }
  }, 1000);
}

function lockAccount() {
  state.isLocked = true;
  const banner = document.getElementById("lockoutBanner");
  const timerEl = document.getElementById("lockoutTimer");
  const loginBtn = document.getElementById("loginBtn");

  banner.classList.add("show");
  loginBtn.disabled = true;
  state.lockoutSeconds = 60;
  timerEl.textContent = state.lockoutSeconds;

  clearInterval(state.lockoutTimer);
  state.lockoutTimer = setInterval(() => {
    state.lockoutSeconds--;
    timerEl.textContent = state.lockoutSeconds;
    if (state.lockoutSeconds <= 0) {
      clearInterval(state.lockoutTimer);
      state.isLocked = false;
      state.failedAttempts = 0;
      banner.classList.remove("show");
      loginBtn.disabled = false;
      showToast("You can now try logging in again", "info");
    }
  }, 1000);

  showToast("Too many failed attempts. Account locked for 60 seconds.", "error");
}

function restoreRememberedUser() {
  const saved = localStorage.getItem("curonex_remember");
  if (saved) {
    document.getElementById("identifier").value = saved;
    document.getElementById("rememberMe").checked = true;
  }
}

// ===== PASSWORD VISIBILITY =====
function bindPasswordToggle() {
  document.getElementById("toggleEye").addEventListener("click", () => {
    const input = document.getElementById("password");
    const eye = document.getElementById("toggleEye");
    const isPwd = input.type === "password";
    input.type = isPwd ? "text" : "password";
    eye.textContent = isPwd ? "🙈" : "👁";
  });

  document.querySelectorAll(".toggle-eye[data-target]").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = document.getElementById(eye.dataset.target);
      const isPwd = input.type === "password";
      input.type = isPwd ? "text" : "password";
      eye.textContent = isPwd ? "🙈" : "👁";
    });
  });
}

// ===== FIELD ERRORS =====
function setFieldError(id, message) {
  const field = document.getElementById(id).closest(".form-field");
  document.getElementById(`err-${id}`).textContent = message;
  field.classList.add("error");
}
function clearFieldError(id) {
  const field = document.getElementById(id).closest(".form-field");
  const errEl = document.getElementById(`err-${id}`);
  if (errEl) errEl.textContent = "";
  if (field) field.classList.remove("error");
}

// ===== FORGOT PASSWORD MODAL =====
function bindForgotPasswordModal() {
  const overlay = document.getElementById("forgotOverlay");

  document.getElementById("forgotPasswordLink").addEventListener("click", (e) => {
    e.preventDefault();
    if (state.isLocked) {
      showToast("Please wait for the lockout to end before resetting", "error");
      return;
    }
    openForgotModal();
  });

  document.getElementById("closeForgotModal").addEventListener("click", closeForgotModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeForgotModal(); });

  document.getElementById("sendCodeBtn").addEventListener("click", () => {
    state.recoveryMethod = document.querySelector('input[name="recoveryMethod"]:checked').value;
    const displayMap = {
      email: document.getElementById("recoveryEmailMasked").textContent,
      phone: document.getElementById("recoveryPhoneMasked").textContent,
      altPhone: document.getElementById("recoveryAltPhoneMasked").textContent
    };
    document.getElementById("sentToDisplay").textContent = displayMap[state.recoveryMethod];
    goToStage(2);
    startResendTimer();
    showToast(`Verification code sent via ${state.recoveryMethod === "email" ? "email" : state.recoveryMethod === "phone" ? "SMS to primary number" : "SMS to alternate number"}`, "success");
  });

  document.getElementById("backToStage1").addEventListener("click", () => {
    goToStage(1);
    clearInterval(state.resendTimer);
  });

  bindOtpBoxes();

  document.getElementById("verifyOtpBtn").addEventListener("click", () => {
    const otp = Array.from(document.querySelectorAll("#otpRow .otp-box")).map(b => b.value).join("");
    document.getElementById("err-otp").textContent = "";
    if (otp.length !== 6) {
      document.getElementById("err-otp").textContent = "Please enter the complete 6-digit code";
      return;
    }
    // Simulate verification (any 6 digits accepted in this mock)
    goToStage(3);
    showToast("Code verified successfully", "success");
  });

  document.getElementById("resendBtn").addEventListener("click", () => {
    startResendTimer();
    showToast("A new verification code has been sent", "success");
  });

  bindNewPasswordValidation();

  document.getElementById("resetPasswordBtn").addEventListener("click", () => {
    if (!validateNewPassword()) return;
    MOCK_ACCOUNT.password = document.getElementById("newPassword").value;
    goToStage(4);
  });

  document.getElementById("backToLoginBtn").addEventListener("click", () => {
    closeForgotModal();
    showToast("Password updated. Please log in with your new password.", "success");
  });
}

function openForgotModal() {
  document.getElementById("forgotOverlay").classList.add("show");
  goToStage(1);
  document.querySelectorAll("#otpRow .otp-box").forEach(b => { b.value = ""; b.classList.remove("filled"); });
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmNewPassword").value = "";
  document.getElementById("err-newPassword").textContent = "";
  document.getElementById("err-confirmNewPassword").textContent = "";
}

function closeForgotModal() {
  document.getElementById("forgotOverlay").classList.remove("show");
  clearInterval(state.resendTimer);
}

function goToStage(n) {
  document.querySelectorAll(".modal-stage").forEach(s => s.classList.remove("active"));
  document.querySelector(`.modal-stage[data-stage="${n}"]`).classList.add("active");
}

// ===== OTP =====
function bindOtpBoxes() {
  const boxes = document.querySelectorAll("#otpRow .otp-box");
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
}

function startResendTimer() {
  clearInterval(state.resendTimer);
  state.resendSeconds = 30;
  const resendBtn = document.getElementById("resendBtn");
  const timerText = document.getElementById("resendTimerText");
  const timerEl = document.getElementById("resendTimer");
  resendBtn.disabled = true;
  timerText.style.display = "inline";

  state.resendTimer = setInterval(() => {
    state.resendSeconds--;
    timerEl.textContent = state.resendSeconds;
    if (state.resendSeconds <= 0) {
      clearInterval(state.resendTimer);
      timerText.style.display = "none";
      resendBtn.disabled = false;
    }
  }, 1000);
}

// ===== NEW PASSWORD VALIDATION =====
function bindNewPasswordValidation() {
  const pwd = document.getElementById("newPassword");
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

function validateNewPassword() {
  const newPwd = document.getElementById("newPassword").value;
  const confirmPwd = document.getElementById("confirmNewPassword").value;
  document.getElementById("err-newPassword").textContent = "";
  document.getElementById("err-confirmNewPassword").textContent = "";
  let valid = true;

  if (!newPwd || newPwd.length < 8 || !/[a-zA-Z]/.test(newPwd) || !/\d/.test(newPwd)) {
    document.getElementById("err-newPassword").textContent = "Password must be 8+ characters with letters & numbers";
    valid = false;
  }
  if (newPwd === MOCK_ACCOUNT.password) {
    document.getElementById("err-newPassword").textContent = "New password must be different from your current password";
    valid = false;
  }
  if (!confirmPwd || confirmPwd !== newPwd) {
    document.getElementById("err-confirmNewPassword").textContent = "Passwords do not match";
    valid = false;
  }
  return valid;
}

// ===== SOCIAL LOGIN =====
function bindSocialButtons() {
  document.getElementById("googleBtn").addEventListener("click", () => {
    showToast("Redirecting to Google Sign-In...", "info");
  });
  document.getElementById("appleBtn").addEventListener("click", () => {
    showToast("Redirecting to Apple Sign-In...", "info");
  });
}

// ===== NAV =====
function bindNavButtons() {
  document.getElementById("registerBtn").addEventListener("click", () => {
    showToast("Redirecting to registration...", "info");
  });
  document.getElementById("registerNowLink").addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Redirecting to registration...", "info");
  });
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