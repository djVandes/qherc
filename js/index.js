
document.addEventListener("DOMContentLoaded", function() {
    // Reveal animation
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

    // Subteam item expansion
    const subteamItems = document.querySelectorAll('.subteam__item');
    subteamItems.forEach((item, idx) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const wasExpanded = item.classList.contains('expanded');

            // Collapse any expanded item except the one being clicked
            subteamItems.forEach((itm, i) => {
                if (itm !== item) {
                    itm.classList.remove('expanded', 'slide-up', 'slide-down');
                    itm.style.zIndex = '';
                }
            });

            if (!wasExpanded) {
                // Expand the clicked item
                item.classList.add('expanded');
                item.style.zIndex = '10';
                // Slide up items before, slide down items after
                for (let i = 0; i < subteamItems.length; i++) {
                    if (i < idx) {
                        subteamItems[i].classList.add('slide-up');
                    } else if (i > idx) {
                        subteamItems[i].classList.add('slide-down');
                    }
                }
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } else {
                // Shrink back to normal size
                item.classList.remove('expanded');
                item.style.zIndex = '';
                // Remove slide-up/slide-down from all
                subteamItems.forEach((itm) => {
                    itm.classList.remove('slide-up', 'slide-down');
                });
            }
        });
    });
});

// Moon Parallax Scroll Effect
window.addEventListener('scroll', function() {
    const moon = document.getElementById('moon');
    if (!moon) return;
    const scrollY = window.scrollY;
    // Move the moon up at twice the scroll speed
    moon.style.transform = `translate(-50%, ${-3 * scrollY}px)`;
});