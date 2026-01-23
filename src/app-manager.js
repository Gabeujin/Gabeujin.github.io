/**
 * App Manager Module
 * Manages app favorites, sorting, and rendering
 */

const FAVORITES_STORAGE_KEY = 'app-favorites';
const EXPANDED_STORAGE_KEY = 'app-expanded-state';

/**
 * Get favorites from localStorage
 */
export function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to get favorites from localStorage:', error);
    return [];
  }
}

/**
 * Save favorites to localStorage
 */
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.warn('Failed to save favorites to localStorage:', error);
  }
}

/**
 * Toggle favorite status for an app
 */
export function toggleFavorite(appId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(appId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(appId);
  }
  
  saveFavorites(favorites);
  return favorites.includes(appId);
}

/**
 * Check if an app is favorited
 */
export function isFavorite(appId) {
  const favorites = getFavorites();
  return favorites.includes(appId);
}

/**
 * Check if an app is new (added within the last month)
 */
export function isNew(dateAdded) {
  if (!dateAdded) return false;
  
  const addedDate = new Date(dateAdded);
  const now = new Date();
  
  // Don't show NEW badge for future dates
  if (addedDate > now) return false;
  
  // Use 30-day calculation to avoid edge cases with setMonth
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  return addedDate >= oneMonthAgo;
}

/**
 * Sort apps by favorites first, then by date added (newest first)
 */
export function sortApps(apps) {
  const favorites = getFavorites();
  
  return [...apps].sort((a, b) => {
    const aIsFav = favorites.includes(a.id);
    const bIsFav = favorites.includes(b.id);
    
    // Favorites come first
    if (aIsFav && !bIsFav) return -1;
    if (!aIsFav && bIsFav) return 1;
    
    // Then sort by date added (newest first)
    const aDate = new Date(a.dateAdded || '2000-01-01');
    const bDate = new Date(b.dateAdded || '2000-01-01');
    return bDate - aDate;
  });
}

/**
 * Get expanded state from localStorage
 */
export function getExpandedState() {
  try {
    const stored = localStorage.getItem(EXPANDED_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to get expanded state from localStorage:', error);
    return {};
  }
}

/**
 * Save expanded state to localStorage
 */
export function saveExpandedState(state) {
  try {
    localStorage.setItem(EXPANDED_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save expanded state to localStorage:', error);
  }
}

/**
 * Toggle expanded state for a card (mobile only)
 */
export function toggleExpanded(appId) {
  const state = getExpandedState();
  state[appId] = !state[appId];
  saveExpandedState(state);
  return state[appId];
}

/**
 * Check if a card is expanded
 */
export function isExpanded(appId) {
  const state = getExpandedState();
  return state[appId] || false;
}
