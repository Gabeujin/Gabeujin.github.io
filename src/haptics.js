/**
 * Haptics Module
 * High-performance visual haptic feedback system for touch interactions
 */

// Timing constants - must match CSS transition durations in haptics.css
const MODAL_CLOSE_DURATION_MS = 300; // matches .haptic-overlay transition duration

/**
 * Initialize haptic feedback on all elements with data-haptic attribute
 */
export function initHaptics() {
  // Initialize on existing elements
  const hapticElements = document.querySelectorAll('[data-haptic]');
  hapticElements.forEach(el => attachHapticListeners(el));

  // Observe for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node itself has data-haptic
          if (node.hasAttribute && node.hasAttribute('data-haptic')) {
            attachHapticListeners(node);
          }
          // Check children
          const hapticChildren = node.querySelectorAll ? node.querySelectorAll('[data-haptic]') : [];
          hapticChildren.forEach(el => attachHapticListeners(el));
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('🎯 Haptic feedback system initialized');
}

/**
 * Attach haptic listeners to an element
 */
function attachHapticListeners(el) {
  // Prevent double-binding
  if (el.dataset.hapticBound) return;
  el.dataset.hapticBound = 'true';

  // Touch events for mobile
  el.addEventListener('touchstart', () => el.classList.add('is-pressed'), { passive: true });
  el.addEventListener('touchend', () => el.classList.remove('is-pressed'), { passive: true });
  el.addEventListener('touchcancel', () => el.classList.remove('is-pressed'), { passive: true });

  // Mouse events for desktop
  el.addEventListener('mousedown', () => el.classList.add('is-pressed'));
  el.addEventListener('mouseup', () => el.classList.remove('is-pressed'));
  el.addEventListener('mouseleave', () => el.classList.remove('is-pressed'));
}

/**
 * Modal Controller for haptic popups
 */
class HapticModal {
  constructor() {
    this.overlay = null;
    this.currentModal = null;
    this.isAnimating = false;
    this.onCloseCallback = null;
  }

  /**
   * Create and inject overlay element into DOM
   */
  createOverlay() {
    if (document.getElementById('haptic-overlay')) {
      this.overlay = document.getElementById('haptic-overlay');
      return;
    }

    this.overlay = document.createElement('div');
    this.overlay.id = 'haptic-overlay';
    this.overlay.className = 'haptic-overlay';
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    document.body.appendChild(this.overlay);
  }

  /**
   * Open a modal with specified type
   * @param {Object} options - Modal options
   * @param {string} options.type - 'spring' or 'sheet'
   * @param {string} options.icon - Emoji or icon to display
   * @param {string} options.title - Modal title
   * @param {string} options.message - Modal message (can include line breaks)
   * @param {string} options.buttonText - Close button text
   * @param {string} options.buttonColor - Optional button background color
   * @param {Function} options.onClose - Optional callback when modal closes
   */
  open(options) {
    if (this.isAnimating) return;

    const {
      type = 'spring',
      icon = '✨',
      title = 'Notice',
      message = '',
      buttonText = 'OK',
      buttonColor = null,
      onClose = null
    } = options;

    this.onCloseCallback = onClose;
    this.createOverlay();

    // Clear previous modal content
    this.overlay.innerHTML = '';

    // Create modal element
    const modal = document.createElement('div');
    modal.className = `haptic-modal haptic-modal-${type}`;

    // Icon
    const iconEl = document.createElement('div');
    iconEl.style.fontSize = '3rem';
    iconEl.style.marginBottom = '10px';
    iconEl.textContent = icon;

    // Title
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;

    // Message
    const messageEl = document.createElement('p');
    // Support line breaks in message
    message.split('\n').forEach((line, index, arr) => {
      messageEl.appendChild(document.createTextNode(line));
      if (index < arr.length - 1) {
        messageEl.appendChild(document.createElement('br'));
      }
    });

    // Close button
    const buttonEl = document.createElement('button');
    buttonEl.className = 'haptic-modal-close';
    buttonEl.setAttribute('data-haptic', 'button');
    buttonEl.textContent = buttonText;
    if (buttonColor) {
      buttonEl.style.background = buttonColor;
    }
    buttonEl.addEventListener('click', () => this.close());

    // Attach haptic to button
    attachHapticListeners(buttonEl);

    // Assemble modal
    modal.appendChild(iconEl);
    modal.appendChild(titleEl);
    modal.appendChild(messageEl);
    modal.appendChild(buttonEl);

    this.overlay.appendChild(modal);
    this.currentModal = modal;

    // Set sheet mode if needed
    if (type === 'sheet') {
      this.overlay.classList.add('sheet-mode');
    } else {
      this.overlay.classList.remove('sheet-mode');
    }

    // Trigger reflow for animation
    void modal.offsetWidth;

    // Show overlay
    this.overlay.classList.add('active');
    this.overlay.classList.remove('closing');

    // Focus the close button for accessibility
    setTimeout(() => buttonEl.focus(), 100);
  }

  /**
   * Close the current modal
   */
  close() {
    if (this.isAnimating || !this.overlay || !this.overlay.classList.contains('active')) {
      return;
    }

    this.isAnimating = true;
    this.overlay.classList.add('closing');
    this.overlay.classList.remove('active');

    setTimeout(() => {
      this.overlay.classList.remove('closing', 'sheet-mode');
      if (this.currentModal) {
        this.currentModal.remove();
        this.currentModal = null;
      }
      this.isAnimating = false;

      // Execute callback if provided
      if (this.onCloseCallback) {
        this.onCloseCallback();
        this.onCloseCallback = null;
      }
    }, MODAL_CLOSE_DURATION_MS);
  }

  /**
   * Check if modal is currently open
   */
  isOpen() {
    return this.overlay && this.overlay.classList.contains('active');
  }
}

// Singleton modal instance
let modalInstance = null;

/**
 * Get the modal controller instance
 */
export function getModal() {
  if (!modalInstance) {
    modalInstance = new HapticModal();
  }
  return modalInstance;
}

/**
 * Convenience function to show a spring modal
 */
export function showSpringModal(options) {
  getModal().open({ ...options, type: 'spring' });
}

/**
 * Convenience function to show a bottom sheet modal
 */
export function showSheetModal(options) {
  getModal().open({ ...options, type: 'sheet' });
}

/**
 * Close the current modal
 */
export function closeModal() {
  getModal().close();
}

/**
 * Add haptic attribute to an element
 * @param {HTMLElement} element - The element to add haptic to
 * @param {string} type - Haptic type: 'scale', 'list', 'button', 'button-primary', 'button-secondary', 'circle'
 */
export function addHaptic(element, type = 'scale') {
  if (!element) return;
  element.setAttribute('data-haptic', type);
  attachHapticListeners(element);
}
