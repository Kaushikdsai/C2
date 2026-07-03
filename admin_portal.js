// ===================== DATA STORE =====================
const adminData = {
  stats: [
    { id: "users", label: "Total Users", value: 12458, change: 8.2, icon: "👥", color: "#1976D2", bg: "#E3F2FD" },
    { id: "appointments", label: "Appointments", value: 3684, change: 12.5, icon: "📅", color: "#7c3aed", bg: "#f0e9ff" },
    { id: "hospitals", label: "Hospitals", value: 342, change: 5.1, icon: "🏥", color: "#2E7D32", bg: "#E8F5E9" },
    { id: "doctors", label: "Doctors", value: 1256, change: 6.7, icon: "👨‍⚕️", color: "#ea580c", bg: "#FFF3E0" },
    { id: "pharmacies", label: "Pharmacies", value: 278, change: 6.3, icon: "💊", color: "#0891b2", bg: "#E0F7FA" }
  ],

  chartSets: {
    7: {
      labels: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
      data: {
        Appointments: [3050, 3180, 3220, 3400, 3480, 3600, 3684],
        Users: [1550, 1620, 1680, 1720, 1800, 1900, 1980],
        Treatments: [720, 780, 810, 850, 890, 920, 960]
      }
    },
    14: {
      labels: ["Apr 29","Apr 30","May 1","May 2","May 3","May 4","May 5","May 6","May 7","May 8","May 9","May 10","May 11","May 12"],
      data: {
        Appointments: [2400,2480,2510,2600,2650,2700,2750,2820,2880,2920,2980,3010,3030,3050],
        Users: [1100,1150,1180,1220,1260,1300,1340,1380,1410,1450,1480,1510,1530,1550],
        Treatments: [520,540,560,580,600,620,640,660,670,685,695,705,712,720]
      }
    },
    30: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      data: {
        Appointments: Array.from({ length: 30 }, (_, i) => Math.round(1800 + i * 65 + Math.sin(i) * 60)),
        Users: Array.from({ length: 30 }, (_, i) => Math.round(900 + i * 32 + Math.cos(i) * 30)),
        Treatments: Array.from({ length: 30 }, (_, i) => Math.round(400 + i * 18 + Math.sin(i / 2) * 15))
      }
    }
  },

  registrations: [
    { name: "City Care Hospital", role: "Hospital", date: "May 18, 2025", status: "active", icon: "🏥", bg: "#E3F2FD", color: "#1976D2", email: "admin@citycare.com", phone: "+91 9876543210", location: "Banjara Hills, Hyderabad" },
    { name: "Dr. Sarah Johnson", role: "Doctor", date: "May 18, 2025", status: "active", icon: "👨‍⚕️", bg: "#f0e9ff", color: "#7c3aed", email: "sarah.j@curonex.com", phone: "+91 9876543211", location: "Jubilee Hills, Hyderabad" },
    { name: "HealthPlus Pharmacy", role: "Pharmacy", date: "May 17, 2025", status: "active", icon: "💊", bg: "#E0F7FA", color: "#0891b2", email: "contact@healthplus.com", phone: "+91 9876543212", location: "Ameerpet, Hyderabad" },
    { name: "LifeCare Ambulance", role: "Ambulance Service", date: "May 17, 2025", status: "pending", icon: "🚑", bg: "#FFF3E0", color: "#ea580c", email: "dispatch@lifecare.com", phone: "+91 9876543213", location: "Kondapur, Hyderabad" },
    { name: "MedEquip Solutions", role: "Resource Vendor", date: "May 16, 2025", status: "active", icon: "📦", bg: "#f0e9ff", color: "#7c3aed", email: "sales@medequip.com", phone: "+91 9876543214", location: "Gachibowli, Hyderabad" }
  ],

  notifications: [
    { type: "info", title: "New hospital registration", desc: "City Care Hospital submitted documents for verification", time: "5 min ago", unread: true },
    { type: "success", title: "Backup completed", desc: "Nightly system backup finished successfully", time: "2 hours ago", unread: true },
    { type: "warn", title: "Pending approval", desc: "LifeCare Ambulance is awaiting approval", time: "3 hours ago", unread: true },
    { type: "info", title: "New doctor onboarded", desc: "Dr. Sarah Johnson completed profile setup", time: "1 day ago", unread: true },
    { type: "warn", title: "Storage usage high", desc: "Storage usage has crossed 60% of allocated capacity", time: "1 day ago", unread: true }
  ],

  quickActions: [
    { id: "addUser", icon: "👤➕", label: "Add New User", modalTitle: "Add New User", field1: "Full Name", field2: "Email Address" },
    { id: "addHospital", icon: "🏥➕", label: "Add Hospital", modalTitle: "Add Hospital", field1: "Hospital Name", field2: "Contact Email" },
    { id: "addDoctor", icon: "👨‍⚕️➕", label: "Add Doctor", modalTitle: "Add Doctor", field1: "Doctor Name", field2: "Email Address" },
    { id: "addPharmacy", icon: "💊➕", label: "Add Pharmacy", modalTitle: "Add Pharmacy", field1: "Pharmacy Name", field2: "Contact Email" },
    { id: "addAmbulance", icon: "🚑➕", label: "Add Ambulance", modalTitle: "Add Ambulance Service", field1: "Service Name", field2: "Dispatch Email" },
    { id: "viewReports", icon: "📊", label: "View Reports", isNav: true, page: "reports" }
  ],

  systemHealth: [
    { label: "Server Status", status: "online", pct: 99.98, sub: "Uptime: 99.98%", color: "#2E7D32" },
    { label: "Database", status: "online", pct: 99.95, sub: "Uptime: 99.95%", color: "#2E7D32" },
    { label: "Storage", status: "online", pct: 62, sub: "Used: 62%", color: "#1976D2" },
    { label: "Backup Status", status: "success", pct: 100, sub: "Last Backup: May 18, 2026 02:30 AM", color: "#2E7D32", isBackup: true }
  ],

  sidebarMeta: {
    users: { icon: "👥", title: "User Management", desc: "Manage all registered users, roles, and account statuses across the Curonex platform." },
    roles: { icon: "🛡️", title: "Role & Permissions", desc: "Configure access levels and permissions for admins, staff, and service providers." },
    hospitals: { icon: "🏥", title: "Hospitals", desc: "View, verify, and manage hospital partners registered on Curonex." },
    doctors: { icon: "👨‍⚕️", title: "Doctors", desc: "Manage doctor profiles, specializations, and verification status." },
    pharmacies: { icon: "💊", title: "Pharmacies", desc: "Manage partner pharmacies, inventory sync, and delivery zones." },
    ambulance: { icon: "🚑", title: "Ambulance Services", desc: "Manage emergency ambulance partners and dispatch coverage areas." },
    categories: { icon: "📦", title: "Resource Categories", desc: "Organize and manage categories for medical resources and equipment." },
    appointments: { icon: "📅", title: "Appointments", desc: "View and manage all appointment bookings across the platform." },
    reports: { icon: "📊", title: "Reports & Analytics", desc: "Generate and export detailed reports on platform usage and performance." },
    settings: { icon: "⚙️", title: "System Settings", desc: "Configure platform-wide settings, integrations, and preferences." },
    notifications: { icon: "🔔", title: "Notifications", desc: "Manage system-wide notification templates and delivery channels." },
    audit: { icon: "📋", title: "Audit Logs", desc: "Review a complete history of administrative actions and system events." },
    support: { icon: "🎧", title: "Support & Tickets", desc: "Track and resolve support tickets raised by users and partners." },
    backup: { icon: "☁️", title: "Backup & Restore", desc: "Manage system backups and restore points." },
    health: { icon: "💚", title: "System Health", desc: "Monitor server, database, and storage health in real time." }
  }
};

