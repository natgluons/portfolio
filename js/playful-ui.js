document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isExperiencePage = document.body.classList.contains('page-workexperience');

  document.querySelectorAll('.services-heading, .container, .timeline-item, .carousel-item').forEach((element) => {
    // On the Experience page the outer container also holds the page titles.
    // Revealing the whole container hides them until they are scrolled into
    // view, so leave the container visible. Timeline cards also stay static;
    // only their body text animates in.
    if (isExperiencePage && (element.matches('#workexperience > .container') || element.matches('.timeline-item'))) {
      return;
    }
    element.classList.add('reveal-ready');
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -32px' });
    document.querySelectorAll('.reveal-ready').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal-ready').forEach((element) => element.classList.add('is-revealed'));
  }

  // Experience page: a quick, subtle reveal for the timeline body text.
  const timelineTexts = isExperiencePage
    ? Array.from(document.querySelectorAll('#workexperience .timeline .expand-content'))
    : [];

  if (timelineTexts.length) {
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-text-revealed');
            textObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -24px' });
      timelineTexts.forEach((element) => {
        element.classList.add('text-reveal-ready');
        textObserver.observe(element);
      });
    } else {
      timelineTexts.forEach((element) => element.classList.add('is-text-revealed'));
    }
  }

    const mascot = document.querySelector('.mascot-companion');
    if (mascot) {
      const speech = mascot.querySelector('.mascot-speech');
      const speechText = mascot.querySelector('.mascot-speech__text') || speech;
      const speechClose = mascot.querySelector('.mascot-speech__close');
      const mascotImg = mascot.querySelector('img');
      const baseMascotSrc = mascotImg ? mascotImg.getAttribute('src') : '';
      const variationMascotSrc = 'assets/design/mascot_nobg_variation.png';
      const funFacts = [
        "I once worked with NASA-affiliated researchers to figure out how Mars got its moons.",
        "I spent part of my master's degree simulating how asteroids would break.",
        "I love writing stories, playing games, and lifting weights.",
        "I think games are one of the coolest ways to tell a story.",
        "I got a fully funded LPDP scholarship to study at Imperial College London.",
        "I studied how fraudsters connect with each other using graphs.",
        "I won a Best Paper award for research on AI and fraud detection.",
        "I once made it to the semifinals of an AI hackathon hosted by Bank Indonesia.",
        "I made a little capybara pet game because, well, capybaras.",
        "I think more websites should feel like games.",
        "I have a habit of turning random shower thoughts into coding projects.",
        "I have a soft spot for tiny, round, ridiculously cute game characters.",
        "I love trying new tools and seeing what weird things I can make.",
        "I think even serious technology can be a little silly.",
        "I love making complicated things feel simple.",
        "I think the best projects start with 'what if we tried...?'",
        "I love creating little worlds, whether through code, games, or stories.",
        "I believe a little curiosity can take you to some pretty unexpected places.",
        "I've worked with satellite data to learn more about Earth's climate and atmosphere.",
        "I once wrote a research paper on economics and finance, and made both to the Top 10 finalists.",
        "I love games filled with adorable animals and strange little creatures like Palworld and Aniimo.",
        "I love exploring mysterious worlds full of creatures like in Subnautica.",
        "I think crows are ridiculously cute. They're basically silly flying furballs.",
        "If a game lets me befriend, collect, or take care of cute creatures, I'm probably going to play it."
      ];

    let messageQueue = [];
    let previousMessage = '';

    const refillQueue = () => {
      messageQueue = [...funFacts];
      for (let index = messageQueue.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [messageQueue[index], messageQueue[randomIndex]] = [messageQueue[randomIndex], messageQueue[index]];
      }
      if (messageQueue[messageQueue.length - 1] === previousMessage && messageQueue.length > 1) {
        [messageQueue[0], messageQueue[messageQueue.length - 1]] = [messageQueue[messageQueue.length - 1], messageQueue[0]];
      }
    };

    const greet = () => {
      if (!messageQueue.length) refillQueue();
      const nextMessage = messageQueue.pop();
      speechText.textContent = nextMessage;
      previousMessage = nextMessage;
      // Occasionally swap to the alternate mascot art, but not on every click.
      if (mascotImg && baseMascotSrc) {
        const showVariation = Math.random() < 0.3;
        mascotImg.src = showVariation ? variationMascotSrc : baseMascotSrc;
      }
      // Reopen a dismissed bubble when the mascot is greeted again.
      mascot.classList.remove('is-dismissed');
      mascot.classList.remove('is-talking');
      void mascot.offsetWidth;
      mascot.classList.add('is-talking');
    };

    const dismissSpeech = () => {
      mascot.classList.add('is-dismissed');
      mascot.classList.remove('is-talking');
    };

    if (speechClose) {
      speechClose.addEventListener('click', (event) => {
        event.stopPropagation();
        dismissSpeech();
      });
      speechClose.addEventListener('keydown', (event) => {
        // Keep Enter/Space from re-triggering the mascot greeting.
        event.stopPropagation();
      });
    }

    const scheduleMascotVariation = () => {
      const delay = 4000 + Math.random() * 16000;
      window.setTimeout(() => {
        if (mascotImg && baseMascotSrc) {
          mascotImg.src = variationMascotSrc;
          window.setTimeout(() => {
            mascotImg.src = baseMascotSrc;
            scheduleMascotVariation();
          }, 1000);
        } else {
          scheduleMascotVariation();
        }
      }, delay);
    };
    scheduleMascotVariation();

    mascot.addEventListener('click', greet);
    mascot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        greet();
      }
    });

    if (!reduceMotion) {
      window.addEventListener('pointermove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        mascot.style.setProperty('--mascot-x', `${x}px`);
        mascot.style.setProperty('--mascot-y', `${y}px`);
      }, { passive: true });
    }
  }

  document.querySelectorAll('.carousel-item').forEach((item, index) => {
    item.style.setProperty('--card-accent-index', index % 4);
    const heading = item.querySelector('h3');
    if (heading && !heading.querySelector('.project-number')) {
      const badge = document.createElement('span');
      badge.className = 'project-number';
      badge.textContent = `QUEST ${String(index + 1).padStart(2, '0')}`;
      heading.before(badge);
    }
  });

});
