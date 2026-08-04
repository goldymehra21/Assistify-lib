const loader = document.querySelector('.loader');
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');
const faqItems = document.querySelectorAll('.faq-item');
const backToTop = document.querySelector('.back-to-top');
const testimonialCard = document.querySelector('.testimonial-card');
const testimonialNavs = document.querySelectorAll('.testimonial-nav');
const form = document.getElementById('contact-form');

const testimonials = [
  {
    quote: '“The process felt effortless and professional. My resume and LinkedIn profile finally reflected the value I bring.”',
    name: 'Riya S.',
    role: 'Job Seeker'
  },
  {
    quote: '“I needed a clean store setup and support with product listings. Everything was handled smoothly and clearly.”',
    name: 'Aman K.',
    role: 'Shop Owner'
  },
  {
    quote: '“Goldy helped me present my business professionally online without overwhelming me with technical details.”',
    name: 'Nisha P.',
    role: 'Small Business Owner'
  }
];

let testimonialIndex = 0;

window.addEventListener('load', () => {
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 400);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.matches('.reveal')) {
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.16 });

reveals.forEach((item) => observer.observe(item));

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  counterObserver.observe(heroStats);
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    faqItems.forEach((faq) => faq.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});

const renderTestimonial = () => {
  const item = testimonials[testimonialIndex];
  if (!testimonialCard) return;
  testimonialCard.innerHTML = `
    <p class="quote">${item.quote}</p>
    <div class="client">
      <strong>${item.name}</strong>
      <span>${item.role}</span>
    </div>
  `;
};

const changeTestimonial = (direction) => {
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  renderTestimonial();
};

testimonialNavs.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    changeTestimonial(direction);
  });
});

setInterval(() => changeTestimonial(1), 7000);
renderTestimonial();

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim() || 'Guest';
  const email = formData.get('email')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';
  const subject = encodeURIComponent(`New inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
  window.location.href = `mailto:hello@goldymehra.com?subject=${subject}&body=${body}`;
});
