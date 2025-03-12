document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.expand-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Function to handle smooth scrolling for any anchor link
    function setupSmoothScroll(linkSelector, targetId) {
        const button = document.querySelector(linkSelector);
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Check if we're already on the work experience page - don't override that URL
                if (window.location.hash === '#workexperience') {
                    // Just scroll to the services section without changing URL
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({behavior: 'smooth'});
                        console.log("Scrolled to " + targetId + " (without changing URL)");
                    }
                } else {
                    // Normal behavior - scroll and update URL
                    setTimeout(function() {
                        const targetSection = document.getElementById(targetId);
                        if (targetSection) {
                            targetSection.scrollIntoView({behavior: 'smooth'});
                            history.pushState(null, null, '#' + targetId);
                            console.log("Scrolled to " + targetId);
                        } else {
                            console.error("Section " + targetId + " not found");
                        }
                    }, 10);
                }
                
                return false;
            });
        } else {
            console.error("Button " + linkSelector + " not found");
        }
    }
    
    // Setup smooth scrolling for Services
    setupSmoothScroll('a[href="#services"]', 'services');
});