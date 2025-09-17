document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const images = document.querySelectorAll('.image img, .gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    /**
     * Close the lightbox and restore scrolling
     */
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Initialize zoomable images
    images.forEach(img => {
        img.classList.add('zoomable');
        img.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});