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
    { name: "City Care Hospital", role: "Hospital", date: "May 18, 2025", status: "active", icon: "🏥", bg: "#E3F2FD", color: "#1976D2" },
    { name: "Dr. Sarah Johnson", role: "Doctor", date: "May 18, 2025", status: "active", icon: "👨‍⚕️", bg: "#f0e9ff", color: "#7c3aed" },
    { name: "HealthPlus Pharmacy", role: "Pharmacy", date: "May 17, 2025", status: "active", icon: "💊", bg: "#E0F7FA", color: "#0891b2" },
    { name: "LifeCare Ambulance", role: "Ambulance Service", date: "May 17, 2025", status: "pending", icon: "🚑", bg: "#FFF3E0", color: "#ea580c" },
    { name: "MedEquip Solutions", role: "Resource Vendor", date: "May 16, 2025", status: "active", icon: "📦", bg: "#f0e9ff", color: "#7c3aed" }
  ],

  notifications: [
    { type: "info", title: "New hospital registration", desc: "City Care Hospital submitted documents for verification", time: "5 min ago", unread: true },
    { type: "success", title: "Backup completed", desc: "Nightly system backup finished successfully", time: "2 hours ago", unread: true },
    { type: "warn", title: "Pending approval", desc: "LifeCare Ambulance is awaiting approval", time: "3 hours ago", unread: true },
    { type: "info", title: "New doctor onboarded", desc: "Dr. Sarah Johnson completed profile setup", time: "1 day ago", unread: true },
    { type: "warn", title: "Storage usage high", desc: "Storage usage has crossed 60% of allocated capacity", time: "1 day ago", unread: true }
  ],

  quickActions: [
    { id: "addUser", icon: "👤➕", label: "Add New User", modalTitle: "Add New User", field1: "Full Name", field2: "Email Address", target: "users" },
    { id: "addHospital", icon: "🏥➕", label: "Add Hospital", modalTitle: "Add Hospital", field1: "Hospital Name", field2: "Contact Email", target: "hospitals" },
    { id: "addDoctor", icon: "👨‍⚕️➕", label: "Add Doctor", modalTitle: "Add Doctor", field1: "Doctor Name", field2: "Email Address", target: "doctors" },
    { id: "addPharmacy", icon: "💊➕", label: "Add Pharmacy", modalTitle: "Add Pharmacy", field1: "Pharmacy Name", field2: "Contact Email", target: "pharmacies" },
    { id: "addAmbulance", icon: "🚑➕", label: "Add Ambulance", modalTitle: "Add Ambulance Service", field1: "Service Name", field2: "Dispatch Email", target: "ambulance" },
    { id: "viewReports", icon: "📊", label: "View Reports", isNav: true, page: "reports" }
  ],

  systemHealth: [
    { label: "Server Status", status: "online", pct: 99.98, sub: "Uptime: 99.98%", color: "#2E7D32" },
    { label: "Database", status: "online", pct: 99.95, sub: "Uptime: 99.95%", color: "#2E7D32" },
    { label: "Storage", status: "online", pct: 62, sub: "Used: 62%", color: "#1976D2" },
    { label: "API Gateway", status: "online", pct: 99.90, sub: "Uptime: 99.90%", color: "#2E7D32" },
    { label: "Backup Status", status: "success", pct: 100, sub: "Last Backup: May 18, 2026 02:30 AM", color: "#2E7D32", isBackup: true }
  ],

  // ===== MODULE DATA (Resource Inventory = approval/verify workflow) =====
  moduleData: {
    hospitals: {
      type: "approval", labelA: "Location", labelB: "Beds",
      rows: [
        { name: "City Care Hospital", icon: "🏥", a: "Banjara Hills, Hyderabad", b: "180 beds", submitted: "May 18, 2025", status: "pending" },
        { name: "Sunrise Medical Center", icon: "🏥", a: "Gachibowli, Hyderabad", b: "220 beds", submitted: "May 16, 2025", status: "verified" },
        { name: "HealthPlus Hospital", icon: "🏥", a: "Ameerpet, Hyderabad", b: "140 beds", submitted: "May 15, 2025", status: "verified" },
        { name: "Wellness Hospital", icon: "🏥", a: "Kukatpally, Hyderabad", b: "95 beds", submitted: "May 14, 2025", status: "pending" },
        { name: "Metro Multi-Specialty", icon: "🏥", a: "Kondapur, Hyderabad", b: "310 beds", submitted: "May 10, 2025", status: "rejected" }
      ]
    },
    doctors: {
      type: "approval", labelA: "Specialization", labelB: "Experience",
      rows: [
        { name: "Dr. Sarah Johnson", icon: "👨‍⚕️", a: "Cardiologist", b: "10 years", submitted: "May 18, 2025", status: "pending" },
        { name: "Dr. Arjun Mehta", icon: "👨‍⚕️", a: "Cardiologist", b: "12 years", submitted: "May 12, 2025", status: "verified" },
        { name: "Dr. Kavya Reddy", icon: "👨‍⚕️", a: "Pediatrician", b: "7 years", submitted: "May 11, 2025", status: "verified" },
        { name: "Dr. Imran Sheikh", icon: "👨‍⚕️", a: "Orthopedic", b: "15 years", submitted: "May 9, 2025", status: "pending" },
        { name: "Dr. Neha Kapoor", icon: "👨‍⚕️", a: "Dermatologist", b: "5 years", submitted: "May 3, 2025", status: "rejected" }
      ]
    },
    pharmacies: {
      type: "approval", labelA: "Location", labelB: "License No.",
      rows: [
        { name: "HealthPlus Pharmacy", icon: "💊", a: "Ameerpet, Hyderabad", b: "LIC-88213", submitted: "May 17, 2025", status: "verified" },
        { name: "MedPlus Pharmacy", icon: "💊", a: "Banjara Hills, Hyderabad", b: "LIC-77102", submitted: "May 16, 2025", status: "verified" },
        { name: "Apollo Pharmacy", icon: "💊", a: "Jubilee Hills, Hyderabad", b: "LIC-65431", submitted: "May 15, 2025", status: "pending" },
        { name: "Wellness Forever", icon: "💊", a: "Madhapur, Hyderabad", b: "LIC-90233", submitted: "May 13, 2025", status: "pending" }
      ]
    },
    ambulance: {
      type: "approval", labelA: "Coverage Area", labelB: "Fleet Size",
      rows: [
        { name: "LifeCare Ambulance", icon: "🚑", a: "Hyderabad Central", b: "12 vehicles", submitted: "May 17, 2025", status: "pending" },
        { name: "QuickAid Emergency", icon: "🚑", a: "Secunderabad", b: "8 vehicles", submitted: "May 14, 2025", status: "verified" },
        { name: "RescueLine 24/7", icon: "🚑", a: "Gachibowli - HITEC City", b: "15 vehicles", submitted: "May 8, 2025", status: "verified" }
      ]
    },
    inventory: {
      type: "approval", labelA: "Vendor Type", labelB: "Items Supplied",
      rows: [
        { name: "MedEquip Solutions", icon: "📦", a: "Equipment Vendor", b: "ICU Monitors, Ventilators", submitted: "May 16, 2025", status: "verified" },
        { name: "SafeHands Supplies", icon: "📦", a: "PPE & Consumables", b: "Gloves, Masks, Gowns", submitted: "May 15, 2025", status: "pending" },
        { name: "OxyLife Distributors", icon: "📦", a: "Oxygen Supplier", b: "O2 Cylinders, Concentrators", submitted: "May 12, 2025", status: "pending" },
        { name: "BioTech Diagnostics", icon: "📦", a: "Lab Equipment", b: "Test Kits, Analyzers", submitted: "May 5, 2025", status: "rejected" }
      ]
    },

    users: {
      type: "data", labelA: "Email", labelB: "Role",
      rows: [
        { name: "Kaushik T", icon: "👤", a: "kaushik.t@curonex.com", b: "System Administrator", submitted: "Jan 12, 2025", status: "active" },
        { name: "Rohit Sharma", icon: "👤", a: "rohit.s@curonex.com", b: "Support Staff", submitted: "Feb 20, 2025", status: "active" },
        { name: "Ananya Iyer", icon: "👤", a: "ananya.i@curonex.com", b: "Hospital Admin", submitted: "Mar 3, 2025", status: "active" },
        { name: "Vikram Rao", icon: "👤", a: "vikram.r@curonex.com", b: "Content Moderator", submitted: "Apr 8, 2025", status: "suspended" },
        { name: "Priya Nair", icon: "👤", a: "priya.n@curonex.com", b: "Support Staff", submitted: "May 1, 2025", status: "active" }
      ]
    },
    notifications: {
      type: "toggle", labelA: "Channel", labelB: "Trigger Event",
      rows: [
        { name: "New Registration Alert", icon: "🔔", a: "Email + SMS", b: "On new hospital/doctor sign-up", submitted: "-", status: "active" },
        { name: "Backup Completion", icon: "☁️", a: "Email", b: "After nightly backup job", submitted: "-", status: "active" },
        { name: "Storage Threshold Warning", icon: "⚠️", a: "Email + Push", b: "Storage crosses 80%", submitted: "-", status: "active" },
        { name: "Failed Login Attempts", icon: "🔒", a: "SMS", b: "5+ failed logins in 10 min", submitted: "-", status: "suspended" },
        { name: "Ticket Escalation", icon: "🎧", a: "Email", b: "Ticket unresolved 24h+", submitted: "-", status: "active" }
      ]
    },
    audit: {
      type: "readonly", labelA: "Action", labelB: "IP Address",
      rows: [
        { name: "Kaushik T", icon: "📋", a: "Approved: HealthPlus Pharmacy", b: "182.65.14.20", submitted: "May 18, 2025 09:12 AM", status: "success" },
        { name: "System", icon: "📋", a: "Automated nightly backup executed", b: "internal", submitted: "May 18, 2025 02:30 AM", status: "success" },
        { name: "Rohit Sharma", icon: "📋", a: "Rejected: BioTech Diagnostics", b: "182.65.14.44", submitted: "May 17, 2025 06:40 PM", status: "critical" },
        { name: "Ananya Iyer", icon: "📋", a: "Updated hospital record: City Care", b: "182.65.14.12", submitted: "May 17, 2025 03:15 PM", status: "success" },
        { name: "Unknown", icon: "📋", a: "5 failed login attempts detected", b: "203.0.113.44", submitted: "May 16, 2025 11:58 PM", status: "critical" }
      ]
    },
    support: {
      type: "ticket", labelA: "Issue", labelB: "Priority",
      rows: [
        { name: "#TCK-4821 - City Care Hospital", icon: "🎧", a: "Unable to update bed availability", b: "High", submitted: "May 18, 2025", status: "open" },
        { name: "#TCK-4818 - Dr. Kavya Reddy", icon: "🎧", a: "Payout not received for April", b: "High", submitted: "May 17, 2025", status: "in-progress" },
        { name: "#TCK-4802 - Ravi Kumar (Patient)", icon: "🎧", a: "Appointment double-booked", b: "Medium", submitted: "May 15, 2025", status: "resolved" },
        { name: "#TCK-4795 - Apollo Pharmacy", icon: "🎧", a: "Inventory sync delayed", b: "Low", submitted: "May 12, 2025", status: "resolved" }
      ]
    }
  },

  backups: [
    { label: "Full System Backup", date: "May 18, 2026 · 02:30 AM", size: "4.2 GB", status: "success" },
    { label: "Database Snapshot", date: "May 17, 2026 · 02:30 AM", size: "1.8 GB", status: "success" },
    { label: "Full System Backup", date: "May 16, 2026 · 02:30 AM", size: "4.1 GB", status: "success" },
    { label: "Database Snapshot", date: "May 15, 2026 · 02:30 AM", size: "1.7 GB", status: "failed" }
  ],

  sidebarMeta: {
    users: { icon: "👥", title: "User Management", desc: "Manage all registered platform users, their roles, and account status." },
    hospitals: { icon: "🏥", title: "Hospitals", desc: "Review and verify hospital partner applications before they go live on Curonex." },
    doctors: { icon: "👨‍⚕️", title: "Doctors", desc: "Review and verify doctor profiles and credentials before approval." },
    pharmacies: { icon: "💊", title: "Pharmacies", desc: "Review and verify partner pharmacy applications and licenses." },
    ambulance: { icon: "🚑", title: "Ambulance Operator", desc: "Review and verify emergency ambulance service operators." },
    inventory: { icon: "📦", title: "Resource Inventory", desc: "Review and verify medical resource & equipment vendor applications." },
    reports: { icon: "📊", title: "Reports & Analytics", desc: "Platform-wide performance metrics and exportable reports." },
    settings: { icon: "⚙️", title: "System Settings", desc: "Configure platform-wide settings, integrations, and preferences." },
    notifications: { icon: "🔔", title: "Notifications", desc: "Manage system-wide notification templates and delivery channels." },
    audit: { icon: "📋", title: "Audit Logs", desc: "Complete history of administrative actions and system events." },
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
  activeQuickAction: null,
  activeDetail: null, // { moduleKey, rowIndex }
  moduleFilter: "all",
  moduleSearch: ""
};

