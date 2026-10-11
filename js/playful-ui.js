document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.services-heading, .container, .timeline-item, .carousel-item').forEach((element) => {
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
    }, { threshold: 0.08, rootMargin: '0px 0px -48px' });
    document.querySelectorAll('.reveal-ready').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal-ready').forEach((element) => element.classList.add('is-revealed'));
  }

  const mascot = document.querySelector('.mascot-companion');
  if (mascot) {
    const speech = mascot.querySelector('.mascot-speech');
    const speechText = mascot.querySelector('.mascot-speech__text') || speech;
    const speechClose = mascot.querySelector('.mascot-speech__close');
    const messages = [
      'I love writing, gaming, and weightlifting.',
      'I’m equally happy debugging code or getting lost in a good game.',
      'I have an MSc in Computational Science from Imperial College London.',
      'I received the fully funded LPDP Scholarship.',
      'I’ve worked on fintech ML, fraud detection, and cloud-native pipelines.',
      'I build predictive systems, RAG apps, and geospatial intelligence tools.',
      'I researched Martian moon formation with Imperial ESE and NASA Ames affiliates.',
      'I developed predictive models for asteroid-disruption simulations.',
      'I developed five practical ML projects for Telkomsel.',
      'I modeled data from more than 900 weather stations.',
      'I co-authored a paper on the Indonesian Monsoon Index using statistics and ML.',
      'I co-authored a paper on fraud syndicates using graph and transaction analysis.',
      'I co-authored a paper on Madden-Julian Oscillation patterns in Indonesia.',
      'I won Best Paper: AI & Tech at the ACFE Call for Papers 2024.',
      'I was an AI Hackathon semifinalist at Bank Indonesia FEKDI 2024.',
      'I won a Top 10 award in a physics scientific paper competition.',
      'I won a Top 10 award in an economic finance scientific paper competition.',
      'I’ve applied machine learning to satellite climate and atmospheric data.',
      'I enjoy building playful side projects, including a capybara pet game.',
      'I’m based in Jakarta and open to relocating worldwide.',
      'I love turning random ideas into little coding projects.',
      'I have a soft spot for cute game characters and playful UI designs.',
      'I enjoy experimenting with new AI tools just to see what I can build.',
      'I believe even serious projects deserve a little personality.',
      'I enjoy making complicated things feel simple and approachable.'
    ];
    let messageQueue = [];
    let previousMessage = '';

    const refillQueue = () => {
      messageQueue = [...messages];
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

  document.querySelectorAll('.main-nav').forEach((nav) => {
    const brand = document.createElement('a');
    brand.className = 'pixel-brand';
    brand.href = 'index.html';
    brand.setAttribute('aria-label', 'Natasha home');
    brand.innerHTML = '<span aria-hidden="true">✦</span> NAT.EXE';
    nav.prepend(brand);
  });
});
