// --- Isolated Course Page Engine (Lenis + GSAP Parallax) ---

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
// Tell ScrollTrigger to use Lenis correctly
ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});
ScrollTrigger.addEventListener("refresh", () => lenis.update());
ScrollTrigger.refresh();
    // 2. Parallax: Vertical Marquee Columns
    gsap.to('.sv-inner__marquee-col:not(.reverse)', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
            trigger: '.sv-inner__slider-area',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.sv-inner__marquee-col.reverse', {
        y: 150,
        ease: 'none',
        scrollTrigger: {
            trigger: '.sv-inner__slider-area',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 3. Parallax: Atmospheric Background Shift
    gsap.to('.sv-inner__slider-area', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.sv-inner__slider-area',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 4. Entrance: Syllabus Cards (Unified Reveal)
    gsap.from('.module-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0, // Simplified to 'one stretch'
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.syllabus-grid',
            start: 'top 92%', // Fire slightly earlier
            toggleActions: 'play none none reverse'
        }
    });

    // High-fidelity refresh to ensure ScrollTrigger knows current page heights
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // 5. Sidebar Functionality
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.body.classList.add('sidebar-active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.classList.remove('sidebar-active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            document.body.classList.remove('sidebar-active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
});
