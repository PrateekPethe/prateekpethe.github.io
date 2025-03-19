// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

function setTheme(isDark) {
    document.documentElement.classList.toggle('dark-mode', isDark);
    themeStyle.disabled = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked);
    // Refresh particle colors
    const particles = document.querySelector('.particles');
    particles.style.display = 'none';
    setTimeout(() => particles.style.display = 'block', 10);
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') === 'dark';
themeToggle.checked = savedTheme;
setTheme(savedTheme);

// Animate On Scroll
AOS.init({
    duration: 800,
    once: false,
    mirror: true
});

// Smooth Scroll
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.getElementById(this.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    alert('Message sent successfully! 🎉');
});
