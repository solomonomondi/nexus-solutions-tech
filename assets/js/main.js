/**
* Template Name: FlexBiz
* Template URL: https://bootstrapmade.com/flexbiz-bootstrap-business-template/
* Updated: Aug 04 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectBody || !selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      const link = this.parentElement;
      const dropdown = link && link.nextElementSibling;
      if (!link || !dropdown) return;
      link.classList.toggle('active');
      dropdown.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Search page sections and scroll to the first matching section.
   */
  const siteSearchForm = document.querySelector('.search-form');
  const siteSearchInput = document.querySelector('#site-search');
  const siteSearchStatus = document.querySelector('.search-status');
  let searchHighlight;

  if (siteSearchForm && siteSearchInput && siteSearchStatus) {
    siteSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (searchHighlight) {
        const parent = searchHighlight.parentNode;
        searchHighlight.replaceWith(document.createTextNode(searchHighlight.textContent));
        parent.normalize();
        searchHighlight = null;
      }

      const query = siteSearchInput.value.trim();
      if (!query) {
        siteSearchStatus.textContent = 'Enter a word or phrase to search this page.';
        siteSearchInput.focus();
        return;
      }

      const normalizedQuery = query.toLocaleLowerCase();
      const sections = document.querySelectorAll('main section');
      const matchingSection = Array.from(sections).find((section) =>
        section.textContent.toLocaleLowerCase().includes(normalizedQuery)
      );

      if (!matchingSection) {
        siteSearchStatus.textContent = `No results found for "${query}".`;
        return;
      }

      const highlightTerm = normalizedQuery.split(/\s+/)[0];
      const walker = document.createTreeWalker(matchingSection, NodeFilter.SHOW_TEXT);
      let textNode;

      while ((textNode = walker.nextNode())) {
        const parent = textNode.parentElement;
        if (!parent || parent.closest('script, style, noscript')) continue;

        const index = textNode.textContent.toLocaleLowerCase().indexOf(highlightTerm);
        if (index < 0) continue;

        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + highlightTerm.length);
        searchHighlight = document.createElement('mark');
        searchHighlight.className = 'site-search-highlight';
        range.surroundContents(searchHighlight);
        break;
      }

      const sectionTitle = matchingSection.querySelector('h1, h2, h3');
      siteSearchStatus.textContent = `Found "${query}" in ${sectionTitle ? sectionTitle.textContent.trim() : 'page content'}.`;
      matchingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      offset: 200,
      once: true,
      mirror: false
    });
  }
  aosInit();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    const isotopeContainer = isotopeItem.querySelector('.isotope-container');
    if (!isotopeContainer) return;

    let initIsotope;
    let activeFilter = filter;
    imagesLoaded(isotopeContainer, function() {
      initIsotope = new Isotope(isotopeContainer, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: activeFilter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        activeFilter = this.getAttribute('data-filter');
        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterItem) {
          filterItem.classList.toggle('filter-active', filterItem === filters);
        });
        if (initIsotope) {
          initIsotope.arrange({ filter: activeFilter });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) {
        console.error('Swiper configuration is missing for a slider.', swiperElement);
        return;
      }

      let config;
      try {
        config = JSON.parse(configElement.textContent.trim());
      } catch (error) {
        console.error('Unable to parse Swiper configuration.', error);
        return;
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      const section = document.getElementById(hash.slice(1));
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      const hash = navmenulink.hash;
      if (!hash || hash === '#') return;
      let section = document.getElementById(hash.slice(1));
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();