let confirmCallback = null;

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderChart(7);
  renderQuickActions();
  renderRegistrations();
  renderSystemHealth();
  renderNotifications();
  updateSidebarCounts();

  bindHeaderDropdowns();
  bindGlobalSearch();
  bindSidebarNav();
  bindMobileSidebar();
  bindDateRange();
  bindChartRange();
  bindQuickActionModal();
  bindDetailModal();
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
        <div><p class="stat-label">${s.label}</p></div>
      </div>
      <div class="stat-value">${s.value.toLocaleString("en-IN")} <span class="stat-change up">↑ ${s.change}%</span></div>
      <p class="stat-sub">vs last week</p>
    </div>
  `).join("");

  row.querySelectorAll(".stat-card").forEach(card => {
    card.addEventListener("click", () => {
      const pageMap = { users: "users", appointments: "reports", hospitals: "hospitals", doctors: "doctors", pharmacies: "pharmacies" };
      navigateTo(pageMap[card.dataset.stat] || "dashboard");
    });
  });
}

// ===================== CHART =====================
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
  const gridSteps = 4;
  for (let g = 0; g <= gridSteps; g++) {
    const val = Math.round((maxVal / gridSteps) * g);
    const y = yFor(val);
    svgContent += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#eef1f6" stroke-width="1" />`;
    svgContent += `<text x="${padL - 8}" y="${y + 4}" font-size="10" fill="#6B7280" text-anchor="end">${formatShort(val)}</text>`;
  }

  const labelSkip = n > 14 ? Math.ceil(n / 8) : 1;
  dataset.labels.forEach((lbl, i) => {
    if (i % labelSkip !== 0 && i !== n - 1) return;
    svgContent += `<text x="${xFor(i)}" y="${H - 8}" font-size="10" fill="#6B7280" text-anchor="middle">${lbl}</text>`;
  });

  const seriesColors = { Appointments: "#1976D2", Users: "#2E7D32", Treatments: "#7c3aed" };
  Object.entries(dataset.data).forEach(([seriesName, values]) => {
    const color = seriesColors[seriesName] || "#1976D2";
    const points = values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");
    svgContent += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />`;
    values.forEach((v, i) => {
      svgContent += `<circle class="chart-point" cx="${xFor(i)}" cy="${yFor(v)}" r="4" fill="#fff" stroke="${color}" stroke-width="2" data-series="${seriesName}" data-value="${v}" data-label="${dataset.labels[i]}" style="cursor:pointer;" />`;
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
      if (qa.isNav) navigateTo(qa.page);
      else openQuickActionModal(qa);
    });
  });
}

// ===================== DASHBOARD: RECENT REGISTRATIONS =====================
function renderRegistrations() {
  const tbody = document.getElementById("regTableBody");
  if (adminData.registrations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-table">No recent registrations found.</td></tr>`;
    return;
  }
  tbody.innerHTML = adminData.registrations.map(r => `
    <tr>
      <td><div class="name-cell"><div class="row-icon" style="background:${r.bg};color:${r.color};">${r.icon}</div>${r.name}</div></td>
      <td>${r.role}</td>
      <td>${r.date}</td>
      <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
    </tr>
  `).join("");
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "); }

// ===================== SYSTEM HEALTH (dashboard mini widget) =====================
function renderSystemHealth() {
  const list = document.getElementById("systemHealthList");
  list.innerHTML = adminData.systemHealth.slice(0, 4).map(h => healthRowHtml(h)).join("");
}

function healthRowHtml(h) {
  return `
    <div class="health-row">
      <div class="health-top">
        <div class="health-label-wrap">${h.label}</div>
        <span class="health-status-chip ${statusClass(h.status)}">${capitalize(h.status)}</span>
      </div>
      <div class="health-bar-track"><div class="health-bar-fill" style="width:${h.pct}%;background:${h.color};"></div></div>
      ${h.isBackup ? `<div class="health-backup-note">✔ ${h.sub}</div>` : `<p class="health-sub">${h.sub}</p>`}
    </div>`;
}

function statusClass(status) {
  if (["online", "success", "active", "verified", "resolved", "completed"].includes(status)) return "online";
  if (["offline", "rejected", "suspended", "failed", "critical"].includes(status)) return "offline";
  return "degraded";
}

// ===================== NOTIFICATIONS (header) =====================
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
      <div><strong>${n.title}</strong><p>${n.desc}</p><p class="notif-time">${n.time}</p></div>
    </div>
  `).join("");

  list.querySelectorAll(".notif-item").forEach(item => {
    item.addEventListener("click", () => {
      const idx = parseInt(item.dataset.notifIndex);
      if (adminData.notifications[idx].unread) {
        adminData.notifications[idx].unread = false;
        renderNotifications();
      }
    });
  });
  updateNotifBadge();
}

function updateNotifBadge() {
  const badge = document.getElementById("notifBadge");
  const count = adminData.notifications.filter(n => n.unread).length;
  if (count === 0) badge.classList.add("hidden");
  else { badge.classList.remove("hidden"); badge.textContent = count > 9 ? "9+" : count; }
}

// ===================== SIDEBAR PENDING COUNTS =====================
function updateSidebarCounts() {
  document.querySelectorAll("[data-count-for]").forEach(el => {
    const key = el.dataset.countFor;
    const mod = adminData.moduleData[key];
    if (!mod) return;
    const pendingCount = mod.rows.filter(r => r.status === "pending").length;
    el.textContent = pendingCount > 0 ? pendingCount : "";
  });
}

// ===================== HEADER DROPDOWNS =====================
function bindHeaderDropdowns() {
  const pairs = [{ wrap: "notifWrap", panel: "notifPanel" }, { wrap: "helpWrap", panel: "helpPanel" }, { wrap: "userWrap", panel: "userPanel" }];
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

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove("show"); return; }

    const matches = [];
    Object.entries(adminData.moduleData).forEach(([key, mod]) => {
      mod.rows.forEach(row => {
        if (row.name.toLowerCase().includes(q)) {
          matches.push({ label: row.name, tag: adminData.sidebarMeta[key]?.title || key, icon: row.icon, page: key });
        }
      });
    });

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-empty">No results found for "${escapeHtml(input.value)}"</div>`;
    } else {
      results.innerHTML = matches.slice(0, 8).map(m => `
        <div class="search-result-item" data-page="${m.page}">
          <span>${m.icon}</span><span>${m.label}</span><span class="search-result-tag">${m.tag}</span>
        </div>`).join("");
    }
    results.classList.add("show");
  });

  input.addEventListener("click", (e) => e.stopPropagation());
  results.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = e.target.closest(".search-result-item");
    if (item) { navigateTo(item.dataset.page); results.classList.remove("show"); input.value = ""; }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { input.blur(); results.classList.remove("show"); }
  });
}

