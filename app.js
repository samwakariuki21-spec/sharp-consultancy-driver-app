const storageKeys = {
  jobs: "sharp-consultancy.jobs.v2",
  requests: "sharp-consultancy.requests.v2",
  reviews: "sharp-consultancy.reviews.v1",
  notifications: "sharp-consultancy.notifications.v1",
  calendarEvents: "sharp-consultancy.calendar-events.v1"
};

const whatsappNumber = "254711608769";

const seedJobs = [
  {
    id: "job-101",
    school: "Westlands Primary School",
    employerEmail: "westlands-primary@example.com",
    area: "Westlands zone",
    shift: "Morning",
    vehicle: "Bus",
    pay: "KSH 1,800/day",
    hiringNow: true,
    details: "6:15 AM start, 18 stops, school pupils, Monday through Friday. PSV and good conduct required."
  },
  {
    id: "job-102",
    school: "Nairobi South Academy",
    employerEmail: "nairobi-south@example.com",
    area: "South B and South C zone",
    shift: "Afternoon",
    vehicle: "Van",
    pay: "KSH 1,400/day",
    hiringNow: true,
    details: "2:30 PM pickup, 9 stops, small-group route with activity drop-offs."
  },
  {
    id: "job-103",
    school: "Eastlands Junior School",
    employerEmail: "eastlands-junior@example.com",
    area: "Eastlands zone",
    shift: "Full Day",
    vehicle: "Bus",
    pay: "KSH 2,500/day",
    hiringNow: false,
    details: "Split morning and afternoon route, bus aide provided, PSV preferred."
  },
  {
    id: "job-104",
    school: "Karen Preparatory School",
    employerEmail: "karen-prep@example.com",
    area: "Karen and Langata zone",
    shift: "Morning",
    vehicle: "Car",
    pay: "KSH 1,200/day",
    hiringNow: true,
    details: "Backup driver role for short routes and late-start students."
  },
  {
    id: "job-105",
    school: "Mombasa Coast Academy",
    employerEmail: "mombasa-coast@example.com",
    area: "Mombasa Nyali route",
    shift: "Full Day",
    vehicle: "Van",
    pay: "KSH 2,000/day",
    hiringNow: true,
    details: "Nyali, Tudor, and Bamburi school transport route. PSV and good conduct required."
  },
  {
    id: "job-106",
    school: "Kisumu Lakeside School",
    employerEmail: "kisumu-lakeside@example.com",
    area: "Kisumu Milimani and Kondele route",
    shift: "Morning",
    vehicle: "Bus",
    pay: "KSH 1,700/day",
    hiringNow: false,
    details: "Morning route for pupils around Milimani, Kondele, and town pickup points."
  },
  {
    id: "job-107",
    school: "Nakuru Valley School",
    employerEmail: "nakuru-valley@example.com",
    area: "Nakuru Lanet and Section 58 route",
    shift: "Afternoon",
    vehicle: "Car",
    pay: "KSH 1,300/day",
    hiringNow: true,
    details: "Afternoon route for small-group student drop-offs around Nakuru."
  }
];

const seedRequests = [
  {
    id: "req-201",
    jobId: "job-101",
    jobTitle: "Westlands Primary School - Westlands zone",
    schoolEmail: "westlands-primary@example.com",
    driverName: "Peter Mwangi",
    phone: "0711608769",
    driverEmail: "peter@example.com",
    driverLocation: "Westlands",
    license: "PSV License",
    notes: "Seven years on school bus routes in Nairobi. Available immediately.",
    quickSearch: true,
    paymentMethod: "M-Pesa",
    paymentReference: "SAMPLE400",
    status: "New",
    interviewDate: "",
    createdAt: "Today"
  },
  {
    id: "req-202",
    jobId: "job-102",
    jobTitle: "Nairobi South Academy - South B and South C zone",
    schoolEmail: "nairobi-south@example.com",
    driverName: "Grace Wanjiku",
    phone: "0722456789",
    driverEmail: "",
    driverLocation: "South B",
    license: "NTSA School Transport Badge",
    notes: "Prefers afternoon routes and can cover sports trips.",
    quickSearch: false,
    paymentMethod: "",
    paymentReference: "",
    status: "Reviewed",
    interviewDate: "",
    createdAt: "Yesterday"
  }
];

const seedNotifications = [
  {
    id: "note-401",
    type: "SMS to owner",
    title: "Sample driver application alert",
    message: "New driver request from Peter Mwangi for Westlands Primary School - Westlands zone. Call: 0711608769.",
    createdAt: "Today",
    mailto: ""
  }
];

