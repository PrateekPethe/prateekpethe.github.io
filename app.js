// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Hero Section Animations
  const heroTl = gsap.timeline();
  
  heroTl.to(".pre-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(".hero-title .word", { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.5")
        .to(".hero-subtitle", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")
        .to(".hero-desc", { opacity: 1, duration: 1 }, "-=0.5")
        .to(".contact-links", { opacity: 1, duration: 1 }, "-=0.5")
        .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");

  // Parallax the hero content on scroll
  gsap.to(".hero-content", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // 2. About Section - Text Reveal
  const aboutTexts = gsap.utils.toArray(".reveal-text");
  aboutTexts.forEach(text => {
    gsap.from(text, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1
      }
    });
  });

  gsap.from(".stat-box", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".about-stats",
      start: "top 85%"
    }
  });

  // 3. Experience Section - Horizontal Scroll
  // Only apply horizontal scroll on desktop
  let mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    const expWrapper = document.querySelector(".exp-cards-wrapper");
    
    // Calculate total scroll distance
    const getScrollAmount = () => -(expWrapper.scrollWidth - window.innerWidth + 100);

    gsap.to(expWrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: ".experience",
        start: "top top",
        end: () => `+=${expWrapper.scrollWidth}`,
        pin: true,
        animation: gsap.to(expWrapper, {x: getScrollAmount}),
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  });

  mm.add("(max-width: 768px)", () => {
    gsap.from(".exp-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".exp-cards-wrapper",
        start: "top 80%"
      }
    });
  });

  // 4. Projects Multi-Flavor Section
  // Pin panels on top of each other and change background color
  const panels = gsap.utils.toArray(".project-panel");
  const body = document.querySelector("body");

  panels.forEach((panel, i) => {
    // Background color transition
    ScrollTrigger.create({
      trigger: panel,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => gsap.to(body, { backgroundColor: panel.dataset.color, duration: 0.5 }),
      onEnterBack: () => gsap.to(body, { backgroundColor: panel.dataset.color, duration: 0.5 })
    });

    // Mockup parallax
    gsap.from(panel.querySelector(".mockup"), {
      y: 100,
      opacity: 0,
      rotation: 15,
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
        end: "top 30%",
        scrub: 1
      }
    });
  });

  // Reset background color when leaving projects
  ScrollTrigger.create({
    trigger: ".skills",
    start: "top 50%",
    onEnter: () => gsap.to(body, { backgroundColor: "#0a0a0c", duration: 0.5 }),
    onEnterBack: () => gsap.to(body, { backgroundColor: panels[panels.length-1].dataset.color, duration: 0.5 })
  });

  // 5. Skills Section - SVG Assembly Draw
  const circles = document.querySelectorAll(".circle");
  
  circles.forEach(circle => {
    const dashArray = circle.getAttribute("stroke-dasharray");
    const percentage = dashArray.split(",")[0];
    
    // Start empty
    gsap.set(circle, { strokeDasharray: "0, 100" });
    
    // Animate to full percentage based on scroll
    gsap.to(circle, {
      strokeDasharray: `${percentage}, 100`,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills",
        start: "top 60%"
      }
    });
  });
  
  gsap.from(".skill-chart h3", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".skills",
      start: "top 60%"
    }
  });

  // Dynamic Canvas Gradient (Background subtle movement)
  const canvas = document.getElementById("gradient-canvas");
  const ctx = canvas.getContext("2d");
  
  let time = 0;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resize);
  resize();
  
  function drawGradient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create subtle moving circles for background mesh
    for(let i=0; i<3; i++) {
      const x = (Math.sin(time * 0.001 + i) * 0.3 + 0.5) * canvas.width;
      const y = (Math.cos(time * 0.0015 + i) * 0.3 + 0.5) * canvas.height;
      const radius = canvas.width * 0.8;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(0, 240, 255, ${0.05 + (i * 0.02)})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    time += 16;
    requestAnimationFrame(drawGradient);
  }
  
  drawGradient();
});
