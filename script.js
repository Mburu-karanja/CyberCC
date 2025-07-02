// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed navbar (assuming navbar height is ~80px)
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop - 80, // Subtract navbar height
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Form submission (UPDATED FOR FORMSPREE)
    const membershipForm = document.getElementById('membershipForm');
    if (membershipForm) {
        membershipForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission

            const formStatus = document.getElementById('form-status');
            formStatus.innerHTML = 'Sending...';
            formStatus.style.color = 'orange';

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const university = document.getElementById('university').value;
            const interest = document.getElementById('interest').value;

            // Your Formspree endpoint. This is now correctly set!
            const formspreeEndpoint = 'https://formspree.io/f/xpwrnpoe';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' // Formspree prefers this for AJAX submissions
                    },
                    body: JSON.stringify({ name, email, university, interest })
                });

                if (response.ok) {
                    // --- MODIFIED SUCCESS MESSAGE ---
                    const whatsappLink = 'https://chat.whatsapp.com/DJqPpPx9PRH36vQGHGuhe3?mode=ac_c'; // <--- IMPORTANT: Replace with your actual WhatsApp group invite link
                    formStatus.innerHTML = `
                        Thank you for joining! We will be in touch shortly.<br>
                        In the meantime, feel free to join our WhatsApp group:
                        <br><a href="${whatsappLink}" target="_blank" style="color: #25D366; text-decoration: underline; font-weight: bold;">Join our WhatsApp Group</a>
                    `;
                    formStatus.style.color = 'green';
                    membershipForm.reset(); // Clear the form fields after successful submission
                } else {
                    const data = await response.json(); // Try to parse error message from response
                    formStatus.innerHTML = data.error || 'Oops! There was a problem submitting your form. Please try again.';
                    formStatus.style.color = 'red';
                    console.error('Form submission error:', data);
                }
            } catch (error) {
                console.error('Network or fetch error:', error);
                formStatus.innerHTML = 'Network error. Please check your internet connection and try again later.';
                formStatus.style.color = 'red';
            }
        });
    }

    // Load events dynamically
    const eventsSlider = document.querySelector('.events-slider');
    if (eventsSlider) {
        // In a real implementation, you would fetch this from an API
        const events = [
            {
                date: { day: '09', month: 'JUL' },
                title: 'Online: Cybersecurity in the AI Era',
                description: 'Learn about different roles and how to prepare for them',
                link: '#'
            }
        ];

        // Clear the placeholder
        eventsSlider.innerHTML = '';

        // Add events to slider
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <span class="day">${event.date.day}</span>
                    <span class="month">${event.date.month}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <a href="${event.link}" class="btn small">Upcoming</a>
                    
                </div>
            `;
            eventsSlider.appendChild(eventCard);
        });
    }

    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