const seedReviews = [
  {
    id: "rev-301",
    reviewer: "Samuel K.",
    role: "Employer",
    comment: "The driver request list makes it easier to see who is ready for school transport work.",
    createdAt: "Today"
  },
  {
    id: "rev-302",
    reviewer: "Mary N.",
    role: "Driver",
    comment: "Location filters help me find jobs near my route before applying.",
    createdAt: "Yesterday"
  }
];

const seedCalendarEvents = [
  {
    id: "cal-501",
    title: "Interview with Peter Mwangi",
    type: "Interview",
    date: "2026-06-05",
    time: "09:00",
    requestId: "req-201",
    requestTitle: "Peter Mwangi - Westlands Primary School",
    notes: "Confirm PSV, good conduct, and route experience.",
    createdAt: "Today"
  }
];

let jobs = load(storageKeys.jobs, seedJobs);
let requests = load(storageKeys.requests, seedRequests);
let reviews = load(storageKeys.reviews, seedReviews);
let notifications = load(storageKeys.notifications, seedNotifications);
let calendarEvents = load(storageKeys.calendarEvents, seedCalendarEvents);
let selectedJobId = jobs[0]?.id || "";
let backendReady = false;

const elements = {
  tabs: document.querySelectorAll(".nav-tab"),
  panels: document.querySelectorAll(".panel-section"),
  searchText: document.querySelector("#searchText"),
  locationFilter: document.querySelector("#locationFilter"),
  rangeFilter: document.querySelector("#rangeFilter"),
  shiftFilter: document.querySelector("#shiftFilter"),
  vehicleFilter: document.querySelector("#vehicleFilter"),
  hiringFilter: document.querySelector("#hiringFilter"),
  jobsList: document.querySelector("#jobsList"),
  jobCount: document.querySelector("#jobCount"),
  selectedJob: document.querySelector("#selectedJob"),
  driverRequestForm: document.querySelector("#driverRequestForm"),
  jobForm: document.querySelector("#jobForm"),
  requestsList: document.querySelector("#requestsList"),
  requestFilter: document.querySelector("#requestFilter"),
  requestSummary: document.querySelector("#requestSummary"),
  notificationsList: document.querySelector("#notificationsList"),
  notificationCount: document.querySelector("#notificationCount"),
  calendarForm: document.querySelector("#calendarForm"),
  calendarYear: document.querySelector("#calendarYear"),
  calendarMonth: document.querySelector("#calendarMonth"),
  calendarDay: document.querySelector("#calendarDay"),
  calendarRequestSelect: document.querySelector("#calendarRequestSelect"),
  calendarList: document.querySelector("#calendarList"),
  calendarCount: document.querySelector("#calendarCount"),
  resetDemo: document.querySelector("#resetDemo"),
  reviewForm: document.querySelector("#reviewForm"),
  reviewsList: document.querySelector("#reviewsList"),
  reviewCount: document.querySelector("#reviewCount"),
  assistantToggle: document.querySelector("#assistantToggle"),
  assistantPanel: document.querySelector("#assistantPanel"),
  assistantClose: document.querySelector("#assistantClose"),
  assistantTitle: document.querySelector("#assistantTitle"),
  assistantMessages: document.querySelector("#assistantMessages"),
  assistantForm: document.querySelector("#assistantForm"),
  assistantInput: document.querySelector("#assistantInput"),
  personaCards: document.querySelectorAll(".persona-card"),
  assistantPrompts: document.querySelector(".assistant-prompts"),
  toast: document.querySelector("#toast")
};

let activePersona = "Samuel";

function load(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function save(sync = true) {
  localStorage.setItem(storageKeys.jobs, JSON.stringify(jobs));
  localStorage.setItem(storageKeys.requests, JSON.stringify(requests));
  localStorage.setItem(storageKeys.reviews, JSON.stringify(reviews));
  localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications));
  localStorage.setItem(storageKeys.calendarEvents, JSON.stringify(calendarEvents));
  if (sync) syncStateToBackend();
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

async function syncStateFromBackend() {
  try {
    const state = await api("/api/state");
    const hasServerData = ["jobs", "requests", "reviews", "notifications", "calendarEvents"].some((key) => Array.isArray(state[key]) && state[key].length);
    backendReady = true;
    if (!hasServerData) {
      syncStateToBackend();
      return;
    }
    jobs = Array.isArray(state.jobs) && state.jobs.length ? state.jobs : jobs;
    requests = Array.isArray(state.requests) ? state.requests : requests;
    reviews = Array.isArray(state.reviews) ? state.reviews : reviews;
    notifications = Array.isArray(state.notifications) ? state.notifications : notifications;
    calendarEvents = Array.isArray(state.calendarEvents) ? state.calendarEvents : calendarEvents;
    selectedJobId = jobs[0]?.id || selectedJobId;
  } catch {
    backendReady = false;
  }
}

