document.addEventListener('DOMContentLoaded', function() {
 
    const sliderTrack = document.querySelector('.testimonials-slider-track');
    const testimonialGroups = document.querySelectorAll('.testimonial-group');
    const prevArrow = document.querySelector('.slider-arrow.prev-arrow');
    const nextArrow = document.querySelector('.slider-arrow.next-arrow');

    let currentSlideIndex = 0;
    const totalSlides = testimonialGroups.length;

    function updateSlider() {
        if (totalSlides === 0) {

            if (prevArrow) prevArrow.style.display = 'none';
            if (nextArrow) nextArrow.style.display = 'none';
            return;
        }

        const slideWidth = testimonialGroups[0].offsetWidth;

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

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});


document.addEventListener('DOMContentLoaded', function() {

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

});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            formResponse.textContent = '';
            formResponse.classList.remove('show', 'success', 'error');

            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!email || !message) {
                formResponse.textContent = 'Please fill in all fields.';
                formResponse.classList.add('show', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formResponse.textContent = 'Please enter a valid email address.';
                formResponse.classList.add('show', 'error');
                return;
            }

            setTimeout(() => { 
                formResponse.textContent = 'Thank you! We will get back to you within 12 hours.';
                formResponse.classList.add('show', 'success');
                contactForm.reset();
            }, 1000); 

        });
    } else {
        console.warn('Contact form or response element not found. Contact form JS will not function.');
    }
});


document.addEventListener('DOMContentLoaded', function() {

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});