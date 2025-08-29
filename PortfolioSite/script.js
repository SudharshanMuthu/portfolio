// Theme Management
class ThemeManager {
  constructor() {
    this.theme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupToggle();
    this.watchSystemTheme();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const toggle = document.getElementById('theme-toggle');
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');
    
    if (this.theme === 'dark') {
      sunIcon.style.opacity = '0';
      moonIcon.style.opacity = '1';
    } else {
      sunIcon.style.opacity = '1';
      moonIcon.style.opacity = '0';
    }
  }

  toggle() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  setupToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.header = document.getElementById('header');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.section');
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupScrollSpy();
    this.setupStickyHeader();
    this.setupSmoothScroll();
  }

  setupMobileMenu() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
      });

      // Close menu when clicking on links
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.navMenu.classList.remove('active');
          this.navToggle.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
          this.navMenu.classList.remove('active');
          this.navToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  setupScrollSpy() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-70px 0px -70px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this.setActiveNavLink(id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }

  setActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === activeId) {
        link.classList.add('active');
      }
    });
  }

  setupStickyHeader() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Animate on Scroll (AOS) Manager
class AOSManager {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.collectElements();
    this.setupObserver();
  }

  collectElements() {
    // Collect all elements that should animate
    const selectors = [
      '.section',
      '.timeline-item',
      '.project-card',
      '.skill-group',
      '.education-item',
      '.cert-item'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        this.elements.push(el);
      });
    });
  }

  setupObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Re-trigger animation when element leaves viewport and comes back
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    this.elements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Particle.js Configuration
class ParticleManager {
  constructor() {
    this.init();
  }

  init() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
}

// Back to Top Button
class BackToTopManager {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    if (this.button) {
      this.setupScrollListener();
      this.setupClickListener();
    }
  }

  setupScrollListener() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          if (scrollTop > 300) {
            this.button.classList.add('visible');
          } else {
            this.button.classList.remove('visible');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupClickListener() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Date Manager
class DateManager {
  constructor() {
    this.init();
  }

  init() {
    this.setCurrentDate();
    this.setCurrentYear();
  }

  setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      const today = new Date();
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
  }

  setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Lazy Loading Manager
class LazyLoadManager {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupObserver();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  setupObserver() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    });

    this.images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  loadImage(img) {
    img.src = img.src;
    img.classList.remove('lazy');
  }

  loadAllImages() {
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Performance Manager
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupPreloadCriticalResources();
    this.setupImageOptimization();
    this.setupScrollOptimization();
  }

  setupPreloadCriticalResources() {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  setupImageOptimization() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
          img.style.transition = 'opacity 0.3s ease';
          img.style.opacity = '1';
        });
      }
    });
  }

  setupScrollOptimization() {
    // Throttle scroll events
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Dispatch custom scroll event for other managers
          window.dispatchEvent(new CustomEvent('optimizedScroll'));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Accessibility Manager
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIALabels();
    this.setupReducedMotion();
  }

  setupKeyboardNavigation() {
    // Enable keyboard navigation for custom elements
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (element.tagName === 'BUTTON' || element.hasAttribute('onclick')) {
            e.preventDefault();
            element.click();
          }
        }
      });
    });
  }

  setupFocusManagement() {
    // Manage focus for mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        setTimeout(() => {
          if (navMenu.classList.contains('active')) {
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
          }
        }, 100);
      });
    }
  }

  setupARIALabels() {
    // Add ARIA labels where needed
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    }

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.setAttribute('aria-label', 'Scroll back to top');
    }
  }

  setupReducedMotion() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0s');
      document.documentElement.style.setProperty('--transition-normal', '0s');
      document.documentElement.style.setProperty('--transition-slow', '0s');
    }
  }
}

// Error Handler
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('error', (e) => {
      console.warn('Non-critical error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.warn('Unhandled promise rejection:', e.reason);
      e.preventDefault();
    });
  }
}

// Main Application
class PortfolioApp {
  constructor() {
    this.managers = {};
    this.init();
  }

  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize all managers
      this.managers.error = new ErrorHandler();
      this.managers.theme = new ThemeManager();
      this.managers.navigation = new NavigationManager();
      this.managers.aos = new AOSManager();
      this.managers.backToTop = new BackToTopManager();
      this.managers.date = new DateManager();
      this.managers.lazyLoad = new LazyLoadManager();
      this.managers.performance = new PerformanceManager();
      this.managers.accessibility = new AccessibilityManager();

      // Initialize particles after a short delay to improve perceived performance
      setTimeout(() => {
        this.managers.particle = new ParticleManager();
      }, 500);

      console.log('Portfolio application initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio application:', error);
    }
  }
}

// Initialize the application
const app = new PortfolioApp();

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PortfolioApp,
    ThemeManager,
    NavigationManager,
    AOSManager,
    ParticleManager
  };
}
