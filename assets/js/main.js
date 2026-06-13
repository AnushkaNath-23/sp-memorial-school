// Modern JavaScript features for S.P. Memorial School website

document.addEventListener('DOMContentLoaded', function() {
    // Sync header heights for fixed positioning
    function syncHeaderHeights() {
        const announcements = document.querySelector('.announcements');
        const navbar = document.querySelector('.navbar');
        
        if (announcements && navbar) {
            const announcementHeight = announcements.offsetHeight;
            navbar.style.top = `${announcementHeight}px`;
            
            const navbarHeight = navbar.offsetHeight;
            document.body.style.paddingTop = `${announcementHeight + navbarHeight}px`;
        }
    }

    // Call on load, resize, and scroll
    syncHeaderHeights();
    window.addEventListener('resize', syncHeaderHeights);
    // Also call when announcements might change height (e.g. after updateAnnouncement)
    
    // Initialize hamburger menu functionality
    initHamburgerMenu();
    
    // Initialize FAQ interactions
    initFaqInteractions();
    // Show loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // Remove loading animation after page loads
    window.addEventListener('load', function() {
        loading.remove();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('bg-white');
            navbar.classList.remove('bg-light');
        } else {
            navbar.classList.add('bg-light');
            navbar.classList.remove('bg-white');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Initialize announcement slider
    let currentAnnouncement = 0;
    const announcements = [
        {
            title: "New Academic Year 2025-26",
            content: "Admissions open for all classes. Apply now!"
        },
        {
            title: "Annual Sports Day",
            content: "Join us for our Annual Sports Day celebration on March 15, 2025"
        }
    ];

    function updateAnnouncement() {
        const announcementContainer = document.querySelector('.announcement-item');
        if (announcementContainer) {
            const announcement = announcements[currentAnnouncement];
            announcementContainer.style.opacity = '0';
            
            setTimeout(() => {
                announcementContainer.innerHTML = `
                    <h5 class="mb-3">${announcement.title}</h5>
                    <p class="mb-0">${announcement.content}</p>
                `;
                announcementContainer.style.opacity = '1';
                syncHeaderHeights(); // Sync heights after content change
            }, 500);
            
            currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
        }
    }

    // Salient Features Horizontal Scroll Arrows & Loop
    const featuresScroll = document.getElementById('featuresScroll');
    const leftArrow = document.getElementById('scrollLeft');
    const rightArrow = document.getElementById('scrollRight');

    if (featuresScroll && leftArrow && rightArrow) {
        const scrollAmount = 350; 

        const scrollRight = () => {
            const isAtEnd = featuresScroll.scrollLeft + featuresScroll.clientWidth >= featuresScroll.scrollWidth - 50;
            if (isAtEnd) {
                featuresScroll.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                featuresScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const scrollLeft = () => {
            const isAtStart = featuresScroll.scrollLeft <= 50;
            if (isAtStart) {
                featuresScroll.scrollTo({ left: featuresScroll.scrollWidth, behavior: 'smooth' });
            } else {
                featuresScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        };

        rightArrow.addEventListener('click', scrollRight);
        leftArrow.addEventListener('click', scrollLeft);

        // Auto-scroll loop
        let autoScrollInterval = setInterval(scrollRight, 5000);

        // Pause auto-scroll on hover or touch
        const pauseScroll = () => clearInterval(autoScrollInterval);
        const resumeScroll = () => {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(scrollRight, 5000);
        };

        featuresScroll.parentElement.addEventListener('mouseenter', pauseScroll);
        featuresScroll.parentElement.addEventListener('mouseleave', resumeScroll);
        featuresScroll.parentElement.addEventListener('touchstart', pauseScroll);
    }


    // FAQ Section Interactions
    function initFaqInteractions() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqSection = document.querySelector('.faq-section');
        
        // Add random subtle background patterns to FAQ section
        if (faqSection) {
            const patternCount = 5;
            for (let i = 0; i < patternCount; i++) {
                const pattern = document.createElement('div');
                pattern.className = 'faq-bg-pattern';
                pattern.style.top = `${Math.random() * 100}%`;
                pattern.style.left = `${Math.random() * 100}%`;
                pattern.style.width = `${30 + Math.random() * 70}px`;
                pattern.style.height = `${30 + Math.random() * 70}px`;
                pattern.style.opacity = `${0.03 + Math.random() * 0.05}`;
                pattern.style.transform = `rotate(${Math.random() * 360}deg)`;
                pattern.style.position = 'absolute';
                pattern.style.borderRadius = Math.random() > 0.5 ? '50%' : '5px';
                pattern.style.backgroundColor = 'var(--primary-color)';
                pattern.style.zIndex = '0';
                faqSection.appendChild(pattern);
            }
        }
        
        faqItems.forEach((item, index) => {
            // Add hover effect for icons
            const button = item.querySelector('.accordion-button');
            const icon = item.querySelector('.faq-icon');
            const content = item.querySelector('.accordion-collapse');
            
            // Add slight delay to each FAQ item for staggered animation
            item.style.transitionDelay = `${index * 0.05}s`;
            
            if (button && icon) {
                // Enhanced hover effects
                button.addEventListener('mouseenter', () => {
                    icon.style.transform = 'scale(1.2)';
                    button.style.paddingLeft = '1.5rem';
                });
                
                button.addEventListener('mouseleave', () => {
                    if (!button.classList.contains('collapsed')) {
                        icon.style.transform = 'rotate(360deg)';
                    } else {
                        icon.style.transform = 'scale(1)';
                    }
                    button.style.paddingLeft = '1.25rem';
                });
                
                // Add color transition on hover
                button.addEventListener('mouseenter', () => {
                    const randomHue = 200 + Math.floor(Math.random() * 40); // Blue-ish hues
                    icon.style.backgroundColor = `hsla(${randomHue}, 70%, 60%, 0.2)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    if (!button.classList.contains('collapsed')) {
                        icon.style.backgroundColor = 'var(--primary-color)';
                        icon.style.color = 'white';
                    } else {
                        icon.style.backgroundColor = 'rgba(var(--bs-primary-rgb), 0.1)';
                        icon.style.color = 'var(--primary-color)';
                    }
                });
            }
            
            // Enhanced click animations
            item.addEventListener('click', function() {
                // Add pulse animation
                this.classList.add('faq-pulse');
                setTimeout(() => {
                    this.classList.remove('faq-pulse');
                }, 300);
                
                // Add ripple effect on click
                const ripple = document.createElement('div');
                ripple.className = 'faq-ripple';
                button.appendChild(ripple);
                
                // Position the ripple where the click occurred
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2;
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${event.clientX - rect.left - size/2}px`;
                ripple.style.top = `${event.clientY - rect.top - size/2}px`;
                
                // Remove the ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Toggle content with smooth height transition
                if (content) {
                    if (content.classList.contains('collapsing')) {
                        return; // Don't do anything if already transitioning
                    }
                    
                    // Add focus style to the active FAQ item
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.style.opacity = button.classList.contains('collapsed') ? '0.7' : '1';
                        }
                    });
                    
                    // Reset opacity after transition
                    setTimeout(() => {
                        faqItems.forEach(otherItem => {
                            otherItem.style.opacity = '1';
                        });
                    }, 500);
                }
            });
        });
        
        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close all open FAQ items when Escape is pressed
                document.querySelectorAll('.accordion-button:not(.collapsed)').forEach(button => {
                    button.click();
                });
            }
        });
    }

    // Update announcement every 5 seconds
    setInterval(updateAnnouncement, 5000);
    updateAnnouncement(); // Initial update

    // Form validation with modern features
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Show success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    form.reset();
                }, 2000);
            }
            form.classList.add('was-validated');
        });
    });

    // Hamburger menu functionality
    function initHamburgerMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!navbarToggler || !navbarCollapse) return;
        
        // Use Bootstrap's Collapse instance if possible for better control
        let bsCollapse = null;
        if (typeof bootstrap !== 'undefined') {
            bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }

        // Close menu when a nav link or dropdown item is clicked
        const menuLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle), .navbar-nav .dropdown-item');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
        
        // Close menu when window is resized to desktop view
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    }



    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .section-title, .hero h1, .hero p');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});
