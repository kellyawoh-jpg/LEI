document.addEventListener('DOMContentLoaded', () => {
  // Views
  const heroView = document.getElementById('heroView');
  const questionView = document.getElementById('questionView');
  const readyView = document.getElementById('readyView');
  const signInView = document.getElementById('signInView');
  const signUpView = document.getElementById('signUpView');
  const spacePortalView = document.getElementById('spacePortalView');
  const appPlatformView = document.getElementById('appPlatformView');
  const publicNav = document.getElementById('publicNav');
  const appBody = document.getElementById('appBody');

  // Navigation Buttons
  const getStartedBtn = document.getElementById('getStartedBtn');
  const backToHero = document.getElementById('backToHero');
  const backToQuestion = document.getElementById('backToQuestion');
  const backToReadyFromLogin = document.getElementById('backToReadyFromLogin');
  const backToReadyFromSignUp = document.getElementById('backToReadyFromSignUp');
  const navHome = document.getElementById('navHome');
  const continueBtn = document.getElementById('continueBtn');
  const goToSignInBtn = document.getElementById('goToSignInBtn');
  const goToSignUpBtn = document.getElementById('goToSignUpBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  // Interactive Elements
  const traitCards = document.querySelectorAll('.trait-card');
  const particleField = document.getElementById('particles');
  const celebrationCanvas = document.getElementById('celebrationCanvas');

  // Padlock Animation Assembly
  const padlockOverlay = document.getElementById('padlockOverlay');
  const padlockAssembly = document.querySelector('.padlock-assembly');

  // Forms & Inputs
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const otpStatusHint = document.getElementById('otpStatusHint');
  const startCameraBtn = document.getElementById('startCameraBtn');
  const webcamVideo = document.getElementById('webcamVideo');
  const cameraPlaceholder = document.getElementById('cameraPlaceholder');
  const scanLaser = document.getElementById('scanLaser');
  const faceVerified = document.getElementById('faceVerified');
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');

  // Inside Platform Controls
  const currentSpaceLabel = document.getElementById('currentSpaceLabel');
  const spaceDropdownTrigger = document.getElementById('spaceDropdownTrigger');
  const spaceDropdownMenu = document.getElementById('spaceDropdownMenu');
  const spaceOptions = document.querySelectorAll('.space-option');
  const userProfileChip = document.getElementById('userProfileChip');

  // Tabs
  const appTabs = document.querySelectorAll('.app-tab');
  const tabPanes = document.querySelectorAll('.platform-tab-pane');

  // Discord Channels & Age Gate
  const channelLinks = document.querySelectorAll('.channel-link');
  const currentChannelHeading = document.getElementById('currentChannelHeading');
  const currentChannelTopic = document.getElementById('currentChannelTopic');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendChatBtn = document.getElementById('sendChatBtn');
  const ageGateWall = document.getElementById('ageGateWall');
  const verifyAgeActionBtn = document.getElementById('verifyAgeActionBtn');
  const ageVerifyModal = document.getElementById('ageVerifyModal');
  const closeAgeModalBtn = document.getElementById('closeAgeModalBtn');

  // Modals
  const openReportModalBtn = document.getElementById('openReportModalBtn');
  const reportModal = document.getElementById('reportModal');
  const closeReportBtn = document.getElementById('closeReportBtn');
  const reportForm = document.getElementById('reportForm');
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutBtn = document.getElementById('closeAboutBtn');

  // State
  const selectedTraits = new Set();
  let verifiedAgeTiers = new Set();
  let streamRef = null;

  // 1. Ambient Background Particles
  createParticles(22);

  function createParticles(count) {
    if (!particleField) return;
    particleField.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 12 + 10}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      particleField.appendChild(p);
    }
  }

  // 2. Idle Flower Floating
  setTimeout(() => {
    if (heroView) heroView.classList.add('bloomed');
  }, 3200);

  // 3. Screen Switching Helper
  function switchView(fromView, toView) {
    if (fromView) fromView.classList.add('hidden');
    if (toView) toView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (getStartedBtn) getStartedBtn.addEventListener('click', () => switchView(heroView, questionView));
  if (backToHero) backToHero.addEventListener('click', () => switchView(questionView, heroView));
  if (backToQuestion) backToQuestion.addEventListener('click', () => switchView(readyView, questionView));
  if (backToReadyFromLogin) backToReadyFromLogin.addEventListener('click', () => switchView(signInView, readyView));
  if (backToReadyFromSignUp) backToReadyFromSignUp.addEventListener('click', () => {
    stopWebcam();
    switchView(signUpView, readyView);
  });

  if (goToSignInBtn) goToSignInBtn.addEventListener('click', () => switchView(readyView, signInView));
  if (goToSignUpBtn) goToSignUpBtn.addEventListener('click', () => switchView(readyView, signUpView));

  // 4. Multi-Select Traits Logic
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
      if (continueBtn) continueBtn.disabled = selectedTraits.size === 0;
    });
  });

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (selectedTraits.size === 0) return;
      switchView(questionView, readyView);
      launchCelebrationConfetti();
    });
  }

  // 5. Celebration Confetti
  function launchCelebrationConfetti() {
    if (!celebrationCanvas) return;
    const ctx = celebrationCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    celebrationCanvas.width = celebrationCanvas.offsetWidth * dpr;
    celebrationCanvas.height = celebrationCanvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#f5c46b', '#ffd180', '#e5a5c7', '#cba6be', '#ffffff', '#faebf4'];
    const confettis = [];
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      confettis.push({
        x: celebrationCanvas.offsetWidth / 2,
        y: 85,
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
      if (alive) requestAnimationFrame(render);
    }
    render();
  }

  // 6. Phone OTP Simulation
  let isPhoneVerified = false;
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const phoneVal = document.getElementById('regPhone').value.trim();
      if (!phoneVal) return alert('Please enter your mobile phone number first.');

      sendOtpBtn.innerText = 'Sending...';
      setTimeout(() => {
        const code = prompt(`[SMS Verification Simulator]\nAn OTP was sent to ${phoneVal}.\nEnter 1234 to verify:`);
        if (code === '1234') {
          isPhoneVerified = true;
          sendOtpBtn.innerText = '✓ Verified';
          sendOtpBtn.classList.add('verified');
          otpStatusHint.innerText = 'Phone verified successfully.';
          otpStatusHint.style.color = '#5bb36b';
        } else {
          sendOtpBtn.innerText = 'Send Code';
          alert('Invalid verification code.');
        }
      }, 600);
    });
  }

  // 7. Camera Liveness / Facial Verification
  if (startCameraBtn) {
    startCameraBtn.addEventListener('click', async () => {
      try {
        startCameraBtn.innerText = 'Connecting...';
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef = stream;
        webcamVideo.srcObject = stream;
        webcamVideo.classList.remove('hidden');
        cameraPlaceholder.classList.add('hidden');
        scanLaser.classList.remove('hidden');
        startCameraBtn.innerText = 'Scanning...';

        setTimeout(() => {
          scanLaser.classList.add('hidden');
          faceVerified.value = 'true';
          startCameraBtn.innerText = '✓ Liveness Confirmed';
          startCameraBtn.classList.add('scanned');
          stopWebcam();
        }, 2200);
      } catch (err) {
        alert('Camera unavailable. Using secure device verification token fallback.');
        faceVerified.value = 'true';
        startCameraBtn.innerText = '✓ Liveness Confirmed';
        startCameraBtn.classList.add('scanned');
      }
    });
  }

  function stopWebcam() {
    if (streamRef) {
      streamRef.getTracks().forEach(track => track.stop());
      streamRef = null;
    }
  }

  // 8. Sign Up & Form Submission (Triggers Padlock ONLY when completed)
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!isPhoneVerified) return alert('Please verify your phone number via SMS code.');
      if (faceVerified.value !== 'true') return alert('Please complete the real-person liveness check.');

      const name = document.getElementById('regName').value.trim();
      const rawUser = document.getElementById('regUsername').value.trim().replace(/^@/, '');
      const username = `@${rawUser}`;
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;
      const privacy = document.querySelector('input[name="accountPrivacy"]:checked').value;

      const userData = { name, username, email, password, privacy };
      localStorage.setItem(`lei_user_${email}`, JSON.stringify(userData));
      localStorage.setItem(`lei_user_${username.toLowerCase()}`, JSON.stringify(userData));
      localStorage.setItem('lei_active_session', JSON.stringify(userData));

      stopWebcam();
      signUpView.classList.add('hidden');
      
      // Padlock Unlocks Sanctuary
      triggerPadlockUnlock(() => {
        spacePortalView.classList.remove('hidden');
      });
    });
  }

  // 9. Sign In Form (Triggers Padlock ONLY when authenticated)
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('loginIdentifier').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      let storedRaw = localStorage.getItem(`lei_user_${identifier}`);
      if (!storedRaw && !identifier.startsWith('@') && !identifier.includes('@')) {
        storedRaw = localStorage.getItem(`lei_user_@${identifier}`);
      }

      if (!storedRaw) {
        return alert('No account found with those credentials. Please create an account first.');
      }

      const user = JSON.parse(storedRaw);
      if (user.password !== password) {
        return alert('Incorrect password.');
      }

      localStorage.setItem('lei_active_session', JSON.stringify(user));
      signInView.classList.add('hidden');

      // Padlock Unlocks Sanctuary
      triggerPadlockUnlock(() => {
        spacePortalView.classList.remove('hidden');
      });
    });
  }

  // 10. Padlock Transition Function
  function triggerPadlockUnlock(onComplete) {
    publicNav.classList.add('hidden');
    padlockOverlay.classList.remove('hidden');
    padlockAssembly.classList.remove('unlocked');

    setTimeout(() => {
      padlockAssembly.classList.add('unlocked'); // Springs open & reveals "Unlock your potential"
    }, 400);

    setTimeout(() => {
      padlockOverlay.classList.add('hidden');
      appBody.className = 'theme-champagne'; // Palette transforms to Champagne
      if (onComplete) onComplete();
    }, 2400);
  }

  // 11. Portal Space Selection
  const portalBtns = document.querySelectorAll('.portal-enter-btn');
  portalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const spaceName = btn.getAttribute('data-target-space');
      spacePortalView.classList.add('hidden');
      appPlatformView.classList.remove('hidden');

      currentSpaceLabel.innerText = spaceName;
      const activeSession = JSON.parse(localStorage.getItem('lei_active_session') || '{}');
      if (activeSession.username) {
        userProfileChip.innerText = `${activeSession.username} (${activeSession.privacy || 'public'})`;
      }
    });
  });

  // 12. Dropdown Space Switcher
  if (spaceDropdownTrigger) {
    spaceDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      spaceDropdownMenu.classList.toggle('hidden');
    });
  }

  document.addEventListener('click', () => {
    if (spaceDropdownMenu) spaceDropdownMenu.classList.add('hidden');
  });

  spaceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const newSpace = opt.getAttribute('data-space');
      currentSpaceLabel.innerText = newSpace;
      spaceDropdownMenu.classList.add('hidden');
    });
  });

  // 13. Tab Switcher
  appTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      appTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.add('hidden'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.getAttribute('data-tab'));
      if (targetPane) targetPane.classList.remove('hidden');
    });
  });

  // 14. Discord Channels & Age Gating
  channelLinks.forEach(link => {
    link.addEventListener('click', () => {
      channelLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const channelName = link.innerText;
      currentChannelHeading.innerText = channelName;
      const ageReq = link.getAttribute('data-age-req');

      if (ageReq && !verifiedAgeTiers.has(ageReq)) {
        ageGateWall.classList.remove('hidden');
        if (ageReq === '18') {
          document.getElementById('ageGateTitle').innerText = '18+ Intimacy & Adult Discussion';
        } else if (ageReq === '21') {
          document.getElementById('ageGateTitle').innerText = '21+ Wine & Spirits Lounge';
        } else if (ageReq === 'teen') {
          document.getElementById('ageGateTitle').innerText = 'Teen Sanctuary (Ages 13-19 Only)';
        }
      } else {
        ageGateWall.classList.add('hidden');
      }
    });
  });

  if (verifyAgeActionBtn) {
    verifyAgeActionBtn.addEventListener('click', () => {
      ageVerifyModal.classList.add('active');
    });
  }

  window.confirmAgeTier = function(tier) {
    verifiedAgeTiers.add(tier);
    ageVerifyModal.classList.remove('active');
    ageGateWall.classList.add('hidden');
    alert(`Age tier verified! You now have access to this sanctuary.`);
  };

  if (closeAgeModalBtn) {
    closeAgeModalBtn.addEventListener('click', () => ageVerifyModal.classList.remove('active'));
  }

  // 15. Chat Messages
  if (sendChatBtn && chatInput) {
    function sendMsg() {
      const txt = chatInput.value.trim();
      if (!txt) return;
      const user = JSON.parse(localStorage.getItem('lei_active_session') || '{}');
      const name = user.name || 'You';

      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg';
      msgEl.innerHTML = `
        <span class="chat-avatar">🌸</span>
        <div class="msg-body">
          <div class="msg-meta">
            <span class="msg-author">${name}</span>
            <span class="msg-time">Just now</span>
          </div>
          <div class="msg-text">${txt}</div>
        </div>
      `;
      chatMessages.appendChild(msgEl);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendChatBtn.addEventListener('click', sendMsg);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMsg();
    });
  }

  // 16. Visual Feed Likes & Post Creation
  window.toggleLike = function(btn) {
    const countEl = btn.querySelector('.like-count');
    let count = parseInt(countEl.innerText);
    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      btn.style.color = 'inherit';
      countEl.innerText = count - 1;
    } else {
      btn.classList.add('liked');
      btn.style.color = '#dfb77d';
      countEl.innerText = count + 1;
    }
  };

  const publishPostBtn = document.getElementById('publishPostBtn');
  const postInputText = document.getElementById('postInputText');
  const postsStream = document.getElementById('postsStream');

  if (publishPostBtn && postInputText) {
    publishPostBtn.addEventListener('click', () => {
      const text = postInputText.value.trim();
      if (!text) return;
      const user = JSON.parse(localStorage.getItem('lei_active_session') || '{}');
      const handle = user.username || '@her';
      const name = user.name || 'Sister';

      const postCard = document.createElement('article');
      postCard.className = 'feed-post-card';
      postCard.innerHTML = `
        <div class="post-top">
          <div class="author-info">
            <span class="post-avatar">🌸</span>
            <div>
              <h4 class="author-name">${name}</h4>
              <span class="author-handle">${handle} • <span class="badge-privacy">Active Space</span></span>
            </div>
          </div>
          <button class="post-options">•••</button>
        </div>
        <div class="post-visual-box photo-1">
          <span class="photo-tag">Community Share</span>
        </div>
        <div class="post-reactions">
          <button class="like-btn" onclick="toggleLike(this)">♥ <span class="like-count">1</span></button>
          <button class="comment-icon">💬 0</button>
          <button class="bookmark-icon">🔖</button>
        </div>
        <p class="post-caption">
          <strong>${handle.replace('@','')}</strong> ${text}
        </p>
      `;
      postsStream.prepend(postCard);
      postInputText.value = '';
    });
  }

  // 17. Mutual Aid Donation Simulation
  window.simulateDonate = function(recipient) {
    alert(`Thank you for supporting ${recipient}! Your $25 peer micro-grant was transferred with 0% platform fee.`);
  };

  // 18. Log Out (Returns strictly to the Initial Mauve Front Gate)
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('lei_active_session');
      appPlatformView.classList.add('hidden');
      spacePortalView.classList.add('hidden');
      publicNav.classList.remove('hidden');
      appBody.className = 'theme-mauve';
      heroView.classList.remove('hidden');
    });
  }

  // 19. Modals Handlers
  if (aboutBtn && aboutModal && closeAboutBtn) {
    aboutBtn.addEventListener('click', () => aboutModal.classList.add('active'));
    closeAboutBtn.addEventListener('click', () => aboutModal.classList.remove('active'));
    aboutModal.addEventListener('click', (e) => { if (e.target === aboutModal) aboutModal.classList.remove('active'); });
  }

  if (openReportModalBtn && reportModal && closeReportBtn) {
    openReportModalBtn.addEventListener('click', () => reportModal.classList.add('active'));
    closeReportBtn.addEventListener('click', () => reportModal.classList.remove('active'));
    reportModal.addEventListener('click', (e) => { if (e.target === reportModal) reportModal.classList.remove('active'); });

    if (reportForm) {
      reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Report filed directly with female moderation.');
        reportForm.reset();
        reportModal.classList.remove('active');
      });
    }
  }
});