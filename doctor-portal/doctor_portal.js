// ===== Sidebar Navigation =====
document.querySelectorAll('.side-item').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== Global selection tracker (only ONE slot allowed across all hospitals) =====
let currentSelection = null; // { card, hospital, date, timeBox, time }

const confirmBtn = document.getElementById('confirmBookingBtn');
const cancelBtn = document.getElementById('cancelBookingBtn');

function updateConfirmState() {
  confirmBtn.disabled = currentSelection === null;
}

function clearAllSelections() {
  document.querySelectorAll('.time-box.selected').forEach(box => box.classList.remove('selected'));
  document.querySelectorAll('.hospital-slot-card').forEach(card => card.classList.remove('has-selection'));
  currentSelection = null;
  updateConfirmState();
}

// ===== Date Selection (per hospital card) =====
document.querySelectorAll('.hospital-slot-card').forEach(card => {
  const dateBoxes = card.querySelectorAll('.date-box');
  dateBoxes.forEach(box => {
    box.addEventListener('click', function () {
      dateBoxes.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // If this card currently holds the global selection, clear it (date changed)
      if (currentSelection && currentSelection.card === card) {
        clearAllSelections();
      }
    });
  });
});

// ===== Time Slot Selection (ONLY ONE slot allowed globally) =====
document.querySelectorAll('.hospital-slot-card').forEach(card => {
  const hospitalName = card.getAttribute('data-hospital');
  const timeBoxes = card.querySelectorAll('.time-box:not(.booked)');

  timeBoxes.forEach(box => {
    box.addEventListener('click', function () {
      // Clear any existing selection (in this card or any other card)
      document.querySelectorAll('.time-box.selected').forEach(b => b.classList.remove('selected'));
      document.querySelectorAll('.hospital-slot-card').forEach(c => c.classList.remove('has-selection'));

      // Apply new selection
      this.classList.add('selected');
      card.classList.add('has-selection');

      const selectedDate = card.querySelector('.date-box.active')?.textContent.trim().replace(/\s+/g, ' ');

      currentSelection = {
        card: card,
        hospital: hospitalName,
        date: selectedDate,
        timeBox: this,
        time: this.textContent.trim()
      };

      updateConfirmState();
    });
  });
});

// ===== Date Row Arrows (prev/next) =====
document.querySelectorAll('.date-row').forEach(row => {
  const arrows = row.querySelectorAll('.arrow');
  arrows[0].addEventListener('click', function () {
    console.log('Loading earlier dates...');
  });
  arrows[1].addEventListener('click', function () {
    console.log('Loading later dates...');
  });
});

// ===== Confirm Appointment Button =====
confirmBtn.addEventListener('click', function () {
  if (!currentSelection) {
    alert('Please select a time slot before confirming.');
    return;
  }

  alert(
    `Appointment Confirmed!\n\nHospital: ${currentSelection.hospital}\nDate: ${currentSelection.date}\nTime: ${currentSelection.time}`
  );

  // Optionally lock the slot as booked after confirming
  currentSelection.timeBox.classList.remove('selected');
  currentSelection.timeBox.classList.add('booked');
  currentSelection.card.classList.remove('has-selection');
  currentSelection = null;
  updateConfirmState();
});

// ===== Cancel Button =====
cancelBtn.addEventListener('click', function () {
  if (!currentSelection) {
    alert('No slot is currently selected.');
    return;
  }

  if (confirm('Are you sure you want to cancel this slot selection?')) {
    clearAllSelections();
  }
});

// Initialize confirm button state on page load
updateConfirmState();

// ===== Right Panel Cards (History, Upcoming, Cancelled) =====
document.querySelectorAll('.right-card').forEach(card => {
  card.addEventListener('click', function () {
    const label = this.querySelector('h4').textContent;
    alert(`Navigating to ${label}...`);
    // window.location.href = `${label.toLowerCase()}.html`;
  });
});

// ===== Bell Notification Click =====
const bellWrap = document.querySelector('.bell-wrap');
if (bellWrap) {
  bellWrap.addEventListener('click', function () {
    alert('You have 2 new notifications.');
  });
}

// ===== Profile Dropdown =====
const userWrap = document.getElementById('userWrap');
const dropdownMenu = document.getElementById('dropdownMenu');
const chevronIcon = document.getElementById('chevronIcon');

if (userWrap && dropdownMenu) {
  userWrap.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    chevronIcon.classList.toggle('rotated');
  });

  document.addEventListener('click', function (e) {
    if (!userWrap.contains(e.target)) {
      dropdownMenu.classList.remove('show');
      chevronIcon.classList.remove('rotated');
    }
  });

  document.getElementById('myProfileBtn').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Navigating to My Profile...');
    // window.location.href = 'profile.html';
  });

  document.getElementById('settingsBtn').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Navigating to Settings...');
    // window.location.href = 'settings.html';
  });

  document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully.');
      // window.location.href = 'login.html';
    }
  });
}
