document.addEventListener('DOMContentLoaded', () => {
  // Views
  const heroView = document.getElementById('heroView');
  const questionView = document.getElementById('questionView');
  const readyView = document.getElementById('readyView');

  // Navigation & buttons
  const getStartedBtn = document.getElementById('getStartedBtn');
  const backToHero = document.getElementById('backToHero');
  const backToQuestion = document.getElementById('backToQuestion');
  const navHome = document.getElementById('navHome');
  const continueBtn = document.getElementById('continueBtn');
  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');

  // Interactive elements
  const traitCards = document.querySelectorAll('.trait-card');
  const particleField = document.getElementById('particles');
  const celebrationCanvas = document.getElementById('celebrationCanvas');

  // About Modal
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutBtn = document.getElementById('closeAboutBtn');

  // Track multi-selected traits
  const selectedTraits = new Set();

  // 1. Ambient background particles generator
  createParticles(22);

  function createParticles(count) {
    if (!particleField) return;
    particleField.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      
      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 10;
      const delay = Math.random() * 8;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${left}%`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;

      particleField.appendChild(p);
    }
  }

  // 2. Idle flower floating after initial bloom
  setTimeout(() => {
    if (heroView) heroView.classList.add('bloomed');
  }, 3200);

  // 3. Screen switcher helper
  function switchView(fromView, toView) {
    if (fromView) fromView.classList.add('hidden');
    if (toView) toView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => switchView(heroView, questionView));
  }

  if (backToHero) {
    backToHero.addEventListener('click', () => switchView(questionView, heroView));
  }

  if (backToQuestion) {
    backToQuestion.addEventListener('click', () => switchView(readyView, questionView));
  }

  if (navHome) {
    navHome.addEventListener('click', () => {
      [questionView, readyView].forEach(v => {
        if (v) v.classList.add('hidden');
      });
      if (heroView) heroView.classList.remove('hidden');
    });
  }

  // 4. Multi-Select Trait Logic
  traitCards.forEach(card => {
    card.addEventListener('click', () => {
      const trait = card.getAttribute('data-trait');

      if (selectedTraits.has(trait)) {
        selectedTraits.delete(trait);
        card.classList.remove('selected');
      } else {
        selectedTraits.add(trait);
        card.classList.add('selected');
      }

      if (continueBtn) {
        continueBtn.disabled = selectedTraits.size === 0;
      }
    });
  });

  // 5. Navigate to "Yay! your space is ready for you" + Fire Celebration Confetti
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (selectedTraits.size === 0) return;
      switchView(questionView, readyView);
      launchCelebrationConfetti();
    });
  }

  // 6. Confetti Cannon Function
  function launchCelebrationConfetti() {
    if (!celebrationCanvas) return;
    const ctx = celebrationCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    celebrationCanvas.width = celebrationCanvas.offsetWidth * dpr;
    celebrationCanvas.height = celebrationCanvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#f5c46b', '#ffd180', '#e5a5c7', '#cba6be', '#ffffff', '#faebf4'];
    const confettiCount = 55;
    const confettis = [];

    const originX = celebrationCanvas.offsetWidth / 2;
    const originY = 85; // Center of the badge

    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      confettis.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.14,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008
      });
    }

    function render() {
      ctx.clearRect(0, 0, celebrationCanvas.offsetWidth, celebrationCanvas.offsetHeight);
      let alive = false;

      confettis.forEach(c => {
        if (c.alpha > 0) {
          alive = true;
          c.x += c.vx;
          c.y += c.vy;
          c.vy += c.gravity;
          c.vx *= 0.98;
          c.rotation += c.rotationSpeed;
          c.alpha -= c.decay;

          ctx.save();
          ctx.globalAlpha = Math.max(0, c.alpha);
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(render);
      }
    }

    render();
  }

  // 7. Auth button demos
  if (signInBtn) {
    signInBtn.addEventListener('click', () => alert('Opening Sign In...'));
  }
  if (signUpBtn) {
    signUpBtn.addEventListener('click', () => alert('Opening Create Account...'));
  }

  // 8. About Modal Handlers
  if (aboutBtn && aboutModal && closeAboutBtn) {
    aboutBtn.addEventListener('click', () => {
      aboutModal.classList.add('active');
    });

    closeAboutBtn.addEventListener('click', () => {
      aboutModal.classList.remove('active');
    });

    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove('active');
      }
    });
  }
});