function syncStateToBackend() {
  if (!backendReady) return;
  api("/api/state", {
    method: "PUT",
    body: JSON.stringify({ jobs, requests, reviews, notifications, calendarEvents })
  }).catch(() => {});
}

function setActiveTab(tabName) {
  elements.tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  elements.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function getSelectedJob() {
  return jobs.find((job) => job.id === selectedJobId) || jobs[0];
}

function setSelectedJob(jobId) {
  selectedJobId = jobId;
  const job = getSelectedJob();
  elements.selectedJob.value = job ? `${job.school} - ${job.area}` : "";
  renderJobs();
}

function zoneMatches(job, location) {
  if (!location || location.toLowerCase() === "all") return true;
  return job.area.toLowerCase().includes(location.toLowerCase());
}

function matchScore(job) {
  const location = elements.locationFilter.value;
  let score = 55;
  if (job.hiringNow) score += 20;
  if (location !== "all" && zoneMatches(job, location)) score += 20;
  if (elements.shiftFilter.value !== "all" && job.shift === elements.shiftFilter.value) score += 5;
  return Math.min(score, 100);
}

function matchesFilters(job) {
  const query = elements.searchText.value.trim().toLowerCase();
  const searchable = `${job.school} ${job.area} ${job.shift} ${job.vehicle} ${job.details}`.toLowerCase();
  const location = elements.locationFilter.value.trim();
  const range = elements.rangeFilter.value;
  const shiftMatch = elements.shiftFilter.value === "all" || job.shift === elements.shiftFilter.value;
  const vehicleMatch = elements.vehicleFilter.value === "all" || job.vehicle === elements.vehicleFilter.value;
  const hiringMatch = elements.hiringFilter.value === "all" || job.hiringNow;
  const locationMatch = range === "all" || !location ||
    (range === "within" ? zoneMatches(job, location) : !zoneMatches(job, location));

  return (!query || searchable.includes(query)) && shiftMatch && vehicleMatch && hiringMatch && locationMatch;
}

function renderJobs() {
  const filteredJobs = jobs.filter(matchesFilters).sort((a, b) => matchScore(b) - matchScore(a));
  elements.jobCount.textContent = `${filteredJobs.length} ${filteredJobs.length === 1 ? "job" : "jobs"}`;

  if (!filteredJobs.length) {
    elements.jobsList.innerHTML = `<div class="empty-state">No jobs match this search yet. Try outside your location or clear one filter.</div>`;
    return;
  }

  elements.jobsList.innerHTML = filteredJobs.map((job) => `
    <article class="job-card ${job.id === selectedJobId ? "selected" : ""}">
      <div class="card-top">
        <div>
          <h3>${escapeHtml(job.school)}</h3>
          <p>${escapeHtml(job.area)}</p>
        </div>
        <strong>${escapeHtml(job.pay)}</strong>
      </div>
      <div class="meta-row">
        <span class="tag">${escapeHtml(job.shift)}</span>
        <span class="tag">${escapeHtml(job.vehicle)}</span>
        <span class="tag ${job.hiringNow ? "success" : ""}">${job.hiringNow ? "Hiring now" : "Collecting applications"}</span>
        <span class="tag">Auto match ${matchScore(job)}%</span>
      </div>
      <p class="muted">${escapeHtml(job.details)}</p>
      <div class="job-actions">
        <button class="small-button primary" type="button" data-select-job="${job.id}">Request Job</button>
        <button class="small-button" type="button" data-copy-job="${job.id}">Copy Details</button>
      </div>
    </article>
  `).join("");
}

function renderRequests() {
  const status = elements.requestFilter.value;
  const visibleRequests = requests
    .filter((request) => status === "all" || request.status === status)
    .sort((a, b) => Number(b.quickSearch) - Number(a.quickSearch));
  const newCount = requests.filter((request) => request.status === "New").length;
  const fastCount = requests.filter((request) => request.quickSearch).length;
  elements.requestSummary.textContent = `${requests.length} total - ${newCount} new - ${fastCount} fast track`;

  if (!visibleRequests.length) {
    elements.requestsList.innerHTML = `<div class="empty-state">No driver requests in this status.</div>`;
    return;
  }

  elements.requestsList.innerHTML = visibleRequests.map((request) => `
    <article class="request-card ${request.quickSearch ? "priority" : ""}">
      <div class="card-top">
        <div>
          <h3>${escapeHtml(request.driverName)}</h3>
          <p>${escapeHtml(request.jobTitle)}</p>
        </div>
        <span class="tag">${escapeHtml(request.status)}</span>
      </div>
      <div class="meta-row">
        <span class="tag">${escapeHtml(request.license)}</span>
        <span class="tag">${escapeHtml(request.phone)}</span>
        ${request.driverEmail ? `<span class="tag">Driver email: ${escapeHtml(request.driverEmail)}</span>` : ""}
        ${request.schoolEmail ? `<span class="tag">School email: ${escapeHtml(request.schoolEmail)}</span>` : ""}
        <span class="tag">${escapeHtml(request.driverLocation || "Location not set")}</span>
        <span class="tag">${escapeHtml(request.createdAt)}</span>
        ${request.interviewDate ? `<span class="tag success">Interview ${escapeHtml(formatDateTime(request.interviewDate))}</span>` : ""}
        ${request.quickSearch ? `<span class="tag success">Quick Search KSH 400</span>` : ""}
      </div>
      <p class="muted">${escapeHtml(request.notes || "No extra notes provided.")}</p>
      ${request.quickSearch ? `<p class="payment-line">Payment: ${escapeHtml(request.paymentMethod)} - ${escapeHtml(request.paymentReference || "reference pending")}</p>` : ""}
      <label>
        Interview date and time
        <input type="datetime-local" data-interview-date="${request.id}" value="${escapeHtml(request.interviewDate || "")}">
      </label>
      <div class="request-actions">
        <button class="small-button" type="button" data-status="${request.id}:Reviewed">Mark Reviewed</button>
        <button class="small-button primary" type="button" data-interview="${request.id}">Confirm Interview</button>
        <button class="small-button success-button" type="button" data-status="${request.id}:Approved">Approve</button>
        <button class="small-button danger-button" type="button" data-status="${request.id}:Rejected">Reject</button>
        <button class="small-button" type="button" data-email-owner="${request.id}">Email Samuel</button>
        ${request.schoolEmail ? `<button class="small-button" type="button" data-email-school="${request.id}">Email School</button>` : ""}
        ${request.driverEmail ? `<button class="small-button" type="button" data-email-driver="${request.id}">Email Driver</button>` : ""}
      </div>
    </article>
  `).join("");
}

function renderNotifications() {
  elements.notificationCount.textContent = `${notifications.length} ${notifications.length === 1 ? "notice" : "notices"}`;
  if (!notifications.length) {
    elements.notificationsList.innerHTML = `<div class="empty-state">No notification messages prepared yet.</div>`;
    return;
  }

  elements.notificationsList.innerHTML = notifications.map((notice) => `
    <article class="notification-card">
      <div class="card-top">
        <div>
          <h3>${escapeHtml(notice.title)}</h3>
          <p>${escapeHtml(notice.type)} - ${escapeHtml(notice.createdAt)}</p>
        </div>
      </div>
      <p class="muted">${escapeHtml(notice.message)}</p>
      ${notice.mailto ? `<a class="small-button" href="${escapeHtml(notice.mailto)}">Open email draft</a>` : ""}
    </article>
  `).join("");
}

function renderReviews() {
  elements.reviewCount.textContent = `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`;
  elements.reviewsList.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="card-top">
        <div>
          <h3>${escapeHtml(review.reviewer)}</h3>
          <p>${escapeHtml(review.role)} - ${escapeHtml(review.createdAt)}</p>
        </div>
      </div>
      <p class="muted">${escapeHtml(review.comment)}</p>
    </article>
  `).join("");
}

function initializeCalendarControls() {
  const today = new Date();
  const currentYear = Math.min(Math.max(today.getFullYear(), 1970), 2080);
  elements.calendarYear.innerHTML = "";
  for (let year = 1970; year <= 2080; year += 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    option.selected = year === currentYear;
    elements.calendarYear.appendChild(option);
  }
  elements.calendarMonth.value = String(today.getMonth());
  renderCalendarDays();
}

function renderCalendarDays() {
  const year = Number(elements.calendarYear.value);
  const month = Number(elements.calendarMonth.value);
  const selectedDay = Number(elements.calendarDay.value) || new Date().getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  elements.calendarDay.innerHTML = "";
  for (let day = 1; day <= daysInMonth; day += 1) {
    const option = document.createElement("option");
    option.value = String(day);
    option.textContent = String(day);
    option.selected = day === Math.min(selectedDay, daysInMonth);
    elements.calendarDay.appendChild(option);
  }
}

function renderCalendarRequestOptions() {
  const currentValue = elements.calendarRequestSelect.value;
  elements.calendarRequestSelect.innerHTML = `<option value="">No linked request</option>`;
  requests.forEach((request) => {
    const option = document.createElement("option");
    option.value = request.id;
    option.textContent = `${request.driverName} - ${request.jobTitle}`;
    elements.calendarRequestSelect.appendChild(option);
  });
  elements.calendarRequestSelect.value = currentValue;
}

function renderCalendarEvents() {
  elements.calendarCount.textContent = `${calendarEvents.length} ${calendarEvents.length === 1 ? "event" : "events"}`;
  renderCalendarRequestOptions();

  if (!calendarEvents.length) {
    elements.calendarList.innerHTML = `<div class="empty-state">No calendar events yet.</div>`;
    return;
  }

  elements.calendarList.innerHTML = calendarEvents
    .slice()
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .map((event) => `
      <article class="calendar-card">
        <div class="card-top">
          <div>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.type)} - ${escapeHtml(event.date)} at ${escapeHtml(event.time)}</p>
          </div>
          <span class="tag">${escapeHtml(event.date.slice(0, 4))}</span>
        </div>
        ${event.requestTitle ? `<div class="meta-row"><span class="tag">${escapeHtml(event.requestTitle)}</span></div>` : ""}
        <p class="muted">${escapeHtml(event.notes || "No notes added.")}</p>
      </article>
    `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function ownerMailto(request) {
  const subject = encodeURIComponent(`Driver application - ${request.driverName}`);
  const body = encodeURIComponent(buildRequestMessage(request));
  return `mailto:samwakariuki21@gmail.com?subject=${subject}&body=${body}`;
}

function schoolMailto(request) {
  const subject = encodeURIComponent(`Driver application - ${request.driverName}`);
  const body = encodeURIComponent(buildRequestMessage(request));
  return `mailto:${request.schoolEmail}?subject=${subject}&body=${body}`;
}

function driverMailto(request) {
  const subject = encodeURIComponent(`Update for ${request.jobTitle}`);
  const body = encodeURIComponent([
    `Hello ${request.driverName},`,
    "",
    `This is an update about your application for ${request.jobTitle}.`,
    `Status: ${request.status}`,
    request.interviewDate ? `Interview: ${formatDateTime(request.interviewDate)}` : "",
    "",
    "Sharp Consultancy Limited"
  ].filter(Boolean).join("\n"));
  return `mailto:${request.driverEmail}?subject=${subject}&body=${body}`;
}

function buildRequestMessage(request) {
  return [
    `Driver: ${request.driverName}`,
    `Phone: ${request.phone}`,
    `Email: ${request.driverEmail || "Not provided"}`,
    `Location: ${request.driverLocation}`,
    `Job: ${request.jobTitle}`,
    `Credential: ${request.license}`,
    `Quick Search: ${request.quickSearch ? "Yes - KSH 400" : "No"}`,
    `Payment: ${request.paymentMethod || "N/A"} ${request.paymentReference || ""}`,
    `Notes: ${request.notes || "None"}`
  ].join("\n");
}

function ownerWhatsappUrl(request) {
  const message = [
    "New school driver job request",
    buildRequestMessage(request)
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function addNotification(type, title, message, mailto = "", recipients = {}) {
  const notice = {
    id: `note-${Date.now()}`,
    type,
    title,
    message,
    mailto,
    recipients,
    createdAt: "Just now"
  };

  notifications = [notice, ...notifications];
  save(false);
  renderNotifications();
  api("/api/notify", {
    method: "POST",
    body: JSON.stringify(notice)
  }).catch(() => {});
}

function notifyDriverApplication(request) {
  addNotification(
    "SMS to owner",
    "New driver application",
    `New driver request from ${request.driverName} for ${request.jobTitle}. Phone: ${request.phone}. Email: ${request.driverEmail || "not provided"}.`,
    ownerMailto(request),
    { ownerSms: true, ownerEmail: true }
  );
  if (request.schoolEmail) {
    addNotification(
      "Email to school",
      "New driver application",
      `A driver has requested ${request.jobTitle}.\n\n${buildRequestMessage(request)}`,
      "",
      { schoolEmail: request.schoolEmail }
    );
  }
}

function notifyWhatsappApplication(request) {
  addNotification(
    "WhatsApp to owner",
    "WhatsApp driver application",
    `WhatsApp request prepared for ${request.driverName} for ${request.jobTitle}. Send to 0711608769.`,
    "",
    { ownerWhatsapp: true }
  );
}

function notifyInterviewConfirmed(request) {
  const dateText = formatDateTime(request.interviewDate);
  addNotification(
    "SMS and email to driver",
    "Interview confirmed",
    `Interview confirmed for ${request.driverName} on ${dateText} for ${request.jobTitle}. Send SMS to ${request.phone}${request.driverEmail ? ` and email to ${request.driverEmail}` : ""}.`,
    "",
    { driverSms: true, driverPhone: request.phone, driverEmail: request.driverEmail || "" }
  );
  addNotification(
    "SMS to owner",
    "Interview date set",
    `${request.driverName} has an interview confirmed on ${dateText} for ${request.jobTitle}.`,
    "",
    { ownerSms: true, ownerEmail: true }
  );
  if (request.schoolEmail) {
    addNotification(
      "Email to school",
      "Interview date set",
      `${request.driverName} has an interview confirmed on ${dateText} for ${request.jobTitle}.`,
      "",
      { schoolEmail: request.schoolEmail }
    );
  }
}

function personaIntro() {
  return activePersona === "Samuel"
    ? "Hi, I am Samuel. I can help you search jobs, understand driver requirements, or guide employers reviewing driver requests."
    : "Hi, I am Angela. I can help with documents, payments, quick search, and choosing jobs that fit your location.";
}

function addAssistantMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = `assistant-message ${sender === "bot" ? "bot" : "user"}`;
  messageElement.textContent = message;
  elements.assistantMessages.appendChild(messageElement);
  elements.assistantMessages.scrollTop = elements.assistantMessages.scrollHeight;
}

function setPersona(name) {
  activePersona = name;
  elements.assistantTitle.textContent = `Ask ${name}`;
  elements.personaCards.forEach((card) => {
    const isActive = card.dataset.persona === name;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });
  addAssistantMessage("bot", personaIntro());
}

function answerQuestion(question) {
  const text = question.toLowerCase();
  const prefix = activePersona === "Samuel" ? "Samuel: " : "Angela: ";

  if (text.includes("document") || text.includes("require") || text.includes("psv") || text.includes("good conduct")) {
    return `${prefix}School drivers should prepare a National ID, valid driving licence, PSV licence or badge where needed, Certificate of Good Conduct, medical fitness certificate, proof of experience, CV/profile, referees, and any first aid or defensive driving certificates. You can open the Requirements PDF from the menu.`;
  }

  if (text.includes("pay") || text.includes("payment") || text.includes("400") || text.includes("quick") || text.includes("mpesa") || text.includes("m-pesa")) {
    return `${prefix}Quick Search is KSH 400. It is optional for drivers who want priority matching. Choose M-Pesa, Airtel Money, Card, or Bank Transfer, then add your payment reference when sending the driver request.`;
  }

  if (text.includes("location") || text.includes("near") || text.includes("outside") || text.includes("area")) {
    return `${prefix}Use the county, route, area, or neighborhood search in the Driver workspace. Type any Kenyan location such as Nairobi, Kiambu, Mombasa, Nakuru, Kisumu, Thika, or Nyali, then choose within or outside your location. Hiring-now jobs and closer matches are scored higher automatically.`;
  }

  if (text.includes("employer") || text.includes("employee") || text.includes("hire") || text.includes("driver request")) {
    return `${prefix}Employers can open the Employers tab, post a driver job, and review driver requests. Fast-track requests are highlighted so employers can see drivers who paid for quick matching.`;
  }

  if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("call")) {
    return `${prefix}You can contact Sharp Consultancy Limited on 0711608769 or email samwakariuki21@gmail.com.`;
  }

  if (text.includes("job") || text.includes("work") || text.includes("school")) {
    return `${prefix}Start from Search Driver Jobs. Filter by location, shift, vehicle, and hiring status, then choose Request Job. Add your documents summary and payment details only if you want Quick Search.`;
  }

  return `${prefix}I can help with driver jobs, employer hiring, required documents, Quick Search payment, location filters, and contact details. Try asking, "What documents do I need?" or "How do I find jobs near me?"`;
}

function openAssistant() {
  elements.assistantPanel.hidden = false;
  elements.assistantToggle.setAttribute("aria-expanded", "true");
  if (!elements.assistantMessages.children.length) {
    addAssistantMessage("bot", personaIntro());
  }
  elements.assistantInput.focus();
}

function closeAssistant() {
  elements.assistantPanel.hidden = true;
  elements.assistantToggle.setAttribute("aria-expanded", "false");
}

function handleAssistantSubmit(event) {
  event.preventDefault();
  const question = elements.assistantInput.value.trim();
  if (!question) return;
  addAssistantMessage("user", question);
  elements.assistantInput.value = "";
  addAssistantMessage("bot", answerQuestion(question));
}

function handleJobFormSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const job = {
    id: `job-${Date.now()}`,
    school: form.get("school"),
    employerEmail: form.get("employerEmail"),
    area: form.get("area"),
    shift: form.get("shift"),
    vehicle: form.get("vehicle"),
    pay: form.get("pay"),
    hiringNow: form.get("hiringNow") === "true",
    details: form.get("details")
  };

  jobs = [job, ...jobs];
  selectedJobId = job.id;
  save();
  event.currentTarget.reset();
  renderJobs();
  showToast("Job published for drivers.");
}

function handleRequestSubmit(event) {
  event.preventDefault();
  const job = getSelectedJob();
  if (!job) {
    showToast("Choose a job before sending a request.");
    return;
  }

  const form = new FormData(event.currentTarget);
  const quickSearch = form.get("quickSearch") === "Yes";
  if (quickSearch && !form.get("paymentMethod")) {
    showToast("Choose a payment method for the KSH 400 quick search.");
    return;
  }

  const request = {
    id: `req-${Date.now()}`,
    jobId: job.id,
    jobTitle: `${job.school} - ${job.area}`,
    schoolEmail: job.employerEmail || "",
    driverName: form.get("driverName"),
    phone: form.get("phone"),
    driverEmail: form.get("driverEmail"),
    driverLocation: form.get("driverLocation"),
    license: form.get("license"),
    notes: form.get("notes"),
    quickSearch,
    paymentMethod: form.get("paymentMethod"),
    paymentReference: form.get("paymentReference"),
    status: "New",
    interviewDate: "",
    createdAt: "Just now"
  };
  const shouldOpenWhatsapp = event.submitter?.dataset.submitMode === "whatsapp";

  requests = [request, ...requests];
  save();
  notifyDriverApplication(request);
  if (shouldOpenWhatsapp) {
    notifyWhatsappApplication(request);
    window.open(ownerWhatsappUrl(request), "_blank", "noopener");
  }
  event.currentTarget.reset();
  setSelectedJob(job.id);
  renderRequests();
  renderCalendarEvents();
  showToast(shouldOpenWhatsapp ? "WhatsApp request opened for sending." : quickSearch ? "Fast-track request sent to employers." : "Request sent to employers.");
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  reviews = [{
    id: `rev-${Date.now()}`,
    reviewer: form.get("reviewer"),
    role: form.get("role"),
    comment: form.get("comment"),
    createdAt: "Just now"
  }, ...reviews];
  save();
  event.currentTarget.reset();
  renderReviews();
  showToast("Review posted.");
}

function handleCalendarSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const request = requests.find((item) => item.id === form.get("requestId"));
  const year = Number(form.get("year"));
  const month = Number(form.get("month")) + 1;
  const day = Number(form.get("day"));
  const eventDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  calendarEvents = [{
    id: `cal-${Date.now()}`,
    title: form.get("title"),
    type: form.get("type"),
    date: eventDate,
    time: form.get("time"),
    requestId: request?.id || "",
    requestTitle: request ? `${request.driverName} - ${request.jobTitle}` : "",
    notes: form.get("notes"),
    createdAt: "Just now"
  }, ...calendarEvents];

  save();
  event.currentTarget.reset();
  initializeCalendarControls();
  renderCalendarEvents();
  showToast("Calendar event added.");
}

function handleJobsClick(event) {
  const selectButton = event.target.closest("[data-select-job]");
  const copyButton = event.target.closest("[data-copy-job]");

  if (selectButton) {
    setSelectedJob(selectButton.dataset.selectJob);
    document.querySelector(".request-form").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (copyButton) {
    const job = jobs.find((item) => item.id === copyButton.dataset.copyJob);
    if (!job) return;
    const text = `${job.school} - ${job.area}: ${job.shift}, ${job.vehicle}, ${job.pay}. ${job.details}`;
    navigator.clipboard?.writeText(text);
    showToast("Job details copied.");
  }
}

function handleRequestsClick(event) {
  const emailButton = event.target.closest("[data-email-owner]");
  const schoolEmailButton = event.target.closest("[data-email-school]");
  const driverEmailButton = event.target.closest("[data-email-driver]");
  const interviewButton = event.target.closest("[data-interview]");
  const statusButton = event.target.closest("[data-status]");

  if (emailButton) {
    const request = requests.find((item) => item.id === emailButton.dataset.emailOwner);
    if (request) window.location.href = ownerMailto(request);
    return;
  }

  if (schoolEmailButton) {
    const request = requests.find((item) => item.id === schoolEmailButton.dataset.emailSchool);
    if (request?.schoolEmail) window.location.href = schoolMailto(request);
    return;
  }

  if (driverEmailButton) {
    const request = requests.find((item) => item.id === driverEmailButton.dataset.emailDriver);
    if (request?.driverEmail) window.location.href = driverMailto(request);
    return;
  }

  if (interviewButton) {
    const id = interviewButton.dataset.interview;
    const input = document.querySelector(`[data-interview-date="${id}"]`);
    if (!input?.value) {
      showToast("Choose an interview date and time first.");
      return;
    }
    let updatedRequest;
    requests = requests.map((request) => {
      if (request.id !== id) return request;
      updatedRequest = { ...request, status: "Interview", interviewDate: input.value };
      return updatedRequest;
    });
    save();
    renderRequests();
    renderCalendarEvents();
    if (updatedRequest) notifyInterviewConfirmed(updatedRequest);
    showToast("Interview confirmed and notification prepared.");
    return;
  }

  if (!statusButton) return;

  const [id, status] = statusButton.dataset.status.split(":");
  let updatedRequest;
  requests = requests.map((request) => request.id === id ? { ...request, status } : request);
  updatedRequest = requests.find((request) => request.id === id);
  save();
  renderRequests();
  renderCalendarEvents();
  if (updatedRequest && (status === "Approved" || status === "Rejected")) {
    addNotification(
      "SMS and email to driver",
      `Application ${status.toLowerCase()}`,
      `${updatedRequest.driverName}'s application for ${updatedRequest.jobTitle} has been ${status.toLowerCase()}. Send SMS to ${updatedRequest.phone}${updatedRequest.driverEmail ? ` and email to ${updatedRequest.driverEmail}` : ""}.`,
      "",
      { driverSms: true, driverPhone: updatedRequest.phone, driverEmail: updatedRequest.driverEmail || "" }
    );
    if (updatedRequest.schoolEmail) {
      addNotification(
        "Email to school",
        `Application ${status.toLowerCase()}`,
        `${updatedRequest.driverName}'s application for ${updatedRequest.jobTitle} has been ${status.toLowerCase()}.`,
        "",
        { schoolEmail: updatedRequest.schoolEmail }
      );
    }
  }
  showToast(`Request marked ${status.toLowerCase()}.`);
}

