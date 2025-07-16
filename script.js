document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');
    const preloader = document.querySelector('.preloader');
    const preloaderPercentage = document.getElementById('preloader-percentage');
    const mainContent = document.getElementById('main-content');
    const heroContent = document.getElementById('hero-content');

    // --- Preloader Logic ---
    let percentage = 0;
    const interval = setInterval(() => {
        percentage++;
        if (preloaderPercentage) {
            preloaderPercentage.textContent = `${percentage}%`;
        }
        if (percentage >= 100) {
            clearInterval(interval);
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
            document.body.style.overflowY = 'auto'; // Restore scrollbars
        }
    }, 20); // Adjust timing for faster/slower loading

    // --- Custom Cursor Logic ---
    document.addEventListener('mousemove', e => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor?.classList.add('grow');
        });
        target.addEventListener('mouseleave', () => {
            cursor?.classList.remove('grow');
        });
    });

    // --- Project Hover Image Logic ---
    const projectLinks = document.querySelectorAll('.project-link');
    const imagePreview = document.querySelector('.project-image-preview');
    const previewImg = document.getElementById('project-preview-img');

    if (imagePreview && previewImg) {
        document.addEventListener('mousemove', e => {
            imagePreview.style.left = e.clientX + 'px';
            imagePreview.style.top = e.clientY + 'px';
        });

        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const imageUrl = link.getAttribute('data-image');
                if (imageUrl) {
                    previewImg.src = imageUrl;
                    imagePreview.style.opacity = '1';
                    imagePreview.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });
            link.addEventListener('mouseleave', () => {
                imagePreview.style.opacity = '0';
                imagePreview.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-triggered Animations ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Hero Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
});
