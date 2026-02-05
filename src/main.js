import './style.css'
// Import haptics.css after style.css to ensure proper cascade order
import './haptics.css'
import { SearchEngine, initSearch } from './search.js'
import { initEasterEgg } from './easter-egg.js'
import { initTheme, initScrollEffect } from './theme.js'
import { 
  sortApps, 
  isFavorite, 
  isNew, 
  toggleFavorite, 
  toggleExpanded, 
  isExpanded 
} from './app-manager.js'
import { getLocale, getTranslations } from './i18n.js'
import { initHaptics } from './haptics.js'

// Constants
const MOBILE_BREAKPOINT = 640; // px - must match CSS media query
const RESIZE_DEBOUNCE_DELAY = 100; // ms

// Global locale variable
let currentLocale = 'en';

// App data with dateAdded (format: YYYY-MM-DD)
const appData = [
  {
    id: 'edu-platform',
    dateAdded: '2024-06-15'
  },
  {
    id: 'wedding-money-manager',
    dateAdded: '2024-08-20'
  },
  {
    id: 'quiz-master',
    dateAdded: '2024-09-10'
  },
  {
    id: 'sql-biz-quiz',
    dateAdded: '2024-10-05'
  },
  {
    id: 'flash-game',
    dateAdded: '2024-11-12'
  },
  {
    id: 'toeic-picnic',
    dateAdded: '2024-12-01'
  },
  {
    id: 'budget-book',
    dateAdded: '2025-12-28'
  },
  {
    id: 'kfc-lab',
    dateAdded: '2026-01-15'
  },
  {
    id: 'wedding-framework',
    dateAdded: '2026-01-23'
  },
  {
    id: 'shop-manager',
    dateAdded: '2026-02-02'
  },
  {
    id: 'my-photo-map',
    dateAdded: '2026-02-02'
  },
  {
    id: 'hd-membership-mockup',
    dateAdded: '2026-02-02'
  }
];

// App initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gabeujin Homepage loaded');

  // Detect and set locale with safe fallback
  try {
    currentLocale = getLocale();
    console.log('Detected locale:', currentLocale);
  } catch (error) {
    console.error('Failed to detect locale, falling back to default "en":', error);
    currentLocale = 'en';
    console.log('Using fallback locale:', currentLocale);
  }

  // Update page metadata
  updatePageMetadata();

  // Initialize theme (dark mode)
  initTheme();

  // Initialize scroll effect
  initScrollEffect();

  // Render app cards
  renderAppCards();

  // Initialize search
  const searchEngine = new SearchEngine(getLocalizedAppData());
  initSearch(searchEngine, currentLocale);

  // Initialize easter eggs
  initEasterEgg();

  // Initialize haptic feedback system
  initHaptics();

  // Handle window resize to collapse cards when switching from mobile to desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        // Collapse all expanded cards when transitioning to desktop
        document.querySelectorAll('.app-card.expanded').forEach(card => {
          card.classList.remove('expanded');
        });
      }
    }, RESIZE_DEBOUNCE_DELAY);
  });

  console.log('✨ All features initialized!');
})

/**
 * Update page metadata based on locale
 */
function updatePageMetadata() {
  const translations = getTranslations(currentLocale);
  
  // Update HTML lang attribute for accessibility and proper language detection
  const htmlElement = document.documentElement;
  if (htmlElement && translations.htmlLang) {
    htmlElement.setAttribute('lang', translations.htmlLang);
  }
  
  // Update title
  document.title = translations.pageTitle;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', translations.pageDescription);
  }
  
  // Update header subtitle
  const headerSubtitle = document.querySelector('header p');
  if (headerSubtitle) {
    headerSubtitle.textContent = translations.headerSubtitle;
  }
  
  // Update search placeholder
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = translations.searchPlaceholder;
  }
  
  // Update theme toggle label
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', translations.themeToggleLabel);
    themeToggle.setAttribute('title', translations.themeToggleLabel);
  }
  
  // Update no results message using textContent for security
  const noResultsDiv = document.getElementById('no-results');
  if (noResultsDiv) {
    // Clear existing content
    noResultsDiv.textContent = '';

    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = translations.noResultsTitle;

    const textParagraph = document.createElement('p');
    textParagraph.textContent = translations.noResultsText;

    noResultsDiv.appendChild(titleParagraph);
    noResultsDiv.appendChild(textParagraph);
  }
  
  // Update footer
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.textContent = translations.footerCopyright;
  }
}

/**
 * Get localized app data
 */
function getLocalizedAppData() {
  const translations = getTranslations(currentLocale);
  
  return appData.map(app => ({
    ...app,
    title: translations.apps[app.id]?.title || app.id,
    description: translations.apps[app.id]?.description || ''
  }));
}

/**
 * Render app cards dynamically
 */
