(function () {
  'use strict';

  /* ── Auto-responses ──────────────────────────────────────── */
  const RESPONSES = [
    {
      re: /live|whatsapp|call|speak|talk.*person|human|agent|real person|connect/i,
      ans: `Sure! Connect with us live right now:<br><br>
💬 <b>WhatsApp</b> — fastest way to reach us<br>
<a href="https://wa.me/14695551088?text=Jai%20Shri%20Ram!%20I%20have%20a%20query%20about%20Dharm%20Path%20services." target="_blank" style="display:inline-block;margin-top:8px;padding:9px 18px;background:#25d366;color:#fff;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">📱 Open WhatsApp Chat</a><br><br>
📞 <b>Call:</b> (469) 555-1088<br>
✉️ <b>Email:</b> seva@dharmpath.com<br><br>
We're available <b>Mon–Sun, 8am–9pm CST</b>. 🙏`
    },
    {
      re: /service|offer|pooja|puja|path|katha|bhajan|jagran|havan|yagya|chowki|sandhya/i,
      ans: `We offer a wide range of devotional services:<br><br>
🕉️ <b>Priest Services</b> — Griha Pravesh, Satyanarayan Katha, Ganesh/Lakshmi Pooja, Navgraha, Rudrabhishek<br>
📖 <b>Path & Katha</b> — Sunder Kand, Ramcharitmanas, Durga Saptashati, Akhand Path<br>
🎶 <b>Bhakti Events</b> — Bhajan Sandhya, Mata Ki Chowki, Jagran, Sankirtan<br>
🔮 <b>Jyotish</b> — Kundli reading, Muhurat, Kundli matching<br>
📚 <b>Spiritual Education</b> — Online Zoom sessions & in-person DFW gatherings<br><br>
👉 <a href="services.html" style="color:#d96a00;text-decoration:underline">View all services →</a>`
    },
    {
      re: /book|appoint|schedul|reserv|slot/i,
      ans: `Booking is simple! Here's how:<br><br>
1️⃣ Visit our <a href="booking.html" style="color:#d96a00;text-decoration:underline">Booking Page</a><br>
2️⃣ Select your service, date & time<br>
3️⃣ Choose in-person (DFW) or online (Zoom)<br>
4️⃣ Submit your details — we confirm within a few hours<br><br>
Or WhatsApp us directly: 📞 <b>(469) 555-1088</b>`
    },
    {
      re: /price|cost|fee|charge|rate|how much|dollar|\$/i,
      ans: `Here's a quick price overview:<br><br>
📿 Sunder Kand Path — <b>from $251</b><br>
📖 Ramcharitmanas Path — <b>from $301</b><br>
🏠 Griha Pravesh Pooja — <b>from $351</b><br>
🔮 Jyotish Consultation — <b>$81/session</b><br>
🎶 Bhajan Sandhya / Mata Ki Chowki — <b>Custom Quote</b><br>
📚 Spiritual Education Sessions — <b>Free / Dana</b><br><br>
For custom quotes on larger events, call us at 📞 (469) 555-1088`
    },
    {
      re: /city|cities|area|location|dallas|plano|frisco|mckinney|allen|irving|dfw/i,
      ans: `We serve the entire <b>DFW metroplex</b>:<br><br>
📍 Dallas · Plano · Frisco<br>
📍 McKinney · Allen · Irving<br><br>
Tell us your location when booking — we come to you!<br>
👉 <a href="cities.html" style="color:#d96a00;text-decoration:underline">See full city coverage →</a>`
    },
    {
      re: /online|zoom|virtual|remote/i,
      ans: `Yes! Many services are available <b>online via Zoom</b>:<br><br>
💻 Jyotish consultations<br>
💻 Spiritual Education sessions (weekly)<br>
💻 Some path & katha sessions<br><br>
Select <b>"Online (Zoom)"</b> when booking, or WhatsApp us to discuss.`
    },
    {
      re: /education|session|gita|ramayan|manas|upanishad|naam.?jap|learn|class/i,
      ans: `Our <b>Spiritual Education Sessions</b>:<br><br>
📜 Shree Ram Charit Manas<br>
🌸 Bhagwad Gita<br>
✨ Ashtavakra Gita<br>
🔔 Upanishads<br>
🙏 Naam Jap<br>
🎶 Bhajans & Sankirtan<br><br>
<b>Weekly on Zoom</b> · <b>Monthly in-person DFW</b><br>All are welcome — no prior knowledge needed.<br><br>
👉 <a href="education.html" style="color:#d96a00;text-decoration:underline">Register for sessions →</a>`
    },
    {
      re: /jyotish|kundli|kundali|horoscope|astro|rashi|muhurat/i,
      ans: `Our <b>Jyotish Services</b>:<br><br>
🔮 Kundli reading & analysis<br>
📅 Muhurat selection<br>
💑 Kundli Milan (marriage matching)<br>
⚡ Graha dosh remedies<br><br>
<b>$81/session</b> — online or in-person DFW<br>
📞 <b>(469) 555-1088</b> to book.`
    },
    {
      re: /contact|phone|email|reach/i,
      ans: `Reach us anytime:<br><br>
📞 <b>(469) 555-1088</b><br>
💬 <b>WhatsApp</b> — same number<br>
✉️ <b>seva@dharmpath.com</b><br><br>
WhatsApp is the fastest way to reach us.<br>
👉 <a href="contact.html" style="color:#d96a00;text-decoration:underline">Contact page →</a>`
    },
    {
      re: /payment|pay|advance|deposit|refund|cancel/i,
      ans: `We offer flexible payment options:<br><br>
💳 Pay in Full — at time of booking<br>
💳 Pay Advance — deposit to confirm, balance on the day<br>
📋 Custom Quote — for larger events<br><br>
We accept Zelle, cash, and online payments (Stripe coming soon).<br>For cancellations, please notify us <b>48 hours in advance</b>.`
    },
    {
      re: /samagri|material|item|need|bring|prepare/i,
      ans: `We guide you on all <b>pooja samagri</b>! When you book, we either:<br><br>
✅ Bring all samagri ourselves, or<br>
✅ Share a preparation checklist in advance<br><br>
Mention any questions in the booking form or ask us on WhatsApp.`
    },
    {
      re: /about|who|team|priest|pandit|founder/i,
      ans: `<b>Dharm Path</b> was founded to bring authentic Indian devotional services to the DFW community — with ease, dignity, and reverence.<br><br>
Our experienced priests and educators serve across Dallas, Plano, Frisco, McKinney, Allen and Irving.<br><br>
👉 <a href="about.html" style="color:#d96a00;text-decoration:underline">Read our full story →</a>`
    },
    {
      re: /hello|hi |namaste|jai|pranam|namaskar|hare|ram|krishna/i,
      ans: `🙏 Jai Shri Ram! Wonderful to have you here.<br><br>How can we help you today?`
    },
  ];

  /* ── State ───────────────────────────────────────────────── */
  let chatOpen   = false;
  let nameAsked  = false;
  let userName   = '';
  let inviteDismissed = false;

  /* ── CSS ─────────────────────────────────────────────────── */
  function injectCSS() {
    const s = document.createElement('style');
    s.textContent = `
/* ── Chat button ── */
#dp-btn{position:fixed;bottom:26px;right:26px;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#6b1f1f 0%,#d96a00 100%);color:#fff;font-size:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 28px rgba(107,31,31,.42);z-index:9998;border:none;transition:transform .2s,box-shadow .2s;}
#dp-btn:hover{transform:scale(1.1);box-shadow:0 10px 36px rgba(107,31,31,.54);}
#dp-btn .dp-label{position:absolute;right:70px;top:50%;transform:translateY(-50%);background:#6b1f1f;color:#fff;font-size:13px;font-weight:700;font-family:inherit;white-space:nowrap;padding:8px 14px;border-radius:22px;box-shadow:0 4px 16px rgba(107,31,31,.35);display:flex;align-items:center;gap:7px;pointer-events:none;}
#dp-btn .dp-label::after{content:'';position:absolute;right:-7px;top:50%;transform:translateY(-50%);border:7px solid transparent;border-left-color:#6b1f1f;border-right:none;}
#dp-btn .dp-label .dp-ldot{width:8px;height:8px;border-radius:50%;background:#25d366;flex-shrink:0;animation:dp-pulse 2s infinite;}
@keyframes dp-pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.3);opacity:.7;}}

/* ── Invite bubble ── */
#dp-invite{position:fixed;bottom:100px;right:26px;background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.16);z-index:9997;padding:0;overflow:hidden;width:260px;transform:translateY(8px);opacity:0;transition:opacity .3s ease,transform .3s ease;pointer-events:none;}
#dp-invite.show{opacity:1;transform:translateY(0);pointer-events:all;}
#dp-invite-inner{padding:16px 18px 14px;}
#dp-invite-close{position:absolute;top:8px;right:10px;background:none;border:none;color:#9a7040;font-size:16px;cursor:pointer;line-height:1;padding:2px;}
#dp-invite-close:hover{color:#6b1f1f;}
.dp-inv-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.dp-inv-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#6b1f1f,#d96a00);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.dp-inv-title{font-size:13.5px;font-weight:700;color:#1a1a1a;line-height:1.2;}
.dp-inv-sub{font-size:11.5px;color:#6b5d52;margin-top:1px;}
.dp-inv-msg{font-size:13px;color:#3a3a3a;line-height:1.5;margin-bottom:12px;}
.dp-inv-btns{display:flex;gap:8px;}
.dp-inv-btn{flex:1;padding:8px 0;border-radius:8px;border:none;cursor:pointer;font-size:12.5px;font-weight:700;font-family:inherit;transition:background .15s;}
.dp-inv-btn.primary{background:#6b1f1f;color:#fff;}
.dp-inv-btn.primary:hover{background:#521818;}
.dp-inv-btn.secondary{background:#fff3e0;color:#6b1f1f;border:1px solid #e8d9c4;}
.dp-inv-btn.secondary:hover{background:#ffe0b2;}
.dp-inv-footer{background:#f9f5f0;border-top:1px solid #e8d9c4;padding:8px 18px;font-size:11px;color:#9a7040;display:flex;align-items:center;gap:6px;}
.dp-inv-dot{width:7px;height:7px;border-radius:50%;background:#25d366;flex-shrink:0;}

/* ── Chat window ── */
#dp-win{position:fixed;bottom:100px;right:26px;width:358px;max-height:550px;background:#fff;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.18);z-index:9999;display:flex;flex-direction:column;overflow:hidden;transform:translateY(14px) scale(.97);opacity:0;pointer-events:none;transition:opacity .22s ease,transform .22s ease;}
#dp-win.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}

/* ── Header ── */
#dp-head{background:linear-gradient(135deg,#6b1f1f 0%,#8b2e2e 100%);color:#fff;padding:13px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.dp-hav{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.dp-hinf{flex:1;}
.dp-hinf strong{display:block;font-size:14px;line-height:1.2;}
.dp-hinf small{font-size:11px;opacity:.78;display:flex;align-items:center;gap:5px;}
.dp-onl{width:7px;height:7px;border-radius:50%;background:#4caf50;display:inline-block;}
#dp-head .dp-hbtns{display:flex;gap:6px;align-items:center;}
.dp-hbtn{background:rgba(255,255,255,.18);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .15s;}
.dp-hbtn:hover{background:rgba(255,255,255,.3);}

/* ── Subheader strip ── */
#dp-sub{background:#fff8f0;border-bottom:1px solid #e8d9c4;padding:8px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
.dp-sub-txt{font-size:12px;color:#6b5d52;flex:1;line-height:1.4;}
.dp-live-btn{background:#25d366;color:#fff;border:none;border-radius:20px;padding:5px 12px;font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:inherit;display:flex;align-items:center;gap:5px;text-decoration:none;}
.dp-live-btn:hover{background:#1da857;}

/* ── Messages ── */
#dp-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#faf7f3;scroll-behavior:smooth;}
.dpm{max-width:88%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.58;}
.dpm.b{background:#fff;border:1px solid #e8d9c4;border-bottom-left-radius:4px;align-self:flex-start;color:#1a1a1a;}
.dpm.u{background:linear-gradient(135deg,#6b1f1f,#8b2e2e);color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}
.dpm a{color:#d96a00;}
.dpm.u a{color:#ffd97a;}
.dp-qs{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
.dp-qb{background:#fff3e0;border:1px solid #e8d9c4;border-radius:20px;padding:5px 12px;font-size:12px;cursor:pointer;color:#6b1f1f;font-weight:600;white-space:nowrap;transition:background .15s;font-family:inherit;}
.dp-qb:hover{background:#ffe0b2;}
.dp-ts{display:flex;align-items:center;gap:5px;padding:8px 12px;background:#fff;border:1px solid #e8d9c4;border-radius:14px;border-bottom-left-radius:4px;align-self:flex-start;}
.dp-ts span{width:6px;height:6px;border-radius:50%;background:#9a7040;animation:dp-bounce .9s infinite ease-in-out;}
.dp-ts span:nth-child(2){animation-delay:.15s;}
.dp-ts span:nth-child(3){animation-delay:.30s;}
@keyframes dp-bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-5px);}}

/* ── Input row ── */
#dp-irow{display:flex;gap:8px;padding:11px 13px;border-top:1px solid #e8d9c4;background:#fff;flex-shrink:0;}
#dp-inp{flex:1;border:1px solid #e8d9c4;border-radius:10px;padding:9px 12px;font-size:13px;font-family:inherit;outline:none;background:#faf7f3;color:#1a1a1a;}
#dp-inp:focus{border-color:#d96a00;background:#fff;}
#dp-send{background:#6b1f1f;color:#fff;border:none;border-radius:10px;padding:9px 15px;cursor:pointer;font-size:15px;transition:background .15s;flex-shrink:0;}
#dp-send:hover{background:#521818;}

#dp-btn.active .dp-label{display:none;}
/* ── Responsive ── */
@media(max-width:480px){
  #dp-btn .dp-label{font-size:12px;padding:6px 11px;right:66px;}
  #dp-win{width:calc(100vw - 20px);right:10px;bottom:88px;max-height:72vh;}
  #dp-invite{width:calc(100vw - 52px);right:26px;}
}
    `;
    document.head.appendChild(s);
  }

  /* ── HTML ────────────────────────────────────────────────── */
  function injectHTML() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <!-- Floating chat button -->
      <button id="dp-btn" aria-label="Chat with us">
        💬
        <span class="dp-label"><span class="dp-ldot"></span>Chat with Us</span>
      </button>

      <!-- Invite bubble -->
      <div id="dp-invite">
        <button id="dp-invite-close" aria-label="Dismiss">✕</button>
        <div id="dp-invite-inner">
          <div class="dp-inv-head">
            <div class="dp-inv-av">🕉️</div>
            <div>
              <div class="dp-inv-title">Chat with Us</div>
              <div class="dp-inv-sub">Dharm Path Support</div>
            </div>
          </div>
          <p class="dp-inv-msg">🙏 Have questions about our services, bookings, or spiritual sessions? We're here to help!</p>
          <div class="dp-inv-btns">
            <button class="dp-inv-btn primary" id="dp-invite-open">Start Chat</button>
            <a class="dp-inv-btn secondary" href="https://wa.me/14695551088?text=Jai%20Shri%20Ram!%20I%20have%20a%20query%20about%20Dharm%20Path." target="_blank" style="text-align:center;text-decoration:none;">💬 WhatsApp</a>
          </div>
        </div>
        <div class="dp-inv-footer">
          <span class="dp-inv-dot"></span>
          Team online · Replies within a few hours
        </div>
      </div>

      <!-- Chat window -->
      <div id="dp-win" role="dialog" aria-label="Dharm Path Support Chat">
        <div id="dp-head">
          <div class="dp-hav">🕉️</div>
          <div class="dp-hinf">
            <strong>Dharm Path Support</strong>
            <small><span class="dp-onl"></span> Online — here to help</small>
          </div>
          <div class="dp-hbtns">
            <a class="dp-hbtn" href="https://wa.me/14695551088?text=Jai%20Shri%20Ram!%20I%20have%20a%20query%20about%20Dharm%20Path." target="_blank" title="Chat on WhatsApp" style="text-decoration:none;">📱</a>
            <button class="dp-hbtn" id="dp-x" aria-label="Close">✕</button>
          </div>
        </div>
        <div id="dp-sub">
          <div class="dp-sub-txt">Need to talk to someone right now?</div>
          <a class="dp-live-btn" href="https://wa.me/14695551088?text=Jai%20Shri%20Ram!%20I%20have%20a%20query%20about%20Dharm%20Path." target="_blank">
            📱 Live on WhatsApp
          </a>
        </div>
        <div id="dp-msgs"></div>
        <div id="dp-irow">
          <input id="dp-inp" placeholder="Type your message…" autocomplete="off" maxlength="400"/>
          <button id="dp-send" aria-label="Send">➤</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
  }

  /* ── Messaging ───────────────────────────────────────────── */
  function scrollBottom() {
    const m = document.getElementById('dp-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  }

  function botMsg(html, quickBtns) {
    const msgs = document.getElementById('dp-msgs');
    const div  = document.createElement('div');
    div.className = 'dpm b';
    div.innerHTML  = html;
    if (quickBtns && quickBtns.length) {
      const row = document.createElement('div');
      row.className = 'dp-qs';
      quickBtns.forEach(({ label, val }) => {
        const btn       = document.createElement('button');
        btn.className   = 'dp-qb';
        btn.textContent = label;
        btn.onclick     = () => handleInput(val);
        row.appendChild(btn);
      });
      div.appendChild(row);
    }
    msgs.appendChild(div);
    scrollBottom();
  }

  function userMsg(text) {
    const msgs    = document.getElementById('dp-msgs');
    const div     = document.createElement('div');
    div.className = 'dpm u';
    div.textContent = text;
    msgs.appendChild(div);
    scrollBottom();
  }

  function typingDots() {
    const msgs = document.getElementById('dp-msgs');
    const div  = document.createElement('div');
    div.className = 'dp-ts';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    scrollBottom();
    return div;
  }

  const MAIN_QUICK = [
    { label: '📋 Services',          val: 'What services do you offer?' },
    { label: '📅 Book a Service',    val: 'How do I book a service?' },
    { label: '💰 Pricing',           val: 'What are your prices?' },
    { label: '📍 Cities Covered',    val: 'Which cities do you serve?' },
    { label: '📚 Education Sessions',val: 'Tell me about education sessions' },
    { label: '📱 Live Chat',         val: 'I want to chat live' },
  ];

  const BACK_QUICK = [
    { label: '📋 Services',    val: 'What services do you offer?' },
    { label: '📅 Book Now',    val: 'How do I book a service?' },
    { label: '📱 Live Chat',   val: 'I want to chat live' },
  ];

  /* ── Input handling ──────────────────────────────────────── */
  function sendMessage() {
    const inp  = document.getElementById('dp-inp');
    const text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    handleInput(text);
  }

  function handleInput(text) {
    userMsg(text);

    if (!nameAsked) {
      nameAsked = true;
      userName  = text.trim().split(' ')[0];
      const dots = typingDots();
      setTimeout(() => {
        dots.remove();
        botMsg(
          `🙏 Jai Shri Ram, <b>${userName}</b>! Welcome to Dharm Path.<br>How can we help you today?`,
          MAIN_QUICK
        );
      }, 700);
      return;
    }

    const dots = typingDots();
    setTimeout(() => {
      dots.remove();
      for (const { re, ans } of RESPONSES) {
        if (re.test(text)) {
          botMsg(ans, BACK_QUICK);
          return;
        }
      }
      // Fallback
      botMsg(
        `Thank you for your message! Our team will get back to you shortly.<br><br>For an immediate response:<br><br>` +
        `<a href="https://wa.me/14695551088?text=Jai%20Shri%20Ram!%20${encodeURIComponent(text)}" target="_blank" style="display:inline-block;padding:8px 16px;background:#25d366;color:#fff;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;margin-top:4px;">📱 Send on WhatsApp</a><br><br>` +
        `📞 <b>(469) 555-1088</b><br>✉️ seva@dharmpath.com`,
        BACK_QUICK
      );
    }, 800);
  }

  /* ── Invite bubble ───────────────────────────────────────── */
  function showInvite() {
    if (inviteDismissed || chatOpen) return;
    const el = document.getElementById('dp-invite');
    if (el) el.classList.add('show');
  }

  function hideInvite() {
    const el = document.getElementById('dp-invite');
    if (el) el.classList.remove('show');
    inviteDismissed = true;
  }

  /* ── Toggle chat ─────────────────────────────────────────── */
  function openChat() {
    chatOpen = true;
    hideInvite();
    document.getElementById('dp-btn').classList.add('active');
    document.getElementById('dp-win').classList.add('open');
    document.getElementById('dp-inp').focus();
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('dp-btn').classList.toggle('active', chatOpen);
    document.getElementById('dp-win').classList.toggle('open', chatOpen);
    if (chatOpen) {
      hideInvite();
      document.getElementById('dp-inp').focus();
    }
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectCSS();
    injectHTML();

    document.getElementById('dp-btn').addEventListener('click', toggleChat);
    document.getElementById('dp-x').addEventListener('click', toggleChat);
    document.getElementById('dp-send').addEventListener('click', sendMessage);
    document.getElementById('dp-inp').addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });
    document.getElementById('dp-invite-close').addEventListener('click', hideInvite);
    document.getElementById('dp-invite-open').addEventListener('click', openChat);

    // Opening greeting
    setTimeout(() => {
      botMsg(`🙏 <b>Jai Shri Ram!</b> Welcome to <b>Dharm Path</b>.<br><br>May I know your name to get started?`);
    }, 400);

    // Show invite bubble immediately on load — stays visible until booking form is touched or user dismisses it
    setTimeout(showInvite, 800);

    // Hide invite bubble when user starts interacting with any booking/quick form on the page
    document.querySelectorAll('.quick-form input, .quick-form select, .quick-form textarea').forEach(el => {
      el.addEventListener('focus', hideInvite, { once: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
