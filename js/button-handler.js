// Main initialization
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.expand-btn').forEach(button => {
        const content = document.getElementById(button.getAttribute('aria-controls'));
        if (!content) return;

        button.addEventListener('click', function() {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isExpanded));
            content.hidden = isExpanded;
        });
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
