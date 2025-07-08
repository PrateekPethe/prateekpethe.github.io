// Fade-in animation for the header title and subtitle
anime({
    targets: '.fade-in',
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeInOutExpo',
    delay: anime.stagger(300) // Staggered delay for elements
});

// Slide-in animation for navigation links
anime({
    targets: '.slide-in',
    translateX: [-20, 0],  // Start from left, move to the normal position
    opacity: [0, 1],
    duration: 1500,
    easing: 'easeOutExpo',
    delay: anime.stagger(200) // Delay for each link
});

// Fade-in animation for sections when scrolling into view
anime({
    targets: '.intro h2',
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 500
});

anime({
    targets: '.intro p',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 800
});