function renderAppCards() {
  const container = document.querySelector('.app-links');
  if (!container) return;

  // Get localized app data
  const localizedData = getLocalizedAppData();

  // Sort apps (favorites first, then by date)
  const sortedApps = sortApps(localizedData);

  // Clear existing cards
  container.innerHTML = '';

  // Render each app card
  sortedApps.forEach((app, index) => {
    const card = createAppCard(app, index);
    container.appendChild(card);
  });
}

/**
 * Update cards order without full re-render (smarter approach)
 */
function updateCardsOrder() {
  const container = document.querySelector('.app-links');
  if (!container) return;

  const localizedData = getLocalizedAppData();
  const sortedApps = sortApps(localizedData);
  const existingCards = Array.from(container.querySelectorAll('.app-card'));

  // Use DocumentFragment to minimize reflows
  const fragment = document.createDocumentFragment();
  
  // Reorder existing cards based on sorted data
  sortedApps.forEach((app, index) => {
    const card = existingCards.find(c => c.dataset.id === app.id);
    if (card) {
      card.style.setProperty('--card-index', index);
      fragment.appendChild(card);
    }
  });
  
  // Apply all changes at once
  container.appendChild(fragment);
}

/**
 * Create an app card element
 */
function createAppCard(app, index) {
  const article = document.createElement('article');
  article.className = 'app-card';
  article.dataset.id = app.id;
  article.style.setProperty('--card-index', index);
  article.setAttribute('tabindex', '0');
  // Add haptic feedback to card
  article.setAttribute('data-haptic', 'scale');
  
  // Check if expanded (mobile)
  if (isExpanded(app.id)) {
    article.classList.add('expanded');
  }

  // Create star button
  const starBtn = document.createElement('button');
  starBtn.className = 'star-btn';
  // Add haptic feedback to star button
  starBtn.setAttribute('data-haptic', 'circle');
  const isFav = isFavorite(app.id);
  starBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
  starBtn.textContent = isFav ? '⭐' : '☆';
  if (isFav) {
    starBtn.classList.add('favorited');
  }
  
  // Star button click handler
  starBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFavorited = toggleFavorite(app.id);
    starBtn.textContent = nowFavorited ? '⭐' : '☆';
    starBtn.setAttribute('aria-label', nowFavorited ? 'Remove from favorites' : 'Add to favorites');
    starBtn.classList.toggle('favorited', nowFavorited);
    
    // Add sparkle animation
    if (nowFavorited) {
      starBtn.classList.add('sparkle');
      setTimeout(() => starBtn.classList.remove('sparkle'), 600);
    }
    
    // Update cards order without full re-render
    updateCardsOrder();
  });

  // Create NEW badge if app is new
  const newBadge = document.createElement('span');
  if (isNew(app.dateAdded)) {
    newBadge.className = 'new-badge';
    newBadge.textContent = 'NEW';
  }

  // Create minimize button (mobile only)
  const minimizeBtn = document.createElement('button');
  minimizeBtn.className = 'minimize-btn';
  minimizeBtn.setAttribute('aria-label', 'Collapse card');
  minimizeBtn.setAttribute('role', 'button');
  // Add haptic feedback to minimize button
  minimizeBtn.setAttribute('data-haptic', 'circle');
  minimizeBtn.textContent = '×';
  
  // Minimize button click handler
  minimizeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleExpanded(app.id);
    article.classList.remove('expanded');
  });

  // Create title element safely
  const titleEl = document.createElement('h2');
  titleEl.textContent = app.title;

  // Create description element safely
  const descriptionEl = document.createElement('p');
  descriptionEl.textContent = app.description;

  // Create link element safely
  const linkEl = document.createElement('a');
  linkEl.href = `/${app.id}`;
  // Add haptic feedback to link button (3D press effect)
  linkEl.setAttribute('data-haptic', 'button-primary');
  const translations = getTranslations(currentLocale);
  linkEl.textContent = translations.buttonGoTo;

  // Append elements in visual order (left to right, top to bottom)
  article.appendChild(starBtn);
  if (isNew(app.dateAdded)) {
    article.appendChild(newBadge);
  }
  article.appendChild(minimizeBtn);
  article.appendChild(titleEl);
  article.appendChild(descriptionEl);
  article.appendChild(linkEl);

  // Card click handler (mobile expand)
  const handleExpand = (e) => {
    // Don't expand if clicking on buttons or links (including their child elements)
    const clickedButton = e.target.closest('button');
    const clickedLink = e.target.closest('a');
    if (clickedButton || clickedLink) {
      return;
    }
    
    // Only expand on mobile (check window width)
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      const wasExpanded = article.classList.contains('expanded');
      
      // Collapse all other cards
      document.querySelectorAll('.app-card.expanded').forEach(card => {
        if (card !== article) {
          card.classList.remove('expanded');
          toggleExpanded(card.dataset.id);
        }
      });
      
      // Toggle current card
      if (!wasExpanded) {
        toggleExpanded(app.id);
        article.classList.add('expanded');
      }
    }
  };

  article.addEventListener('click', handleExpand);
  
  // Add keyboard accessibility for expansion
  article.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleExpand(e);
    }
  });

  return article;
}
