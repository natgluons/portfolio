/**
 * This script fixes the scrolling behavior for the services section.
 * Add this script by including it at the end of your HTML file, before the closing </body> tag.
 * 
 * <script src="fix-services-scroll.js"></script>
 */

document.addEventListener("DOMContentLoaded", function() {
    // Fix for services link to prevent jumps
    const servicesLink = document.querySelector('a[href="#services"]');
    if (servicesLink) {
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const servicesSection = document.getElementById('services-section');
            if (servicesSection) {
                // Update URL without causing page reload
                history.pushState(null, null, '#services');
                
                // Manually scroll to the services section
                servicesSection.scrollIntoView({ behavior: 'smooth' });
                
                // Prevent other events
                return false;
            }
        });
    }

    // Check if the URL hash is #services on page load and scroll to it
    if (window.location.hash === '#services') {
        setTimeout(function() {
            const servicesSection = document.getElementById('services-section');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // Short delay to ensure the page is fully loaded
    }
}); 