function escapeHtml(str) { const div = document.createElement("div"); div.textContent = str; return div.innerHTML; }

// ===================== KEYBOARD SHORTCUTS =====================
function bindKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("globalSearch");
      if (window.innerWidth > 900) input.focus();
      else showToast("Search is available on larger screens", "info");
    }
    if (e.key === "Escape") { closeAllDropdowns(); closeQuickActionModal(); closeDetailModal(); closeConfirmModal(); }
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
}

function navigateTo(page) {
  state.currentPage = page;
  state.moduleFilter = "all";
  state.moduleSearch = "";

  document.querySelectorAll(".side-item").forEach(item => item.classList.toggle("active", item.dataset.page === page));

  const dashboardPage = document.getElementById("dashboardPage");
  const modulePage = document.getElementById("modulePage");

  if (page === "dashboard") {
    dashboardPage.classList.add("active");
    modulePage.classList.remove("active");
  } else {
    dashboardPage.classList.remove("active");
    modulePage.classList.add("active");
    renderModulePage(page);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===================== MODULE PAGE DISPATCH =====================
function renderModulePage(page) {
  const meta = adminData.sidebarMeta[page] || { icon: "📄", title: capitalize(page), desc: "" };
  const mod = adminData.moduleData[page];
  const container = document.getElementById("modulePage");

  if (mod) {
    container.innerHTML = buildModuleTableShell(meta);
    renderModuleTable(page);
    bindModuleControls(page);
  } else if (page === "reports") {
    container.innerHTML = buildReportsPage(meta);
    bindReportsPage();
  } else if (page === "settings") {
    container.innerHTML = buildSettingsPage(meta);
    bindSettingsPage();
  } else if (page === "backup") {
    container.innerHTML = buildBackupPage(meta);
    bindBackupPage();
  } else if (page === "health") {
    container.innerHTML = buildHealthPage(meta);
  } else {
    container.innerHTML = `<div class="module-top"><h2>${meta.title}</h2></div><div class="panel"><p style="color:var(--secondary-text);font-size:13px;">No data available.</p></div>`;
  }
}

// ---------- Generic Table (approval / data / toggle / readonly / ticket) ----------
function buildModuleTableShell(meta) {
  const showAdd = ["hospitals", "doctors", "pharmacies", "ambulance", "inventory", "users"].includes(state.currentPage);
  return `
    <div class="module-top">
      <div><h2>${meta.icon} ${meta.title}</h2><p class="dash-sub">${meta.desc}</p></div>
      ${showAdd ? `<button class="module-add-btn" id="moduleAddBtn">+ Add New</button>` : ""}
    </div>
    <div class="module-controls">
      <div class="module-search"><span>🔍</span><input type="text" id="moduleSearchInput" placeholder="Search ${meta.title.toLowerCase()}..."></div>
      <div class="filter-chips" id="filterChips"></div>
    </div>
    <div class="panel">
      <div class="table-wrap"><table class="data-table"><thead id="moduleTheadRow"></thead><tbody id="moduleTbody"></tbody></table></div>
    </div>`;
}

function renderModuleTable(page) {
  const mod = adminData.moduleData[page];
  if (!mod) return;

  // filter chips
  const statuses = [...new Set(mod.rows.map(r => r.status))];
  const chipDefs = [{ key: "all", label: `All (${mod.rows.length})` }, ...statuses.map(s => ({ key: s, label: `${capitalize(s)} (${mod.rows.filter(r => r.status === s).length})` }))];
  document.getElementById("filterChips").innerHTML = chipDefs.map(c => `<button class="filter-chip ${state.moduleFilter === c.key ? "active" : ""}" data-filter="${c.key}">${c.label}</button>`).join("");

  // header row depends on type
  const theadEl = document.getElementById("moduleTheadRow");
  if (mod.type === "approval") {
    theadEl.innerHTML = `<tr><th>Name</th><th>${mod.labelA}</th><th>${mod.labelB}</th><th>Submitted On</th><th>Status</th><th>Actions</th></tr>`;
  } else if (mod.type === "toggle") {
    theadEl.innerHTML = `<tr><th>Notification</th><th>${mod.labelA}</th><th>${mod.labelB}</th><th>Enabled</th></tr>`;
  } else if (mod.type === "readonly") {
    theadEl.innerHTML = `<tr><th>User</th><th>${mod.labelA}</th><th>${mod.labelB}</th><th>Timestamp</th><th>Result</th></tr>`;
  } else if (mod.type === "ticket") {
    theadEl.innerHTML = `<tr><th>Ticket</th><th>${mod.labelA}</th><th>${mod.labelB}</th><th>Date</th><th>Status</th><th>Actions</th></tr>`;
  } else {
    theadEl.innerHTML = `<tr><th>Name</th><th>${mod.labelA}</th><th>${mod.labelB}</th><th>Joined</th><th>Status</th><th>Actions</th></tr>`;
  }

  const filtered = mod.rows.filter(r => {
    const matchesFilter = state.moduleFilter === "all" || r.status === state.moduleFilter;
    const matchesSearch = !state.moduleSearch || r.name.toLowerCase().includes(state.moduleSearch) || r.a.toLowerCase().includes(state.moduleSearch);
    return matchesFilter && matchesSearch;
  });

  const tbody = document.getElementById("moduleTbody");
  const colCount = theadEl.querySelectorAll("th").length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${colCount}" class="empty-table">No records match your current filter/search.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r) => {
    const realIndex = mod.rows.indexOf(r);
    if (mod.type === "approval") {
      const isPending = r.status === "pending";
      const isVerified = r.status === "verified";
      const isRejected = r.status === "rejected";
      return `<tr>
        <td><div class="name-cell"><div class="row-icon" style="background:#E3F2FD;color:#1976D2;">${r.icon}</div>${r.name}</div></td>
        <td>${r.a}</td><td>${r.b}</td><td>${r.submitted}</td>
        <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
        <td><div class="row-actions">
          <button class="row-btn" data-view="${page}:${realIndex}">View</button>
          <button class="row-btn verify" data-verify="${page}:${realIndex}" ${isVerified ? "disabled" : ""}>Verify</button>
          <button class="row-btn reject" data-reject="${page}:${realIndex}" ${isRejected ? "disabled" : ""}>Reject</button>
        </div></td>
      </tr>`;
    }
    if (mod.type === "toggle") {
      const checked = r.status === "active" ? "checked" : "";
      return `<tr>
        <td><div class="name-cell"><div class="row-icon" style="background:#E3F2FD;color:#1976D2;">${r.icon}</div>${r.name}</div></td>
        <td>${r.a}</td><td>${r.b}</td>
        <td><label class="toggle-switch"><input type="checkbox" ${checked} data-toggle="${page}:${realIndex}"><span class="toggle-slider"></span></label></td>
      </tr>`;
    }
    if (mod.type === "readonly") {
      return `<tr>
        <td><div class="name-cell"><div class="row-icon" style="background:#E3F2FD;color:#1976D2;">${r.icon}</div>${r.name}</div></td>
        <td>${r.a}</td><td>${r.b}</td><td>${r.submitted}</td>
        <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
      </tr>`;
    }
    if (mod.type === "ticket") {
      const isResolved = r.status === "resolved";
      return `<tr>
        <td><div class="name-cell"><div class="row-icon" style="background:#E3F2FD;color:#1976D2;">${r.icon}</div>${r.name}</div></td>
        <td>${r.a}</td><td>${r.b}</td><td>${r.submitted}</td>
        <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
        <td><div class="row-actions"><button class="row-btn verify" data-resolve="${page}:${realIndex}" ${isResolved ? "disabled" : ""}>${isResolved ? "Resolved" : "Mark Resolved"}</button></div></td>
      </tr>`;
    }
    // data (users)
    const isSuspended = r.status === "suspended";
    return `<tr>
      <td><div class="name-cell"><div class="row-icon" style="background:#E3F2FD;color:#1976D2;">${r.icon}</div>${r.name}</div></td>
      <td>${r.a}</td><td>${r.b}</td><td>${r.submitted}</td>
      <td><span class="status-badge ${r.status}">${capitalize(r.status)}</span></td>
      <td><div class="row-actions">
        <button class="row-btn" data-view="${page}:${realIndex}">View</button>
        <button class="row-btn ${isSuspended ? "verify" : "reject"}" data-toggleuser="${page}:${realIndex}">${isSuspended ? "Activate" : "Suspend"}</button>
      </div></td>
    </tr>`;
  }).join("");

  bindModuleRowActions(page);
}

