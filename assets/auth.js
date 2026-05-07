(function () {
  'use strict';

  var USERS_KEY   = 'dp_users';
  var SESSION_KEY = 'dp_session';
  var RESET_PFX   = 'dp_reset_';

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveUsers(u)    { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
  function setSession(e)   { sessionStorage.setItem(SESSION_KEY, e); }
  function clearSession()  { sessionStorage.removeItem(SESSION_KEY); }

  function currentUser() {
    var email = sessionStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return getUsers().find(function (u) { return u.email === email; }) || null;
  }

  function register(name, email, password) {
    if (!name || !email || !password) return { ok: false, error: 'Please fill all required fields.' };
    var users = getUsers();
    if (users.some(function (u) { return u.email === email.toLowerCase(); })) {
      return { ok: false, error: 'An account with this email already exists. Please log in.' };
    }
    users.push({ name: name.trim(), email: email.toLowerCase(), password: password });
    saveUsers(users);
    setSession(email.toLowerCase());
    return { ok: true };
  }

  function login(email, password) {
    if (!email || !password) return { ok: false, error: 'Please enter your email and password.' };
    var users = getUsers();
    var user = users.find(function (u) { return u.email === email.toLowerCase(); });
    if (!user) return { ok: false, error: 'No account found with this email.' };
    if (user.password !== password) return { ok: false, error: 'Incorrect password. Please try again.' };
    setSession(user.email);
    return { ok: true };
  }

  function requestReset(email) {
    email = (email || '').toLowerCase().trim();
    if (!email) return { ok: false, error: 'Please enter your email address.' };
    var user = getUsers().find(function (u) { return u.email === email; });
    if (!user) return { ok: false, error: 'No account found with this email.' };
    var code   = String(Math.floor(100000 + Math.random() * 900000));
    var expiry = Date.now() + 15 * 60 * 1000;
    localStorage.setItem(RESET_PFX + email, JSON.stringify({ code: code, expiry: expiry }));
    return { ok: true, code: code, name: user.name };
  }

  function resetPassword(email, code, newPassword) {
    email = (email || '').toLowerCase().trim();
    if (!newPassword || newPassword.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    var raw = localStorage.getItem(RESET_PFX + email);
    if (!raw) return { ok: false, error: 'No reset request found. Please request a new code.' };
    var stored = JSON.parse(raw);
    if (Date.now() > stored.expiry) {
      localStorage.removeItem(RESET_PFX + email);
      return { ok: false, error: 'Code has expired. Please request a new one.' };
    }
    if (stored.code !== (code || '').trim()) return { ok: false, error: 'Incorrect code. Please try again.' };
    var users = getUsers();
    var idx = users.findIndex(function (u) { return u.email === email; });
    if (idx === -1) return { ok: false, error: 'Account not found.' };
    users[idx].password = newPassword;
    saveUsers(users);
    localStorage.removeItem(RESET_PFX + email);
    return { ok: true };
  }

  function logout() {
    clearSession();
    window.location.href = 'login.html';
  }

  function requireAuth() {
    if (!currentUser()) {
      var page = window.location.pathname.split('/').pop() || 'index.html';
      window.location.href = 'login.html?return=' + encodeURIComponent(page);
    }
  }

  function updateNav() {
    var user = currentUser();
    var loginBtn = document.querySelector('a.btn-login');
    if (!loginBtn) return;
    if (user) {
      var first = user.name.split(' ')[0];
      loginBtn.textContent = first;
      loginBtn.href = 'dashboard.html';
      var logoutLink = document.createElement('a');
      logoutLink.href = '#';
      logoutLink.textContent = 'Logout';
      logoutLink.style.cssText = 'font-size:13px;font-weight:600;color:var(--muted);padding:8px 6px;align-self:center;';
      logoutLink.addEventListener('click', function (e) { e.preventDefault(); logout(); });
      loginBtn.parentNode.insertBefore(logoutLink, loginBtn.nextSibling);
    }
  }

  window.DP = { register: register, login: login, logout: logout, requireAuth: requireAuth, currentUser: currentUser, requestReset: requestReset, resetPassword: resetPassword };
  document.addEventListener('DOMContentLoaded', updateNav);
})();
