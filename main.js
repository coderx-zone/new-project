

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const overlay = document.getElementById('mobileOverlay');
            overlay.classList.toggle('active');
        }

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on load

        // Animated counters
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 50;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (target > 100) {
                            counter.innerText = Math.ceil(current) + '+';
                        } else {
                            counter.innerText = Math.ceil(current) + (target === 98 ? '%' : '+');
                        }
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target + (target === 98 ? '%' : '+');
                    }
                };

                // Trigger when element is in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCounter();
                            observer.unobserve(entry.target);
                        }
                    });
                });

                observer.observe(counter);
            });
        };

        animateCounters();

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--orange);
                color: var(--navy);
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease;
            `;
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll contact you soon.';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 5000);

            this.reset();
        });

        // Add slideIn animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        //Email.js code
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Data nikalne ka sabse pakka tareeqa
    const name = this.querySelector('[name="form_name"]').value;
    const email = this.querySelector('[name="user_email"]').value;
    const whatsapp = this.querySelector('[name="whatsapp_number"]').value;
    const msg = this.querySelector('[name="message"]').value;

    const btn = document.querySelector('.submit-btn');
    const originalContent = btn.innerHTML;
    btn.innerText = 'Processing...';

    // EmailJS ko data bhejte waqt object ka use karein
    emailjs.send("service_6c1635f", "template_e2gub9n", {
        form_name: name,
        user_email: email,
        whatsapp_number: whatsapp,
        message: msg
    })
    .then(function() {
        // WhatsApp Message Link
        const myNumber = "923058758360"; 
        const messageText = `*Naya Message!*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*WhatsApp:* ${whatsapp}%0A*Message:* ${msg}`;
        const whatsappURL = `https://wa.me/${myNumber}?text=${messageText}`;

        window.open(whatsappURL, '_blank').focus();

        alert('Success! Message Sent.');
        btn.innerHTML = originalContent;
        document.getElementById('contactForm').reset(); 
    }, function(error) {
        alert('Failed: ' + JSON.stringify(error));
        btn.innerHTML = originalContent;
    });
});