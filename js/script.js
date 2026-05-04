/* ================================================================
   script.js — Engine undangan. JANGAN DIUBAH.
   Semua kustomisasi ada di js/config.js
================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  populateContent();
  initPetals();
  initGuestName();
  initMusicButton();
  renderGuestbook(CONFIG.guestbookSeed);
});

/* ── APPLY TEMA WARNA ─────────────────────────────────── */
function applyTheme() {
  const t = THEMES[CONFIG.theme] || THEMES.blush;
  const r = document.documentElement.style;

  r.setProperty("--accent",       t.accent);
  r.setProperty("--accent-dark",  t.accentDark);
  r.setProperty("--accent-mid",   t.accentMid);
  r.setProperty("--accent-pale",  t.accentPale);
  r.setProperty("--accent-line",  t.accentLine);
  r.setProperty("--cover-bg",     t.coverBg);
  r.setProperty("--hero-bg",      t.heroBg);
  r.setProperty("--page-bg",      t.pageBg);
  r.setProperty("--cd-bg",        t.cdBg);
  r.setProperty("--text-dark",    t.textDark);
  r.setProperty("--text-mid",     t.textMid);
  r.setProperty("--text-light",   t.textLight);
}

/* ── POPULATE SEMUA KONTEN DARI CONFIG ───────────────── */
function populateContent() {
  const { groom, bride, event } = CONFIG;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };

  /* Cover */
  set("coverGroom",  groom.shortName);
  set("coverBride",  bride.shortName);
  set("coverDate",   event.displayDate);

  /* Mempelai */
  set("groomFullName", groom.fullName);
  set("brideFullName", bride.fullName);
  set("groomParents",  groom.parents.replace(/\n/g, "\n"));
  set("brideParents",  bride.parents.replace(/\n/g, "\n"));

  /* Avatar foto atau inisial */
  const avG = document.getElementById("avGroom");
  const avB = document.getElementById("avBride");
  if (groom.photo) {
    avG.innerHTML = `<img src="${groom.photo}" alt="${groom.fullName}" />`;
    avG.classList.add("has-photo");
  } else {
    avG.textContent = groom.shortName.charAt(0).toUpperCase();
  }
  if (bride.photo) {
    avB.innerHTML = `<img src="${bride.photo}" alt="${bride.fullName}" />`;
    avB.classList.add("has-photo");
  } else {
    avB.textContent = bride.shortName.charAt(0).toUpperCase();
  }

  /* Instagram */
  const igG = document.getElementById("groomIG");
  const igB = document.getElementById("brideIG");
  if (igG) { igG.textContent = groom.instagram; igG.href = groom.igLink; }
  if (igB) { igB.textContent = bride.instagram; igB.href = bride.igLink; }

  /* Acara */
  set("akadDate",    event.displayDate);
  set("akadTime",    event.akad.time);
  setHTML("akadLoc", event.akad.location.replace(/\n/g, "<br>"));
  setAttr("akadMaps", "href", event.akad.mapsURL);

  set("resepsiDate",    event.displayDate);
  set("resepsiTime",    event.resepsi.time);
  setHTML("resepsiLoc", event.resepsi.location.replace(/\n/g, "<br>"));
  setAttr("resepsiMaps", "href", event.resepsi.mapsURL);

  /* RSVP deadline */
  const dl = document.getElementById("rsvpDeadline");
  if (dl) dl.textContent = `Mohon konfirmasi kehadiran sebelum ${event.rsvpDeadline}`;

  /* Penutup */
  const cl = document.getElementById("closingNames");
  if (cl) cl.innerHTML = `${groom.shortName} &amp; ${bride.shortName}`;

  /* Page title */
  document.title = `Undangan Pernikahan ${groom.shortName} & ${bride.shortName}`;
}

/* ── NAMA TAMU DARI URL ──────────────────────────────── */
function initGuestName() {
  const params = new URLSearchParams(window.location.search);
  const name   = params.get("to");
  const el     = document.getElementById("coverGuest");
  if (el && name && name.trim()) {
    el.textContent = "Kepada Yth. " + sanitize(name.trim());
  }
}

/* ── ANIMASI PETALS (CANVAS) ─────────────────────────── */
function initPetals() {
  const canvas = document.getElementById("petalsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 20; i++) {
    pts.push({
      x:  Math.random() * 1200,
      y:  Math.random() * -200,
      s:  Math.random() * 4 + 2,
      sp: Math.random() * 0.5 + 0.3,
      op: Math.random() * 0.4 + 0.15,
      a:  Math.random() * Math.PI * 2,
    });
  }

  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d4726a";

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.y += p.sp;
      p.x += Math.sin(p.a) * 0.35;
      p.a += 0.018;
      if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.globalAlpha = p.op;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.s, p.s * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── BUKA UNDANGAN ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.getElementById("openBtn");
  const cover = document.getElementById("cover");
  const main  = document.getElementById("main");

  if (btn) {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      openInvitation(cover, main);
    });
  }
  if (cover) {
    cover.addEventListener("click", () => openInvitation(cover, main));
  }
});

function openInvitation(cover, main) {
  cover.classList.add("closing");
  setTimeout(() => {
    cover.style.display = "none";
    main.classList.remove("hidden");
    main.classList.add("visible");
    tryPlayMusic();
    initReveal();
    initGallery();
    initCountdown();
  }, 900);
}

/* ── MUSIK ───────────────────────────────────────────── */
let musicPlaying = false;

