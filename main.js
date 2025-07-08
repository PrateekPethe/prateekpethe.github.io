// Text animation: Fade-in and bounce the name and subtitle
anime({
    targets: '.anim-text',
    opacity: [0, 1],
    translateY: [-50, 0],
    easing: 'easeOutExpo',
    duration: 1500
});

anime({
    targets: '.anim-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 2000,
    delay: 500
});

// Path animation for the navigation links (SVG-like animation)
anime({
    targets: '.anim-link',
    opacity: [0, 1],
    translateX: [-30, 0],
    easing: 'easeOutQuad',
    duration: 1000,
    delay: anime.stagger(200)
});

// Circles animation (they will move and resize)
anime({
    targets: '.circle-1',
    translateX: [0, 200], // Move from left to right
    scale: [1, 1.5], // Grow in size
    duration: 2000,
    easing: 'easeOutQuad',
    loop: true,
    direction: 'alternate'
});

anime({
    targets: '.circle-2',
    translateX: [0, -200], // Move from right to left
    scale: [1, 1.5], // Grow in size
    duration: 2500,
    easing: 'easeOutQuad',
    loop: true,
    direction: 'alternate'
});

// Section content fade-in with a delay
anime({
    targets: '.intro h2',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 800
});

anime({
    targets: '.intro p',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1400,
    easing: 'easeOutExpo',
    delay: 1000
});
