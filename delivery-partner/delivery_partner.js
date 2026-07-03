// ===== STATE =====
const state = {
  online: true,
  paused: false,
  today: { deliveries: 12, completed: 8, earnings: 1680, pending: 3, rating: 4.8 },
  earnings: { today: 1680, week: 6240, month: 24850 },
  statusCounts: { accepted: 12, pickedUp: 3, outForDelivery: 2, completed: 8 },
  availableOrders: [
    {
      id: "CUR125678", priority: true, pharmacy: "MedPlus Pharmacy",
      location: "Banjara Hills, Hyderabad", distance: "2.3 km", eta: "22 min",
      customer: "Ravi Kumar", address: "Road No. 12, Banjara Hills, Hyderabad",
      items: 3, fee: 85
    },
    {
      id: "CUR125679", priority: false, pharmacy: "Apollo Pharmacy",
      location: "Jubilee Hills, Hyderabad", distance: "3.1 km", eta: "28 min",
      customer: "Sneha Reddy", address: "Plot 45, Jubilee Hills, Hyderabad",
      items: 5, fee: 95
    },
    {
      id: "CUR125680", priority: false, pharmacy: "Wellness Forever",
      location: "Madhapur, Hyderabad", distance: "1.8 km", eta: "15 min",
      customer: "Arjun Singh", address: "HITEC City Road, Madhapur, Hyderabad",
      items: 2, fee: 70
    },
    {
      id: "CUR125681", priority: true, pharmacy: "MedPlus Pharmacy",
      location: "Kondapur, Hyderabad", distance: "4.5 km", eta: "35 min",
      customer: "Priya Nair", address: "Botanical Garden Rd, Kondapur, Hyderabad",
      items: 4, fee: 110
    },
    {
      id: "CUR125682", priority: false, pharmacy: "Apollo Pharmacy",
      location: "Gachibowli, Hyderabad", distance: "2.9 km", eta: "20 min",
      customer: "Karthik Rao", address: "DLF Road, Gachibowli, Hyderabad",
      items: 1, fee: 60
    }
  ],
  activeDeliveries: [
    {
      id: "CUR123455", pharmacy: "MedPlus Pharmacy", location: "Banjara Hills, Hyderabad",
      customer: "John Doe", phone: "+919876543210", eta: "18 min", stage: 2 // 0=Accepted,1=PickedUp,2=OutForDelivery,3=ReachedCustomer,4=Delivered
    },
    {
      id: "CUR123456", pharmacy: "Wellness Forever", location: "Madhapur, Hyderabad",
      customer: "Meera Iyer", phone: "+919876500011", eta: "9 min", stage: 1
    }
  ]
};

const STAGES = ["Accepted", "Picked Up", "Out for Delivery", "Reached Customer", "Delivered"];
const STAGE_ICONS = ["✔", "✔", "🛵", "👤", "📦"];

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderAvailableOrders();
  renderActiveDeliveries();
  renderRightPanel();
  bindHeaderEvents();
  bindSidebarEvents();
  bindQuickActions();
  bindMisc();
  greetByTime();
});

// ===== RENDER: STATS =====
function renderStats() {
  document.getElementById("statDeliveries").textContent = state.today.deliveries;
  document.getElementById("statCompleted").textContent = state.today.completed;
  document.getElementById("statEarnings").textContent = formatCurrency(state.today.earnings);
  document.getElementById("statPending").textContent = state.availableOrders.length ? state.today.pending : 0;
  document.getElementById("statCompletedTotal").textContent = state.today.completed;
  document.getElementById("statRating").textContent = state.today.rating.toFixed(1);

  document.getElementById("ordersBadge").textContent = state.availableOrders.length;
  document.getElementById("activeBadge").textContent = state.activeDeliveries.length;
  document.getElementById("availableCount").textContent = state.availableOrders.length;
  document.getElementById("activeCount").textContent = state.activeDeliveries.length;

  document.getElementById("sumAccepted").textContent = state.statusCounts.accepted;
  document.getElementById("sumPicked").textContent = state.statusCounts.pickedUp;
  document.getElementById("sumOut").textContent = state.statusCounts.outForDelivery;
  document.getElementById("sumCompleted").textContent = state.statusCounts.completed;
}

