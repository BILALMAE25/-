(function () {
  'use strict';

  // ===== نافذة "التطبيق سوف يتوفر قريباً" =====
  var modal = document.getElementById('modal');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modalOk').focus();
  }
  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.js-download').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOk').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /*
    عند جاهزية التطبيق:
    1) ضع ملف الـ APK داخل مجلد المشروع، مثلاً: tatbiqi.apk
    2) استبدل دالة openModal في الأزرار بهذا الكود:
       var a = document.createElement('a');
       a.href = 'tatbiqi.apk'; a.download = 'tatbiqi.apk';
       document.body.appendChild(a); a.click(); a.remove();
  */

  // ===== قائمة الجوال =====
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });

  // ===== تمييز الرابط النشط أثناء التمرير =====
  var sections = ['home', 'features', 'install', 'faq'].map(function (id) { return document.getElementById(id); });
  var navAs = links.querySelectorAll('a');
  function onScroll() {
    var y = window.scrollY + 140, current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    navAs.forEach(function (a, i) { a.classList.toggle('active', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== ظهور العناصر تدريجياً =====
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
