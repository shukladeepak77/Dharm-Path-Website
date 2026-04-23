(function () {
  'use strict';

  var USERS_KEY   = 'dp_users';
  var SESSION_KEY = 'dp_session';

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

  function register(name, phone, email, password) {
    if (!name || !email || !password) return { ok: false, error: 'Please fill all required fields.' };
    var users = getUsers();
    if (users.some(function (u) { return u.email === email.toLowerCase(); })) {
      return { ok: false, error: 'An account with this email already exists. Please log in.' };
    }
    users.push({ name: name.trim(), phone: phone.trim(), email: email.toLowerCase(), password: password });
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

  function logout() {
    clearSession();
    window.location.href = 'login.html';
  }

  function requireAuth() {
    if (!currentUser()) { window.location.href = 'login.html'; }
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

  window.DP = { register: register, login: login, logout: logout, requireAuth: requireAuth, currentUser: currentUser };
  document.addEventListener('DOMContentLoaded', updateNav);
})();