// ===================== STATE =====================
const state = {
  currentPage: "dashboard",
  chartDays: 7,
  dateRange: "7",
  notifUnreadCount: 5,
  activeQuickAction: null,
  activeDetailIndex: null
};

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderChart(7);
  renderQuickActions();
  renderRegistrations();
  renderSystemHealth();
  renderNotifications();

  bindHeaderDropdowns();
  bindGlobalSearch();
  bindSidebarNav();
  bindMobileSidebar();
  bindDateRange();
  bindChartRange();
  bindQuickActionModal();
  bindRegistrationModal();
  bindConfirmModal();
  bindMisc();
  bindKeyboardShortcuts();
});

// ===================== STAT CARDS =====================
function renderStats() {
  const row = document.getElementById("statsRow");
  row.innerHTML = adminData.stats.map(s => `
    <div class="stat-card" data-stat="${s.id}">
      <div class="stat-top">
        <div class="stat-icon-circle" style="background:${s.bg};color:${s.color};">${s.icon}</div>
        <div>
          <p class="stat-label">${s.label}</p>
        </div>
      </div>
      <div class="stat-value">
        ${s.value.toLocaleString("en-IN")}
        <span class="stat-change up">↑ ${s.change}%</span>
      </div>
      <p class="stat-sub">vs last week</p>
    </div>
  `).join("");

  row.querySelectorAll(".stat-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.stat;
      const pageMap = { users: "users", appointments: "appointments", hospitals: "hospitals", doctors: "doctors", pharmacies: "pharmacies" };
      navigateTo(pageMap[id] || "dashboard");
    });
  });
}

