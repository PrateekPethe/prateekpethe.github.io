// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Scroll handler for navbar background
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Smooth scrolling utility function
    function smoothScrollTo(targetElement, offset = 70) {
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                console.log('Navigation clicked:', targetId);
                smoothScrollTo(targetSection);
            });
        });
        
        // Handle hero section buttons
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Check if it's a section link (not email)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    console.log('Hero button clicked:', href);
                    smoothScrollTo(targetSection);
                }
                // Email links will work normally
            });
        });
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100; // Offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add fade-in class to elements and observe them
        const animatedElements = document.querySelectorAll('.section-header, .about-content, .experience-item, .project-card, .skills-category, .contact-content');
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Enhanced hover effects for project cards
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Enhanced button hover effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Mobile menu toggle functionality
    function initMobileMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                console.log('Mobile menu toggled');
            });
        }
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-teal-300));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Add click effects to skill tags
    function initSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Debounce function for performance
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Initialize all functionality
    function init() {
        initSmoothScrolling();
        initScrollAnimations();
        initMobileMenu();
        initProjectCardEffects();
        initButtonEffects();
        initSkillTagEffects();
        initScrollProgress();
        
        // Add debounced scroll listeners
        const debouncedNavbarScroll = debounce(handleNavbarScroll, 10);
        const debouncedActiveNavLink = debounce(updateActiveNavLink, 100);
        
        window.addEventListener('scroll', debouncedNavbarScroll);
        window.addEventListener('scroll', debouncedActiveNavLink);
        
        // Initial calls
        handleNavbarScroll();
        updateActiveNavLink();
        
        console.log('Portfolio website initialized successfully!');
    }
    
    // Error handling for missing elements
    function safeInit() {
        try {
            init();
            console.log('All portfolio features loaded successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
    
    // Start everything
    safeInit();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '👋 Come back! - Prateek Nikhil Pethe';
        } else {
            document.title = 'Prateek Nikhil Pethe - Market Research Analyst';
        }
    });
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
    });
});

// Global utility functions
window.portfolioUtils = {
    // Smooth scroll to element
    scrollToElement: function(elementId, offset = 70) {
        const element = document.querySelector(elementId);
        if (element) {
            const offsetTop = element.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Copy text to clipboard
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Text copied to clipboard');
            });
        }
    }
};