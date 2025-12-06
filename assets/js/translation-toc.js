// Translation Table of Contents Generator and Scroll Spy

(function() {
  'use strict';

  // Generate Table of Contents from article headings
  function generateTOC() {
    const article = document.getElementById('articleContent');
    const tocContainer = document.getElementById('tableOfContents');
    
    if (!article || !tocContainer) return;

    // Get all h2, h3, and h4 headings from the article
    const headings = article.querySelectorAll('h2, h3, h4');
    
    if (headings.length === 0) {
      tocContainer.innerHTML = '<p class="no-toc">本文暂无目录</p>';
      return;
    }

    // Create TOC list
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      // Create TOC item
      const listItem = document.createElement('li');
      const level = heading.tagName.toLowerCase();
      listItem.className = `toc-item toc-${level}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';
      
      // Smooth scroll on click
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu after clicking
          if (window.innerWidth <= 768) {
            closeMobileTOC();
          }
        }
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
  }

  // Highlight active section in TOC based on scroll position
  function updateActiveSection() {
    const article = document.getElementById('articleContent');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3, h4');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (headings.length === 0 || tocLinks.length === 0) return;

    const scrollPos = window.scrollY + 100; // Offset for better UX

    let activeIndex = 0;

    headings.forEach((heading, index) => {
      if (heading.offsetTop <= scrollPos) {
        activeIndex = index;
      }
    });

    // Remove active class from all links
    tocLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current link
    if (tocLinks[activeIndex]) {
      tocLinks[activeIndex].classList.add('active');
    }
  }

  // Mobile TOC toggle functions
  function openMobileTOC() {
    const sidebar = document.getElementById('tocSidebar');
    if (sidebar) {
      sidebar.classList.add('mobile-open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeMobileTOC() {
    const sidebar = document.getElementById('tocSidebar');
    if (sidebar) {
      sidebar.classList.remove('mobile-open');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  function toggleMobileTOC() {
    const sidebar = document.getElementById('tocSidebar');
    if (sidebar) {
      if (sidebar.classList.contains('mobile-open')) {
        closeMobileTOC();
      } else {
        openMobileTOC();
      }
    }
  }

  // Initialize everything when DOM is ready
  function init() {
    generateTOC();
    updateActiveSection();

    // Add scroll listener for active section highlighting
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveSection();
      });
    });

    // Mobile TOC toggle button
    const tocToggle = document.getElementById('tocToggle');
    if (tocToggle) {
      tocToggle.addEventListener('click', toggleMobileTOC);
    }

    // Mobile TOC close button
    const tocClose = document.getElementById('tocClose');
    if (tocClose) {
      tocClose.addEventListener('click', closeMobileTOC);
    }

    // Close TOC when clicking outside on mobile
    const sidebar = document.getElementById('tocSidebar');
    if (sidebar) {
      sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar && window.innerWidth <= 768) {
          closeMobileTOC();
        }
      });
    }

    // Close mobile menu on window resize if switching to desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileTOC();
      }
    });
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