// ===================== CHART (SVG line chart, no external libs) =====================
function renderChart(days) {
  state.chartDays = days;
  const dataset = adminData.chartSets[days] || adminData.chartSets[7];
  const svg = document.getElementById("chartSvg");
  const W = 720, H = 260, padL = 40, padR = 10, padT = 10, padB = 30;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  const allValues = Object.values(dataset.data).flat();
  const maxVal = Math.ceil(Math.max(...allValues) / 500) * 500 || 1000;
  const n = dataset.labels.length;

  const xFor = i => padL + (n === 1 ? 0 : (i / (n - 1)) * plotW);
  const yFor = v => padT + plotH - (v / maxVal) * plotH;

  let svgContent = "";

  // Grid lines + Y labels
  const gridSteps = 4;
  for (let g = 0; g <= gridSteps; g++) {
    const val = Math.round((maxVal / gridSteps) * g);
    const y = yFor(val);
    svgContent += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#eef1f6" stroke-width="1" />`;
    svgContent += `<text x="${padL - 8}" y="${y + 4}" font-size="10" fill="#6B7280" text-anchor="end">${formatShort(val)}</text>`;
  }

  // X labels (skip some if too many)
  const labelSkip = n > 14 ? Math.ceil(n / 8) : 1;
  dataset.labels.forEach((lbl, i) => {
    if (i % labelSkip !== 0 && i !== n - 1) return;
    svgContent += `<text x="${xFor(i)}" y="${H - 8}" font-size="10" fill="#6B7280" text-anchor="middle">${lbl}</text>`;
  });

  // Lines
  const seriesColors = { Appointments: "#1976D2", Users: "#2E7D32", Treatments: "#7c3aed" };
  Object.entries(dataset.data).forEach(([seriesName, values]) => {
    const color = seriesColors[seriesName] || "#1976D2";
    const points = values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");
    svgContent += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />`;
    values.forEach((v, i) => {
      svgContent += `<circle class="chart-point" cx="${xFor(i)}" cy="${yFor(v)}" r="4" fill="#fff" stroke="${color}" stroke-width="2"
        data-series="${seriesName}" data-value="${v}" data-label="${dataset.labels[i]}" style="cursor:pointer;" />`;
    });
  });

  svg.innerHTML = svgContent;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  bindChartTooltips();
}

function formatShort(num) {
  if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
  return num.toString();
}

function bindChartTooltips() {
  const tooltip = document.getElementById("chartTooltip");
  const wrap = document.getElementById("chartWrap");
  document.querySelectorAll(".chart-point").forEach(point => {
    point.addEventListener("mouseenter", (e) => {
      const { series, value, label } = e.target.dataset;
      tooltip.textContent = `${label} · ${series}: ${Number(value).toLocaleString("en-IN")}`;
      tooltip.classList.add("show");
      positionTooltip(e);
    });
    point.addEventListener("mousemove", positionTooltip);
    point.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
  });

  function positionTooltip(e) {
    const rect = wrap.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left) + "px";
    tooltip.style.top = (e.clientY - rect.top) + "px";
  }
}

// ===================== QUICK ACTIONS =====================
function renderQuickActions() {
  const grid = document.getElementById("quickActionsGrid");
  grid.innerHTML = adminData.quickActions.map(qa => `
    <div class="qa-card" data-qa-id="${qa.id}">
      <div class="qa-icon">${qa.icon}</div>
      <span>${qa.label}</span>
    </div>
  `).join("");

  grid.querySelectorAll(".qa-card").forEach(card => {
    card.addEventListener("click", () => {
      const qa = adminData.quickActions.find(q => q.id === card.dataset.qaId);
      if (!qa) return;
      if (qa.isNav) {
        navigateTo(qa.page);
      } else {
        openQuickActionModal(qa);
      }
    });
  });
}

// ===================== REGISTRATIONS TABLE =====================
function renderRegistrations() {
  const tbody = document.getElementById("regTableBody");
  if (adminData.registrations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-table">No recent registrations found.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminData.registrations.map((r, i) => `
    <tr data-reg-index="${i}">
      <td>
        <div class="reg-name-cell">
          <div class="reg-icon" style="background:${r.bg};color:${r.color};">${r.icon}</div>
          ${r.name}
        </div>
      </td>
      <td>${r.role}</td>
      <td>${r.date}</td>
      <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
    </tr>
  `).join("");

  tbody.querySelectorAll("tr[data-reg-index]").forEach(row => {
    row.addEventListener("click", () => openRegistrationDetail(parseInt(row.dataset.regIndex)));
  });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ===================== SYSTEM HEALTH =====================
function renderSystemHealth() {
  const list = document.getElementById("systemHealthList");
  list.innerHTML = adminData.systemHealth.map(h => `
    <div class="health-row">
      <div class="health-top">
        <div class="health-label-wrap">${h.label}</div>
        <span class="health-status-chip ${statusClass(h.status)}">${capitalize(h.status)}</span>
      </div>
      <div class="health-bar-track">
        <div class="health-bar-fill" style="width:${h.pct}%;background:${h.color};"></div>
      </div>
      ${h.isBackup
        ? `<div class="health-backup-note">✔ ${h.sub}</div>`
        : `<p class="health-sub">${h.sub}</p>`}
    </div>
  `).join("");
}

function statusClass(status) {
  if (status === "online" || status === "success") return "online";
  if (status === "offline") return "offline";
  return "degraded";
}

// ===================== NOTIFICATIONS =====================
function renderNotifications() {
  const list = document.getElementById("notifList");
  if (adminData.notifications.length === 0) {
    list.innerHTML = `<div class="search-empty">No notifications</div>`;
    updateNotifBadge();
    return;
  }

  list.innerHTML = adminData.notifications.map((n, i) => `
    <div class="notif-item ${n.unread ? "unread" : ""}" data-notif-index="${i}">
      <span class="notif-dot ${n.type}"></span>
      <div>
        <strong>${n.title}</strong>
        <p>${n.desc}</p>
        <p class="notif-time">${n.time}</p>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".notif-item").forEach(item => {
    item.addEventListener("click", () => {
      const idx = parseInt(item.dataset.notifIndex);
      if (adminData.notifications[idx].unread) {
        adminData.notifications[idx].unread = false;
        state.notifUnreadCount = Math.max(0, state.notifUnreadCount - 1);
        renderNotifications();
        updateNotifBadge();
      }
    });
  });

  updateNotifBadge();
}

function updateNotifBadge() {
  const badge = document.getElementById("notifBadge");
  const count = adminData.notifications.filter(n => n.unread).length;
  state.notifUnreadCount = count;
  if (count === 0) {
    badge.classList.add("hidden");
  } else {
    badge.classList.remove("hidden");
    badge.textContent = count > 9 ? "9+" : count;
  }
}

// ===================== HEADER DROPDOWNS =====================
function bindHeaderDropdowns() {
  const pairs = [
    { wrap: "notifWrap", panel: "notifPanel" },
    { wrap: "helpWrap", panel: "helpPanel" },
    { wrap: "userWrap", panel: "userPanel" }
  ];

  pairs.forEach(({ wrap, panel }) => {
    const wrapEl = document.getElementById(wrap);
    const panelEl = document.getElementById(panel);
    wrapEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = panelEl.classList.contains("show");
      closeAllDropdowns();
      if (!isOpen) panelEl.classList.add("show");
    });
  });

  document.addEventListener("click", closeAllDropdowns);

  document.getElementById("markAllReadBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    adminData.notifications.forEach(n => n.unread = false);
    renderNotifications();
    showToast("All notifications marked as read", "success");
  });

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    openConfirmModal("Log out?", "You will need to sign in again to access the admin dashboard.", () => {
      showToast("Logged out successfully", "info");
    });
  });

  document.getElementById("settingsWrap").addEventListener("click", () => navigateTo("settings"));
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-panel").forEach(p => p.classList.remove("show"));
  document.getElementById("dateRangePanel")?.classList.remove("show");
  document.getElementById("chartRangePanel")?.classList.remove("show");
  document.getElementById("searchResults")?.classList.remove("show");
}

