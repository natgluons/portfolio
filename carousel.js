document.addEventListener('DOMContentLoaded', () => {
    // Carousel initialization
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoScrollInterval;

    // Initialize dots
    carouselItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('active');

    // Update carousel position and dots
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Navigation handlers
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Event listeners
    nextButton.addEventListener('click', () => {
        resetAutoScroll();
        nextSlide();
    });

    prevButton.addEventListener('click', () => {
        resetAutoScroll();
        prevSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            resetAutoScroll();
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        });
    });

    // Initialize auto-scroll
    startAutoScroll();

    // Handle window resize
    window.addEventListener('resize', () => {
        carouselContainer.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            carouselContainer.style.transition = 'transform 0.5s ease';
        }, 10);
    });
});
