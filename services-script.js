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
                
                return false;
            });
        } else {
            console.error("Button " + linkSelector + " not found");
        }
    }
    
    // Setup smooth scrolling for Services
    setupSmoothScroll('a[href="#services"]', 'services');
});