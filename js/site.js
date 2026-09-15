/*
  CIMA Lab website - site.js
  Progressive enhancement only. The site is fully usable without it.
  - Mobile navigation toggle
  - Current-page marking in the navbar
  - Reveal-on-scroll (respects prefers-reduced-motion)
  - Contact form: client-side validation, fetch POST to the configured
    endpoint, and a mailto fallback when no endpoint is configured.
*/
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Mark current page in nav (fallback when the page did not set aria-current) ---- */
  if (nav && !nav.querySelector('[aria-current="page"]')) {
    var here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    nav.querySelectorAll('a[href]').forEach(function (a) {
      var target = a.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
      if (target && here.indexOf(target) === 0 && target.length > 0) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---- Reveal on scroll ---- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-reveal]');
  if (els.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      els.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
        io.observe(el);
      });
    }
  }

  /* ---- Contact form ---- */
  var form = document.querySelector('form[data-contact]');
  if (form) {
    var endpoint = form.getAttribute('data-endpoint') || '';
    var mailto = form.getAttribute('data-mailto') || '';
    var status = form.querySelector('.form-status');

    function setStatus(kind, msg) {
      if (!status) return;
      status.className = 'form-status ' + kind;
      status.textContent = msg;
      status.setAttribute('role', kind === 'err' ? 'alert' : 'status');
    }
    function validate() {
      var ok = true;
      form.querySelectorAll('.field').forEach(function (f) {
        var input = f.querySelector('input, textarea, select');
        if (!input) return;
        var valid = input.checkValidity();
        f.classList.toggle('invalid', !valid);
        input.setAttribute('aria-invalid', valid ? 'false' : 'true');
        if (!valid && ok) { input.focus(); ok = false; }
      });
      return ok;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { setStatus('err', 'Please complete the highlighted fields.'); return; }
      var data = new FormData(form);
      if (data.get('_gotcha')) return; // honeypot
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending...'; }

      function done(ok, msg) {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
        setStatus(ok ? 'ok' : 'err', msg);
        if (ok) form.reset();
      }

      if (endpoint) {
        fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json ? r.json().catch(function () { return {}; }) : {}; })
          .then(function () { done(true, 'Thank you. Your message has been sent to the lab. We reply within a few working days.'); })
          .catch(function () { done(false, 'Sending failed. Please email us directly at ' + (mailto || 'the address listed on this page') + '.'); });
      } else if (mailto) {
        var subject = encodeURIComponent('[CIMA Lab] ' + (data.get('topic') || 'Enquiry') + ' - ' + (data.get('name') || ''));
        var body = '';
        data.forEach(function (v, k) { if (k.charAt(0) !== '_') body += k + ': ' + v + '\n'; });
        window.location.href = 'mailto:' + mailto + '?subject=' + subject + '&body=' + encodeURIComponent(body);
        done(true, 'Your email client should now open with the message prefilled. If it did not, write to ' + mailto + '.');
      } else {
        done(false, 'The contact form is not configured yet. Please use the email addresses on this page.');
      }
    });
    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f && f.classList.contains('invalid') && input.checkValidity()) { f.classList.remove('invalid'); input.setAttribute('aria-invalid', 'false'); }
      });
    });
  }
})();
