/**
 * main.js
 * Global JavaScript for Air Conditioning Sales & Service
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggles = document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn');

  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // --- RTL Toggle Logic ---
  const rtlToggles = document.querySelectorAll('#rtl-toggle-btn, .rtl-toggle-btn');

  const currentDir = localStorage.getItem('dir') || 'ltr';
  if (currentDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  rtlToggles.forEach(rtlToggle => {
    rtlToggle.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const newDir = isRtl ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // --- Sticky Navbar ---
  const navbar = document.querySelector('.navbar-floating');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' ?
          'rgba(20, 44, 53, 0.98)' : 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.classList.remove('shadow-md');
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' ?
          'rgba(20, 44, 53, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      }
    });
  }

  // --- Mobile Menu ---
  // Note: Bootstrap handles the collapse natively via data-bs-toggle="collapse", 
  // so no manual JS class toggling is needed here as it creates bugs.

  // --- Scroll to Top Logic ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- Active Nav Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      // Highlight parent dropdown if inside one
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });
});
