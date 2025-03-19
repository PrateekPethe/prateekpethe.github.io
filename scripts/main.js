// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
themeToggle.addEventListener('change', () => {
  themeStyle.disabled = !themeToggle.checked;
});

// AOS Init
AOS.init();

// Smooth Scroll Nav
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.section);
    target && target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Particles.js Init
particlesJS.load('particles-js', 'scripts/particles.json', () => {
  console.log('Particles loaded');
});
