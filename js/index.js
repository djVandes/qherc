document.addEventListener("DOMContentLoaded", function() {
    // Handle reveal animations
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    });

    reveals.forEach(element => {
        observer.observe(element);
    });

    // Handle collapsible subteam panels
    document.querySelectorAll('.subteam-panel-header').forEach(header => {
        header.addEventListener('click', function() {
            const panel = this.parentElement;
            const content = panel.querySelector('.subteam-panel-content');
            const isActive = panel.classList.contains('active');

            if (isActive) {
                // Smoothly close the panel
                content.style.transition = 'max-height 0.5s ease';
                content.style.maxHeight = content.scrollHeight + 'px'; // Set to current height to enable transition
                content.style.background = 'rgba(0, 0, 0, 0.263)'; // Ensure background remains consistent
                setTimeout(() => {
                    content.style.maxHeight = '0'; // Transition to height 0
                }, 10);
                panel.classList.remove('active');
            } else {
                // Close all other panels
                document.querySelectorAll('.subteam-panel').forEach(p => {
                    const pContent = p.querySelector('.subteam-panel-content');
                    if (pContent) {
                        pContent.style.transition = 'max-height 0.25s ease';
                        pContent.style.maxHeight = '0';
                        pContent.style.background = 'rgba(0, 0, 0, 0.263)'; // Ensure background remains consistent
                    }
                    p.classList.remove('active');
                });

                // Smoothly open the clicked panel
                panel.classList.add('active');
                content.style.transition = 'max-height 0.5s ease';
                content.style.maxHeight = content.scrollHeight + 'px'; // Ensure full content is displayed
                content.style.background = 'rgba(0, 0, 0, 0.263)'; // Ensure background remains consistent
            }
        });
    });

    // Add active class to subteam header when it comes into view
    const subteamHeader = document.querySelector('.subteam__header');
    if (subteamHeader) {
        observer.observe(subteamHeader);
    }

    // Initialize IN THE NEWS carousel (responsive number visible, arrows, touch)
    function initNewsCarousel() {
        const carousels = document.querySelectorAll('.in-the-news__carousel');
        carousels.forEach(carousel => {
            const viewport = carousel.querySelector('.in-the-news__viewport');
            const track = carousel.querySelector('.in-the-news__track');
            const items = Array.from(track.children);
            const btnPrev = carousel.querySelector('.carousel__btn--prev');
            const btnNext = carousel.querySelector('.carousel__btn--next');
            let index = 0;
            let itemsPerView = 3;
            let itemWidth = 0;
            const gapPx = parseFloat(getComputedStyle(track).gap) || 32;

            function getItemsPerView() {
                const w = window.innerWidth;
                if (w < 600) return 1;
                if (w < 900) return 2;
                return 3;
            }

            function resize() {
                itemsPerView = Math.min(getItemsPerView(), items.length);
                const vw = viewport.clientWidth;
                itemWidth = (vw - gapPx * (itemsPerView - 1)) / itemsPerView;
                items.forEach(i => { i.style.minWidth = itemWidth + 'px'; });
                index = Math.min(index, Math.max(0, items.length - itemsPerView));
                update();
            }

            function update() {
                const translate = index * (itemWidth + gapPx);
                track.style.transform = `translateX(-${translate}px)`;
                btnPrev.disabled = index === 0;
                btnNext.disabled = index >= items.length - itemsPerView;
            }

            btnPrev.addEventListener('click', () => {
                index = Math.max(0, index - 1);
                update();
            });
            btnNext.addEventListener('click', () => {
                index = Math.min(items.length - itemsPerView, index + 1);
                update();
            });

            // Touch / swipe support (basic)
            let startX = 0;
            let isTouch = false;
            viewport.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    startX = e.touches[0].clientX;
                    isTouch = true;
                }
            }, { passive: true });
            viewport.addEventListener('touchend', (e) => {
                if (!isTouch) return;
                const endX = e.changedTouches[0].clientX;
                const dx = endX - startX;
                if (dx > 40) btnPrev.click();
                else if (dx < -40) btnNext.click();
                isTouch = false;
            });

            window.addEventListener('resize', resize);
            // Initial sizing
            resize();
        });
    }

    initNewsCarousel();
});



// Smooth Moon Parallax Scroll Effect - Simplified
let moonAnimationFrame;
let lastScrollY = 0;
let currentScrollY = 0;


function animateMoon() {
    const moon = document.getElementById('moon');
    if (!moon) {
        console.log('Moon element not found!');
        return;
    }

    // Simple smooth interpolation without velocity complications
    const smoothingFactor = 0.08; // Lower = smoother, higher = more responsive
    currentScrollY += (lastScrollY - currentScrollY) * smoothingFactor;
    
    // Apply transform with consistent 2x multiplier (no easing multiplier to avoid jumps)
    const moonOffset = currentScrollY * 2;
    moon.style.transform = `translate(-50%, calc(-50% - ${moonOffset}px))`;
    
    // Continue animation if there's still significant movement
    const difference = Math.abs(lastScrollY - currentScrollY);
    if (difference) {
        moonAnimationFrame = requestAnimationFrame(animateMoon);
    } else {
        moonAnimationFrame = null;
    }
}

// Simple scroll handler for smooth animation
window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    
    if (!moonAnimationFrame) {
        moonAnimationFrame = requestAnimationFrame(animateMoon);
    }
});