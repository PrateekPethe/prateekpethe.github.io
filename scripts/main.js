const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

function setTheme(isDark) {
    document.documentElement.classList.toggle('dark-mode', isDark);
    themeStyle.disabled = !isDark;
    // Update particle colors
    const particles = document.querySelector('.particles');
    if(particles) particles.style.display = 'none';
    setTimeout(() => particles.style.display = 'block', 10);
}

themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') === 'dark';
themeToggle.checked = savedTheme;
setTheme(savedTheme);

// Initialize Animate On Scroll
AOS.init({
    duration: 800,
    once: true,
    mirror: false
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Message sent successfully! 🎉');
});