function bindModuleControls(page) {
  const searchInput = document.getElementById("moduleSearchInput");
  searchInput.value = state.moduleSearch;
  searchInput.addEventListener("input", () => { state.moduleSearch = searchInput.value.trim().toLowerCase(); renderModuleTable(page); });

  document.getElementById("filterChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    state.moduleFilter = chip.dataset.filter;
    renderModuleTable(page);
  });

  const addBtn = document.getElementById("moduleAddBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qaMap = { hospitals: "addHospital", doctors: "addDoctor", pharmacies: "addPharmacy", ambulance: "addAmbulance", users: "addUser" };
      const qaId = qaMap[page];
      const qa = adminData.quickActions.find(q => q.id === qaId) || { id: "addGeneric", modalTitle: `Add to ${adminData.sidebarMeta[page]?.title || page}`, field1: "Name", field2: "Contact Email", target: page, icon: "➕" };
      openQuickActionModal(qa);
    });
  }
}

function bindModuleRowActions(page) {
  const mod = adminData.moduleData[page];

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => { const [p, idx] = btn.dataset.view.split(":"); openDetailModal(p, parseInt(idx)); });
  });

  document.querySelectorAll("[data-verify]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [p, idx] = btn.dataset.verify.split(":");
      const row = adminData.moduleData[p].rows[parseInt(idx)];
      row.status = "verified";
      renderModuleTable(p);
      updateSidebarCounts();
      showToast(`${row.name} has been verified & approved`, "success");
    });
  });

  document.querySelectorAll("[data-reject]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [p, idx] = btn.dataset.reject.split(":");
      const row = adminData.moduleData[p].rows[parseInt(idx)];
      openConfirmModal("Reject this application?", `${row.name} will be notified and marked as rejected. This can be reversed later if needed.`, () => {
        row.status = "rejected";
        renderModuleTable(p);
        updateSidebarCounts();
        showToast(`${row.name} has been rejected`, "error");
      });
    });
  });

  document.querySelectorAll("[data-toggle]").forEach(box => {
    box.addEventListener("change", () => {
      const [p, idx] = box.dataset.toggle.split(":");
      const row = adminData.moduleData[p].rows[parseInt(idx)];
      row.status = box.checked ? "active" : "suspended";
      showToast(`${row.name} ${box.checked ? "enabled" : "disabled"}`, box.checked ? "success" : "info");
    });
  });

  document.querySelectorAll("[data-resolve]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [p, idx] = btn.dataset.resolve.split(":");
      const row = adminData.moduleData[p].rows[parseInt(idx)];
      row.status = "resolved";
      renderModuleTable(p);
      showToast(`${row.name} marked as resolved`, "success");
    });
  });

  document.querySelectorAll("[data-toggleuser]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [p, idx] = btn.dataset.toggleuser.split(":");
      const row = adminData.moduleData[p].rows[parseInt(idx)];
      const willSuspend = row.status !== "suspended";
      if (willSuspend) {
        openConfirmModal("Suspend this user?", `${row.name} will lose access until reactivated.`, () => {
          row.status = "suspended"; renderModuleTable(p); showToast(`${row.name} has been suspended`, "error");
        });
      } else {
        row.status = "active"; renderModuleTable(p); showToast(`${row.name} has been reactivated`, "success");
      }
    });
  });
}