function resetDemoData() {
  jobs = seedJobs;
  requests = seedRequests;
  reviews = seedReviews;
  notifications = seedNotifications;
  calendarEvents = seedCalendarEvents;
  selectedJobId = jobs[0].id;
  save();
  setSelectedJob(selectedJobId);
  renderRequests();
  renderReviews();
  renderNotifications();
  renderCalendarEvents();
  showToast("Demo data reset.");
}

elements.tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

[
  elements.searchText,
  elements.locationFilter,
  elements.rangeFilter,
  elements.shiftFilter,
  elements.vehicleFilter,
  elements.hiringFilter
].forEach((control) => {
  control.addEventListener("input", renderJobs);
});

elements.jobsList.addEventListener("click", handleJobsClick);
elements.requestsList.addEventListener("click", handleRequestsClick);
elements.driverRequestForm.addEventListener("submit", handleRequestSubmit);
elements.jobForm.addEventListener("submit", handleJobFormSubmit);
elements.reviewForm.addEventListener("submit", handleReviewSubmit);
elements.calendarForm.addEventListener("submit", handleCalendarSubmit);
elements.calendarYear.addEventListener("change", renderCalendarDays);
elements.calendarMonth.addEventListener("change", renderCalendarDays);
elements.requestFilter.addEventListener("input", renderRequests);
elements.resetDemo.addEventListener("click", resetDemoData);
elements.assistantToggle.addEventListener("click", () => {
  if (elements.assistantPanel.hidden) {
    openAssistant();
  } else {
    closeAssistant();
  }
});
elements.assistantClose.addEventListener("click", closeAssistant);
elements.assistantForm.addEventListener("submit", handleAssistantSubmit);
elements.personaCards.forEach((card) => {
  card.addEventListener("click", () => setPersona(card.dataset.persona));
});
elements.assistantPrompts.addEventListener("click", (event) => {
  const button = event.target.closest("[data-question]");
  if (!button) return;
  addAssistantMessage("user", button.dataset.question);
  addAssistantMessage("bot", answerQuestion(button.dataset.question));
});

async function initializeApp() {
  await syncStateFromBackend();
  initializeCalendarControls();
  setSelectedJob(selectedJobId);
  renderRequests();
  renderReviews();
  renderNotifications();
  renderCalendarEvents();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

initializeApp();
