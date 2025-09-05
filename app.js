// Fitness055 Landing Page JavaScript

// DOM Elements
let modal = null;
let navLinks = [];
let sections = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get DOM elements after page load
    modal = document.getElementById('trialModal');
    navLinks = document.querySelectorAll('.nav__link');
    sections = document.querySelectorAll('section[id]');
    
    setupSmoothScrolling();
    setupScrollSpy();
    setupIntersectionObserver();
    setupNavbarScroll();
    setupLazyLoading();
    setupFormValidation();
    setupKeyboardNavigation();
    
    console.log('Fitness055 Landing Page Initialized Successfully!');
}

// Modal Functions
function openTrialModal() {
    if (!modal) {
        modal = document.getElementById('trialModal');
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input for better UX
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

function closeTrialModal() {
    if (!modal) {
        modal = document.getElementById('trialModal');
    }
    
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = modal.querySelector('.trial-form');
        if (form) {
            form.reset();
        }
    }
}

// Make functions globally available
window.openTrialModal = openTrialModal;
window.closeTrialModal = closeTrialModal;

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.nav__mobile-toggle');
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.nav__mobile-toggle');
    
    mobileMenu.classList.add('active');
    toggleButton.classList.add('active');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    setTimeout(() => {
        const firstLink = mobileMenu.querySelector('.nav__mobile-link');
        if (firstLink) {
            firstLink.focus();
        }
    }, 300);
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.nav__mobile-toggle');
    
    mobileMenu.classList.remove('active');
    toggleButton.classList.remove('active');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
}

// Make mobile menu functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// FAQ Functions
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq__answer');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq__item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            const otherButton = item.querySelector('.faq__question');
            const otherAnswer = item.querySelector('.faq__answer');
            
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.classList.remove('active');
    } else {
        button.setAttribute('aria-expanded', 'true');
        answer.classList.add('active');
    }
}

// Make FAQ function globally available
window.toggleFaq = toggleFaq;

// Form Submission
function submitTrial(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const preferredTime = document.getElementById('preferred-time')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    // Basic validation
    if (!name.trim() || !phone.trim()) {
        showNotification('이름과 연락처를 입력해주세요.', 'error');
        return false;
    }
    
    // Phone validation (Korean format)
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        showNotification('올바른 연락처 형식을 입력해주세요. (예: 010-1234-5678)', 'error');
        return false;
    }
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('button[type="submit"]');
    if (!submitBtn) return false;
    
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '신청 중...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('무료 체험 신청이 완료되었습니다! 곧 연락드리겠습니다.', 'success');
        closeTrialModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track the submission
        trackEvent('trial_application_submitted', {
            name: name,
            phone: phone,
            preferred_time: preferredTime,
            timestamp: new Date().toISOString()
        });
        
    }, 1500);
    
    return false;
}

// Make submitTrial globally available
window.submitTrial = submitTrial;

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification__content';
    content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'notification__message';
    messageSpan.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification__close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    content.appendChild(messageSpan);
    content.appendChild(closeBtn);
    notification.appendChild(content);
    
    // Style notification
    const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10001;
        min-width: 300px;
        max-width: 500px;
        background: ${bgColor};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll spy for navigation
function setupScrollSpy() {
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    let activeSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('nav__link--active');
        }
    });
}

// Navbar background change on scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        }
    }, 10));
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature__card, .facility__card, .membership__card, .location__item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Setup form validation
function setupFormValidation() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length >= 3) {
                value = value.substring(0, 3) + '-' + value.substring(3);
            }
            if (value.length >= 8) {
                value = value.substring(0, 8) + '-' + value.substring(8, 12);
            }
            
            e.target.value = value;
        });
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    // Keyboard navigation for modal and mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal && !modal.classList.contains('hidden')) {
                closeTrialModal();
            }
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // Click outside modal to close
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                closeTrialModal();
            }
        });
    }
    
    // Click outside mobile menu to close
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add error handling for images
                    img.addEventListener('error', function() {
                        console.log('Image failed to load:', this.src);
                        this.style.display = 'block';
                        this.style.background = 'var(--color-secondary)';
                        this.style.minHeight = '200px';
                        this.alt = '이미지를 불러올 수 없습니다';
                    });
                    
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Analytics tracking
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics Event:', eventName, eventData);
    
    // In a real application, this would send data to analytics service
    // Example: gtag('event', eventName, eventData);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track CTA button clicks
    if (target.classList.contains('btn--primary')) {
        trackEvent('cta_click', {
            button_text: target.textContent.trim(),
            page_location: window.location.href
        });
    }
    
    // Track phone number clicks
    if (target.tagName === 'A' && target.href && target.href.startsWith('tel:')) {
        trackEvent('phone_click', {
            phone_number: target.href.replace('tel:', ''),
            page_location: window.location.href
        });
    }
    
    // Track social media clicks
    if (target.href && target.href.includes('instagram.com')) {
        trackEvent('social_click', {
            platform: 'instagram',
            page_location: window.location.href
        });
    }
});

// Performance optimization: Debounce function
function debounce(func, wait) {
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

// Error handling for all images
function setupImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'block';
            this.style.backgroundColor = 'var(--color-secondary)';
            this.style.minHeight = '200px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = '이미지를 불러올 수 없습니다';
            
            // Add a placeholder text
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('image-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.textContent = '이미지 로딩중...';
                placeholder.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                `;
                this.parentElement.style.position = 'relative';
                this.parentElement.appendChild(placeholder);
            }
        });
        
        // Set loading state
        img.addEventListener('load', function() {
            const placeholder = this.parentElement.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
        });
    });
}

// Call image error handling setup
setTimeout(setupImageErrorHandling, 100);

// Accessibility improvements
function setupAccessibility() {
    // Skip to main content with keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && e.target === document.body) {
            const firstHeading = document.querySelector('h1');
            if (firstHeading) {
                firstHeading.setAttribute('tabindex', '-1');
                firstHeading.focus();
            }
        }
    });
    
    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
}

// Setup accessibility after DOM load
setTimeout(setupAccessibility, 100);

console.log('Fitness055 Landing Page JavaScript Loaded!');