// ===================== GLOBAL SEARCH =====================
function bindGlobalSearch() {
  const input = document.getElementById("globalSearch");
  const results = document.getElementById("searchResults");

  const searchableItems = [
    ...adminData.registrations.map(r => ({ label: r.name, tag: r.role, icon: r.icon })),
    { label: "User Management", tag: "Module", icon: "👥" },
    { label: "Appointment Scheduling", tag: "Module", icon: "📅" },
    { label: "System Settings", tag: "Module", icon: "⚙️" },
    { label: "Audit Logs", tag: "Module", icon: "📋" }
  ];

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.classList.remove("show");
      return;
    }
    const matches = searchableItems.filter(item => item.label.toLowerCase().includes(q));
    if (matches.length === 0) {
      results.innerHTML = `<div class="search-empty">No results found for "${escapeHtml(input.value)}"</div>`;
    } else {
      results.innerHTML = matches.map(m => `
        <div class="search-result-item">
          <span>${m.icon}</span>
          <span>${m.label}</span>
          <span class="search-result-tag">${m.tag}</span>
        </div>
      `).join("");
    }
    results.classList.add("show");
  });

  input.addEventListener("click", (e) => e.stopPropagation());
  results.addEventListener("click", (e) => e.stopPropagation());

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.blur();
      results.classList.remove("show");
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===================== KEYBOARD SHORTCUTS =====================
function bindKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("globalSearch");
      if (window.innerWidth > 900) input.focus();
      else showToast("Search is available on larger screens", "info");
    }
    if (e.key === "Escape") {
      closeAllDropdowns();
      closeQuickActionModal();
      closeRegistrationModal();
      closeConfirmModal();
    }
  });
}

