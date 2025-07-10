document.addEventListener("DOMContentLoaded", function() {
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
});

// Moon Parallax Scroll Effect
window.addEventListener('scroll', function() {
    const moon = document.getElementById('moon');
    if (!moon) return;
    const scrollY = window.scrollY;
    // Move the moon up at twice the scroll speed
    moon.style.transform = `translate(-50%, ${-3 * scrollY}px)`;
});

// Load particles.js background
window.addEventListener('DOMContentLoaded', function() {
    if (window.particlesJS) {
        particlesJS.load('particles-js', 'particlesjs-config.json');
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = function() {
            particlesJS.load('particles-js', 'particlesjs-config.json');
        };
        document.body.appendChild(script);
    }
});

// particles.js + stats.js integration
window.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'particlesjs-config.json', function() {
      // Count particles
      var count_particles = document.querySelector('.js-count-particles');
      var updateCount = function() {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          var count = window.pJSDom[0].pJS.particles.array.length;
          count_particles.textContent = count;
        }
        requestAnimationFrame(updateCount);
      };
      updateCount();
    });
  }

  // stats.js
  if (window.Stats) {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';
    document.body.appendChild(stats.domElement);
    function updateStats() {
      stats.begin();
      stats.end();
      requestAnimationFrame(updateStats);
    }
    requestAnimationFrame(updateStats);
  }
});
