// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');

navToggle.addEventListener('click', function () {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile nav automatically after a link is tapped
nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== Shelf filter (show/hide books by status) =====
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.book-card');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    // Reset all tabs, then mark this one as active
    tabs.forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
    tab.setAttribute('aria-pressed', 'true');

    const filter = tab.getAttribute('data-filter');

    cards.forEach(function (card) {
      const matches = filter === 'all' || card.getAttribute('data-status') === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
});

// ===== "Now reading" progress ring =====
const ring = document.getElementById('ringValue');
const label = document.getElementById('ringLabel');

const radius = 40;
const circumference = 2 * Math.PI * radius; // full ring length (~251.2)

const currentPage = 210;
const totalPages = 528;
const percentDone = currentPage / totalPages;

const offset = circumference - (percentDone * circumference);

// requestAnimationFrame lets the ring animate in smoothly on page load
requestAnimationFrame(function () {
  ring.style.strokeDashoffset = offset;
  label.textContent = Math.round(percentDone * 100) + '%';
});
