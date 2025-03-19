// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      themeStyle.removeAttribute('disabled');
    } else {
      themeStyle.setAttribute('disabled', 'true');
    }
  });
}

// Initialize AOS
AOS.init();

// Smooth Scroll Navigation
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionId = item.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Initialize Particles.js (if configured properly)
window.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'scripts/particles.json', function() {
      console.log('Particles.js config loaded');
    });
  }
});
