document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const ticker = document.querySelector('.ticker');
  const tickerH = ticker ? ticker.offsetHeight : 0;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > tickerH + 20);
  }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const spans = navToggle.querySelectorAll('span');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    spans[0].style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
    spans[1].style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    spans[0].style.transform = ''; spans[1].style.transform = '';
  }));

  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => obs.observe(el));

  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 + i * 120));
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return; e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 10, behavior: 'smooth' });
    });
  });

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Submitting…'; btn.disabled = true;
      setTimeout(() => { form.style.opacity = '0'; form.style.transition = 'opacity 0.4s'; setTimeout(() => { form.style.display = 'none'; success.classList.add('visible'); }, 400); }, 800);
    });
  }
});
