document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Fade-in Animation for Sections ---
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        fadeObserver.observe(section);
    });


    // --- Netlify Form Handling ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        try {
            // This is the fetch request that sends the form data to Netlify
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            });

            if (response.ok) {
                formStatus.textContent = "Thank you! Your message has been sent.";
                formStatus.style.color = "var(--accent-blue)";
                form.reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            formStatus.textContent = "Oops! Something went wrong. Please try again.";
            formStatus.style.color = "var(--accent-pink)";
        }
        
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    };

    form.addEventListener("submit", handleSubmit);

});

