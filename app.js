// GSAP Core is loaded in HTML

// --- CLOCK ---
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// --- TERMINAL TYPEWRITER ---
const terminalText = [
  "Initializing Evalueserve Data Environment...",
  "[OK] Connection established to remote clusters.",
  "Fetching Analyst profile for: P. Pethe...",
  "> Analyzing competitive landscapes across APAC/EMEA.",
  "> Mapping attack surfaces and cybersecurity intelligence.",
  "> Running Python predictive models for fraud anomaly detection.",
  "> Building Power BI dashboards for executive client presentations.",
  "> Generating Go-to-Market strategies and pricing estimates.",
  "[STATUS] All systems operational. Data pipeline stable.",
  "Awaiting user input..."
];

const terminalOutput = document.getElementById("terminal-output");
let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (lineIndex < terminalText.length) {
    if (charIndex === 0) {
      terminalOutput.innerHTML += "<div></div>";
    }
    
    const currentLine = terminalText[lineIndex];
    const lines = terminalOutput.querySelectorAll("div");
    const lastLine = lines[lines.length - 1];

    if (charIndex < currentLine.length) {
      lastLine.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, Math.random() * 30 + 10);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeWriter, 400);
    }
  }
}

// Start typing shortly after load
setTimeout(typeWriter, 1000);


// --- INTERACTIVE CANVAS SKILL CONSTELLATION ---
const canvas = document.getElementById('skills-canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('canvas-container');

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 100 };

const skills = ["Python", "SQL", "Power BI", "Pandas", "Scikit-Learn", "SEMrush", "Excel", "Data Viz", "ML"];

function resizeCanvas() {
  width = container.clientWidth;
  height = container.clientHeight;
  canvas.width = width;
  canvas.height = height;
}

class Particle {
  constructor(text) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
    this.text = text;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff';
    ctx.fill();
    
    if(this.text) {
      ctx.font = '12px Space Grotesk';
      ctx.fillStyle = '#aaa';
      ctx.fillText(this.text, this.x + 8, this.y + 4);
    }
  }
  
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function initCanvas() {
  resizeCanvas();
  particles = [];
  // Main skill nodes
  for (let i = 0; i < skills.length; i++) {
    particles.push(new Particle(skills[i]));
  }
  // Filler star nodes
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(""));
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateCanvas);
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
      if (distance < (width/4) * (height/4)) {
        let opacityValue = 1 - (distance / 10000);
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacityValue + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize', initCanvas);
canvas.addEventListener('mousemove', (e) => {
  let rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Delay init slightly to ensure layout is done
setTimeout(() => {
  initCanvas();
  animateCanvas();
}, 500);


// --- GSAP MODAL EXPANSION ---
const tiles = document.querySelectorAll('.bento-tile');
const overlayContainer = document.getElementById('fullscreen-container');
const overlayBg = document.querySelector('.fullscreen-bg');
const overlayContent = document.getElementById('fullscreen-content');
const detailWrapper = document.getElementById('detail-wrapper');
const closeBtn = document.getElementById('close-btn');

let activeTile = null;

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    if(activeTile) return;
    activeTile = tile;

    const flipId = tile.dataset.flipId;
    const template = document.getElementById('tpl-' + flipId);
    
    // 1. Inject content
    detailWrapper.innerHTML = template.innerHTML;

    // 2. Prep Overlay
    overlayContainer.classList.add('active');
    
    // 3. Reset states for animation
    gsap.set(overlayContent, { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(detailWrapper, { opacity: 0, y: 20 });
    gsap.set(closeBtn, { opacity: 0, scale: 0.5 });

    // 4. Animate Background & Modal
    gsap.to(overlayBg, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayContent, { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.5, 
      ease: "power3.out",
      onComplete: () => {
        // Fade in details
        gsap.to(detailWrapper, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(closeBtn, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
      }
    });
  });
});

closeBtn.addEventListener('click', () => {
  if(!activeTile) return;

  // Animate out
  gsap.to([detailWrapper, closeBtn], { opacity: 0, duration: 0.2 });
  
  gsap.to(overlayContent, { 
    opacity: 0, 
    y: 20, 
    scale: 0.95, 
    duration: 0.3, 
    ease: "power2.in" 
  });
  
  gsap.to(overlayBg, { 
    opacity: 0, 
    duration: 0.4, 
    ease: "power2.inOut",
    onComplete: () => {
      overlayContainer.classList.remove('active');
      activeTile = null;
      detailWrapper.innerHTML = "";
    }
  });
});
