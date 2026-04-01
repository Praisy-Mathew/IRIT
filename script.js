// --- Slide Data for the Parallax Hero ---
const slides = [
    {
        title: "Full Stack<br><span class='text-gradient theme-colored'>Developer</span>",
        desc: "Architecting <span class='desc-highlight'>blazing-fast</span>, scalable web applications from end to end. Specializing in modern frameworks, distributed systems, and minimalist user interfaces.",
        bgColor: "#07090d", 
        accentColor: "#00d4ff",
        accentGlow: "rgba(0, 212, 255, 0.3)",
        themeHue: "0deg",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "AI Assisted<br><span class='text-gradient theme-colored'>Engineer</span>",
        desc: "Leveraging large language models and autonomous agents to <span class='desc-highlight'>100x coding output</span>. Building intelligent systems and next-generation conversational architectures.",
        bgColor: "#080414", 
        accentColor: "#a855f7",
        accentGlow: "rgba(168, 85, 247, 0.3)",
        themeHue: "60deg", 
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Digital<br><span class='text-gradient theme-colored'>Marketing</span>",
        desc: "Driving <span class='highlight'>hyper-growth</span> through data-driven campaigns, SEO mastery, and conversion rate optimization to scale digital brands rapidly.",
        bgColor: "#14050a", 
        accentColor: "#ec4899",
        accentGlow: "rgba(236, 72, 153, 0.3)",
        themeHue: "110deg", 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Growth<br><span class='text-gradient theme-colored'>Strategist</span>",
        desc: "Engineering viral loops, mastering funnel optimization, and exploiting <span class='desc-highlight'>algorithmic trends</span> to build explosive, compounding audiences globally.",
        bgColor: "#170a02", 
        accentColor: "#f59e0b",
        accentGlow: "rgba(245, 158, 11, 0.3)",
        themeHue: "210deg", 
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Architecture<br><span class='text-gradient theme-colored'>Courses</span>",
        desc: "Mastering structural design and modern aesthetics. Learn to craft sustainable, <span class='desc-highlight'>hyper-realistic 3D</span> environments and real-world blueprints.",
        bgColor: "#05110d", 
        accentColor: "#10b981",
        accentGlow: "rgba(16, 185, 129, 0.3)",
        themeHue: "-50deg", 
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    }
];

// --- Engine and DOM Setup ---
const path = document.getElementById('curve');
const activePaths = document.querySelectorAll('.curve-active-path');
const dot = document.getElementById('dot');

const glassBox = document.querySelector('.glass-box');
const rightSection = document.querySelector('.right-section');
const titleEl = document.querySelector('.hero-title');
const descEl = document.querySelector('.hero-description');
const slideImageEl = document.getElementById('slide-image');

// --- HLS Video Background Setup ---
const video = document.getElementById('bg-video');
const videoSrc = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
}

// --- Galactic Background Engine ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let stars = [];
let shootingStars = [];
const particleCount = 70;
const starCount = 300;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}
window.addEventListener('resize', resizeCanvas);

const cyberGrid = document.querySelector('.cyber-grid');

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.twinkleFactor = Math.random() * 0.02;
    }
    draw(mx, my) {
        // Subtle Mouse Parallax on Stars
        const px = this.x + mx * (this.size * 5);
        const py = this.y + my * (this.size * 5);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Twinkle
        this.opacity += this.twinkleFactor;
        if (this.opacity > 1 || this.opacity < 0.1) this.twinkleFactor *= -1;
    }
}

class ShootingStar {
    constructor() {
        this.reset();
    }
    reset() {
        this.active = false;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height / 2);
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 15 + 10;
        this.opacity = 0;
    }
    launch() {
        this.active = true;
        this.opacity = 1;
    }
    update() {
        if (!this.active) return;
        this.x -= this.speed;
        this.y += this.speed * 0.5;
        this.opacity -= 0.02;
        if (this.opacity <= 0) this.reset();
    }
    draw() {
        if (!this.active) return;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - (this.length * 0.5));
        ctx.stroke();
    }
}

