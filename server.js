const http = require("node:http");
const fsSync = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const { URL } = require("node:url");

const root = __dirname;
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "db.json");

loadEnvFile();
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".pdf": "application/pdf"
};

const defaultDb = {
  jobs: [],
  requests: [],
  reviews: [],
  notifications: [],
  calendarEvents: []
};

function env(name, fallback = "") {
  return process.env[name] || fallback;
}

function isConfigured(value) {
  return Boolean(value && !String(value).startsWith("your_"));
}

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  if (!fsSync.existsSync(envPath)) return;
  const contents = fsSync.readFileSync(envPath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function normalizeKenyaPhone(phone) {
  const cleaned = String(phone || "").replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return `+254${cleaned.slice(1)}`;
  if (cleaned.startsWith("254")) return `+${cleaned}`;
  return cleaned;
}

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

async function readDb() {
  await ensureDb();
  try {
    return { ...defaultDb, ...JSON.parse(await fs.readFile(dbPath, "utf8")) };
  } catch {
    return { ...defaultDb };
  }
}

async function writeDb(db) {
  await ensureDb();
  await fs.writeFile(dbPath, JSON.stringify({ ...defaultDb, ...db }, null, 2));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function sendSms({ to, message }) {
  const apiKey = env("AFRICASTALKING_API_KEY");
  const username = env("AFRICASTALKING_USERNAME", "sandbox");
  const from = env("AFRICASTALKING_SENDER_ID");
  const normalizedTo = normalizeKenyaPhone(to);

  if (!isConfigured(apiKey) || !normalizedTo) {
    return { skipped: true, reason: "Missing AFRICASTALKING_API_KEY or recipient phone." };
  }

  const body = new URLSearchParams({
    username,
    to: normalizedTo,
    message
  });
  if (from) body.set("from", from);

  const response = await fetch("https://api.africastalking.com/version1/messaging", {
    method: "POST",
    headers: {
      apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    body
  });

  const result = await response.text();
  return { ok: response.ok, status: response.status, result };
}

async function sendEmail({ to, subject, message }) {
  const apiKey = env("RESEND_API_KEY");
  const from = env("EMAIL_FROM", "Sharp Consultancy <onboarding@resend.dev>");

  if (!isConfigured(apiKey) || !to) {
    return { skipped: true, reason: "Missing RESEND_API_KEY or recipient email." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: message
    })
  });

  const result = await response.text();
  return { ok: response.ok, status: response.status, result };
}

async function handleNotification(payload) {
  const db = await readDb();
  const ownerPhone = env("OWNER_PHONE", "0711608769");
  const ownerEmail = env("OWNER_EMAIL", "samwakariuki21@gmail.com");
  const notice = {
    id: payload.id || `note-${Date.now()}`,
    type: payload.type || "Notification",
    title: payload.title || "Sharp Consultancy notification",
    message: payload.message || "",
    createdAt: payload.createdAt || new Date().toISOString(),
    recipients: payload.recipients || {},
    delivery: []
  };

  const recipients = notice.recipients;
  if (recipients.ownerSms) {
    notice.delivery.push({ channel: "owner_sms", ...(await sendSms({ to: ownerPhone, message: notice.message })) });
  }
  if (recipients.ownerEmail) {
    notice.delivery.push({ channel: "owner_email", ...(await sendEmail({ to: ownerEmail, subject: notice.title, message: notice.message })) });
  }
  if (recipients.driverSms) {
    notice.delivery.push({ channel: "driver_sms", ...(await sendSms({ to: recipients.driverPhone, message: notice.message })) });
  }
  if (recipients.driverEmail) {
    notice.delivery.push({ channel: "driver_email", ...(await sendEmail({ to: recipients.driverEmail, subject: notice.title, message: notice.message })) });
  }
  if (recipients.schoolEmail) {
    notice.delivery.push({ channel: "school_email", ...(await sendEmail({ to: recipients.schoolEmail, subject: notice.title, message: notice.message })) });
  }

  db.notifications = [notice, ...(db.notifications || [])].slice(0, 200);
  await writeDb(db);
  return notice;
}

async function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, safePath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (url.pathname === "/api/health") {
      sendJson(res, 200, { ok: true, sms: isConfigured(env("AFRICASTALKING_API_KEY")), email: isConfigured(env("RESEND_API_KEY")) });
      return;
    }

    if (url.pathname === "/api/state" && req.method === "GET") {
      sendJson(res, 200, await readDb());
      return;
    }

    if (url.pathname === "/api/state" && req.method === "PUT") {
      const body = await readBody(req);
      await writeDb({ ...defaultDb, ...body });
      sendJson(res, 200, { ok: true });
      return;
    }

    if (url.pathname === "/api/notify" && req.method === "POST") {
      const notice = await handleNotification(await readBody(req));
      sendJson(res, 200, { ok: true, notice });
      return;
    }

    await serveStatic(req, res, url.pathname);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message });
  }
});

server.listen(port, host, () => {
  const displayHost = host === "0.0.0.0" ? "127.0.0.1" : host;
  console.log(`Sharp Consultancy app running at http://${displayHost}:${port}/`);
});
