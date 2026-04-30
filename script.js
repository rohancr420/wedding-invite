document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Envelope Animation Logic
    const openBtn = document.getElementById('openInviteBtn');
    const overlay = document.getElementById('envelopeOverlay');
    const mainContent = document.getElementById('mainContent');
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    openBtn.addEventListener('click', () => {
        // Fade out overlay
        overlay.classList.add('open');
        
        // Show main content immediately so we can scroll
        mainContent.style.display = 'block';
        
        // Show music button
        musicBtn.style.display = 'flex';
        
        // Auto-play music if possible
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            document.getElementById('musicOn').style.display = 'block';
            document.getElementById('musicOff').style.display = 'none';
        }).catch(e => console.log('Auto-play blocked', e));

        // Optional smooth scroll to top just in case
        window.scrollTo(0, 0);

        // Remove overlay from DOM after animation completes (1 second)
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    });

    // 2. Music Toggle Logic
    let isMusicPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            document.getElementById('musicOn').style.display = 'none';
            document.getElementById('musicOff').style.display = 'block';
        } else {
            bgMusic.play();
            document.getElementById('musicOn').style.display = 'block';
            document.getElementById('musicOff').style.display = 'none';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 3. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // 4. Smooth Scrolling for internal links (RSVP)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. RSVP Form Submission (Mock with Local Storage)
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect data
            const name = document.getElementById('name').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;

            console.log('RSVP Submitted:', { name, attendance, guests });

            // Show success message and hide form
            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
            
            // Save to localStorage
            localStorage.setItem('rsvp_status', 'submitted');
            localStorage.setItem('rsvp_name', name);
        });
    }

    // Check if already RSVPed
    if (localStorage.getItem('rsvp_status') === 'submitted' && rsvpForm) {
        const savedName = localStorage.getItem('rsvp_name');
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        rsvpSuccess.innerHTML = `Thank you, ${savedName}! Your RSVP has been received.`;
    }
});
