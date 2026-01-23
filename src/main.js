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
    dateAdded: '2025-12-20'
  },
  {
    id: 'kfc-lab',
    title: '📊 KFC-Lab',
    description: '코스피, 환율 등을 취합해서 그래프로 통계를 내는 사이트입니다.',
    dateAdded: '2026-01-10'
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
 * Create an app card element
 */
function createAppCard(app, index) {
  const article = document.createElement('article');
  article.className = 'app-card';
  article.dataset.id = app.id;
  article.style.setProperty('--card-index', index);
  
  // Check if expanded (mobile)
  if (isExpanded(app.id)) {
    article.classList.add('expanded');
  }

  // Create star button
  const starBtn = document.createElement('button');
  starBtn.className = 'star-btn';
  starBtn.setAttribute('aria-label', 'Toggle favorite');
  starBtn.innerHTML = isFavorite(app.id) ? '⭐' : '☆';
  if (isFavorite(app.id)) {
    starBtn.classList.add('favorited');
  }
  
  // Star button click handler
  starBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isFav = toggleFavorite(app.id);
    starBtn.innerHTML = isFav ? '⭐' : '☆';
    starBtn.classList.toggle('favorited', isFav);
    
    // Add sparkle animation
    if (isFav) {
      starBtn.classList.add('sparkle');
      setTimeout(() => starBtn.classList.remove('sparkle'), 600);
    }
    
    // Re-render to update sort order
    renderAppCards();
  });

  // Create NEW badge if app is new
  let newBadge = '';
  if (isNew(app.dateAdded)) {
    const badge = document.createElement('span');
    badge.className = 'new-badge';
    badge.textContent = 'NEW';
    newBadge = badge.outerHTML;
  }

  // Create minimize button (mobile only)
  const minimizeBtn = document.createElement('button');
  minimizeBtn.className = 'minimize-btn';
  minimizeBtn.setAttribute('aria-label', 'Minimize card');
  minimizeBtn.innerHTML = '×';
  minimizeBtn.style.display = 'none'; // Hidden by default, shown when expanded on mobile
  
  // Minimize button click handler
  minimizeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleExpanded(app.id);
    article.classList.remove('expanded');
  });

  // Card content
  const content = `
    ${newBadge}
    <h2>${app.title}</h2>
    <p>${app.description}</p>
    <a href="/${app.id}">바로가기</a>
  `;

  article.innerHTML = content;
  article.insertBefore(starBtn, article.firstChild);
  article.insertBefore(minimizeBtn, article.firstChild);

  // Card click handler (mobile expand)
  article.addEventListener('click', (e) => {
    // Don't expand if clicking on buttons or links
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      return;
    }
    
    // Only expand on mobile (check window width)
    if (window.innerWidth <= 640) {
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
  });

  return article;
}
