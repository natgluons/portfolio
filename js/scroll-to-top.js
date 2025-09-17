// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollTopBtn');
    const scrollToTopContainer = document.getElementById('scroll-to-top');
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopContainer.classList.add('visible');
        } else {
            scrollToTopContainer.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
