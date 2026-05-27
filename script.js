const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navMore = document.querySelector('.nav-more');
const navMoreTrigger = document.querySelector('.nav-more-trigger');
const appMain = document.querySelector('#app-main');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.01 }
);

const applyReveal = (root = document) => {
  const revealItems = root.querySelectorAll('section, .card, .blog-card, .timeline-item');
  revealItems.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
};

const closeNav = () => {
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

const setMoreOpen = (isOpen) => {
  if (!navMoreTrigger) return;
  navMoreTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
};

const renderRoute = () => {
  if (!appMain) return;
  const route = window.location.hash.replace('#', '') || 'home';
  const tpl = document.querySelector(`#tpl-${route}`) || document.querySelector('#tpl-home');
  if (!tpl) return;
  appMain.innerHTML = '';
  appMain.appendChild(tpl.content.cloneNode(true));
  applyReveal(appMain);
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

if (navMore) {
  navMore.addEventListener('mouseenter', () => setMoreOpen(true));
  navMore.addEventListener('mouseleave', () => setMoreOpen(false));
  navMore.addEventListener('focusin', () => setMoreOpen(true));
  navMore.addEventListener('focusout', (event) => {
    if (!navMore.contains(event.relatedTarget)) {
      setMoreOpen(false);
    }
  });
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route]');
  if (!link) return;
  if (link.hash === window.location.hash) {
    renderRoute();
  }
  closeNav();
  setMoreOpen(false);
});

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});
