/* =====================================================
   FLEXIEARN PROMOTIONAL WEBSITE - JAVASCRIPT (Updated)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // THEME TOGGLE (Dark/Light Mode)
    // =====================================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const toggleIcon = this.querySelector('i');
            if (newTheme === 'light') {
                toggleIcon.classList.remove('fa-moon');
                toggleIcon.classList.add('fa-sun');
            } else {
                toggleIcon.classList.remove('fa-sun');
                toggleIcon.classList.add('fa-moon');
            }
        });
    }
    
    // =====================================================
    // NAVBAR SCROLL EFFECT
    // =====================================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="mobile-theme-toggle"><button id="mobileThemeToggle" class="theme-toggle" title="Toggle Dark/Light Mode"><i class="fas fa-moon"></i></button></div>
                    <ul>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#tasks">Earning Tasks</a></li>
                        <li><a href="#testimonials">Success Stories</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                `;
                navbar.querySelector('.container').appendChild(mobileMenu);

                // wire mobile theme toggle to main theme logic
                const mobileThemeBtn = document.getElementById('mobileThemeToggle');
                if (mobileThemeBtn) {
                    mobileThemeBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const currentTheme = html.getAttribute('data-theme');
                        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                        html.setAttribute('data-theme', newTheme);
                        localStorage.setItem('theme', newTheme);
                        const icon = this.querySelector('i');
                        if (newTheme === 'light') { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
                        else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
                    });
                }
            }

            mobileMenu.classList.toggle('open');
        });
    }
    
    // =====================================================
    // FAQ ACCORDION
    // =====================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        }
    });
    
    // =====================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = navbar ? navbar.offsetHeight : 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // =====================================================
    // FLOATING CARDS ANIMATION CONTROL
    // =====================================================
    // small top progress bar for navigation feedback
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // page-loading class for subtle onload fade
    document.body.classList.add('page-loading');
    setTimeout(() => document.body.classList.remove('page-loading'), 180);

    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        if (card) {
            card.style.animationDelay = `${index * 0.5}s`;
        }
    });
    
    // =====================================================
    // COUNTER ANIMATION ON SCROLL
    // =====================================================
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(start + (target - start) * easeOutQuart);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.dataset.target);
                
                animateCounter(counter, targetValue);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // =====================================================
    // COUNTER ANIMATION ON PAGE LOAD
    // =====================================================
    const countersOnLoad = document.querySelectorAll('.counter');
    
    if (countersOnLoad.length > 0) {
        const animateCounterOnLoad = (element, target) => {
            const duration = 2500;
            const start = 0;
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                const current = Math.floor(start + (target - start) * easeOutQuart);
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            };
            
            requestAnimationFrame(updateNumber);
        };
        
        // Trigger counters on page load after a short delay
        setTimeout(() => {
            countersOnLoad.forEach((counter, index) => {
                const targetValue = parseInt(counter.dataset.target);
                setTimeout(() => {
                    animateCounterOnLoad(counter, targetValue);
                }, index * 300);
            });
        }, 500);
    }
    
console.log('FlexiEarn Website Loaded Successfully!');
});

// =====================================================
// ONSCROLL LOADER EVENT LISTENER
// =====================================================
window.addEventListener('scroll', function() {
    var scrollPosition = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    
    var scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
    
    if (scrollPosition > 100) {
        document.body.classList.add('page-scrolled');
    } else {
        document.body.classList.remove('page-scrolled');
    }
    
    // update top progress bar width
    var progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        var p = Math.max(0, Math.min(100, scrollPercent));
        progressBar.style.width = p + '%';
    }

    var animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(function(element) {
        var elementPosition = element.getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
});

// =====================================================
// INIT COUNTERS FUNCTION FOR ONLOAD
// =====================================================
function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        if (counters.length > 0) {
            const animateCounterOnLoad = (element, target) => {
                const duration = 2500;
                const start = 0;
                const startTime = performance.now();
                
                const updateNumber = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    
                    const current = Math.floor(start + (target - start) * easeOutQuart);
                    element.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    }
                };
                
                requestAnimationFrame(updateNumber);
            };
            
            // Trigger counters on page load after a short delay
            setTimeout(() => {
                counters.forEach((counter, index) => {
                    const targetValue = parseInt(counter.dataset.target);
                    setTimeout(() => {
                        animateCounterOnLoad(counter, targetValue);
                    }, index * 300);
                });
            }, 500);
        }
    }
