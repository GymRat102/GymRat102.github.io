(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }

  function initFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postItems = document.querySelectorAll('.post-item');

    if (filterButtons.length === 0 || postItems.length === 0) {
      return;
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter posts
        filterPosts(category, postItems);
      });
    });

    // Apply initial filter on page load
    const activeButton = document.querySelector('.filter-btn.active');
    if (activeButton) {
      const initialCategory = activeButton.getAttribute('data-category');
      filterPosts(initialCategory, postItems);
    }
  }

  function filterPosts(selectedCategory, postItems) {
    postItems.forEach(item => {
      const categories = item.getAttribute('data-categories');
      
      // Hide posts without categories regardless of selected filter
      if (!categories || categories.trim() === '') {
        item.style.display = 'none';
        return;
      }
      
      if (selectedCategory === 'all') {
        // Show all posts that have categories
        item.style.display = '';
      } else {
        // Check if post has the selected category
        const categoryArray = categories.split(',').map(c => c.trim());
        if (categoryArray.includes(selectedCategory)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }
})();

