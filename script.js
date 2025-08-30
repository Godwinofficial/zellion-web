// Zellion Real Estate App - Interactive JavaScript

class ZellionApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimationObserver();
        this.setupSmoothScrolling();
        this.addInteractiveEffects();
    }

    setupEventListeners() {
        // Button click handlers
        this.setupButtonHandlers();
        
        // Scroll to top functionality
        this.setupScrollToTop();
        
        // Form interactions (if any forms are added later)
        this.setupFormHandlers();
    }

    setupButtonHandlers() {
        // Download buttons
        const downloadButtons = document.querySelectorAll('.btn-cta, .btn-download, .btn-download-full');
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDownloadClick(button);
            });
        });

        // Hero buttons
        const heroButtons = document.querySelectorAll('.btn-hero');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleHeroButtonClick(button);
            });
        });

        // Footer links - only intercept placeholder links
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only prevent default for placeholder links (#)
                if (href === '#') {
                    e.preventDefault();
                    this.handleFooterLinkClick(link);
                }
                // Let other links navigate normally
            });
        });
    }

    handleDownloadClick(button) {
        // Add loading state
        const originalText = button.innerHTML;
        button.innerHTML = this.createLoadingButton();
        button.disabled = true;

        // Simulate download process
        setTimeout(() => {
            this.showNotification('Download started! Check your downloads folder.', 'success');
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);

        // Add ripple effect
        this.addRippleEffect(button);
    }

    handleHeroButtonClick(button) {
        const text = button.textContent.trim();
        
        if (text.includes('Browse Properties')) {
            this.scrollToSection('showcase-section');
        }
        
        this.addRippleEffect(button);
    }

    handleFooterLinkClick(link) {
        const text = link.textContent.trim();
        // This function is only called for placeholder links (#)
        this.showNotification(`${text} page would open here.`, 'info');
    }

    createLoadingButton() {
        return `
            <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 1rem; height: 1rem;">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Loading...
        `;
    }

    setupAnimationObserver() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.animate-slide-up, .feature-card, .property-type, .download-card'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    setupSmoothScrolling() {
        // Add smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToSection(sectionClass) {
        const section = document.querySelector(`.${sectionClass}`);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollButton = this.createScrollToTopButton();
        document.body.appendChild(scrollButton);

        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5,12 12,5 19,12"></polyline>
            </svg>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: var(--shadow-medium);
                transition: var(--transition-smooth);
                opacity: 0;
                transform: translateY(100px);
                z-index: 1000;
            }
            
            .scroll-to-top.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .scroll-to-top:hover {
                background: hsl(var(--primary) / 0.9);
                box-shadow: var(--shadow-large);
                transform: scale(1.1);
            }
            
            .scroll-to-top svg {
                width: 1.5rem;
                height: 1.5rem;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .animate-spin {
                animation: spin 1s linear infinite;
            }
        `;
        
        if (!document.querySelector('#scroll-to-top-styles')) {
            style.id = 'scroll-to-top-styles';
            document.head.appendChild(style);
        }
        
        return button;
    }

    setupFormHandlers() {
        // Handle any form submissions (for future contact forms, etc.)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = this.createLoadingButton();
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show alert for contact form
                if (form.id === 'contactForm') {
                    alert('Form not available. Please use email or phone to get in touch.');
                } else {
                    this.showNotification('Thank you! Your message has been sent.', 'success');
                }
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    }

    addInteractiveEffects() {
        // Add hover effects to cards
        this.setupCardHoverEffects();
        
        // Add parallax effect to hero background
        this.setupParallaxEffect();
        
        // Add typing effect to hero title (optional)
        this.setupTypingEffect();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .property-type, .download-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    setupParallaxEffect() {
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${parallax}px)`;
            });
        }
    }

    setupTypingEffect() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;

        const originalText = titleElement.innerHTML;
        const lines = originalText.split('<span class="title-accent">');
        
        // Only apply typing effect on larger screens
        if (window.innerWidth > 768) {
            this.typeText(titleElement, lines);
        }
    }

    typeText(element, lines) {
        element.innerHTML = '';
        let lineIndex = 0;
        let charIndex = 0;
        let currentLine = lines[0];
        
        const typeInterval = setInterval(() => {
            if (lineIndex === 0) {
                element.innerHTML = currentLine.substring(0, charIndex + 1);
            } else {
                const firstLine = lines[0];
                const secondLine = lines[1].replace('</span>', '');
                element.innerHTML = firstLine + '<span class="title-accent">' + 
                                  secondLine.substring(0, charIndex + 1) + '</span>';
            }
            
            charIndex++;
            
            if (charIndex >= currentLine.length) {
                if (lineIndex === 0) {
                    lineIndex = 1;
                    charIndex = 0;
                    currentLine = lines[1].replace('</span>', '');
                } else {
                    clearInterval(typeInterval);
                }
            }
        }, 100);
    }

    addRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        button.appendChild(ripple);
        
        // Add ripple styles if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: var(--radius);
                    color: white;
                    font-weight: 500;
                    box-shadow: var(--shadow-large);
                    z-index: 1000;
                    transform: translateX(400px);
                    transition: var(--transition-smooth);
                }
                
                .notification-success {
                    background: hsl(var(--success));
                }
                
                .notification-info {
                    background: hsl(var(--primary));
                }
                
                .notification-error {
                    background: hsl(var(--destructive));
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ZellionApp();
});

// Add some additional interactive features
window.addEventListener('load', () => {
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Performance optimization: lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Handle responsive behavior
window.addEventListener('resize', () => {
    // Recalculate layouts if needed
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid && window.innerWidth < 1024) {
        heroGrid.style.textAlign = 'center';
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZellionApp;
}
