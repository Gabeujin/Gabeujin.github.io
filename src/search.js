/**
 * Search Module
 * Provides fuzzy search functionality with auto-completion
 */

// Search configuration constants
const SEARCH_DEBOUNCE_DELAY_MS = 200;
const TITLE_DISTANCE_THRESHOLD = 3;
const DESCRIPTION_DISTANCE_THRESHOLD = 5;
const EXACT_TITLE_MATCH_BOOST = 100;
const EXACT_DESCRIPTION_MATCH_BOOST = 50;

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
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const titleMatch = titleLower.includes(query);
      const descMatch = descLower.includes(query);
      
      // Calculate relevance score using edit distance:
      // lower scores indicate better matches (0 = exact match).
      // Note: we keep this as a "distance" metric rather than a "higher is better" score.
      let score;
      
      // Optimize by skipping Levenshtein calculation for exact matches
      if (titleMatch || descMatch) {
        score = 0;
      } else {
        // Calculate fuzzy match scores only when needed
        const titleDistance = this.levenshteinDistance(query, item.title);
        const descDistance = this.levenshteinDistance(query, item.description);
        score = Math.min(titleDistance, descDistance);
      }
      
      // Boost exact matches by DECREASING the score.
      // This intentionally uses negative adjustments so that:
      //   - exact title matches are strongly preferred (score - 100)
      //   - description matches get a smaller boost (score - 50)
      // As a result, scores may become negative; this is expected and
      // works with the ascending sort order below (smaller is more relevant).
      if (titleMatch) score -= EXACT_TITLE_MATCH_BOOST;
      if (descMatch) score -= EXACT_DESCRIPTION_MATCH_BOOST;
      
      // Calculate fuzzy match distances for threshold check if not already done
      const titleDistance = titleMatch ? 0 : this.levenshteinDistance(query, item.title);
      const descDistance = descMatch ? 0 : this.levenshteinDistance(query, item.description);
      
      return {
        item,
        score,
        matches: titleMatch || descMatch || titleDistance <= TITLE_DISTANCE_THRESHOLD || descDistance <= DESCRIPTION_DISTANCE_THRESHOLD
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
   * Highlight matching text - safely escapes HTML
   */
  highlightMatch(text, query) {
    if (!query || query.trim() === '') {
      return this.escapeHtml(text);
    }

    // Escape HTML first to prevent XSS
    const escapedText = this.escapeHtml(text);
    
    // Escape special regex characters to prevent regex injection
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
  const searchCount = document.getElementById('search-count');

  // Validate required DOM elements
  if (!searchInput || !searchSuggestions) {
    console.warn('Search UI initialization skipped: required DOM elements not found.');
    return;
  }

  let debounceTimer;
  let selectedSuggestionIndex = -1;

  // Debounced search function
  const performSearch = () => {
    const query = searchInput.value;
    const results = searchEngine.search(query);
    const suggestions = searchEngine.getSuggestions(query, 3);

    // Update suggestions
    if (query.trim() && suggestions.length > 0) {
      searchSuggestions.innerHTML = suggestions
        .map((s, index) => `
          <div class="suggestion-item" role="option" data-index="${index}">
            <strong>${searchEngine.highlightMatch(s.title, query)}</strong>
            <span>${searchEngine.highlightMatch(s.description, query)}</span>
          </div>
        `)
        .join('');
      searchSuggestions.style.display = 'block';
      searchInput.setAttribute('aria-expanded', 'true');
      selectedSuggestionIndex = -1;
    } else {
      searchSuggestions.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
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

    // Update search count
    if (searchCount) {
      if (query.trim() !== '' && visibleCount > 0) {
        searchCount.textContent = `🔍 ${visibleCount}개의 프로젝트를 찾았습니다.`;
        searchCount.style.display = 'block';
      } else {
        searchCount.style.display = 'none';
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyboardNavigation = (e) => {
    const suggestionItems = searchSuggestions.querySelectorAll('.suggestion-item');
    
    if (suggestionItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestionItems.length - 1);
        updateSuggestionSelection(suggestionItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
        updateSuggestionSelection(suggestionItems);
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          selectSuggestion(suggestionItems[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        searchSuggestions.style.display = 'none';
        searchInput.setAttribute('aria-expanded', 'false');
        selectedSuggestionIndex = -1;
        break;
    }
  };

  // Update suggestion selection styling
  const updateSuggestionSelection = (items) => {
    items.forEach((item, index) => {
      if (index === selectedSuggestionIndex) {
        item.classList.add('selected');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('selected');
        item.setAttribute('aria-selected', 'false');
      }
    });
  };

  // Select a suggestion
  const selectSuggestion = (suggestionItem) => {
    const strongElement = suggestionItem.querySelector('strong');
    if (strongElement) {
      const title = strongElement.textContent;
      searchInput.value = title;
      performSearch();
      searchSuggestions.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
      selectedSuggestionIndex = -1;
    }
  };

  // Event listeners
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, SEARCH_DEBOUNCE_DELAY_MS);
  });

  searchInput.addEventListener('keydown', handleKeyboardNavigation);

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      performSearch();
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchSuggestions.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  // Click on suggestion to fill search
  searchSuggestions.addEventListener('click', (e) => {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
      selectSuggestion(suggestionItem);
    }
  });
}
