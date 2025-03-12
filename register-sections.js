/**
 * Section Registration Script
 * 
 * This script handles:
 * 1. Registration of the 'services' section - standard scrolling behavior
 * 2. Registration of the 'workexperience' section - show only that section
 * 
 * Add this script just before the closing </body> tag in your HTML
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Sections registration script loaded");

    // Register sections in the framework
    if (typeof window.sections === 'object') {
        // Register services section - standard scrolling behavior
        window.sections['services'] = {
            hideHeader: false,
            hideFooter: false,
            disableAutoScroll: false
        };
        
        // Register workexperience section - show only this section
        window.sections['workexperience'] = {
            hideHeader: false,
            hideFooter: false,
            disableAutoScroll: false
        };
        
        console.log('Sections registered:', window.sections);
    } else {
        console.error('sections object not found');
    }
    
    // Add special handling for workexperience section
    const workExpLink = document.querySelector('a[href="#workexperience"]');
    if (workExpLink) {
        workExpLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections except workexperience
            const allSections = document.querySelectorAll('#main > .inner > section');
            const workExpSection = document.getElementById('workexperience-section');
            
            if (workExpSection) {
                // Hide all other sections
                allSections.forEach(section => {
                    if (section !== workExpSection) {
                        section.classList.add('inactive');
                        section.classList.remove('active');
                        section.style.display = 'none';
                    }
                });
                
                // Show work experience section
                workExpSection.classList.remove('inactive');
                workExpSection.classList.add('active');
                workExpSection.style.display = '';
                
                // Update URL
                history.pushState(null, null, '#workexperience');
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
        });
    } else {
        console.error("Work experience link not found");
    }
    
    // Check if URL has hash on page load
    if (window.location.hash === '#workexperience') {
        // Trigger the workexperience view
        const workExpSection = document.getElementById('workexperience-section');
        const allSections = document.querySelectorAll('#main > .inner > section');
        
        if (workExpSection) {
            // Hide all other sections
            allSections.forEach(section => {
                if (section !== workExpSection) {
                    section.classList.add('inactive');
                    section.classList.remove('active');
                    section.style.display = 'none';
                }
            });
            
            // Show work experience section
            workExpSection.classList.remove('inactive');
            workExpSection.classList.add('active');
            workExpSection.style.display = '';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    } else if (window.location.hash === '#services') {
        // For #services, we use the existing framework's scrolling behavior
        // This will be handled automatically by the framework
        console.log("Services hash detected, using framework's scrolling");
    }
}); 