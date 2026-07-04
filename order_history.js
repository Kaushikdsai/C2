// ===== SAMPLE ORDER DATA =====
const orders = [
  { id: "ORD-1042", patient: "Rohan", date: "01-07-2026", status: "delivered", medicines: ["Paracetamol 500mg", "Cetirizine 10mg", "Vitamin C Tablets"] },
  { id: "ORD-1039", patient: "Ria", date: "28-06-2026", status: "delivered", medicines: ["Dolo 650", "Zincovit Tablets", "Vitamin C"] },
  { id: "ORD-1035", patient: "Arjun", date: "24-06-2026", status: "processing", medicines: ["Amoxicillin 250mg", "ORS Sachets"] },
  { id: "ORD-1031", patient: "Sneha", date: "20-06-2026", status: "shipped", medicines: ["Metformin 500mg", "Insulin Pen"] },
  { id: "ORD-1024", patient: "Kavya", date: "12-06-2026", status: "cancelled", medicines: ["Ibuprofen 400mg"] }
];

const state = { filter: "all", search: "" };
let cancelTargetId = null;

document.addEventListener("DOMContentLoaded", () => {
  renderFilterChips();
  renderOrders();
  bindUserDropdown();
  bindSidebar();
  bindSearch();
  bindConfirmModal();
});

function renderFilterChips() {
  const statuses = [...new Set(orders.map(o => o.status))];
  const chips = [{ key: "all", label: `All (${orders.length})` }, ...statuses.map(s => ({ key: s, label: `${capitalize(s)} (${orders.filter(o => o.status === s).length})` }))];
  document.getElementById("filterChips").innerHTML = chips.map(c =>
    `<button class="filter-chip ${state.filter === c.key ? "active" : ""}" data-filter="${c.key}">${c.label}</button>`
  ).join("");

  document.getElementById("filterChips").querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => { state.filter = chip.dataset.filter; renderFilterChips(); renderOrders(); });
  });
}

function renderOrders() {
  const list = document.getElementById("orderList");
  const filtered = orders.filter(o => {
    const matchesFilter = state.filter === "all" || o.status === state.filter;
    const q = state.search.toLowerCase();
    const matchesSearch = !q || o.patient.toLowerCase().includes(q) || o.medicines.some(m => m.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  if (orders.length === 0) {
    list.innerHTML = emptyState("💊", "No orders yet", "Your medicine orders will appear here once you place one.");
    return;
  }
  if (filtered.length === 0) {
    list.innerHTML = emptyState("🔍", "No matching orders", "Try adjusting your search or filter.");
    return;
  }

  list.innerHTML = filtered.map(o => `
    <div class="order-card" data-order-id="${o.id}">
      <div class="patient-avatar">👤</div>
      <div class="order-info">
        <p class="order-id">Order ID: ${o.id}</p>
        <p><strong>Patient Name:</strong> ${o.patient}</p>
        <p><strong>Order Date:</strong> ${o.date}</p>
        <p><strong>Status:</strong> <span class="status-badge ${o.status}">${capitalize(o.status)}</span></p>
      </div>
      <div class="medicines-box">
        <h4>Ordered Medicines</h4>
        <ul>${o.medicines.map(m => `<li>${m}</li>`).join("")}</ul>
      </div>
      <div class="order-card-footer">
        <button class="order-btn track-btn" data-id="${o.id}" ${o.status === "delivered" || o.status === "cancelled" ? "disabled" : ""}>Track Order</button>
        <button class="order-btn cancel-order" data-id="${o.id}" ${o.status !== "processing" ? "disabled" : ""}>Cancel Order</button>
        <button class="order-btn reorder" data-id="${o.id}">Reorder</button>
      </div>
    </div>
  `).join("");

  bindOrderActions();
}

function emptyState(icon, title, sub) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><h3>${title}</h3><p>${sub}</p></div>`;
}

function bindOrderActions() {
  document.querySelectorAll(".track-btn").forEach(btn => {
    btn.addEventListener("click", () => showToast(`Tracking info for ${btn.dataset.id} coming soon`, "info"));
  });

  document.querySelectorAll(".reorder").forEach(btn => {
    btn.addEventListener("click", () => {
      const order = orders.find(o => o.id === btn.dataset.id);
      showToast(`Reordering medicines for ${order.patient} — added to cart`, "success");
    });
  });

  document.querySelectorAll(".cancel-order").forEach(btn => {
    btn.addEventListener("click", () => {
      cancelTargetId = btn.dataset.id;
      document.getElementById("confirmOverlay").classList.add("show");
    });
  });
}

function bindConfirmModal() {
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirm);
  document.getElementById("confirmOverlay").addEventListener("click", (e) => { if (e.target.id === "confirmOverlay") closeConfirm(); });
  document.getElementById("confirmOkBtn").addEventListener("click", () => {
    const order = orders.find(o => o.id === cancelTargetId);
    if (order) { order.status = "cancelled"; renderFilterChips(); renderOrders(); showToast(`Order ${order.id} has been cancelled`, "error"); }
    closeConfirm();
  });
}
function closeConfirm() { document.getElementById("confirmOverlay").classList.remove("show"); cancelTargetId = null; }

function bindSearch() {
  document.getElementById("orderSearch").addEventListener("input", (e) => { state.search = e.target.value.trim(); renderOrders(); });
}

function bindSidebar() {
  document.querySelectorAll(".side-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".side-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      if (item.dataset.page !== "pharmacy") showToast(`Opening ${item.textContent.trim()}...`, "info");
    });
  });
}

function bindUserDropdown() {
  const userWrap = document.getElementById("userWrap");
  const dropdownMenu = document.getElementById("dropdownMenu");
  userWrap.addEventListener("click", (e) => { e.stopPropagation(); dropdownMenu.classList.toggle("show"); });
  document.addEventListener("click", () => dropdownMenu.classList.remove("show"));
  document.getElementById("logoutBtn").addEventListener("click", (e) => { e.preventDefault(); showToast("Logged out successfully", "info"); });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.3s"; setTimeout(() => toast.remove(), 300); }, 3000);
}