function renderRightPanel() {
  document.getElementById("rightEarnings").textContent = formatCurrency(state.earnings.today);
  document.getElementById("weekEarnings").textContent = formatCurrency(state.earnings.week);
  document.getElementById("monthEarnings").textContent = formatCurrency(state.earnings.month);

  document.getElementById("statusAccepted").textContent = state.statusCounts.accepted;
  document.getElementById("statusPicked").textContent = state.statusCounts.pickedUp;
  document.getElementById("statusOut").textContent = state.statusCounts.outForDelivery;
  document.getElementById("statusCompleted").textContent = state.statusCounts.completed;
}

// ===== RENDER: AVAILABLE ORDERS =====
function renderAvailableOrders() {
  const container = document.getElementById("availableOrdersList");
  container.innerHTML = "";

  if (!state.online) {
    container.innerHTML = emptyState("🔌", "You're offline", "Go online to see available orders.");
    return;
  }
  if (state.paused) {
    container.innerHTML = emptyState("⏸", "Deliveries paused", "Resume to view and accept new orders.");
    return;
  }
  if (state.availableOrders.length === 0) {
    container.innerHTML = emptyState("📭", "No orders available", "New orders will appear here as they come in.");
    return;
  }

  // Show top 2 on dashboard, rest accessible via "View All"
  const visibleOrders = state.availableOrders.slice(0, 2);

  visibleOrders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <div class="order-top">
        <div style="display:flex;">
          <div class="order-icon-box">📦</div>
          <div class="order-head">
            <div>
              <p class="order-id-label">ORDER ID</p>
              <p class="order-id">#${order.id}</p>
            </div>
          </div>
        </div>
        ${order.priority ? '<span class="priority-badge">High Priority</span>' : ''}
      </div>
      <p class="order-pharmacy">${order.pharmacy}</p>
      <p class="order-loc">📍 ${order.location}</p>
      <div class="order-meta-row">
        <div><strong>${order.distance}</strong>Distance</div>
        <div><strong>${order.eta}</strong>ETA</div>
      </div>
      <div class="order-deliver-to">
        <span>📍</span>
        <div><strong>${order.customer}</strong>${order.address}</div>
      </div>
      <div class="order-bottom">
        <div><strong>${order.items}</strong>Medicine Count</div>
        <div style="text-align:right;"><strong>₹${order.fee}</strong>Delivery Fee</div>
      </div>
      <button class="accept-btn" data-order-id="${order.id}">Accept Order</button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".accept-btn").forEach(btn => {
    btn.addEventListener("click", () => acceptOrder(btn.dataset.orderId));
  });
}

function emptyState(icon, title, sub) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><strong>${title}</strong><p>${sub}</p></div>`;
}

function acceptOrder(orderId) {
  const idx = state.availableOrders.findIndex(o => o.id === orderId);
  if (idx === -1) return;
  const [order] = state.availableOrders.splice(idx, 1);

  state.activeDeliveries.unshift({
    id: order.id, pharmacy: order.pharmacy, location: order.location,
    customer: order.customer, phone: "+919876543210", eta: order.eta, stage: 0
  });

  state.statusCounts.accepted += 1;
  state.today.pending = Math.max(0, state.today.pending - 1);

  renderAvailableOrders();
  renderActiveDeliveries();
  renderStats();
  renderRightPanel();
  showToast(`Order #${orderId} accepted!`, "success");
}

// ===== RENDER: ACTIVE DELIVERIES =====
function renderActiveDeliveries() {
  const container = document.getElementById("activeDeliveryList");
  container.innerHTML = "";

  if (state.activeDeliveries.length === 0) {
    container.innerHTML = emptyState("🛵", "No active deliveries", "Accept an order to start delivering.");
    return;
  }

  // Show only the first active delivery on dashboard (matches design)
  const delivery = state.activeDeliveries[0];
  const card = buildActiveDeliveryCard(delivery);
  container.appendChild(card);

  if (state.activeDeliveries.length > 1) {
    const more = document.createElement("p");
    more.style.cssText = "text-align:center;font-size:12px;color:#9ca3af;margin-top:8px;";
    more.textContent = `+${state.activeDeliveries.length - 1} more active`;
    container.appendChild(more);
  }
}