class Stardust {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.baseX = this.x;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.wobble = Math.random() * 30;
        this.freq = Math.random() * 0.02;
    }
    update(velocity) {
        this.y -= this.speedY + (velocity * 25);
        this.x = this.baseX + Math.sin(this.y * this.freq) * this.wobble;
        if (this.y < -20) this.reset();
    }
    draw(hue) {
        ctx.fillStyle = `hsla(${hue}, 80%, 75%, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${hue}, 80%, 75%, 0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) stars.push(new Star());
}

for (let i = 0; i < particleCount; i++) particles.push(new Stardust());
for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());
resizeCanvas();

function animateGalaxy(velocity, hue, mx, my) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Static Parallax Starfield
    stars.forEach(s => s.draw(mx, my));
    
    // 2. Rare Shooting Stars
    if (Math.random() < 0.005) {
        const inactive = shootingStars.find(ss => !ss.active);
        if (inactive) inactive.launch();
    }
    shootingStars.forEach(ss => {
        ss.update();
        ss.draw();
    });

    // 3. Draw Floating Stardust
    particles.forEach(p => {
        p.update(velocity);
        p.draw(hue);
    });
    
    // Dynamic Grid Speed
    const gridSpeed = 3 / (1 + velocity * 12);
    cyberGrid.style.animationDuration = `${gridSpeed}s`;
}

// Get real length of the SVG Path
const pathLength = path.getTotalLength();
activePaths.forEach(p => p.style.strokeDasharray = pathLength);
activePaths.forEach(p => p.style.strokeDashoffset = pathLength);

// Add Magnetic Parallax Physics Base
let mouseX = 0;
let mouseY = 0;
let magneticRotX = 0;
let magneticRotY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

let currentProgress = 0; 
let targetProgress = 0;  
const ease = 0.08;       

let activeSlideIndex = 0;
let isFading = false;

function applySplitTextBlur(htmlString, startIndex = 0) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    let wordIndex = startIndex;
    function traverse(node) {
        if (node.nodeType === 3) { 
            const words = node.nodeValue.split(/(\s+)/); 
            const fragment = document.createDocumentFragment();
            words.forEach(w => {
                if (/^\s+$/.test(w)) {
                    fragment.appendChild(document.createTextNode(w));
                } else if (w.length > 0) {
                    const span = document.createElement('span');
                    span.className = 'split-word';
                    span.style.animationDelay = `${(wordIndex * 0.04) + 0.3}s`;
                    wordIndex++;
                    span.innerHTML = w;
                    fragment.appendChild(span);
                }
            });
            node.replaceWith(fragment);
        } else if (node.nodeType === 1 && node.nodeName !== 'BR') {
            Array.from(node.childNodes).forEach(traverse);
        }
    }
    Array.from(temp.childNodes).forEach(traverse);
    return { html: temp.innerHTML, nextIndex: wordIndex };
}

function updateSlideContent(index) {
    if (isFading) return;
    isFading = true;
    document.body.style.backgroundColor = slides[index].bgColor;
    document.documentElement.style.setProperty('--theme-hue', slides[index].themeHue);
    document.documentElement.style.setProperty('--accent-blue', slides[index].accentColor);
    document.documentElement.style.setProperty('--accent-glow', slides[index].accentGlow);
    glassBox.classList.add('content-fade-out');
    rightSection.classList.add('content-fade-out');
    setTimeout(() => {
        const splitTitle = applySplitTextBlur(slides[index].title, 0);
        const splitDesc = applySplitTextBlur(slides[index].desc, splitTitle.nextIndex);
        titleEl.innerHTML = splitTitle.html;
        descEl.innerHTML = splitDesc.html;
        slideImageEl.src = slides[index].image;
        glassBox.classList.remove('content-fade-out');
        rightSection.classList.remove('content-fade-out');
        setTimeout(() => { isFading = false; }, 700);
    }, 400);
}

function moveProgress(delta) {
    targetProgress += delta;
    if (targetProgress < 0) targetProgress = 0;
    if (targetProgress > 1) targetProgress = 1;
}

window.addEventListener('wheel', (e) => {
    e.preventDefault(); 
    moveProgress((e.deltaY || e.detail || e.wheelDelta) * 0.0005);
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: false });
window.addEventListener('touchmove', (e) => {
    e.preventDefault(); 
    const touchY = e.touches[0].clientY;
    moveProgress((touchStartY - touchY) * 0.002);
    touchStartY = touchY; 
}, { passive: false });

function animate() {
    currentProgress += (targetProgress - currentProgress) * ease;
    magneticRotY += (mouseX * 15 - magneticRotY) * ease; 
    magneticRotX += (mouseY * -15 - magneticRotX) * ease; 
    let newSlideIndex = Math.floor(currentProgress * slides.length);
    if (newSlideIndex >= slides.length) newSlideIndex = slides.length - 1; 
    if (newSlideIndex !== activeSlideIndex && !isFading) {
        activeSlideIndex = newSlideIndex;
        updateSlideContent(activeSlideIndex);
    }
    
    // --- ABSOLUTELY PERFECT DOT ALIGNMENT ENGINE ---
    const distanceToPoint = currentProgress * pathLength;
    const localPoint = path.getPointAtLength(distanceToPoint);
    
    // Use the native Screen CTM (Coordinate Transformation Matrix)
    // This maps the SVG ViewBox coordinate to exact screen pixels,
    // handling all letterboxing, scaling, and resolution variations.
    const matrix = path.getScreenCTM();
    const svgPoint = path.ownerSVGElement.createSVGPoint();
    svgPoint.x = localPoint.x;
    svgPoint.y = localPoint.y;
    const finalPoint = svgPoint.matrixTransform(matrix);
    
    // The dot is inside .scroll-track-container, which has position: absolute.
    // To position it relative to its container, we subtract the container's bounding rect.
    const containerRect = dot.parentElement.getBoundingClientRect();
    
    dot.style.left = `${finalPoint.x - containerRect.left}px`;
    dot.style.top = `${finalPoint.y - containerRect.top}px`;
    
    activePaths.forEach(p => p.style.strokeDashoffset = pathLength - distanceToPoint);
    
    if (!glassBox.classList.contains('content-fade-out')) {
        if (window.innerWidth > 1024) glassBox.style.transform = `rotateY(${12 - (currentProgress * 24) + magneticRotY}deg) rotateX(${4 + (currentProgress * 2) + magneticRotX}deg) translateY(${currentProgress * -20}px)`;
        else glassBox.style.transform = 'none';
    }
    if (!rightSection.classList.contains('content-fade-out') && window.innerWidth > 1024) {
        rightSection.style.transform = `translate(${currentProgress * -15}px, ${currentProgress * 20}px)`;
    }
    
    const currentHue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--theme-hue')) || 0;
    animateGalaxy(Math.abs(targetProgress - currentProgress), currentHue, mouseX, mouseY);
    requestAnimationFrame(animate);
}

const initialTitle = applySplitTextBlur(slides[0].title, 0);
const initialDesc = applySplitTextBlur(slides[0].desc, initialTitle.nextIndex);
titleEl.innerHTML = initialTitle.html;
descEl.innerHTML = initialDesc.html;
animate();
