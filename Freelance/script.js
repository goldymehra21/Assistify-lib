// ============================================
// GOLDY MEHRA — SPACE WEBSITE
// Main JavaScript
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // Mobile Navigation
  // -----------------------------
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }


  // -----------------------------
  // Scroll Reveal Animations
  // -----------------------------
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // -----------------------------
  // Animated Statistics
  // -----------------------------
  const statsSection = document.querySelector(".stats");
  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;

  function animateCounter(element) {
    const target = Number(element.dataset.count);
    let current = 0;

    const increment = Math.max(
      1,
      Math.ceil(target / 45)
    );

    const timer = setInterval(() => {

      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      element.textContent = current;

    }, 25);
  }

  if (statsSection && counters.length) {

    const statsObserver = new IntersectionObserver(
      entries => {

        if (
          entries[0].isIntersecting &&
          !countersStarted
        ) {

          countersStarted = true;

          counters.forEach(counter => {
            animateCounter(counter);
          });

          statsObserver.disconnect();
        }

      },
      {
        threshold: 0.4
      }
    );

    statsObserver.observe(statsSection);
  }


  // -----------------------------
  // Testimonials
  // -----------------------------

  const testimonials = [

    {
      quote:
        "Your testimonial will appear here. Replace this placeholder with a real client testimonial.",

      author:
        "Client Name",

      service:
        "Service"
    },

    {
      quote:
        "Add your second genuine client testimonial here.",

      author:
        "Client Name",

      service:
        "Service"
    },

    {
      quote:
        "Add your third genuine client testimonial here.",

      author:
        "Client Name",

      service:
        "Service"
    }

  ];


  const quoteElement =
    document.querySelector("#quote");

  const authorElement =
    document.querySelector("#author");

  const serviceElement =
    document.querySelector("#service");

  const testimonialButtons =
    document.querySelectorAll(".dots button");


  function showTestimonial(index) {

    const testimonial =
      testimonials[index];

    if (quoteElement) {
      quoteElement.textContent =
        testimonial.quote;
    }

    if (authorElement) {
      authorElement.textContent =
        testimonial.author;
    }

    if (serviceElement) {
      serviceElement.textContent =
        testimonial.service;
    }

    testimonialButtons.forEach(
      (button, buttonIndex) => {

        button.style.background =
          buttonIndex === index
            ? "#00ffe0"
            : "#315858";

      }
    );
  }


  testimonialButtons.forEach(
    (button, index) => {

      button.addEventListener(
        "click",
        () => {

          showTestimonial(index);

        }
      );

    }
  );


  // Automatic testimonial rotation

  let testimonialIndex = 0;

  if (testimonialButtons.length > 1) {

    setInterval(() => {

      testimonialIndex =
        (testimonialIndex + 1) %
        testimonials.length;

      showTestimonial(
        testimonialIndex
      );

    }, 5000);

  }


  // -----------------------------
  // Contact Form
  // -----------------------------

  const contactForm =
    document.querySelector("#contactForm");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const formData =
          new FormData(contactForm);


        const name =
          formData.get("name") || "";

        const email =
          formData.get("email") || "";

        const phone =
          formData.get("phone") || "";

        const service =
          formData.get("service") || "";

        const message =
          formData.get("message") || "";


        const subject =
          encodeURIComponent(
            `New service request from ${name}`
          );


        const body =
          encodeURIComponent(

`Hello Goldy,

I would like to request a service.

Name: ${name}

Email: ${email}

Phone / WhatsApp: ${phone}

Service: ${service}

Message:

${message}

Thank you.`
          );


        /*
          Change this email address
          if you want to use another email.
        */

        window.location.href =
          `mailto:contact@goldymehra.com?subject=${subject}&body=${body}`;

      }
    );

  }


  // -----------------------------
  // Active Navigation
  // -----------------------------

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav nav a"
    );


  function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;


      if (
        window.scrollY >=
        sectionTop - 180
      ) {

        currentSection =
          section.id;

      }

    });


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");


      link.classList.toggle(
        "active",
        href ===
          `#${currentSection}`
      );

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  // -----------------------------
  // Mouse Parallax
  // -----------------------------

  const hero =
    document.querySelector(".hero");

  const planet =
    document.querySelector(
      ".planet-large"
    );

  const satellite =
    document.querySelector(
      ".satellite"
    );

  const astronaut =
    document.querySelector(
      ".astronaut"
    );


  if (
    hero &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (event.clientX -
            rect.left) /
            rect.width -
          0.5;


        const y =
          (event.clientY -
            rect.top) /
            rect.height -
          0.5;


        if (planet) {

          planet.style.transform =
            `translate(
              ${x * 18}px,
              ${y * 18}px
            )`;

        }


        if (satellite) {

          satellite.style.transform =
            `translate(
              ${x * -25}px,
              ${y * -25}px
            )`;

        }


        if (astronaut) {

          astronaut.style.transform =
            `translate(
              ${x * 30}px,
              ${y * 30}px
            )`;

        }

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        if (planet) {
          planet.style.transform = "";
        }

        if (satellite) {
          satellite.style.transform = "";
        }

        if (astronaut) {
          astronaut.style.transform = "";
        }

      }
    );

  }


  // -----------------------------
  // Smooth Scrolling
  // -----------------------------

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({

              behavior: "smooth",

              block: "start"

            });

          }

        }
      );

    });


  // -----------------------------
  // Reduced Motion
  // -----------------------------

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (reducedMotion.matches) {

    document.documentElement.style
      .scrollBehavior = "auto";


    document
      .querySelectorAll("*")
      .forEach(element => {

        element.style.animationDuration =
          "0.01ms";

        element.style.animationIterationCount =
          "1";

        element.style.transitionDuration =
          "0.01ms";

      });

  }

});
