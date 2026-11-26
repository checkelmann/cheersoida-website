// CheersOida website — minimal interactions.
// Navigation, FAQ links, promo playback, and optional analytics.

(function () {
  'use strict';

  // Active-section nav highlight via IntersectionObserver.
  function initNavHighlight() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.nav__links a[href^="#"]')
    );
    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute('href').slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    var visible = new Map();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        var top = null;
        var topRatio = -1;
        visible.forEach(function (ratio, id) {
          if (ratio > topRatio) { topRatio = ratio; top = id; }
        });

        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('href') === '#' + top;
          link.classList.toggle('active', !!isActive);
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  // FAQ: when an item opens via URL fragment, scroll it into view under the sticky nav.
  function initFaqDeepLink() {
    if (!window.location.hash) return;
    var id = window.location.hash.slice(1);
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      el.setAttribute('open', '');
    }
  }

  function initPromo() {
    var video = document.querySelector('.hero__promo video');
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function play() {
      video.play().catch(function () {
        // Native controls remain available if the browser blocks autoplay.
      });
    }

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        observer.disconnect();
        if (video.paused) play();
      }
    }, { threshold: 0.25 });
    observer.observe(video);
  }

  function initAnalytics() {
    if (window.location.hostname !== 'cheersoida.app') return;

    var script = document.createElement('script');
    script.async = true;
    script.dataset.site = 'cheersoida.app';
    script.src = 'https://stats.cheersoida.app/count.js';
    document.head.appendChild(script);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavHighlight();
    initFaqDeepLink();
    initPromo();
    initAnalytics();
  });
})();