// ===================== SIDEBAR NAVIGATION =====================
function bindSidebarNav() {
  document.querySelectorAll(".side-item").forEach(item => {
    item.addEventListener("click", () => {
      navigateTo(item.dataset.page);
      if (window.innerWidth <= 900) closeMobileSidebar();
    });
  });

  document.getElementById("placeholderBackBtn").addEventListener("click", () => navigateTo("dashboard"));
}

function navigateTo(page) {
  state.currentPage = page;

  document.querySelectorAll(".side-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  const dashboardPage = document.querySelector('[data-page-content="dashboard"]');
  const placeholderPage = document.querySelector('[data-page-content="placeholder"]');

  if (page === "dashboard") {
    dashboardPage.classList.add("active");
    placeholderPage.classList.remove("active");
  } else {
    dashboardPage.classList.remove("active");
    placeholderPage.classList.add("active");

    const meta = adminData.sidebarMeta[page] || { icon: "🛠️", title: capitalize(page), desc: "This module is under construction." };
    document.getElementById("placeholderIcon").textContent = meta.icon;
    document.getElementById("placeholderTitle").textContent = meta.title;
    document.getElementById("placeholderDesc").textContent = meta.desc;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===================== MOBILE SIDEBAR =====================
function bindMobileSidebar() {
  const btn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  btn.addEventListener("click", () => {
    sidebar.classList.add("show");
    backdrop.classList.add("show");
  });
  backdrop.addEventListener("click", closeMobileSidebar);
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("sidebarBackdrop").classList.remove("show");
}

// ===================== DATE RANGE (dashboard header) =====================
function bindDateRange() {
  const btn = document.getElementById("dateRangeBtn");
  const panel = document.getElementById("dateRangePanel");
  const label = document.getElementById("dateRangeLabel");

  const rangeLabels = {
    7: "May 12, 2025 - May 18, 2025",
    30: "Apr 19, 2025 - May 18, 2025",
    90: "Feb 18, 2025 - May 18, 2025",
    365: "Jan 1, 2025 - May 18, 2025"
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    panel.classList.toggle("show");
  });

  panel.querySelectorAll(".date-range-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const range = opt.dataset.range;
      state.dateRange = range;
      label.textContent = rangeLabels[range];
      panel.querySelectorAll(".date-range-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      panel.classList.remove("show");
      showToast(`Showing data for: ${rangeLabels[range]}`, "info");
      // Simulate slight variance in stats when range changes
      refreshStatsForRange(range);
    });
  });
}