// ---------- REPORTS PAGE ----------
function buildReportsPage(meta) {
  return `
    <div class="module-top">
      <div><h2>${meta.icon} ${meta.title}</h2><p class="dash-sub">${meta.desc}</p></div>
      <button class="export-btn" id="exportReportBtn">⬇ Export Report</button>
    </div>
    <div class="report-cards-row">
      <div class="mini-stat"><p>Total Revenue (MTD)</p><h4 class="success-color">₹18,42,600</h4></div>
      <div class="mini-stat"><p>Avg. Appointment Value</p><h4>₹495</h4></div>
      <div class="mini-stat"><p>Platform Growth (MoM)</p><h4 class="success-color">+9.4%</h4></div>
    </div>
    <div class="panel">
      <h3 style="margin-bottom:16px;">Appointments by Specialization</h3>
      <div id="reportBars"></div>
    </div>`;
}

function bindReportsPage() {
  const bars = [
    { label: "Cardiology", value: 82 }, { label: "Pediatrics", value: 68 },
    { label: "Orthopedics", value: 55 }, { label: "Dermatology", value: 41 },
    { label: "General Medicine", value: 90 }
  ];
  document.getElementById("reportBars").innerHTML = bars.map(b => `
    <div class="report-bar-row">
      <div class="report-bar-label">${b.label}</div>
      <div class="report-bar-track"><div class="report-bar-fill" style="width:${b.value}%;"></div></div>
      <div class="report-bar-value">${b.value}%</div>
    </div>`).join("");

  document.getElementById("exportReportBtn").addEventListener("click", () => showToast("Report export started — you'll be notified when it's ready", "success"));
}

