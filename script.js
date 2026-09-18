// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal for sections
const revealTargets = document.querySelectorAll(
  '.about-figure, .about-copy, .transmissions h2, .transmissions .section-intro, .tuner, .listen h2, .listen .section-intro, .platform-row, .just-released h2, .release-grid'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
}

// Subtle needle nudge on track hover — ties the tracklist back to the dial motif
const dialNeedle = document.querySelector('.dial-needle');
const presets = document.querySelectorAll('.preset');

if (dialNeedle && !prefersReducedMotion) {
  presets.forEach(preset => {
    preset.addEventListener('mouseenter', () => {
      const freqText = preset.querySelector('.preset-freq').textContent;
      const freq = parseFloat(freqText);
      const pct = ((freq - 88) / (108 - 88)) * 100;
      dialNeedle.style.transition = 'left .6s cubic-bezier(.2,.9,.2,1)';
      dialNeedle.style.left = `${Math.max(2, Math.min(98, pct))}%`;
    });
  });
}
