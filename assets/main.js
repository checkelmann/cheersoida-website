// CheersOida website — minimal interactions.
// Two responsibilities: FAQ accordion + active-section nav highlight.
// Both are progressive enhancement; site works without JS.

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

  document.addEventListener('DOMContentLoaded', function () {
    initNavHighlight();
    initFaqDeepLink();
  });
})();
