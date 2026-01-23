import './style.css'
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

// Constants
const MOBILE_BREAKPOINT = 640; // px - must match CSS media query
const RESIZE_DEBOUNCE_DELAY = 100; // ms

// App data with dateAdded (format: YYYY-MM-DD)
const appData = [
  {
    id: 'edu-platform',
    title: '📚 Edu Platform',
    description: '교육 플랫폼으로 이동합니다.',
    dateAdded: '2024-06-15'
  },
  {
    id: 'wedding-money-manager',
    title: '💰 Wedding Money Manager',
    description: '축의금 관리 서비스로 이동합니다.',
    dateAdded: '2024-08-20'
  },
  {
    id: 'quiz-master',
    title: '🎯 Quiz Master',
    description: '카드형식의 퀴즈를 풀 수 있는 웹앱입니다.',
    dateAdded: '2024-09-10'
  },
  {
    id: 'sql-biz-quiz',
    title: '💼 SQL Biz Quiz',
    description: '비즈니스 도메인을 중심으로 SQL 문제를 풀 수 있는 웹앱입니다.',
    dateAdded: '2024-10-05'
  },
  {
    id: 'flash-game',
    title: '🎮 Flash Game Collection',
    description: '플래시게임 모음집입니다.',
    dateAdded: '2024-11-12'
  },
  {
    id: 'toeic-picnic',
    title: '📖 TOEIC Vocabulary',
    description: '토익 단어 학습 웹앱입니다.',
    dateAdded: '2024-12-01'
  },
  {
    id: 'budget-book',
    title: '💵 간편 가계부',
    description: '간편하게 수입과 지출을 관리할 수 있는 가계부 앱입니다.',
    dateAdded: '2025-12-28'
  },
  {
    id: 'kfc-lab',
    title: '📊 KFC-Lab',
    description: '코스피, 환율 등을 취합해서 그래프로 통계를 내는 사이트입니다.',
    dateAdded: '2026-01-15'
  }
];

// App initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gabeujin Homepage loaded');

  // Initialize theme (dark mode)
  initTheme();

  // Initialize scroll effect
  initScrollEffect();

  // Render app cards
  renderAppCards();

  // Initialize search
  const searchEngine = new SearchEngine(appData);
  initSearch(searchEngine);

  // Initialize easter eggs
  initEasterEgg();

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
 * Render app cards dynamically
 */
function renderAppCards() {
  const container = document.querySelector('.app-links');
  if (!container) return;

  // Sort apps (favorites first, then by date)
  const sortedApps = sortApps(appData);

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

  const sortedApps = sortApps(appData);
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
  
  // Check if expanded (mobile)
  if (isExpanded(app.id)) {
    article.classList.add('expanded');
  }

  // Create star button
  const starBtn = document.createElement('button');
  starBtn.className = 'star-btn';
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
  linkEl.textContent = '바로가기';

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
