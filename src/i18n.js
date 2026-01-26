/**
 * Internationalization Module
 * Handles locale detection and translations
 */

const LOCALE_STORAGE_KEY = 'locale-preference';

/**
 * Detect user's locale based on browser settings and geolocation
 */
async function detectLocale() {
  // Check stored preference first
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored) {
    return stored;
  }

  // Try to detect from browser language
  const browserLang = navigator.language || navigator.userLanguage;
  
  // If browser language is Korean, use Korean
  if (browserLang.startsWith('ko')) {
    return 'ko';
  }

  // Try to get more accurate location via timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone === 'Asia/Seoul') {
    return 'ko';
  }

  // Default to English for international users
  return 'en';
}

/**
 * Get current locale
 */
export async function getLocale() {
  return await detectLocale();
}

/**
 * Set locale preference
 */
export function setLocale(locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.location.reload();
}

/**
 * Translation data
 */
const translations = {
  ko: {
    // Page metadata
    pageTitle: '가브진의 기록하는 습관',
    pageDescription: "Gabeujin's personal project hub",
    
    // Header
    headerTitle: 'Memory Repo',
    headerSubtitle: 'MIT License · Copyright (c) 2020 Gabeujin',
    searchPlaceholder: '🔍 프로젝트 검색...',
    themeToggleLabel: '테마 변경',
    
    // App descriptions
    apps: {
      'edu-platform': {
        title: '📚 교육 플랫폼',
        description: '교육 플랫폼으로 이동합니다.'
      },
      'wedding-money-manager': {
        title: '💰 축의금 관리',
        description: '축의금 관리 서비스로 이동합니다.'
      },
      'quiz-master': {
        title: '🎯 퀴즈 마스터',
        description: '카드형식의 퀴즈를 풀 수 있는 웹앱입니다.'
      },
      'sql-biz-quiz': {
        title: '💼 SQL 비즈 퀴즈',
        description: '비즈니스 도메인을 중심으로 SQL 문제를 풀 수 있는 웹앱입니다.'
      },
      'flash-game': {
        title: '🎮 플래시 게임 모음',
        description: '플래시게임 모음집입니다.'
      },
      'toeic-picnic': {
        title: '📖 토익 단어장',
        description: '토익 단어 학습 웹앱입니다.'
      },
      'budget-book': {
        title: '💵 간편 가계부',
        description: '간편하게 수입과 지출을 관리할 수 있는 가계부 앱입니다.'
      },
      'kfc-lab': {
        title: '📊 KFC-Lab',
        description: '코스피, 환율 등을 취합해서 그래프로 통계를 내는 사이트입니다.'
      },
      'wedding-framework': {
        title: '💒 결혼 준비 프레임워크',
        description: '결혼식 준비 과정을 일련의 프레임워크로 구성한 웹앱입니다.'
      }
    },
    
    // Buttons
    buttonGoTo: '바로가기',
    
    // Search
    noResultsTitle: '😕 검색 결과가 없습니다.',
    noResultsText: '다른 키워드로 검색해보세요.',
    
    // Footer
    footerCopyright: '© 2020 Gabeujin. All rights reserved.'
  },
  en: {
    // Page metadata
    pageTitle: "Gabeujin's Recording Habit",
    pageDescription: "Gabeujin's personal project hub",
    
    // Header
    headerTitle: 'Memory Repo',
    headerSubtitle: 'MIT License · Copyright (c) 2020 Gabeujin',
    searchPlaceholder: '🔍 Search projects...',
    themeToggleLabel: 'Toggle theme',
    
    // App descriptions
    apps: {
      'edu-platform': {
        title: '📚 Edu Platform',
        description: 'Educational platform for learning and growth.'
      },
      'wedding-money-manager': {
        title: '💰 Wedding Money Manager',
        description: 'Manage wedding gift money efficiently.'
      },
      'quiz-master': {
        title: '🎯 Quiz Master',
        description: 'A web app for card-style quizzes.'
      },
      'sql-biz-quiz': {
        title: '💼 SQL Biz Quiz',
        description: 'Practice SQL with business domain problems.'
      },
      'flash-game': {
        title: '🎮 Flash Game Collection',
        description: 'A collection of classic flash games.'
      },
      'toeic-picnic': {
        title: '📖 TOEIC Vocabulary',
        description: 'Learn TOEIC vocabulary effectively.'
      },
      'budget-book': {
        title: '💵 Simple Budget Book',
        description: 'Manage your income and expenses easily.'
      },
      'kfc-lab': {
        title: '📊 KFC-Lab',
        description: 'Visualize statistics for KOSPI, exchange rates, and more.'
      },
      'wedding-framework': {
        title: '💒 Wedding Framework',
        description: 'A framework for wedding preparation process.'
      }
    },
    
    // Buttons
    buttonGoTo: 'Go to',
    
    // Search
    noResultsTitle: '😕 No results found.',
    noResultsText: 'Try searching with different keywords.',
    
    // Footer
    footerCopyright: '© 2020 Gabeujin. All rights reserved.'
  }
};

/**
 * Get translation for a key
 */
export function t(key, locale = 'en') {
  const keys = key.split('.');
  let value = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value || key;
}

/**
 * Get all translations for current locale
 */
export function getTranslations(locale) {
  return translations[locale] || translations.en;
}
