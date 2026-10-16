'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
document.getElementById('year').textContent = new Date().getFullYear();
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  }, { passive: true });
} else {
  glow.style.display = 'none';
}
const canvas = document.getElementById('particles');
const context = canvas.getContext('2d');
if (context && !reducedMotion) {
  let width = 0;
  let height = 0;
  let particles = [];
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(75, Math.floor(width * height / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.35,
      speed: Math.random() * 0.24 + 0.08,
      opacity: Math.random() * 0.4 + 0.12
    }));
  };
  window.addEventListener('resize', resize, { passive: true });
  resize();
  const animate = () => {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.y -= p.speed;
      if (p.y < -3) { p.y = height + 3; p.x = Math.random() * width; }
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(174, 161, 255, ${p.opacity})`;
      context.fill();
    }
    requestAnimationFrame(animate);
  };
  animate();
}
