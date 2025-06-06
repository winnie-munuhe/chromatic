document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('nav-open');
            hamburger.classList.toggle('is-active');

            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);

            body.classList.toggle('no-scroll');
        });

        const navLinks = document.querySelectorAll('.main-nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('nav-open')) {
                    navMenu.classList.remove('nav-open');
                    hamburger.classList.remove('is-active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }


    const sliderTrack = document.querySelector('.testimonials-slider-track');
    const testimonialGroups = document.querySelectorAll('.testimonial-group');
    const prevArrow = document.querySelector('.slider-arrow.prev-arrow');
    const nextArrow = document.querySelector('.slider-arrow.next-arrow');

    let currentSlideIndex = 0;
    const totalSlides = testimonialGroups.length;

    function updateSlider() {
        if (totalSlides === 0 || !sliderTrack) {
            if (prevArrow) prevArrow.style.display = 'none';
            if (nextArrow) nextArrow.style.display = 'none';
            return;
        }

        const slideWidth = testimonialGroups[0] ? testimonialGroups[0].offsetWidth : 0; 
        
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

        if (prevArrow) {
            prevArrow.disabled = currentSlideIndex === 0;
        }
        if (nextArrow) {
            nextArrow.disabled = currentSlideIndex === totalSlides - 1;
        }
    }

    if (prevArrow) { 
        prevArrow.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSlider();
            }
        });
    }

    if (nextArrow) { 
        nextArrow.addEventListener('click', () => {
            if (currentSlideIndex < totalSlides - 1) {
                currentSlideIndex++;
                updateSlider();
            }
        });
    }

    window.addEventListener('resize', updateSlider);
    updateSlider();


    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                const accordionContent = accordionItem.querySelector('.accordion-content');
                const accordionIcon = this.querySelector('.accordion-icon');

                const isActive = accordionItem.classList.contains('active');

                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                        item.querySelector('.accordion-content').style.maxHeight = 0;
                        item.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
                    }
                });

                if (isActive) {
                    accordionItem.classList.remove('active');
                    accordionContent.style.maxHeight = 0;
                    accordionIcon.style.transform = 'rotate(0deg)';
                } else {
                    accordionItem.classList.add('active');
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    accordionIcon.style.transform = 'rotate(45deg)';
                }
            });
        });
    } else {
        console.warn('No accordion headers found. FAQ accordion will not function.');
    }


    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            formResponse.textContent = '';
            formResponse.classList.remove('success', 'error');
            formResponse.style.display = 'none';

            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!email || !message) {
                formResponse.textContent = 'Please fill in all fields.';
                formResponse.classList.add('error');
                formResponse.style.display = 'block';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formResponse.textContent = 'Please enter a valid email address.';
                formResponse.classList.add('error');
                formResponse.style.display = 'block';
                return;
            }

            console.log('Form submitted (simulated):');
            console.log('Email:', email);
            console.log('Message:', message);

            setTimeout(() => {
                formResponse.textContent = 'Thank you! We will get back to you within 12 hours.';
                formResponse.classList.add('success');
                formResponse.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    formResponse.style.display = 'none';
                    formResponse.textContent = '';
                    formResponse.classList.remove('success', 'error');
                }, 5000);

            }, 1000);
        });
    } else {
        console.warn('Contact form or response element (ID: formResponse) not found. Contact form JS will not function.');
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn('Element with ID "currentYear" not found. Footer year may not update.');
    }

});