function buildActiveDeliveryCard(delivery) {
  const card = document.createElement("div");
  card.className = "order-card";

  const statusLabel = STAGES[delivery.stage];
  const isLastStage = delivery.stage >= STAGES.length - 1;

  card.innerHTML = `
    <div class="order-top">
      <div style="display:flex;">
        <div class="order-icon-box" style="background:#fff2e5;">📦</div>
        <div>
          <p class="order-id-label">ORDER ID</p>
          <p class="order-id">#${delivery.id}</p>
        </div>
      </div>
      <span class="status-badge">${statusLabel}</span>
    </div>
    <p class="order-pharmacy">${delivery.pharmacy}</p>
    <p class="order-loc">📍 ${delivery.location}</p>
    <div class="order-deliver-to" style="margin-top:12px;">
      <span>📍</span>
      <div>
        Deliver to<br>
        <strong>${delivery.customer}</strong>
        <button class="call-icon-btn" data-call="${delivery.phone}" title="Call ${delivery.customer}">📞</button>
      </div>
      <div style="margin-left:auto;text-align:right;">
        <p class="order-id-label">ETA</p>
        <strong style="color:#1548c9;">${delivery.eta}</strong>
      </div>
    </div>
    <div class="progress-tracker">
      ${STAGES.map((label, i) => `
        <div class="progress-step ${i < delivery.stage ? 'done' : i === delivery.stage ? 'current' : ''}">
          <div class="step-circle">${i < delivery.stage ? '✔' : STAGE_ICONS[i]}</div>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
    <div class="order-btn-row">
      <button class="nav-btn-outline" data-navigate="${delivery.id}">🧭 Navigate</button>
      <button class="deliver-btn" data-advance="${delivery.id}" ${isLastStage ? 'disabled' : ''}>
        ${isLastStage ? 'Delivered' : `Mark as ${STAGES[delivery.stage + 1]}`}
      </button>
    </div>
  `;

  card.querySelector("[data-advance]").addEventListener("click", () => advanceDelivery(delivery.id));
  card.querySelector("[data-navigate]").addEventListener("click", () => {
    showToast(`Opening navigation for #${delivery.id}...`, "info");
  });
  card.querySelector("[data-call]").addEventListener("click", (e) => {
    e.stopPropagation();
    showToast(`Calling ${delivery.customer}...`, "info");
  });

  return card;
}

function advanceDelivery(deliveryId) {
  const delivery = state.activeDeliveries.find(d => d.id === deliveryId);
  if (!delivery) return;

  if (delivery.stage === 0) { state.statusCounts.pickedUp++; state.statusCounts.accepted = Math.max(0, state.statusCounts.accepted - 1); }
  if (delivery.stage === 1) { state.statusCounts.outForDelivery++; state.statusCounts.pickedUp = Math.max(0, state.statusCounts.pickedUp - 1); }

  delivery.stage++;

  if (delivery.stage >= STAGES.length - 1) {
    // Delivered
    completeDelivery(deliveryId);
    return;
  }

  renderActiveDeliveries();
  renderStats();
  renderRightPanel();
  showToast(`#${deliveryId} marked as ${STAGES[delivery.stage]}`, "success");
}

function completeDelivery(deliveryId) {
  const idx = state.activeDeliveries.findIndex(d => d.id === deliveryId);
  if (idx === -1) return;

  state.activeDeliveries.splice(idx, 1);
  state.statusCounts.outForDelivery = Math.max(0, state.statusCounts.outForDelivery - 1);
  state.statusCounts.completed++;
  state.today.completed++;
  state.today.deliveries = Math.max(state.today.deliveries, state.today.completed);

  const earned = 75 + Math.floor(Math.random() * 40);
  state.today.earnings += earned;
  state.earnings.today += earned;
  state.earnings.week += earned;
  state.earnings.month += earned;

  renderActiveDeliveries();
  renderStats();
  renderRightPanel();
  showToast(`Order #${deliveryId} delivered! ₹${earned} earned.`, "success");
}

// ===== HEADER EVENTS =====
function bindHeaderEvents() {
  const userWrap = document.getElementById("userWrap");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const bellWrap = document.getElementById("bellWrap");
  const notifDropdown = document.getElementById("notifDropdown");

  userWrap.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
    notifDropdown.classList.remove("show");
  });

  bellWrap.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle("show");
    dropdownMenu.classList.remove("show");
    document.getElementById("notifBadge").style.display = "none";
  });

  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    notifDropdown.classList.remove("show");
  });

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    openModal(
      "Log out?",
      "You will need to sign in again to access your dashboard.",
      () => { showToast("Logged out successfully", "info"); }
    );
  });
}

