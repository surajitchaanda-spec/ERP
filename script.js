const statusTime = document.getElementById("statusTime");
const featureGrid = document.getElementById("featureGrid");
const quickActions = document.getElementById("quickActions");
const summaryTitle = document.getElementById("summaryTitle");
const summaryBody = document.getElementById("summaryBody");
const roleLabel = document.getElementById("roleLabel");
const roleName = document.getElementById("roleName");
const roleMeta = document.getElementById("roleMeta");
const roleCode = document.getElementById("roleCode");
const roleAvatar = document.getElementById("roleAvatar");
const roleBanner = document.getElementById("roleBanner");

const roleButtons = Array.from(
  document.querySelectorAll(".role-switcher__button")
);

const roleData = {
  student: {
    label: "Student ID",
    name: "Aanya Sharma",
    meta: "Grade 10 · Section B",
    code: "ID: AIS10245",
    summaryTitle: "Today for students",
    summaryBody:
      "Quick look at lessons, clubs and house points to keep you buzzing.",
    avatar:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=256&q=80",
    cover:
      "linear-gradient(135deg, rgba(102,126,234,1) 0%, rgba(118,75,162,1) 100%)",
    quickActions: [
      { icon: "fa-solid fa-calendar-check", label: "Attendance" },
      { icon: "fa-solid fa-clipboard-check", label: "Assignments" },
      { icon: "fa-solid fa-message", label: "Messages" },
      { icon: "fa-solid fa-chart-line", label: "Progress" },
    ],
    features: [
      {
        icon: "fa-solid fa-calendar-days",
        title: "Timetable",
        copy: "Colour-coded day plan with reminders.",
      },
      {
        icon: "fa-solid fa-star",
        title: "House points",
        copy: "15 new points from today's quiz bowl!",
      },
      {
        icon: "fa-solid fa-people-group",
        title: "Clubs",
        copy: "Robotics meet starts 4:30 PM in Lab 3.",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        title: "Well-being",
        copy: "Hydration streak: 5 days strong.",
      },
    ],
  },
  staff: {
    label: "Staff Pass",
    name: "Mr. Rohan Iyer",
    meta: "Science Faculty",
    code: "Employee: ST211",
    summaryTitle: "Today for staff",
    summaryBody:
      "Preview your classes, duty roster and collaboration notes in a flash.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    cover:
      "linear-gradient(135deg, rgba(255,175,123,1) 0%, rgba(255,105,180,1) 100%)",
    quickActions: [
      { icon: "fa-solid fa-person-chalkboard", label: "Lessons" },
      { icon: "fa-solid fa-users", label: "Meetings" },
      { icon: "fa-solid fa-note-sticky", label: "Notes" },
      { icon: "fa-solid fa-clipboard-list", label: "Duty" },
    ],
    features: [
      {
        icon: "fa-solid fa-lightbulb",
        title: "Ideas board",
        copy: "Share a spark for tomorrow's experiments.",
      },
      {
        icon: "fa-solid fa-laptop-file",
        title: "Resources",
        copy: "Smart links to labs, slides and rubrics.",
      },
      {
        icon: "fa-solid fa-medal",
        title: "Recognitions",
        copy: "3 kudos from students this week.",
      },
      {
        icon: "fa-solid fa-chalkboard",
        title: "Classrooms",
        copy: "Lab 2 prepped with safety brief.",
      },
    ],
  },
  principal: {
    label: "Principal Pass",
    name: "Dr. Kavya Nair",
    meta: "Campus Director",
    code: "Access: PR001",
    summaryTitle: "Today for principals",
    summaryBody:
      "Track campus mood, approvals and celebrations at a glance.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    cover:
      "linear-gradient(135deg, rgba(120,255,214,1) 0%, rgba(60,211,173,1) 100%)",
    quickActions: [
      { icon: "fa-solid fa-chart-pie", label: "Pulse" },
      { icon: "fa-solid fa-stamp", label: "Approvals" },
      { icon: "fa-solid fa-bullhorn", label: "Announcements" },
      { icon: "fa-solid fa-award", label: "Spotlight" },
    ],
    features: [
      {
        icon: "fa-solid fa-earth-asia",
        title: "Community",
        copy: "Field trip consent at 88% confirmed.",
      },
      {
        icon: "fa-solid fa-people-roof",
        title: "Safety",
        copy: "All drills cleared • Next audit in 12 days.",
      },
      {
        icon: "fa-solid fa-handshake-angle",
        title: "Partnerships",
        copy: "Meet city council for innovation grant.",
      },
      {
        icon: "fa-solid fa-fireworks",
        title: "Celebrations",
        copy: "Plan gratitude assembly for staff heroes.",
      },
    ],
  },
};

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  statusTime.textContent = `${hours}:${minutes}`;
}

function renderQuickActions(actions) {
  quickActions.innerHTML = actions
    .map(
      (action) => `
        <button class="quick-actions__chip">
          <i class="${action.icon}"></i>
          ${action.label}
        </button>
      `
    )
    .join("");
}

function renderFeatures(features) {
  featureGrid.innerHTML = features
    .map(
      (feature) => `
        <article class="feature-card">
          <div class="feature-card__icon">
            <i class="${feature.icon}"></i>
          </div>
          <h4>${feature.title}</h4>
          <p>${feature.copy}</p>
        </article>
      `
    )
    .join("");
}

function switchRole(role) {
  const data = roleData[role];
  if (!data) return;

  roleLabel.textContent = data.label;
  roleName.textContent = data.name;
  roleMeta.textContent = data.meta;
  roleCode.textContent = data.code;
  roleAvatar.style.backgroundImage = `url("${data.avatar}")`;
  roleBanner.style.background = data.cover;
  summaryTitle.textContent = data.summaryTitle;
  summaryBody.textContent = data.summaryBody;
  renderQuickActions(data.quickActions);
  renderFeatures(data.features);

  roleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.role === role);
  });
}

updateTime();
setInterval(updateTime, 30_000);

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchRole(button.dataset.role);
  });
});

switchRole("student");
