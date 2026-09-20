
"use client";
import { useEffect } from 'react';
import Script from 'next/script';

declare const gsap: any;
declare const ScrollTrigger: any;

export default function Page() {
    useEffect(() => {
        // Wait for external scripts (GSAP) to load
        const initScripts = () => {
            if (typeof window === 'undefined' || !('gsap' in window) || !('ScrollTrigger' in window)) {
                setTimeout(initScripts, 100);
                return;
            }
            try {
                
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });

            const elementsToAnimate = document.querySelectorAll('.reveal, .fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-blur, .reveal-type');
            elementsToAnimate.forEach(el => observer.observe(el));
    


        // Reels Drag Slider Logic
        const slider = document.querySelector('.drag-slider');
        if (slider) {
            let isDown = false;
            let startX: number;
            let scrollLeft: number;
            let isDragging = false;

            slider.addEventListener('mousedown', (e: Event) => {
                const me = e as MouseEvent;
                const el = slider as HTMLElement;
                isDown = true;
                isDragging = false;
                slider.classList.add('active');
                startX = me.pageX - el.offsetLeft;
                scrollLeft = el.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active');
                setTimeout(() => { isDragging = false; }, 0);
            });

            slider.addEventListener('mousemove', (e: Event) => {
                if (!isDown) return;
                e.preventDefault();
                const me = e as MouseEvent;
                const el = slider as HTMLElement;
                isDragging = true;
                const x = me.pageX - el.offsetLeft;
                const walk = (x - startX) * 1.5;
                el.scrollLeft = scrollLeft - walk;
            });

            const links = slider.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (isDragging) {
                        e.preventDefault();
                    }
                });
            });

            // 3D Carousel Effect
            const items = slider.querySelectorAll('.reels-item');
            const update3D = () => {
                const sliderRect = slider.getBoundingClientRect();
                const sliderCenter = sliderRect.left + sliderRect.width / 2;
                
                items.forEach(item => {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2;
                    
                    const dist = itemCenter - sliderCenter;
                    let normalizedDist = dist / (sliderRect.width * 0.5);
                    normalizedDist = Math.max(-1, Math.min(1, normalizedDist));
                    
                    const rotateY = normalizedDist * 45; 
                    const scale = 1 - Math.abs(normalizedDist) * 0.15;
                    const z = Math.abs(normalizedDist) * -150;
                    const opacity = 1 - Math.abs(normalizedDist) * 0.5;
                    const zIndex = Math.round(100 - Math.abs(normalizedDist) * 100);
                    
                    gsap.set(item, {
                        rotationY: rotateY,
                        scale: scale,
                        z: z,
                        opacity: opacity,
                        zIndex: zIndex,
                        transformOrigin: "center center",
                        transformPerspective: 1200
                    });
                });
            };

            slider.addEventListener('scroll', update3D);
            window.addEventListener('resize', update3D);
            setTimeout(update3D, 100); // Initial layout update
        }

        gsap.registerPlugin(ScrollTrigger);

        const hero = document.querySelector('.hero');
        const projectsSection = document.querySelector('.projects-section');
        const brandSpiralSection = document.querySelector('.brand-spiral-section');

        // Pin the hero section
        ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            pin: true,
            pinSpacing: false
        });

        // Set transform origin so it shrinks towards the top center
        gsap.set(hero, { transformOrigin: "top center" });
        
        // Scale down the hero section as the next section comes up
        gsap.to(hero, {
            scale: 0.9,
            opacity: 0.4,
            scrollTrigger: {
                trigger: projectsSection,
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        });


    

        // Hamburger Menu Logic
        document.querySelectorAll('.hamburger').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                (btn.previousElementSibling as HTMLElement)?.classList.toggle('active');
            });
        });
    

        // 1. Custom Cursor
            const cursor = document.createElement('div');
            cursor.classList.add('custom-cursor');
            document.body.appendChild(cursor);

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;
            let speed = 0.2; // Smoothness

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                let distX = mouseX - cursorX;
                let distY = mouseY - cursorY;
                cursorX = cursorX + (distX * speed);
                cursorY = cursorY + (distY * speed);
                cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`; // 10 is half of 20px width/height
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Cursor Hover states
            const interactiveElements = document.querySelectorAll('a, button, .interactive, .nav-btn, .explore-btn, .hamburger, .brand-logo-item');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });

            // 2. Magnetic Buttons
            const magneticBtns = document.querySelectorAll('.nav-btn, .explore-btn, .icon-btn-small, .icon-btn');
            magneticBtns.forEach(btn => {
                btn.addEventListener('mousemove', (e: Event) => {
                    const me = e as MouseEvent;
                    const rect = btn.getBoundingClientRect();
                    const x = me.clientX - rect.left - rect.width / 2;
                    const y = me.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, {
                        x: x * 0.4,
                        y: y * 0.4,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });

            // 3. Hero Mouse Parallax
            const heroSection = document.querySelector('.hero');
            const heroElems = document.querySelectorAll('.main-title, .hero-img, .hero-desc-box');
            
            if (heroSection && window.innerWidth > 1024) { // Only on desktop
                heroSection.addEventListener('mousemove', (e: Event) => {
                    const me = e as MouseEvent;
                    const x = (me.clientX / window.innerWidth - 0.5) * 2;
                    const y = (me.clientY / window.innerHeight - 0.5) * 2;

                    heroElems.forEach((elem, index) => {
                        const depth = (index + 1) * 20; 
                        gsap.to(elem, {
                            x: x * depth,
                            y: y * depth,
                            duration: 1,
                            ease: "power2.out"
                        });
                    });
                });
                heroSection.addEventListener('mouseleave', () => {
                    heroElems.forEach((elem) => {
                        gsap.to(elem, {
                            x: 0,
                            y: 0,
                            duration: 1,
                            ease: "power2.out"
                        });
                    });
                });
            }

            // 4. 3D Tilt on Cards
            const tiltCards = document.querySelectorAll('.creator-card, .service-card, .light-card, .founder-img-inner');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e: Event) => {
                    const me = e as MouseEvent;
                    const rect = card.getBoundingClientRect();
                    const x = me.clientX - rect.left; 
                    const y = me.clientY - rect.top;  
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        transformPerspective: 1000,
                        ease: "power1.out",
                        duration: 0.3
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        ease: "power3.out",
                        duration: 0.5
                    });
                });
            });
            } catch(e) {
                console.error(e);
            }
        };
        
        // Give time for GSAP to be available
        const timeoutId = setTimeout(initScripts, 500);

        return () => {
            clearTimeout(timeoutId);
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.getAll().forEach((t: any) => t.kill());
            }
        };
    }, []);

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="lazyOnload" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="lazyOnload" />
            
    {/*  HERO SECTION (Dark Theme)  */}
    <header className="hero" id="home">
        <nav className="navbar">
            <div className="logo" style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                <img src="assets/logo.png" alt="Logo" style={{"height":"35px","width":"auto","objectFit":"contain"}} />
                <img src="assets/namelogo.png" alt="Creator Hut" style={{"height":"30px","width":"auto","objectFit":"contain"}} />
            </div>
            <ul className="nav-links" style={{"alignItems":"center"}}>
                <li><a href="#home">HOME</a></li>
                <li><a href="#services">SERVICES</a></li>
                <li><a href="#cases">CASES</a></li>
                <li><a href="creators.html">CREATORS</a></li>
                <li><a href="https://wa.me/919395228160" target="_blank" className="nav-btn">CONTACT</a></li>
            </ul>
            <div className="hamburger">
                <span></span><span></span><span></span>
            </div>
        </nav>

        <div className="hero-container">
            <div className="hero-left reveal-slide-right">
                <h3 className="hero-label">UNITING<br />BRANDS & CREATORS/</h3>
                
                <div className="hero-stats">
                    <div className="stat-card light-card">
                        <h3>10,000+</h3>
                        <p>Creator Partnerships</p>
                    </div>
                    <a href="creators.html" className="stat-card dark-card" style={{"textDecoration":"none","display":"flex","alignItems":"center","justifyContent":"center","textAlign":"center","color":"inherit","transition":"opacity 0.3s"}} onMouseOver={(e) => {(e.currentTarget as HTMLElement).style.opacity='0.8'}} onMouseOut={(e) => {(e.currentTarget as HTMLElement).style.opacity='1'}}>
                        <p>Our<br />Creators</p>
                    </a>
                </div>
            </div>

            {/*  Central visual area - handled largely by background in CSS or img  */}
            <div className="hero-center reveal delay-1">
            </div>

            <div className="hero-right reveal-slide-left delay-2">
                <h1 className="main-title">ALL CREATORS<br />UNDER<br />ONE HUT</h1>
                <div className="hero-desc-box">
                    <p>We bridge the gap between bold brands and visionary creators. From cultural strategy to viral campaigns — we shape the digital conversation.</p>
                </div>
            </div>
        </div>
    </header>

    {/*  SECTION 2: ABOUT / LATEST PROJECTS (Light Theme)  */}
    <section className="section-light projects-section" id="cases">
        <div className="typography-header reveal-type">
            <div className="asterisk">*</div>
            <h2 className="massive-text">
                CREATOR HUT CONNECTS<br />
                BRANDS & CREATORS TO<br />
                <span className="text-outline">REDEFINE MODERN</span><br />
                <span className="text-outline">DIGITAL CULTURE</span>
            </h2>
        </div>

        <div className="projects-content">
            <div className="section-label">
                HUT<br />OF<br />CREATORS
            </div>
            <div className="projects-desc">
                <p>Creator Hut builds influencer campaigns that cut through the noise. We combine brand strategy with top-tier content creators to drive authentic engagement. Since our launch, we've partnered with...</p>
            </div>
            <div className="projects-grid reveal-scale delay-1">
                <img src="./assets/IMG_7857.PNG" alt="Project 1" />
                <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 2" />
                <img src="https://images.unsplash.com/photo-1704918605018-6449befbc85b?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 3" />
            </div>
        </div>
    </section>

    {/*  BRAND GRID SECTION (Light Theme)  */}
    <section className="brand-grid-section" id="brands">
        <h2 className="massive-text text-center reveal-type">
            BRANDS UNDER <span className="text-outline">THE HUT</span>
        </h2>
        <p className="text-center reveal delay-1" style={{"fontSize":"1.2rem","letterSpacing":"0.2em","color":"#666","textTransform":"uppercase","fontWeight":"600","marginBottom":"1rem","marginTop":"1rem"}}>
            Our Partner Ecosystem
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', maxWidth: '1200px', margin: '4rem auto 0', width: '100%', position: 'relative' }}>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7822.jpeg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7823.jpeg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7824.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7825.webp" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7826.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7827.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7828.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7830.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7831.jpeg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7840.avif" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7841.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7842.jpg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7843.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7844.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7845.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7846.jpg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7847.jpg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7849.png" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7850.webp" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
            <div style={{ flex: '0 0 auto', width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/assets/brands/IMG_7851.jpg" alt="Brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} /></div>
        </div>
        <br />
        <p className="text-center reveal delay-1" style={{"fontSize":"1.2rem","letterSpacing":"0.2em","color":"#666","textTransform":"uppercase","fontWeight":"600","marginBottom":"1rem","marginTop":"1rem"}}>
            AND MANY MORE <span style={{"fontSize":"1.2rem","letterSpacing":"0.2em","color":"#666","textTransform":"uppercase","fontWeight":"600","marginBottom":"1rem","marginTop":"1rem"}}>+</span>
        </p>
    </section>

    {/*  FOUNDER SECTION (Creative Dark Theme)  */}
    <section className="founder-section" id="founder">
        <div className="founder-bg-text">VISIONARY</div>
        <div className="founder-container">
            <div className="founder-img-wrapper reveal-slide-right">
                <div className="founder-badge">EST.<br />2020</div>
                <div className="founder-img-inner">
                    <img src="assets/founders.PNG" alt="Founder Bidyut Nayan Nath" />
                </div>
            </div>
            <div className="founder-content reveal-slide-left delay-1">
                <div className="founder-label-wrap">
                    <div className="founder-line"></div>
                    <span className="founder-label">MEET THE FOUNDER</span>
                </div>
                <h2 className="founder-name">BIDYUT<br /><span>NAYAN NATH</span></h2>
                <p className="founder-bio">
                    With a deep understanding of digital culture, I started Creator Hut to bridge the gap between visionary creators and bold brands. Our mission is to elevate authentic storytelling and drive meaningful cultural impact.
                </p>
                <div style={{"marginTop":"1.5rem"}}>
                    <a href="https://www.instagram.com/biiidyut/" target="_blank" className="explore-btn explore-btn-light" style={{"textDecoration":"none","display":"inline-flex","alignItems":"center","gap":"10px","padding":"1rem 2.5rem","width":"auto","fontSize":"0.9rem","letterSpacing":"0.1em","textTransform":"uppercase"}}>FOLLOW ON INSTAGRAM <span style={{"fontSize":"1.2rem"}}>↗</span></a>
                </div>
            </div>
        </div>
    </section>

    {/*  SECTION: TEAM LEADERSHIP  */}
    <section className="team-section" id="team">
        <div className="team-bg-text">LEADERSHIP</div>
        <div className="team-header reveal">
            <div className="founder-label-wrap">
                <div className="founder-line"></div>
                <span className="founder-label">THE PILLARS OF CREATOR HUT</span>
            </div>
            <h2 className="massive-text" style={{"color":"var(--text-light)"}}>MEET THE <span style={{"color":"transparent","WebkitTextStroke":"1.5px var(--text-light)"}}>TEAM</span></h2>
        </div>

        <div className="team-grid">
            {/* Marketing Head */}
            <div className="team-card reveal-slide-right delay-1">
                <div className="team-card-img">
                    <img src="/marketing head.png" alt="Marketing Head" />
                    <div className="team-card-role-badge">MARKETING</div>
                </div>
                <div className="team-card-content">
                    <h3 className="team-card-name">MARKETING<br /><span>HEAD</span></h3>
                    <p className="team-card-bio">
                        Driving brand visibility and market positioning for Creator Hut. With expertise in digital marketing, campaign analytics, and growth strategy, our Marketing Head crafts data-driven campaigns that amplify creator voices and maximize brand ROI across every channel.
                    </p>
                    <div className="team-card-tags">
                        <span>Brand Strategy</span>
                        <span>Growth Marketing</span>
                        <span>Campaign Analytics</span>
                    </div>
                </div>
            </div>

            {/* Talent Manager */}
            <div className="team-card reveal-slide-left delay-2">
                <div className="team-card-img">
                    <img src="/talent manager.jpeg" alt="Talent Manager" />
                    <div className="team-card-role-badge">TALENT</div>
                </div>
                <div className="team-card-content">
                    <h3 className="team-card-name">TALENT<br /><span>MANAGER</span></h3>
                    <p className="team-card-bio">
                        The bridge between creators and opportunities. Our Talent Manager nurtures relationships, negotiates partnerships, and ensures every creator in the Hut reaches their full potential — turning raw talent into cultural influence with precision and care.
                    </p>
                    <div className="team-card-tags">
                        <span>Creator Relations</span>
                        <span>Partnership Deals</span>
                        <span>Talent Development</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  SECTION: REELS SLIDER  */}
    <section className="reels-section">
        <div className="reels-header reveal">
            <h2 className="massive-text">HIGHLIGHT OF<br />CREATOR HUT</h2>
            <div className="reels-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
        </div>

        <div className="reels-slider-wrapper reveal delay-1">
            <div className="reels-drag-indicator">DRAG ›</div>
            <div className="drag-slider">
                {/*  Group 1: Oppo  */}
                <div className="reels-group">
                    <h4>Oppo</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DPD2nNRD92v/" target="_blank" className="reels-item"><img src="assets/reels/oppo_1.jpeg" alt="Oppo" /></a>
                        <a href="https://www.instagram.com/reel/DPGAyNlj4mc/" target="_blank" className="reels-item"><img src="assets/reels/oppo_2.jpeg" alt="Oppo" /></a>
                        <a href="https://www.instagram.com/reel/DPF5Aw5ElmE/" target="_blank" className="reels-item"><img src="assets/reels/oppo_3.jpeg" alt="Oppo" /></a>
                    </div>
                </div>

                {/*  Group 2: Realme  */}
                <div className="reels-group">
                    <h4>Realme</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DWs0IKOkzW5/" target="_blank" className="reels-item"><img src="assets/reels/realme_1.jpeg" alt="Realme" /></a>
                        <a href="https://www.instagram.com/reel/DWjBJvEiUfC/" target="_blank" className="reels-item"><img src="assets/reels/realme_2.jpeg" alt="Realme" /></a>
                        <a href="https://www.instagram.com/reel/DDtfCcGBrim/" target="_blank" className="reels-item"><img src="assets/reels/realme_3.jpeg" alt="Realme" /></a>
                    </div>
                </div>
                
                {/*  Group 3: Bisk Farm  */}
                <div className="reels-group">
                    <h4>Bisk Farm</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/CqaqL3Vp7G5/" target="_blank" className="reels-item"><img src="assets/reels/biskfarm_1.jpeg" alt="Bisk Farm" /></a>
                    </div>
                </div>
                
                {/*  Group 4: TVS  */}
                <div className="reels-group">
                    <h4>TVS</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DAajLMKyHck/" target="_blank" className="reels-item"><img src="assets/reels/tvs_1.jpeg" alt="TVS" /></a>
                    </div>
                </div>

                {/*  Group 5: Kohira  */}
                <div className="reels-group">
                    <h4>Kohira</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DEAXIxrypLj/" target="_blank" className="reels-item"><img src="assets/reels/kohira_1.jpeg" alt="Kohira" /></a>
                        <a href="https://www.instagram.com/reel/DHBTuKMzhBZ/" target="_blank" className="reels-item"><img src="assets/reels/kohira_2.jpeg" alt="Kohira" /></a>
                        <a href="https://www.instagram.com/reel/DIXY1v_hdxy/" target="_blank" className="reels-item"><img src="assets/reels/kohira_3.jpeg" alt="Kohira" /></a>
                    </div>
                </div>
                
                {/*  Group 6: Bingo  */}
                <div className="reels-group">
                    <h4>Bingo</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DM1nj1DSCxG/" target="_blank" className="reels-item"><img src="assets/reels/bingo_1.jpeg" alt="Bingo" /></a>
                    </div>
                </div>

                {/*  Group 7: Nothing  */}
                <div className="reels-group">
                    <h4>Nothing</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DWIwmjbgegD/" target="_blank" className="reels-item"><img src="assets/reels/nothing_1.jpeg" alt="Nothing" /></a>
                        <a href="https://www.instagram.com/reel/DWDh8ANiV4j/" target="_blank" className="reels-item"><img src="assets/reels/nothing_2.jpeg" alt="Nothing" /></a>
                        <a href="https://www.instagram.com/reel/DWRGumLiX0s/" target="_blank" className="reels-item"><img src="assets/reels/nothing_3.jpeg" alt="Nothing" /></a>
                    </div>
                </div>

                {/*  Group 8: Ajjas  */}
                <div className="reels-group">
                    <h4>Ajjas</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DKgzbyFSXjO/" target="_blank" className="reels-item"><img src="assets/reels/ajjas_1.jpeg" alt="Ajjas" /></a>
                    </div>
                </div>

                {/*  Group 9: Sunfeast  */}
                <div className="reels-group">
                    <h4>Sunfeast</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DRUaQ_9D5Ay/" target="_blank" className="reels-item"><img src="assets/reels/sunfeast_1.jpeg" alt="Sunfeast" /></a>
                    </div>
                </div>

                {/*  Group 10: LG  */}
                <div className="reels-group" style={{"paddingRight":"4rem"}}>
                    <h4>LG</h4>
                    <div className="reels-row">
                        <a href="https://www.instagram.com/reel/DP3B82FDwwT/" target="_blank" className="reels-item"><img src="assets/reels/lg_1.jpeg" alt="LG" /></a>
                        <a href="https://www.instagram.com/reel/DIY305lvVSr/" target="_blank" className="reels-item"><img src="assets/reels/lg_2.jpeg" alt="LG" /></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  SECTION 3: SERVICES (Light Theme)  */}
    <section className="section-light services-section" id="services">
        <h2 className="massive-text text-center">
            EVERYTHING <span className="text-outline">BRANDS &</span><br />
            <span className="text-outline">CREATORS</span> NEED TO GROW
        </h2>
        <p className="services-desc text-center">
            Creator Hut offers influencer marketing, strategic branding, and content direction. Whether you're a brand seeking authentic voices or a creator scaling your impact, we design campaigns that deliver results.
        </p>

        <div className="services-row reveal-blur">
            <div className="service-card">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" alt="Influencer Strategy" />
                <h3>Influencer<br />Strategy</h3>
            </div>
            <div className="service-card active">
                <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600" alt="Brand Partnerships" />
                <h3>Brand<br />Partnerships</h3>
            </div>
            <div className="service-card">
                <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600" alt="Content Creation" />
                <h3>Content<br />Creation</h3>
            </div>
            <div className="service-card">
                <img src="https://images.unsplash.com/photo-1628017974670-846f66fc7671?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Talent Management" />
                <h3>Talent<br />Management</h3>
            </div>
        </div>
    </section>

    {/*  MARQUEE SECTION  */}
    <div className="marquee-wrapper reveal">
        <div className="marquee-row">
            <div className="marquee-content">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
        </div>
        
        <div className="marquee-row">
            <div className="marquee-content reverse">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
            <div className="marquee-content reverse" aria-hidden="true">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
        </div>

        <div className="marquee-row">
            <div className="marquee-content">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
        </div>

        <div className="marquee-row">
            <div className="marquee-content reverse">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
            <div className="marquee-content reverse" aria-hidden="true">
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
                <span>CREATOR HUT * INFLUENCER MARKETING * BRAND STRATEGY * TALENT MANAGEMENT *</span>
            </div>
        </div>
    </div>
    
    {/*  SECTION 4: IMPACT (Light Theme)  */}
    <section className="section-light impact-section">
        <h2 className="massive-text text-center">
            WE TURN IDEAS<br />
            INTO CULTURAL MOVEMENTS<br />
            <span className="text-outline">FROM STRATEGY TO CONTENT —</span><br />
            IMPACT THAT LASTS
        </h2>

        <div className="impact-grid reveal-scale delay-1">
            <div className="impact-col-left">
                <img src="https://images.unsplash.com/photo-1646446852987-9286f631b2b8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Visual 1" className="img-tall" />
                <div className="impact-footer">
                    <span className="asterisk-small">*</span>
                    <p>We build campaigns that resonate. From brand core to influencer storytelling.</p>
                </div>
            </div>
            
            <div className="impact-col-center">
                <div className="red-box">
                    <p>Explore our<br />world's leading<br />creators</p>
                    <a href="creators.html" className="icon-btn-small" style={{"textDecoration":"none","color":"inherit","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"bold"}}>{'>'}</a>
                </div>
            </div>

            <div className="impact-col-right">
                <img src="https://images.unsplash.com/photo-1616412875447-096e932d893c?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Visual 2" className="img-square" />
                <a href="creators.html" className="explore-btn" style={{"textDecoration":"none","color":"inherit","display":"block","textAlign":"center","boxSizing":"border-box"}}>EXPLORE NOW ↗</a>
            </div>
        </div>
    </section>

    {/*  SECTION 5: PROCESS (Light Theme)  */}
    <section className="process-section">
        <h2 className="massive-text text-center reveal-type">
            HOW WE <span className="text-outline">OPERATE</span>
        </h2>
        <div className="process-grid">
            <div className="process-step reveal">
                <h3><span>DISCOVER</span> <span>01</span></h3>
                <p>We dive deep into your brand or creator persona. We uncover your unique voice and identify the right audience to connect with.</p>
            </div>
            <div className="process-step reveal delay-1">
                <h3><span>STRATEGY</span> <span>02</span></h3>
                <p>We architect partnership strategies that set you apart. This is the blueprint that aligns brands with the perfect content creators.</p>
            </div>
            <div className="process-step reveal delay-2">
                <h3><span>CAMPAIGN</span> <span>03</span></h3>
                <p>We translate strategy into powerful campaigns. Authentic content and cohesive storytelling that speak volumes and command attention.</p>
            </div>
        </div>
    </section>



    {/*  SECTION 6: TESTIMONIALS (Dark Theme)  */}
    <section className="testimonials-section">
        <div className="reveal">
            <h2 className="testimonial-text">"CREATOR HUT DIDN'T JUST RUN A CAMPAIGN. THEY CONNECTED US WITH CREATORS WHO REBUILT OUR ENTIRE CULTURAL FOOTPRINT."</h2>
        </div>
    </section>

    {/*  SECTION 7: FOOTER (Dark Theme)  */}
    <footer className="footer-section">
        <h2 className="footer-massive">LET'S TALK</h2>
        <div className="footer-links fade-in delay-1">
            <div className="footer-col">© 2026 CREATOR HUT AGENCY</div>
            <div className="footer-col">
                <a href="https://www.instagram.com/biiidyut/" style={{"color":"white","textDecoration":"none","margin":"0 10px"}}>INSTAGRAM</a>
            </div>
            <div className="footer-col">bidyutnayannath@gmail.com</div>
        </div>
    </footer>

        </>
    );
}
