/**
 * Theme Module
 * Handles dark mode toggle and theme persistence
 */

const THEME_STORAGE_KEY = 'theme-preference';

/**
 * Get the current theme from localStorage or system preference
 */
function getThemePreference() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    return stored;
  }
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

/**
 * Update the theme toggle button icon
 */
function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

/**
 * Initialize theme functionality
 */
export function initTheme() {
  // Apply initial theme
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);
  
  // Set up toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    // Add haptic feedback attribute
    themeToggle.setAttribute('data-haptic', 'circle');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Initialize scroll effect for header
 */
export function initScrollEffect() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}