function initMusicButton() {
  const fab = document.getElementById("musicFab");
  if (fab) fab.addEventListener("click", toggleMusic);
}

function tryPlayMusic() {
  const audio = document.getElementById("bgMusic");
  if (!audio) return;
  audio.volume = 0.45;
  audio.play()
    .then(() => setMusicState(true))
    .catch(() => setMusicState(false));
}

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  if (!audio) return;
  if (musicPlaying) {
    audio.pause();
    setMusicState(false);
  } else {
    audio.play().then(() => setMusicState(true)).catch(() => {});
  }
}

function setMusicState(on) {
  musicPlaying = on;
  const fab  = document.getElementById("musicFab");
  const icon = document.getElementById("musicIcon");
  if (!fab || !icon) return;
  fab.classList.toggle("playing", on);
  icon.innerHTML = on
    ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
    : '<path d="M12 3v10.55A4 4 0 1016 17V7h4V3h-8z"/>';
}

/* ── COUNTDOWN ───────────────────────────────────────── */
function initCountdown() {
  const target = new Date(CONFIG.event.countdownISO).getTime();

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      document.getElementById("cdGrid").style.display = "none";
      document.getElementById("cdMsg").textContent    = "🎊 Hari Bahagia Telah Tiba!";
      return;
    }
    const p = n => String(n).padStart(2, "0");
    document.getElementById("cdD").textContent = p(Math.floor(diff / 86400000));
    document.getElementById("cdH").textContent = p(Math.floor(diff % 86400000 / 3600000));
    document.getElementById("cdM").textContent = p(Math.floor(diff % 3600000 / 60000));
    document.getElementById("cdS").textContent = p(Math.floor(diff % 60000 / 1000));
  }
  tick();
  setInterval(tick, 1000);
}

/* ── SCROLL REVEAL ───────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ── GALERI ──────────────────────────────────────────── */
function initGallery() {
  const items = document.querySelectorAll(".gal-item");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = Number(e.target.style.getPropertyValue("--i") || 0);
        setTimeout(() => e.target.classList.add("on"), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  items.forEach(el => obs.observe(el));
}

/* ── RSVP ────────────────────────────────────────────── */
let attendValue = "";

function pickAttend(el, val) {
  document.querySelectorAll(".r-opt").forEach(r => r.classList.remove("sel"));
  el.classList.add("sel");
  attendValue = val;
}

function submitRSVP() {
  const name    = document.getElementById("rsvpName").value.trim();
  const message = document.getElementById("rsvpMsg").value.trim();
  const fb      = document.getElementById("rsvpFeedback");
  const btn     = document.getElementById("rsvpBtn");

  if (!name)         { showFb(fb, "⚠ Mohon isi nama Anda.", true); return; }
  if (!attendValue)  { showFb(fb, "⚠ Mohon pilih konfirmasi kehadiran.", true); return; }

  btn.disabled    = true;
  btn.textContent = "Mengirim…";

  sendToGoogleForm(name, attendValue, message)
    .finally(() => {
      showFb(fb, "✓ Terima kasih! Konfirmasi Anda telah diterima.", false);
      btn.textContent = "Terkirim ✓";

      CONFIG.guestbookSeed.unshift({ name, attend: attendValue, message: message || "—" });
      renderGuestbook(CONFIG.guestbookSeed);

      setTimeout(() => {
        document.getElementById("rsvpName").value = "";
        document.getElementById("rsvpMsg").value  = "";
        document.querySelectorAll(".r-opt").forEach(r => r.classList.remove("sel"));
        attendValue     = "";
        btn.disabled    = false;
        btn.textContent = "Kirim Konfirmasi";
        fb.textContent  = "";
      }, 4000);
    });
}

function sendToGoogleForm(name, attend, message) {
  return new Promise(resolve => {
    const { url, fields } = CONFIG.googleForm;
    if (!url || url.includes("XXXXXXXX")) { resolve(); return; }

    const iframe = document.createElement("iframe");
    iframe.name  = "gf_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form   = document.createElement("form");
    form.method  = "POST";
    form.action  = url;
    form.target  = "gf_iframe";

    [[fields.name, name], [fields.attendance, attend], [fields.message, message]].forEach(([n, v]) => {
      const inp  = document.createElement("input");
      inp.type   = "hidden";
      inp.name   = n;
      inp.value  = v;
      form.appendChild(inp);
    });

    document.body.appendChild(form);
    iframe.onload = () => { cleanup(); resolve(); };
    setTimeout(() => { cleanup(); resolve(); }, 4000);
    form.submit();

    function cleanup() {
      if (form.parentNode)   form.parentNode.removeChild(form);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }
  });
}

function showFb(el, msg, isError) {
  el.textContent  = msg;
  el.style.color  = isError ? "#c0392b" : "var(--accent-dark)";
}

/* ── BUKU TAMU ───────────────────────────────────────── */
function renderGuestbook(entries) {
  const list = document.getElementById("gbList");
  if (!list) return;
  list.innerHTML = entries.map((g, i) => `
    <div class="gb-card" style="animation-delay:${i * 0.04}s">
      <div class="gb-top">
        <span class="gb-name">${sanitize(g.name)}</span>
        <span class="gb-badge">${sanitize(g.attend)}</span>
      </div>
      <p class="gb-msg">${sanitize(g.message)}</p>
    </div>
  `).join("");
}

/* ── HELPER ──────────────────────────────────────────── */
function sanitize(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}