// ---------- SETTINGS PAGE ----------
function buildSettingsPage(meta) {
  return `
    <div class="module-top"><div><h2>${meta.icon} ${meta.title}</h2><p class="dash-sub">${meta.desc}</p></div></div>
    <div class="panel">
      <div class="settings-section">
        <h4>General</h4>
        <div class="settings-row"><div class="settings-row-text"><strong>Platform Name</strong><p>Displayed across the patient and admin portals</p></div><input type="text" value="Curonex" style="border:1px solid var(--input-border);border-radius:10px;padding:8px 12px;font-size:13px;width:180px;"></div>
        <div class="settings-row"><div class="settings-row-text"><strong>Default Timezone</strong><p>Used for scheduling and reports</p></div>
          <select class="settings-select"><option>Asia/Kolkata (IST)</option><option>UTC</option><option>America/New_York</option></select></div>
        <div class="settings-row"><div class="settings-row-text"><strong>Maintenance Mode</strong><p>Temporarily disable public access during updates</p></div>
          <label class="toggle-switch"><input type="checkbox" id="maintenanceToggle"><span class="toggle-slider"></span></label></div>
      </div>
      <div class="settings-section">
        <h4>Notifications</h4>
        <div class="settings-row"><div class="settings-row-text"><strong>Email Alerts</strong><p>Receive admin alerts via email</p></div><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
        <div class="settings-row"><div class="settings-row-text"><strong>SMS Alerts</strong><p>Critical alerts sent via SMS</p></div><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
      </div>
      <div class="settings-section">
        <h4>Security</h4>
        <div class="settings-row"><div class="settings-row-text"><strong>Two-Factor Authentication</strong><p>Require 2FA for all admin accounts</p></div><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
        <div class="settings-row"><div class="settings-row-text"><strong>Session Timeout</strong><p>Auto-logout after period of inactivity</p></div>
          <select class="settings-select"><option>15 minutes</option><option selected>30 minutes</option><option>1 hour</option></select></div>
      </div>
      <div class="settings-save-bar">
        <button class="btn-secondary" id="settingsResetBtn">Reset</button>
        <button class="btn-primary" id="settingsSaveBtn">Save Changes</button>
      </div>
    </div>`;
}

function bindSettingsPage() {
  document.getElementById("settingsSaveBtn").addEventListener("click", () => showToast("Settings saved successfully", "success"));
  document.getElementById("settingsResetBtn").addEventListener("click", () => openConfirmModal("Reset settings?", "All unsaved changes will be discarded.", () => { renderModulePage("settings"); showToast("Settings reset to last saved state", "info"); }));
  document.getElementById("maintenanceToggle").addEventListener("change", (e) => {
    if (e.target.checked) openConfirmModal("Enable maintenance mode?", "This will block patient access to the platform until turned off.", () => showToast("Maintenance mode enabled", "error"));
    else showToast("Maintenance mode disabled", "success");
  });
}

