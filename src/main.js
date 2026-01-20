import './style.css'
import { SearchEngine, initSearch } from './search.js'
import { initEasterEgg } from './easter-egg.js'
import { initTheme, initScrollEffect } from './theme.js'

// App data
const appData = [
  {
    id: 'edu-platform',
    title: '📚 Edu Platform',
    description: '교육 플랫폼으로 이동합니다.'
  },
  {
    id: 'wedding-money-manager',
    title: '💰 Wedding Money Manager',
    description: '축의금 관리 서비스로 이동합니다.'
  },
  {
    id: 'quiz-master',
    title: '🎯 Quiz Master',
    description: '카드형식의 퀴즈를 풀 수 있는 웹앱입니다.'
  },
  {
    id: 'sql-biz-quiz',
    title: '💼 SQL Biz Quiz',
    description: '비즈니스 도메인을 중심으로 SQL 문제를 풀 수 있는 웹앱입니다.'
  },
  {
    id: 'flash-game',
    title: '🎮 Flash Game Collection',
    description: '플래시게임 모음집입니다.'
  },
  {
    id: 'toeic-picnic',
    title: '📖 TOEIC Vocabulary',
    description: '토익 단어 학습 웹앱입니다.'
  },
  {
    id: 'budget-book',
    title: '💵 간편 가계부',
    description: '간편하게 수입과 지출을 관리할 수 있는 가계부 앱입니다.'
  }
];

// App initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gabeujin Homepage loaded');

  // Initialize theme (dark mode)
  initTheme();

  // Initialize scroll effect
  initScrollEffect();

  // Set card animation delays dynamically
  const appCards = document.querySelectorAll('.app-card');
  appCards.forEach((card, index) => {
    card.style.setProperty('--card-index', index);
  });

  // Initialize search
  const searchEngine = new SearchEngine(appData);
  initSearch(searchEngine);

  // Initialize easter eggs
  initEasterEgg();

  console.log('✨ All features initialized!');
})
