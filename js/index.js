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
            const isActive = panel.classList.contains('active');
            
            // Close all panels
            document.querySelectorAll('.subteam-panel').forEach(p => {
                p.classList.remove('active');
            });
            
            // If the clicked panel wasn't active, open it
            if (!isActive) {
                panel.classList.add('active');
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
    moon.style.transform = `translate(-50%, ${-3 * scrollY}px)`;
});