function refreshStatsForRange(range) {
  const multiplier = { 7: 1, 30: 3.8, 90: 9.5, 365: 28 }[range] || 1;
  const row = document.getElementById("statsRow");
  adminData.stats.forEach((s, i) => {
    const card = row.children[i];
    const valueEl = card.querySelector(".stat-value");
    const newVal = Math.round(s.value * (range === "7" ? 1 : multiplier / 4));
    valueEl.childNodes[0].textContent = newVal.toLocaleString("en-IN") + " ";
  });
}

// ===================== CHART RANGE =====================
function bindChartRange() {
  const btn = document.getElementById("chartRangeBtn");
  const panel = document.getElementById("chartRangePanel");
  const label = document.getElementById("chartRangeLabel");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    panel.classList.toggle("show");
  });

  panel.querySelectorAll(".chart-range-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const days = parseInt(opt.dataset.days);
      label.textContent = opt.textContent;
      panel.classList.remove("show");
      renderChart(days);
    });
  });
}

// ===================== QUICK ACTION MODAL =====================
function bindQuickActionModal() {
  document.getElementById("closeQuickActionModal").addEventListener("click", closeQuickActionModal);
  document.getElementById("quickActionOverlay").addEventListener("click", (e) => {
    if (e.target.id === "quickActionOverlay") closeQuickActionModal();
  });

  document.getElementById("quickActionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const field1 = document.getElementById("qaField1").value.trim();
    const field2 = document.getElementById("qaField2").value.trim();
    const errorEl = document.getElementById("qaError");
    errorEl.textContent = "";

    if (!field1) {
      errorEl.textContent = "This field is required.";
      return;
    }
    if (!field2) {
      errorEl.textContent = "This field is required.";
      return;
    }
    if (field2.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field2)) {
      errorEl.textContent = "Please enter a valid email address.";
      return;
    }

    const qa = state.activeQuickAction;
    showToast(`${qa ? qa.modalTitle : "Item"} added successfully!`, "success");
    closeQuickActionModal();
  });
}

function openQuickActionModal(qa) {
  state.activeQuickAction = qa;
  document.getElementById("quickActionIcon").textContent = qa.icon.replace("➕", "");
  document.getElementById("quickActionTitle").textContent = qa.modalTitle;
  document.getElementById("quickActionSub").textContent = `Fill in the details below to ${qa.modalTitle.toLowerCase()}.`;
  document.getElementById("qaField1Label").textContent = qa.field1;
  document.getElementById("qaField2Label").textContent = qa.field2;
  document.getElementById("qaField1").value = "";
  document.getElementById("qaField2").value = "";
  document.getElementById("qaError").textContent = "";
  document.getElementById("quickActionOverlay").classList.add("show");
}

