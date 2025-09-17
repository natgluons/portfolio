// Text bounce animation handler
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer to trigger animations when elements come into view
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class to trigger the bounce effect
                entry.target.classList.add('animate-bounce');
                // Stop observing this element once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Create intersection observer for "Why Work With Me?" text enlargement (repeating)
    const enlargeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove any existing animation class first
                entry.target.classList.remove('animate-enlarge');
                // Force a reflow to ensure the class removal takes effect
                entry.target.offsetHeight;
                // Add the animation class to trigger the enlarge effect
                entry.target.classList.add('animate-enlarge');
                // Keep observing this element so it can animate again
            }
        });
    }, observerOptions);

    // Observe all elements with text-bounce class
    const bounceElements = document.querySelectorAll('.text-bounce');
    bounceElements.forEach(element => {
        observer.observe(element);
    });

    // Observe the "Why Work With Me?" text for enlargement animation
    const whyWorkElement = document.querySelector('.why-work-text');
    if (whyWorkElement) {
        enlargeObserver.observe(whyWorkElement);
    }

    // Also handle elements that should animate on page load (like the main heading)
    const immediateAnimateElements = document.querySelectorAll('#text16 .text-bounce');
    immediateAnimateElements.forEach(element => {
        element.classList.add('animate-bounce');
    });
});
