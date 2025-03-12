document.addEventListener("DOMContentLoaded", function () {
    // Initially hide the work experience section
    const workExpSection = document.getElementById('workexperience');
    if (workExpSection) {
        // Check if URL already has #workexperience
        if (window.location.hash === '#workexperience') {
            workExpSection.style.display = 'block';
            document.querySelectorAll('section').forEach(section => {
                if (section.id !== 'workexperience') {
                    section.style.display = 'none';
                }
            });
        } else {
            workExpSection.style.display = 'none';
        }
    }

    // Handle click on work experience link
    const workExpLinks = document.querySelectorAll('a[href="#workexperience"]');
    workExpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show only the work experience section
            if (workExpSection) {
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = section.id === 'workexperience' ? 'block' : 'none';
                });
                
                // Update the URL - using a simpler method that should stay
                window.location.hash = 'workexperience';
                
                // Log for debugging
                console.log("Hash set to:", window.location.hash);
            }
        });
    });
    
    // Home/Back button to restore all sections
    const homeLinks = document.querySelectorAll('a[href="#home"], a[href="/"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show all sections except work experience
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.id === 'workexperience' ? 'none' : 'block';
            });
            
            // Clear the hash without causing a jump
            if (history.pushState) {
                history.pushState(null, null, window.location.pathname);
            } else {
                window.location.hash = '';
            }
            
            window.scrollTo(0, 0);
        });
    });
    
    // Add specific handling for the back button with the SVG icon
    const backButton = document.querySelector('a.button.n01');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show all sections except work experience
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.id === 'workexperience' ? 'none' : 'block';
            });
            
            // Clear the hash without causing a jump
            if (history.pushState) {
                history.pushState(null, null, window.location.pathname);
            } else {
                window.location.hash = '';
            }
            
            window.scrollTo(0, 0);
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        console.log("Popstate triggered, hash:", window.location.hash);
        
        if (window.location.hash === '#workexperience') {
            // Show work experience section
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.id === 'workexperience' ? 'block' : 'none';
            });
        } else {
            // Show all sections except work experience
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.id === 'workexperience' ? 'none' : 'block';
            });
            window.scrollTo(0, 0);
        }
    });
});