// ---------- BACKUP & RESTORE PAGE ----------
function buildBackupPage(meta) {
  return `
    <div class="module-top"><div><h2>${meta.icon} ${meta.title}</h2><p class="dash-sub">${meta.desc}</p></div></div>
    <div class="backup-now-card">
      <div><h4>Manual Backup</h4><p>Last automatic backup: May 18, 2026 · 02:30 AM</p></div>
      <button class="module-add-btn" id="backupNowBtn">☁ Backup Now</button>
    </div>
    <div class="panel"><h3 style="margin-bottom:10px;">Backup History</h3><div id="backupList"></div></div>`;
}

function bindBackupPage() {
  renderBackupList();
  document.getElementById("backupNowBtn").addEventListener("click", (e) => {
    e.target.disabled = true; e.target.textContent = "Backing up...";
    setTimeout(() => {
      adminData.backups.unshift({ label: "Full System Backup", date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }), size: "4.3 GB", status: "success" });
      renderBackupList();
      e.target.disabled = false; e.target.textContent = "☁ Backup Now";
      showToast("Backup completed successfully", "success");
    }, 1400);
  });
}

function renderBackupList() {
  const list = document.getElementById("backupList");
  if (adminData.backups.length === 0) { list.innerHTML = `<p style="font-size:13px;color:var(--secondary-text);padding:20px 0;">No backups found.</p>`; return; }
  list.innerHTML = adminData.backups.map((b, i) => `
    <div class="backup-list-item">
      <div class="backup-info"><strong>${b.label}</strong><p>${b.date} · ${b.size}</p></div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="status-badge ${b.status}">${capitalize(b.status)}</span>
        <button class="row-btn" data-restore="${i}" ${b.status === "failed" ? "disabled" : ""}>Restore</button>
      </div>
    </div>`).join("");

  list.querySelectorAll("[data-restore]").forEach(btn => {
    btn.addEventListener("click", () => {
      const b = adminData.backups[parseInt(btn.dataset.restore)];
      openConfirmModal("Restore this backup?", `The system will be restored to the state from ${b.date}. This will overwrite current data.`, () => showToast("System restore initiated — this may take a few minutes", "info"));
    });
  });
}