// ===== SIDEBAR NAV =====
function bindSidebarEvents() {
  const items = document.querySelectorAll(".side-item");
  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const page = item.dataset.page;
      if (page !== "dashboard") {
        showToast(`Opening ${item.textContent.trim()}...`, "info");
      }
    });
  });

  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const page = el.dataset.nav;
      const target = document.querySelector(`.side-item[data-page="${page}"]`);
      if (target) target.click();
    });
  });

  document.getElementById("contactSupportBtn").addEventListener("click", () => {
    showToast("Connecting you to support...", "info");
  });
}

// ===== QUICK ACTIONS & AVAILABILITY =====
function bindQuickActions() {
  const availabilityToggle = document.getElementById("availabilityToggle");
  const availabilityStatus = document.getElementById("availabilityStatus");
  const goOnlineBtn = document.getElementById("goOnlineBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const navigateBtn = document.getElementById("navigateBtn");
  const scanBtn = document.getElementById("scanBtn");

  availabilityToggle.addEventListener("change", () => {
    state.online = availabilityToggle.checked;
    updateAvailabilityUI();
    if (!state.online) state.paused = false;
    renderAvailableOrders();
    showToast(state.online ? "You are now Online" : "You are now Offline", state.online ? "success" : "error");
  });

  goOnlineBtn.addEventListener("click", () => {
    state.online = true;
    availabilityToggle.checked = true;
    state.paused = false;
    updateAvailabilityUI();
    renderAvailableOrders();
    showToast("You are now Online", "success");
  });

  pauseBtn.addEventListener("click", () => {
    if (!state.online) {
      showToast("Go online first to pause deliveries", "error");
      return;
    }
    state.paused = !state.paused;
    pauseBtn.innerHTML = state.paused
      ? '<span class="qa-icon">▶</span> Resume Deliveries'
      : '<span class="qa-icon">⏸</span> Pause Deliveries';
    renderAvailableOrders();
    showToast(state.paused ? "Deliveries paused" : "Deliveries resumed", "info");
  });

  navigateBtn.addEventListener("click", () => {
    if (state.activeDeliveries.length === 0) {
      showToast("No active pickup to navigate to", "error");
      return;
    }
    showToast(`Navigating to pickup for #${state.activeDeliveries[0].id}...`, "info");
  });

  scanBtn.addEventListener("click", () => {
    openModal("Scan QR Code", "Point your camera at the pharmacy's order QR code to confirm pickup.", null, true);
  });

  function updateAvailabilityUI() {
    availabilityStatus.textContent = state.online ? "You are Online" : "You are Offline";
    availabilityStatus.classList.toggle("offline", !state.online);
    goOnlineBtn.disabled = state.online;
    document.querySelector(".status").innerHTML =
      `<i class="status-dot" style="background:${state.online ? '#22c55e' : '#9ca3af'}"></i> ${state.online ? 'Online' : 'Offline'}`;
  }
}

// ===== MISC (help card, modal) =====
function bindMisc() {
  document.getElementById("callSupportBtn").addEventListener("click", () => showToast("Connecting to 24/7 support...", "info"));
  document.getElementById("callPharmacyBtn").addEventListener("click", () => showToast("Connecting to pharmacy...", "info"));
  document.getElementById("emergencyBtn").addEventListener("click", () => {
    openModal("Emergency Assistance", "This will immediately alert our emergency response team with your live location. Continue?", () => {
      showToast("Emergency team notified. Stay safe.", "error");
    });
  });

  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
}

function greetByTime() {
  const hour = new Date().getHours();
  const name = "Kaushik";
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17) greeting = "Good Evening";
  document.getElementById("greetingText").textContent = `${greeting}, ${name}! 👋`;
}

// ===== MODAL =====
function openModal(title, message, onConfirm, hideCancel) {
  const overlay = document.getElementById("modalOverlay");
  const box = document.getElementById("modalBox");
  box.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <div class="modal-actions">
      ${hideCancel ? '' : '<button class="modal-btn secondary" id="modalCancel">Cancel</button>'}
      <button class="modal-btn primary" id="modalConfirm">${hideCancel ? 'Close' : 'Confirm'}</button>
    </div>
  `;
  overlay.classList.add("show");

  const cancelBtn = document.getElementById("modalCancel");
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  document.getElementById("modalConfirm").addEventListener("click", () => {
    if (onConfirm) onConfirm();
    closeModal();
  });
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("show");
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

// ===== UTIL =====
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}