// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

themeToggle.addEventListener('change', () => {
    if(themeToggle.checked) {
        themeStyle.removeAttribute('disabled');
        document.documentElement.classList.add('dark-mode');
    } else {
        themeStyle.setAttribute('disabled', 'true');
        document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

// Set initial theme
const savedTheme = localStorage.getItem('theme') || 'light';
if(savedTheme === 'dark') {
    themeToggle.checked = true;
    themeStyle.removeAttribute('disabled');
    document.documentElement.classList.add('dark-mode');
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
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
