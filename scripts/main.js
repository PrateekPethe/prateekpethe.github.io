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
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    refreshParticles(); // Add this line
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
    
    const formData = new FormData(e.target);
    
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        alert('Message sent successfully! 🎉');
        e.target.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
        console.error(error);
    });
});

const formElements = document.querySelectorAll('input, textarea');

formElements.forEach(element => {
    element.addEventListener('focus', () => {
        document.querySelector('.floating-nav').style.display = 'none';
    });
    
    element.addEventListener('blur', () => {
        document.querySelector('.floating-nav').style.display = 'flex';
    });
});