// ---------- SYSTEM HEALTH PAGE ----------
function buildHealthPage(meta) {
  return `
    <div class="module-top"><div><h2>${meta.icon} ${meta.title}</h2><p class="dash-sub">${meta.desc}</p></div>
      <button class="view-all-btn" id="runHealthCheckBtn">🔄 Run Health Check</button></div>
    <div class="summary-mini-row">
      <div class="mini-stat"><p>Overall Status</p><h4 class="success-color">Healthy</h4></div>
      <div class="mini-stat"><p>Active Incidents</p><h4>0</h4></div>
      <div class="mini-stat"><p>Avg. Response Time</p><h4>142ms</h4></div>
      <div class="mini-stat"><p>Last Checked</p><h4 style="font-size:14px;">Just now</h4></div>
    </div>
    <div class="panel"><div id="fullHealthList"></div></div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target && e.target.id === "runHealthCheckBtn") {
      e.target.textContent = "Checking...";
      e.target.disabled = true;
      setTimeout(() => { showToast("All systems operational", "success"); e.target.textContent = "🔄 Run Health Check"; e.target.disabled = false; }, 1000);
    }
  });
});

// need to render full health list whenever health page shown — hook into renderModulePage via observer pattern
const _origRenderModulePage = renderModulePage;
renderModulePage = function (page) {
  _origRenderModulePage(page);
  if (page === "health") {
    const listEl = document.getElementById("fullHealthList");
    if (listEl) listEl.innerHTML = adminData.systemHealth.map(h => healthRowHtml(h)).join("");
  }
};

// ===================== MOBILE SIDEBAR =====================
function bindMobileSidebar() {
  const btn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  btn.addEventListener("click", () => { sidebar.classList.add("show"); backdrop.classList.add("show"); });
  backdrop.addEventListener("click", closeMobileSidebar);
}
function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("sidebarBackdrop").classList.remove("show");
}

// ===================== DATE RANGE (dashboard) =====================
function bindDateRange() {
  const btn = document.getElementById("dateRangeBtn");
  const panel = document.getElementById("dateRangePanel");
  const label = document.getElementById("dateRangeLabel");
  const rangeLabels = { 7: "May 12, 2025 - May 18, 2025", 30: "Apr 19, 2025 - May 18, 2025", 90: "Feb 18, 2025 - May 18, 2025", 365: "Jan 1, 2025 - May 18, 2025" };

  btn.addEventListener("click", (e) => { e.stopPropagation(); closeAllDropdowns(); panel.classList.toggle("show"); });

  panel.querySelectorAll(".date-range-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const range = opt.dataset.range;
      state.dateRange = range;
      label.textContent = rangeLabels[range];
      panel.querySelectorAll(".date-range-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      panel.classList.remove("show");
      showToast(`Showing data for: ${rangeLabels[range]}`, "info");
    });
  });
}

// ===================== CHART RANGE =====================
function bindChartRange() {
  const btn = document.getElementById("chartRangeBtn");
  const panel = document.getElementById("chartRangePanel");
  const label = document.getElementById("chartRangeLabel");
  btn.addEventListener("click", (e) => { e.stopPropagation(); closeAllDropdowns(); panel.classList.toggle("show"); });
  panel.querySelectorAll(".chart-range-option").forEach(opt => {
    opt.addEventListener("click", () => { renderChart(parseInt(opt.dataset.days)); label.textContent = opt.textContent; panel.classList.remove("show"); });
  });
}

// ===================== QUICK ACTION MODAL =====================
function bindQuickActionModal() {
  document.getElementById("closeQuickActionModal").addEventListener("click", closeQuickActionModal);
  document.getElementById("quickActionOverlay").addEventListener("click", (e) => { if (e.target.id === "quickActionOverlay") closeQuickActionModal(); });

  document.getElementById("quickActionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const field1 = document.getElementById("qaField1").value.trim();
    const field2 = document.getElementById("qaField2").value.trim();
    const errorEl = document.getElementById("qaError");
    errorEl.textContent = "";

    if (!field1) { errorEl.textContent = "This field is required."; return; }
    if (!field2) { errorEl.textContent = "This field is required."; return; }
    if (field2.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field2)) { errorEl.textContent = "Please enter a valid email address."; return; }

    const qa = state.activeQuickAction;
    if (qa && qa.target && adminData.moduleData[qa.target]) {
      const mod = adminData.moduleData[qa.target];
      mod.rows.unshift({
        name: field1, icon: mod.rows[0]?.icon || "📄", a: field2, b: mod.type === "data" ? "—" : "Pending Review",
        submitted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: mod.type === "approval" ? "pending" : "active"
      });
      updateSidebarCounts();
      if (state.currentPage === qa.target) renderModuleTable(qa.target);
      showToast(`${field1} ${mod.type === "approval" ? "submitted for verification" : "added successfully"}`, "success");
    } else {
      showToast(`${field1} added successfully!`, "success");
    }
    closeQuickActionModal();
  });
}

function openQuickActionModal(qa) {
  state.activeQuickAction = qa;
  document.getElementById("quickActionIcon").textContent = (qa.icon || "➕").replace("➕", "") || "➕";
  document.getElementById("quickActionTitle").textContent = qa.modalTitle;
  document.getElementById("quickActionSub").textContent = `Fill in the details below to ${qa.modalTitle.toLowerCase()}.`;
  document.getElementById("qaField1Label").textContent = qa.field1;
  document.getElementById("qaField2Label").textContent = qa.field2;
  document.getElementById("qaField1").value = "";
  document.getElementById("qaField2").value = "";
  document.getElementById("qaError").textContent = "";
  document.getElementById("quickActionOverlay").classList.add("show");
}
function closeQuickActionModal() { document.getElementById("quickActionOverlay").classList.remove("show"); }

// ===================== GENERIC DETAIL / VERIFY MODAL =====================
function bindDetailModal() {
  document.getElementById("closeDetailModal").addEventListener("click", closeDetailModal);
  document.getElementById("detailOverlay").addEventListener("click", (e) => { if (e.target.id === "detailOverlay") closeDetailModal(); });

  document.getElementById("viewAllRegBtn").addEventListener("click", () => navigateTo("users"));
  document.getElementById("viewHealthDetailsBtn").addEventListener("click", (e) => { e.preventDefault(); navigateTo("health"); });

  document.getElementById("detailApproveBtn").addEventListener("click", () => {
    if (!state.activeDetail) return;
    const { moduleKey, rowIndex } = state.activeDetail;
    const row = adminData.moduleData[moduleKey].rows[rowIndex];
    row.status = adminData.moduleData[moduleKey].type === "approval" ? "verified" : "active";
    renderModuleTable(moduleKey);
    updateSidebarCounts();
    closeDetailModal();
    showToast(`${row.name} approved successfully`, "success");
  });

  document.getElementById("detailRejectBtn").addEventListener("click", () => {
    if (!state.activeDetail) return;
    const { moduleKey, rowIndex } = state.activeDetail;
    const row = adminData.moduleData[moduleKey].rows[rowIndex];
    closeDetailModal();
    openConfirmModal("Reject this entry?", `${row.name} will be marked as rejected.`, () => {
      row.status = "rejected";
      renderModuleTable(moduleKey);
      updateSidebarCounts();
      showToast(`${row.name} has been rejected`, "error");
    });
  });
}

function openDetailModal(moduleKey, rowIndex) {
  const mod = adminData.moduleData[moduleKey];
  const row = mod.rows[rowIndex];
  if (!row) return;
  state.activeDetail = { moduleKey, rowIndex };

  document.getElementById("detailIcon").textContent = row.icon;
  document.getElementById("detailName").textContent = row.name;
  document.getElementById("detailRole").textContent = adminData.sidebarMeta[moduleKey]?.title || moduleKey;

  document.getElementById("detailGrid").innerHTML = `
    <div><span>${mod.labelA}</span><span>${row.a}</span></div>
    <div><span>${mod.labelB}</span><span>${row.b}</span></div>
    <div><span>Submitted On</span><span>${row.submitted}</span></div>
    <div><span>Status</span><span><span class="status-badge ${row.status}">${capitalize(row.status)}</span></span></div>`;

  const approveBtn = document.getElementById("detailApproveBtn");
  const rejectBtn = document.getElementById("detailRejectBtn");
  const isApprovalType = mod.type === "approval";

  approveBtn.style.display = isApprovalType ? "block" : "none";
  rejectBtn.style.display = isApprovalType ? "block" : "none";

  if (isApprovalType) {
    if (row.status === "verified") { approveBtn.disabled = true; approveBtn.textContent = "Already Verified"; }
    else { approveBtn.disabled = false; approveBtn.textContent = "Verify & Approve"; }
  }

  document.getElementById("detailOverlay").classList.add("show");
}
function closeDetailModal() { document.getElementById("detailOverlay").classList.remove("show"); state.activeDetail = null; }

// ===================== GENERIC CONFIRM MODAL =====================
function bindConfirmModal() {
  document.getElementById("closeConfirmModal").addEventListener("click", closeConfirmModal);
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirmModal);
  document.getElementById("confirmOverlay").addEventListener("click", (e) => { if (e.target.id === "confirmOverlay") closeConfirmModal(); });
}

function openConfirmModal(title, sub, onConfirm) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmSub").textContent = sub;
  confirmCallback = onConfirm;
  const okBtn = document.getElementById("confirmOkBtn");
  const newOkBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOkBtn, okBtn);
  newOkBtn.addEventListener("click", () => { if (confirmCallback) confirmCallback(); closeConfirmModal(); });
  document.getElementById("confirmOverlay").classList.add("show");
}
function closeConfirmModal() { document.getElementById("confirmOverlay").classList.remove("show"); confirmCallback = null; }

// ===================== MISC =====================
function bindMisc() {
  window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileSidebar(); });
}

// ===================== TOAST =====================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.3s"; setTimeout(() => toast.remove(), 300); }, 3000);
}
