/**
 * Easter Egg Module
 * Implements hidden features triggered by specific user actions
 */

// Easter egg timing constants
const CLICK_SEQUENCE_TIMEOUT_MS = 500;
const KONAMI_ANIMATION_DURATION_MS = 2000;
const RAINBOW_EFFECT_DURATION_MS = 3000;
const MATRIX_CANVAS_CLEANUP_DELAY_MS = 500;
const MESSAGE_DISPLAY_DURATION_MS = 3000;

export class EasterEgg {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiIndex = 0;
    this.clickCount = 0;
    this.clickTimer = null;
    // Matrix animation constants
    this.MATRIX_ANIMATION_DURATION_MS = 5000;
    this.MATRIX_TARGET_FPS = 30;
  }

  /**
   * Helper to inject a style element once
   */
  injectStyleOnce(id, css) {
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = css;
      document.head.appendChild(style);
      return style;
    }
    return document.getElementById(id);
  }

  /**
   * Helper to remove a style element
   */
  removeStyle(id) {
    const style = document.getElementById(id);
    if (style) {
      style.remove();
    }
  }

  /**
   * Initialize easter egg listeners
   */
  init() {
    this.initKonamiCode();
    this.initLogoClick();
    this.initSecretKeySequence();
  }

  /**
   * Classic Konami Code easter egg
   */
  initKonamiCode() {
    document.addEventListener('keydown', (e) => {
      // Normalize key values for consistency
      const key = e.key === 'b' || e.key === 'B' ? 'b' : 
                  e.key === 'a' || e.key === 'A' ? 'a' : 
                  e.key;
      
      if (key === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        if (this.konamiIndex === this.konamiCode.length) {
          this.triggerKonamiEffect();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  /**
   * Triple-click on logo easter egg
   */
  initLogoClick() {
    const logo = document.querySelector('header h1');
    if (!logo) {
      console.warn('[EasterEgg] Logo element "header h1" not found; logo click easter egg disabled.');
      return;
    }

    logo.addEventListener('click', () => {
      this.clickCount++;
      
      clearTimeout(this.clickTimer);
      this.clickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, CLICK_SEQUENCE_TIMEOUT_MS);

      if (this.clickCount === 3) {
        this.triggerMatrixEffect();
        this.clickCount = 0;
      }
    });

    // Add cursor pointer to hint it's clickable
    logo.style.cursor = 'pointer';
  }

  /**
   * Secret key sequence (type "secret" anywhere)
   */
  initSecretKeySequence() {
    let sequence = '';
    const secretWord = 'secret';

    document.addEventListener('keypress', (e) => {
      // Ignore if typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      sequence += e.key.toLowerCase();
      
      if (sequence.length > secretWord.length) {
        sequence = sequence.slice(-secretWord.length);
      }

      if (sequence === secretWord) {
        this.triggerRainbowEffect();
        sequence = '';
      }
    });
  }

  /**
   * Konami Code Effect - Rotate everything
   */
  triggerKonamiEffect() {
    const body = document.body;
    
    body.classList.add('konami-active');
    
    // Add rotation animation using helper
    this.injectStyleOnce('konami-style', `
      .konami-active {
        animation: konami-spin ${KONAMI_ANIMATION_DURATION_MS}ms ease-in-out;
      }
      @keyframes konami-spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(360deg) scale(1.1); }
        100% { transform: rotate(720deg) scale(1); }
      }
    `);

    // Show message
    this.showMessage('🎮 Konami Code Activated! 🎮');

    setTimeout(() => {
      body.classList.remove('konami-active');
      // Clean up style after animation
      this.removeStyle('konami-style');
    }, KONAMI_ANIMATION_DURATION_MS);
  }

  /**
   * Matrix Effect - Falling characters
   */
  triggerMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    let frameCount = 0;
    const maxFrames = (this.MATRIX_ANIMATION_DURATION_MS / 1000) * this.MATRIX_TARGET_FPS;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameCount++;
      if (frameCount < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        setTimeout(() => {
          canvas.remove();
        }, MATRIX_CANVAS_CLEANUP_DELAY_MS);
      }
    };

    this.showMessage('💚 The Matrix has you... 💚');
    draw();
  }

  /**
   * Rainbow Effect - Colorful cards
   */
  triggerRainbowEffect() {
    const cards = document.querySelectorAll('.app-card');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    
    // Add rainbow animation using helper
    this.injectStyleOnce('rainbow-style', `
      .rainbow-active {
        animation: rainbow-pulse 2s ease-in-out;
      }
      @keyframes rainbow-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `);

    cards.forEach((card, index) => {
      card.classList.add('rainbow-active');
      card.style.transition = 'all 0.5s ease';
      card.style.borderLeft = `5px solid ${colors[index % colors.length]}`;
    });

    this.showMessage('🌈 Rainbow Mode Activated! 🌈');

    setTimeout(() => {
      cards.forEach(card => {
        card.classList.remove('rainbow-active');
        card.style.borderLeft = '';
      });
      // Clean up style after animation
      this.removeStyle('rainbow-style');
    }, RAINBOW_EFFECT_DURATION_MS);
  }

  /**
   * Show message overlay
   */
  showMessage(text) {
    const existing = document.getElementById('easter-egg-message');
    if (existing) existing.remove();

    const message = document.createElement('div');
    message.id = 'easter-egg-message';
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 2rem 3rem;
      border-radius: 12px;
      font-size: 1.5rem;
      font-weight: bold;
      z-index: 10000;
      animation: fadeInOut ${MESSAGE_DISPLAY_DURATION_MS}ms ease-in-out;
      text-align: center;
    `;

    // Add fadeInOut animation using helper
    this.injectStyleOnce('easter-egg-animation', `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      }
    `);

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, MESSAGE_DISPLAY_DURATION_MS);
  }
}

/**
 * Initialize easter egg
 */
export function initEasterEgg() {
  const easterEgg = new EasterEgg();
  easterEgg.init();
}
