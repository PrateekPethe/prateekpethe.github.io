// Replace the entire file with:
class ParticleSystem {
    constructor() {
        this.canvas = document.querySelector('.particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationFrameId = null;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim();
        
        this.particles = [];
        
        for(let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: primaryColor
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Boundary checks
            if(particle.x > this.canvas.width) particle.x = 0;
            if(particle.x < 0) particle.x = this.canvas.width;
            if(particle.y > this.canvas.height) particle.y = 0;
            if(particle.y < 0) particle.y = this.canvas.height;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.size/5;
            this.ctx.fill();
        });

        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    destroy() {
        cancelAnimationFrame(this.animationFrameId);
    }
}

// Initialize particle system
let particleSystem = new ParticleSystem();

// Add this function
function refreshParticles() {
    particleSystem.destroy();
    particleSystem = new ParticleSystem();
}