function closeQuickActionModal() {
  document.getElementById("quickActionOverlay").classList.remove("show");
}

// ===================== REGISTRATION DETAIL MODAL =====================
function bindRegistrationModal() {
  document.getElementById("closeDetailModal").addEventListener("click", closeRegistrationModal);
  document.getElementById("detailOverlay").addEventListener("click", (e) => {
    if (e.target.id === "detailOverlay") closeRegistrationModal();
  });

  document.getElementById("viewAllRegBtn").addEventListener("click", () => navigateTo("users"));
  document.getElementById("viewHealthDetailsBtn").addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("health");
  });

  document.getElementById("detailApproveBtn").addEventListener("click", () => {
    const idx = state.activeDetailIndex;
    if (idx === null) return;
    adminData.registrations[idx].status = "active";
    renderRegistrations();
    closeRegistrationModal();
    showToast(`${adminData.registrations[idx].name} has been approved`, "success");
  });

  document.getElementById("detailRejectBtn").addEventListener("click", () => {
    const idx = state.activeDetailIndex;
    if (idx === null) return;
    const reg = adminData.registrations[idx];
    closeRegistrationModal();
    openConfirmModal(
      "Reject this registration?",
      `${reg.name} will be notified and removed from the pending list.`,
      () => {
        reg.status = "rejected";
        renderRegistrations();
        showToast(`${reg.name} has been rejected`, "error");
      }
    );
  });
}

function openRegistrationDetail(index) {
  const reg = adminData.registrations[index];
  if (!reg) return;
  state.activeDetailIndex = index;

  document.getElementById("detailIcon").textContent = reg.icon;
  document.getElementById("detailIcon").style.background = reg.bg;
  document.getElementById("detailIcon").style.color = reg.color;
  document.getElementById("detailName").textContent = reg.name;
  document.getElementById("detailRole").textContent = reg.role;

  document.getElementById("detailGrid").innerHTML = `
    <div><span>Email</span><span>${reg.email}</span></div>
    <div><span>Phone</span><span>${reg.phone}</span></div>
    <div><span>Location</span><span>${reg.location}</span></div>
    <div><span>Registered On</span><span>${reg.date}</span></div>
    <div><span>Status</span><span><span class="status-badge ${reg.status}">${capitalize(reg.status)}</span></span></div>
  `;

  const approveBtn = document.getElementById("detailApproveBtn");
  const rejectBtn = document.getElementById("detailRejectBtn");
  if (reg.status === "active") {
    approveBtn.disabled = true;
    approveBtn.textContent = "Already Approved";
    rejectBtn.style.display = "block";
  } else if (reg.status === "rejected") {
    approveBtn.disabled = false;
    approveBtn.textContent = "Re-approve";
    rejectBtn.style.display = "none";
  } else {
    approveBtn.disabled = false;
    approveBtn.textContent = "Approve";
    rejectBtn.style.display = "block";
  }

  document.getElementById("detailOverlay").classList.add("show");
}

function closeRegistrationModal() {
  document.getElementById("detailOverlay").classList.remove("show");
  state.activeDetailIndex = null;
}

// ===================== GENERIC CONFIRM MODAL =====================
function bindConfirmModal() {
  document.getElementById("closeConfirmModal").addEventListener("click", closeConfirmModal);
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirmModal);
  document.getElementById("confirmOverlay").addEventListener("click", (e) => {
    if (e.target.id === "confirmOverlay") closeConfirmModal();
  });
}

let confirmCallback = null;

function openConfirmModal(title, sub, onConfirm) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmSub").textContent = sub;
  confirmCallback = onConfirm;

  const okBtn = document.getElementById("confirmOkBtn");
  const newOkBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOkBtn, okBtn);
  newOkBtn.addEventListener("click", () => {
    if (confirmCallback) confirmCallback();
    closeConfirmModal();
  });

  document.getElementById("confirmOverlay").classList.add("show");
}

function closeConfirmModal() {
  document.getElementById("confirmOverlay").classList.remove("show");
  confirmCallback = null;
}

// ===================== MISC =====================
function bindMisc() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileSidebar();
  });
}

// ===================== TOAST =====================
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
