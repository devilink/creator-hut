
"use client";
import { useEffect } from 'react';
import Script from 'next/script';

export default function Page() {
    useEffect(() => {
        // Wait a bit for external scripts (GSAP) to load if they are not already loaded
        const initScripts = () => {
            try {
                
        document.addEventListener("DOMContentLoaded", () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });

            const elementsToAnimate = document.querySelectorAll('.reveal, .fade-in');
            elementsToAnimate.forEach(el => observer.observe(el));
        });
    


        // Hamburger Menu Logic
        document.querySelectorAll('.hamburger').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                this.previousElementSibling.classList.toggle('active');
            });
        });
    


        document.addEventListener("DOMContentLoaded", () => {
            // 1. Custom Cursor
            const cursor = document.createElement('div');
            cursor.classList.add('custom-cursor');
            document.body.appendChild(cursor);

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;
            let speed = 0.2;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                let distX = mouseX - cursorX;
                let distY = mouseY - cursorY;
                cursorX = cursorX + (distX * speed);
                cursorY = cursorY + (distY * speed);
                cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Cursor Hover states
            const interactiveElements = document.querySelectorAll('a, button, .interactive, .nav-btn, .explore-btn, .hamburger');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });

            // 2. Magnetic Buttons
            const magneticBtns = document.querySelectorAll('.nav-btn, .explore-btn');
            magneticBtns.forEach(btn => {
                btn.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(this, {
                        x: x * 0.4,
                        y: y * 0.4,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                btn.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });

            // 4. 3D Tilt on Cards (Creator list items)
            const tiltCards = document.querySelectorAll('.creator-list-item');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left; 
                    const y = e.clientY - rect.top;  
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg for horizontal lists
                    const rotateY = ((x - centerX) / centerX) * 5;
                    
                    gsap.to(this, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        transformPerspective: 1000,
                        ease: "power1.out",
                        duration: 0.3
                    });
                });
                
                card.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        rotationX: 0,
                        rotationY: 0,
                        ease: "power3.out",
                        duration: 0.5
                    });
                });
            });
        });
    
            } catch(e) {
                console.error(e);
            }
        };
        
        // Give time for GSAP to be available
        setTimeout(initScripts, 500);
    }, []);

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="lazyOnload" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="lazyOnload" />
            
    <header className="hero" style={{"minHeight":"auto","paddingBottom":"2rem"}}>
        <nav className="navbar">
            <div className="logo" style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                <img src="assets/logo.png" alt="Logo" style={{"height":"35px","width":"auto","objectFit":"contain"}} />
                <img src="assets/namelogo.png" alt="Creator Hut" style={{"height":"30px","width":"auto","objectFit":"contain"}} />
            </div>
            <ul className="nav-links" style={{"alignItems":"center"}}>
                <li><a href="index.html">HOME</a></li>
                <li><a href="index.html#services">SERVICES</a></li>
                <li><a href="index.html#cases">CASES</a></li>
                <li><a href="creators.html">CREATORS</a></li>
                <li><a href="https://wa.me/919395228160" target="_blank" className="nav-btn">CONTACT</a></li>
            </ul>
            <div className="hamburger">
                <span></span><span></span><span></span>
            </div>
        </nav>
    </header>

    <section className="find-creator-section" id="find-creator" style={{"paddingTop":"4rem"}}>
        <h2 className="massive-text text-center reveal">
            FIND <span className="text-outline">YOUR</span> CREATOR
        </h2>
        <div>
            <p className="text-center" style={{"color":"#555","maxWidth":"600px","margin":"1rem auto 3rem"}}>
                Browse through our curated list of world-class creators and influencers to find the perfect match for your next campaign.
            </p>
            
            <div className="search-filter-box">
                <input type="text" className="search-input" placeholder="Search creators by name, niche, or platform..." />
                <select className="filter-select">
                    <option>All Niches</option>
                    <option>Lifestyle & Vlogs</option>
                    <option>Infotainment</option>
                    <option>Content Creator</option>
                </select>
                <button className="explore-btn" style={{"width":"auto","padding":"1rem 2rem","background":"var(--text-dark)","color":"var(--text-light)","borderRadius":"30px"}}>SEARCH</button>
            </div>

            <div className="creators-list">

                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dimpu Baruah</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>1.3M</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dimpu%20Baruah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Karan Deka</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>233K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Karan%20Deka" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Bikash Chetry</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>582K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Bikash%20Chetry" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Bhukhan Pathak</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>154K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Bhukhan%20Pathak" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Ananya Kashyap</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>772K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Ananya%20Kashyap" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dipak Sharma</h3>
                        <p className="creator-niche">Finance</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>33.2K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dipak%20Sharma" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dhanashri Baishya</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>77.2K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dhanashri%20Baishya" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Bishal Hazarika</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>189K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Bishal%20Hazarika" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Lazy Guy</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>132K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Lazy%20Guy" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Aboyob Bhuyan</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>65.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Aboyob%20Bhuyan" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Arfelish Bordoloi</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>245K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Arfelish%20Bordoloi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Unscripted Assam</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Unscripted%20Assam" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Suvimol Gogoi</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>62K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Suvimol%20Gogoi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Kalyani Konwar</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>235K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Kalyani%20Konwar" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sneha Rajkhowa</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>247K</strong> Followers</span>
                        <span>Sibsagar</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sneha%20Rajkhowa" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dimpigogoi</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>328K</strong> Followers</span>
                        <span>Dibrugarh</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dimpigogoi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Anindita Das</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>204K</strong> Followers</span>
                        <span>Nalbari</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Anindita%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Krishnaa Kashyap</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>171K</strong> Followers</span>
                        <span>Nalbari</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Krishnaa%20Kashyap" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rakhi Deka</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>193K</strong> Followers</span>
                        <span>Mangaldai</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rakhi%20Deka" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Ariyan</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>120K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Ariyan" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nihal Kalita</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>129K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nihal%20Kalita" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">pluiebird</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>139K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20pluiebird" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Debika Rani</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>113K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Debika%20Rani" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nayan Jyoti</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>182K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nayan%20Jyoti" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sagarika Borah</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>126K</strong> Followers</span>
                        <span>Tezpur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sagarika%20Borah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">sumsum</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>111K</strong> Followers</span>
                        <span>Nagaon</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20sumsum" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Anuu Das</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>142K</strong> Followers</span>
                        <span>Duliajan</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Anuu%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Jyotishma Sarania</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>96.5K</strong> Followers</span>
                        <span>Tamulpur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Jyotishma%20Sarania" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Leena Das</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>103K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Leena%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Maharnav Bhardwaj</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>127K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Maharnav%20Bhardwaj" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Hrishikesh Sarma</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>189K</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Hrishikesh%20Sarma" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">From Assam (Jahid Ahmed)</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>83K</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20From%20Assam%20(Jahid%20Ahmed)" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">JSS Unscripted</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>737K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20JSS%20Unscripted" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Purbanchal (Bhaskar Dutta)</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>418K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Purbanchal%20(Bhaskar%20Dutta)" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Heavy Budget (Bonny Deori)</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>632K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Heavy%20Budget%20(Bonny%20Deori)" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nipu Ahmed</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>108K</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nipu%20Ahmed" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Ahiran Sarma</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>48.5K</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Ahiran%20Sarma" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Produnaya Chutia</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>417K</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Produnaya%20Chutia" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Jubilee Bordoloi</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>67K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Jubilee%20Bordoloi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Deepjyoti Kashyap</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>58.3K</strong> Followers</span>
                        <span>Central Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Deepjyoti%20Kashyap" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Assam Jet</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>68K</strong> Followers</span>
                        <span>Central Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Assam%20Jet" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">M. Rahman</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Barak Valley</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20M.%20Rahman" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Hiya Nath</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>71K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Hiya%20Nath" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">M A N Editor</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>91K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20M%20A%20N%20Editor" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rupjyoti Nath</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>56K</strong> Followers</span>
                        <span>North Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rupjyoti%20Nath" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Jintee</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>66.7K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Jintee" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Mintu Dancer</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>51K</strong> Followers</span>
                        <span>Dibrugarh</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Mintu%20Dancer" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nilakshi R Sarma</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>69K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nilakshi%20R%20Sarma" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dhritiman Kalita</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>49.9K</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dhritiman%20Kalita" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Voklandu</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>North Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Voklandu" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">O Bolo Namaskar</h3>
                        <p className="creator-niche">Infotainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20O%20Bolo%20Namaskar" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Biswajit Rabha</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Biswajit%20Rabha" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rabbani Shyam</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rabbani%20Shyam" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nibir Bora</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Upper Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nibir%20Bora" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Krishangi Saikia</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Krishangi%20Saikia" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Afreen</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Afreen" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Kongkon Talukdar</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Kongkon%20Talukdar" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rimi Kashyap</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>North Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rimi%20Kashyap" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Pulak Nixasor</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Pulak%20Nixasor" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Pakhi Rajbonshi</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Middle Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Pakhi%20Rajbonshi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rajashree Das</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rajashree%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Hrittize Baruah</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Tezpur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Hrittize%20Baruah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Geetika Devi</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Tezpur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Geetika%20Devi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Dhruba Das</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Dhruba%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sagar Jyoti Borah</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sagar%20Jyoti%20Borah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Saini Devi</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Lower Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Saini%20Devi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Geetu Moni</h3>
                        <p className="creator-niche">Lifestyle / Daily Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>N/A</strong> Followers</span>
                        <span>Middle Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Geetu%20Moni" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Priyakhi Mozinder Boruah</h3>
                        <p className="creator-niche">Lifestyle/Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>36.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Priyakhi%20Mozinder%20Boruah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Chinmoyee Duwarah</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>93.4k</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Chinmoyee%20Duwarah" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Chajida Begum</h3>
                        <p className="creator-niche">Lifestyle/Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>57.1K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Chajida%20Begum" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Ragini Sharma</h3>
                        <p className="creator-niche">Model/Actor</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>12.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Ragini%20Sharma" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">B A R N A L I</h3>
                        <p className="creator-niche">Model/Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>13.4K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20B%20A%20R%20N%20A%20L%20I" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">linashree</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>29K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20linashree" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nishita Kashyap</h3>
                        <p className="creator-niche">Public Figure</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>19.5K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nishita%20Kashyap" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Angkita Chetry</h3>
                        <p className="creator-niche">Fashion Model</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>15.5K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Angkita%20Chetry" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nihal Kalita</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>128K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nihal%20Kalita" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Abhijit Das</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>71.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Abhijit%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Isha Nath</h3>
                        <p className="creator-niche">Arts & Entertainment</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>50.7K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Isha%20Nath" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Suralakshmi Sonowal</h3>
                        <p className="creator-niche">Creator UGC</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>9.3K</strong> Followers</span>
                        <span>Golaghat</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Suralakshmi%20Sonowal" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Diilani Devi</h3>
                        <p className="creator-niche">Artist</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>32.6K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Diilani%20Devi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Anamika Hazarika</h3>
                        <p className="creator-niche">Model</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>12K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Anamika%20Hazarika" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Simakshi Baisha</h3>
                        <p className="creator-niche">Model</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>8.1K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Simakshi%20Baisha" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Banasri Bharadwaz</h3>
                        <p className="creator-niche">Makeup Artist</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>29.8K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Banasri%20Bharadwaz" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sunayana Gogoi</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>8.2K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sunayana%20Gogoi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sai Rimpi</h3>
                        <p className="creator-niche">Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>11.4K</strong> Followers</span>
                        <span>Jorhat</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sai%20Rimpi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Sarita Limbu</h3>
                        <p className="creator-niche">Dancer</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>80.6K</strong> Followers</span>
                        <span>Golaghat</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Sarita%20Limbu" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Anandita</h3>
                        <p className="creator-niche">Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>98.2K</strong> Followers</span>
                        <span>Guwahati</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Anandita" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Prastuti Medhi</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>60.9K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Prastuti%20Medhi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Karishmita Das</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>170K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Karishmita%20Das" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Amardeep</h3>
                        <p className="creator-niche">Streamer</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>14.9K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Amardeep" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Rajashree Barman</h3>
                        <p className="creator-niche">Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>59.1K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Rajashree%20Barman" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Stacy Ihungdim</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>34K</strong> Followers</span>
                        <span>Manipur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Stacy%20Ihungdim" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Korobi Bsmtry</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>14.9K</strong> Followers</span>
                        <span>Meghalaya</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Korobi%20Bsmtry" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Prabolya Protim</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>24.2K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Prabolya%20Protim" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Anjali Thounaojam</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>50.1K</strong> Followers</span>
                        <span>Manipur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Anjali%20Thounaojam" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Angun S Langkam</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>39.7K</strong> Followers</span>
                        <span>Arunachal</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Angun%20S%20Langkam" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Techi Anung</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>77.3K</strong> Followers</span>
                        <span>Arunachal</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Techi%20Anung" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Luffy Rai</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>23.8K</strong> Followers</span>
                        <span>Sikkim</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Luffy%20Rai" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Kim Pretty</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>39.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Kim%20Pretty" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Chika Naga</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>9.6K</strong> Followers</span>
                        <span>Nagaland</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Chika%20Naga" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Mr Kanak</h3>
                        <p className="creator-niche">Travel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>9.6K</strong> Followers</span>
                        <span>Tripura</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Mr%20Kanak" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Visse Angami</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>11.6K</strong> Followers</span>
                        <span>Nagaland</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Visse%20Angami" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nika Kappo</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>35.4K</strong> Followers</span>
                        <span>Nagaland</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nika%20Kappo" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Maynumpetch</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>107K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Maynumpetch" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Chanchui Khayi</h3>
                        <p className="creator-niche">Public Figure</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>55.8K</strong> Followers</span>
                        <span>Manipur</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Chanchui%20Khayi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Kumrila Quinker</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>12.3K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Kumrila%20Quinker" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Neme</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>173K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Neme" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Ngapu Gadi</h3>
                        <p className="creator-niche">Digital Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>67.2K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Ngapu%20Gadi" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Bara Atey</h3>
                        <p className="creator-niche">Vlogger</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>6.7K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Bara%20Atey" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Menguseu Suokhrie</h3>
                        <p className="creator-niche">Artist</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>63.7K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Menguseu%20Suokhrie" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Yami</h3>
                        <p className="creator-niche">Reel Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>11.2K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Yami" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Nikita</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>9.4K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Nikita" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
                <div className="creator-list-item">
                    <div className="creator-list-info">
                        <h3 className="creator-name">Abhilasha Neog</h3>
                        <p className="creator-niche">Content Creator</p>
                    </div>
                    <div className="creator-list-stats">
                        <span><strong>45.5K</strong> Followers</span>
                        <span>Assam</span>
                    </div>
                    <div className="creator-list-action">
                        <a href="https://wa.me/919395228160?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20Abhilasha%20Neog" target="_blank" className="explore-btn">CONTACT VIA WHATSAPP ↗</a>
                    </div>
                </div>
            </div>
            
            <div style={{"textAlign":"center","marginTop":"4rem"}}>
                <button className="explore-btn" style={{"width":"auto","padding":"1rem 3rem","fontSize":"1.1rem","borderRadius":"30px"}}>LOAD MORE CREATORS</button>
            </div>
        </div>
    </section>

    <footer className="footer-section">
        <h2 className="footer-massive reveal">LET'S TALK</h2>
        <div className="footer-links fade-in delay-1">
            <div className="footer-col">© 2026 CREATOR HUT AGENCY</div>
            <div className="footer-col">
                <a href="#" style={{"color":"white","textDecoration":"none","margin":"0 10px"}}>INSTAGRAM</a>
                <a href="#" style={{"color":"white","textDecoration":"none","margin":"0 10px"}}>TWITTER</a>
                <a href="#" style={{"color":"white","textDecoration":"none","margin":"0 10px"}}>LINKEDIN</a>
            </div>
            <div className="footer-col">HELLO@CREATORHUT.AGENCY</div>
        </div>
    </footer>
    {/*  INTERSECTION OBSERVER SCRIPT FOR ANIMATIONS  */}
    
    
    
    

    

    {/*  INTERACTIVE FEATURES SCRIPT  */}
    


        </>
    );
}
