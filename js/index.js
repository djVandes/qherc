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
                content.style.background = 'var(--burn)'; // Ensure background remains consistent
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
                        pContent.style.background = 'var(--burn)'; // Ensure background remains consistent
                    }
                    p.classList.remove('active');
                });

                // Smoothly open the clicked panel
                panel.classList.add('active');
                content.style.transition = 'max-height 0.5s ease';
                content.style.maxHeight = content.scrollHeight + 'px'; // Ensure full content is displayed
                content.style.background = 'var(--burn)'; // Ensure background remains consistent
            }
        });
    });

    // Add active class to subteam header when it comes into view
    const subteamHeader = document.querySelector('.subteam__header');
    if (subteamHeader) {
        observer.observe(subteamHeader);
    }
});

// Moon Parallax Scroll Effect
window.addEventListener('scroll', function() {
    const moon = document.getElementById('moon');
    if (!moon) return;
    const scrollY = window.scrollY;
    // Move the moon up at twice the scroll speed
    moon.style.transform = `translate(-50%, calc(-50% - ${scrollY * 2}px))`;
});