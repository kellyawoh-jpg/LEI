document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.scene-container');
  const replayBtn = document.getElementById('replayBtn');
  const flowerContainer = document.getElementById('flowerContainer');
  const particleField = document.getElementById('particles');

  // Modal elements
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutBtn = document.getElementById('closeAboutBtn');

  // 1. Ambient pollen particle generator
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

  // 2. Idle floating begins after bloom completion
  setTimeout(() => {
    scene.classList.add('bloomed');
  }, 3200);

  // 3. About Modal toggles
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

  // 4. Restart animation handler
  function restartAnimation() {
    scene.classList.remove('bloomed');

    // Clone and replace flower to restart all SVG keyframe animations
    const newFlower = flowerContainer.cloneNode(true);
    flowerContainer.parentNode.replaceChild(newFlower, flowerContainer);

    // Reset typography and CTA animation
    const brandBlock = document.getElementById('brandBlock');
    const newBrandBlock = brandBlock.cloneNode(true);
    brandBlock.parentNode.replaceChild(newBrandBlock, brandBlock);

    // Reattach listeners
    const freshFlower = document.getElementById('flowerContainer');
    if (freshFlower) {
      freshFlower.addEventListener('click', restartAnimation);
    }

    setTimeout(() => {
      scene.classList.add('bloomed');
    }, 3200);
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', restartAnimation);
  }

  if (flowerContainer) {
    flowerContainer.addEventListener('click', restartAnimation);
  }
});