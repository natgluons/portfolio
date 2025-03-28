// Utility functions
const toggleSectionVisibility = (showWorkExp) => {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = section.id === 'workexperience' ? 
            (showWorkExp ? 'block' : 'none') : 
            (showWorkExp ? 'none' : 'block');
    });
};

const updateURL = (section = null) => {
    const url = new URL(window.location);
    if (section) {
        url.searchParams.set('section', section);
    } else {
        url.searchParams.delete('section');
    }
    window.history.pushState({}, '', url);
};

// Main initialization
document.addEventListener("DOMContentLoaded", function() {
    // Get references to key elements
    const workExpSection = document.getElementById('workexperience');
    const servicesSection = document.getElementById('services');

    // Initialize expand buttons
    const buttons = document.querySelectorAll('.expand-btn');
    buttons.forEach(button => {
        const content = button.nextElementSibling;
        content.style.display = 'none'; // Ensure content starts collapsed
        const detailText = document.createElement('div');
        detailText.textContent = '▶ Show Details';
        detailText.style.cursor = 'pointer'; // Make detail text clickable
        detailText.style.color = 'grey'; // Set text color to soft grey
        detailText.style.font = 'inherit'; // Inherit font style
        content.parentNode.insertBefore(detailText, content); // Insert detail text before content
        detailText.addEventListener('click', function() {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            detailText.textContent = isExpanded ? '▶ Show Details' : '▼ Hide Details';
        });
    });

    // Initialize visibility based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const showWorkExp = urlParams.get('section') === 'workexperience';
    
    if (workExpSection) {
        toggleSectionVisibility(showWorkExp);
    }

    // Handle work experience link clicks
    const workExpLinks = document.querySelectorAll('a[href="#workexperience"]');
    workExpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (workExpSection) {
                toggleSectionVisibility(true);
                updateURL('workexperience');
                window.scrollTo(0, 0);
            }
        });
    });

    // Setup smooth scrolling for Services
    const servicesLinks = document.querySelectorAll('a[href="#services"]');
    servicesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (!showWorkExp && servicesSection) {
                servicesSection.scrollIntoView({behavior: 'smooth'});
            }
        });
    });

    // Handle home/back navigation
    const homeLinks = document.querySelectorAll('a[href="#home"], a[href="/"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSectionVisibility(false);
            updateURL();
            window.scrollTo(0, 0);
        });
    });

    // Handle back button with SVG icon
    const backButton = document.querySelector('a.button.n01');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSectionVisibility(false);
            updateURL();
            window.scrollTo(0, 0);
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const params = new URLSearchParams(window.location.search);
        const showWorkExp = params.get('section') === 'workexperience';
        toggleSectionVisibility(showWorkExp);
        if (!showWorkExp) {
            window.scrollTo(0, 0);
        }
    });
});

// Handle "Find out more" button
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.querySelector('#buttons05-more .button.n01');
    if (moreBtn) {
        moreBtn.addEventListener('click', function() {
            window.open('https://drive.google.com/file/d/1MvMYpH865OfiwLfzt2uhZTW0iV33_Spz/view', '_blank');
        });
    }
});

// Handle custom back button
document.addEventListener('DOMContentLoaded', function() {
    const customBackButton = document.getElementById('custom-back-button');
    
    if (customBackButton) {
        // Remove any existing event listeners
        const newBackButton = customBackButton.cloneNode(true);
        customBackButton.parentNode.replaceChild(newBackButton, customBackButton);
        
        newBackButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            toggleSectionVisibility(false);
            
            const workExpButton = document.querySelector('.work-btn');
            if (workExpButton) {
                setTimeout(function() {
                    workExpButton.scrollIntoView({behavior: 'smooth', block: 'center'});
                    history.pushState(null, null, window.location.pathname);
                }, 100);
            }
            
            return false;
        });
    }
});

