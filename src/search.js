/**
 * Search Module
 * Provides fuzzy search functionality with auto-completion
 */

export class SearchEngine {
  constructor(items) {
    this.items = items;
  }

  /**
   * Calculate Levenshtein distance for fuzzy matching
   */
  levenshteinDistance(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Search items with fuzzy matching
   */
  search(query) {
    if (!query || query.trim() === '') {
      return this.items;
    }

    query = query.toLowerCase().trim();
    
    const results = this.items.map(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      
      // Calculate fuzzy match scores
      const titleDistance = this.levenshteinDistance(query, item.title);
      const descDistance = this.levenshteinDistance(query, item.description);
      
      // Calculate relevance score (lower is better)
      let score = Math.min(titleDistance, descDistance);
      
      // Boost exact matches
      if (titleMatch) score -= 100;
      if (descMatch) score -= 50;
      
      return {
        item,
        score,
        matches: titleMatch || descMatch || titleDistance <= 3 || descDistance <= 5
      };
    });

    // Filter and sort by relevance
    return results
      .filter(r => r.matches)
      .sort((a, b) => a.score - b.score)
      .map(r => r.item);
  }

  /**
   * Get auto-complete suggestions
   */
  getSuggestions(query, limit = 5) {
    if (!query || query.trim() === '') {
      return [];
    }

    const results = this.search(query);
    return results.slice(0, limit).map(item => ({
      title: item.title,
      description: item.description
    }));
  }

  /**
   * Highlight matching text
   */
  highlightMatch(text, query) {
    if (!query || query.trim() === '') {
      return text;
    }

    // Escape special regex characters to prevent regex injection
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}

/**
 * Initialize search UI
 */
export function initSearch(searchEngine) {
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  const appCards = document.querySelectorAll('.app-card');
  const noResults = document.getElementById('no-results');

  let debounceTimer;

  // Debounced search function
  const performSearch = () => {
    const query = searchInput.value;
    const results = searchEngine.search(query);
    const suggestions = searchEngine.getSuggestions(query, 3);

    // Update suggestions
    if (query.trim() && suggestions.length > 0) {
      searchSuggestions.innerHTML = suggestions
        .map(s => `
          <div class="suggestion-item">
            <strong>${searchEngine.highlightMatch(s.title, query)}</strong>
            <span>${searchEngine.highlightMatch(s.description, query)}</span>
          </div>
        `)
        .join('');
      searchSuggestions.style.display = 'block';
    } else {
      searchSuggestions.style.display = 'none';
    }

    // Filter cards
    const resultIds = results.map(r => r.id);
    let visibleCount = 0;

    appCards.forEach(card => {
      const cardId = card.dataset.id;
      if (query.trim() === '' || resultIds.includes(cardId)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 && query.trim() !== '' ? 'block' : 'none';
    }
  };

  // Event listeners
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 200);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      performSearch();
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchSuggestions.style.display = 'none';
    }
  });

  // Click on suggestion to fill search
  searchSuggestions.addEventListener('click', (e) => {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
      const strongElement = suggestionItem.querySelector('strong');
      if (strongElement) {
        const title = strongElement.textContent;
        searchInput.value = title;
        performSearch();
        searchSuggestions.style.display = 'none';
      }
    }
  });
}
