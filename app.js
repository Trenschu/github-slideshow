// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Add scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all feature cards, market cards, and other animated elements
  const animatedElements = document.querySelectorAll(
    '.feature-card, .market-card, .value-prop, .user-card, .competition-card, .strategy-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// Add hover effects to stat items
function initStatAnimations() {
  const statValues = document.querySelectorAll('.stat-value, .metric-value, .earning-amount, .benefit-number');
  
  statValues.forEach(stat => {
    const originalText = stat.textContent;
    
    stat.addEventListener('mouseenter', () => {
      stat.style.transform = 'scale(1.1)';
      stat.style.transition = 'transform 0.3s ease';
    });
    
    stat.addEventListener('mouseleave', () => {
      stat.style.transform = 'scale(1)';
    });
  });
}

// Add parallax effect to hero section
function initParallax() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.3}px)`;
          hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Add active state to navigation on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('.section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
  });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(start));
    }
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Initialize counter animations when elements come into view
function initCounterAnimations() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const text = entry.target.textContent.trim();
        const match = text.match(/([\d.]+)([MK%]?)/i);
        
        if (match) {
          let target = parseFloat(match[1]);
          const suffix = match[2] || '';
          
          if (suffix === 'K') target *= 1000;
          if (suffix === 'M') target *= 1000000;
          
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              let displayValue = match[1];
              if (suffix) displayValue += suffix;
              entry.target.textContent = displayValue;
              clearInterval(timer);
            } else {
              let displayValue;
              if (suffix === 'K') {
                displayValue = (start / 1000).toFixed(1) + 'K';
              } else if (suffix === 'M') {
                displayValue = (start / 1000000).toFixed(1) + 'M';
              } else if (suffix === '%') {
                displayValue = Math.floor(start) + '%';
              } else {
                displayValue = Math.floor(start).toString();
              }
              entry.target.textContent = displayValue;
            }
          }, 16);
          
          entry.target.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.5 });
  
  const statElements = document.querySelectorAll('.stat-value, .metric-value, .weakness-number, .earning-amount, .benefit-number');
  statElements.forEach(el => counterObserver.observe(el));
}

// Add interactive hover effects to flywheel steps
function initFlywheelInteractions() {
  const steps = document.querySelectorAll('.flywheel-step');
  
  steps.forEach((step, index) => {
    step.addEventListener('mouseenter', () => {
      steps.forEach((s, i) => {
        if (i <= index) {
          s.style.transform = 'scale(1.05)';
          s.style.borderColor = 'var(--color-primary)';
        } else {
          s.style.opacity = '0.5';
        }
      });
    });
    
    step.addEventListener('mouseleave', () => {
      steps.forEach(s => {
        s.style.transform = 'scale(1)';
        s.style.opacity = '1';
        s.style.borderColor = 'var(--color-primary)';
      });
    });
  });
}

// Initialize all animations and interactions
function init() {
  initScrollAnimations();
  initStatAnimations();
  initParallax();
  initScrollSpy();
  initCounterAnimations();
  initFlywheelInteractions();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}