// Add simple animations with Anime.js
anime({
    targets: 'header h1',
    translateX: 250,
    easing: 'easeInOutQuad',
    duration: 2000
});

anime({
    targets: 'section h2',
    opacity: [0, 1],
    translateY: [50, 0],
    easing: 'easeOutExpo',
    duration: 1500
});
