// Main initialization
document.addEventListener("DOMContentLoaded", function() {
    // Initialize expand buttons
    const buttons = document.querySelectorAll('.expand-btn');
    buttons.forEach(button => {
        const content = button.nextElementSibling;
        content.style.display = 'none'; // Ensure content starts collapsed
        const detailText = document.createElement('div');
        detailText.textContent = '▶ Show Details';
        detailText.style.fontFamily = 'Inter, sans-serif'; // Set font family
        detailText.style.cursor = 'pointer'; // Make detail text clickable
        detailText.style.color = 'grey'; // Set text color to soft grey
        content.parentNode.insertBefore(detailText, content); // Insert detail text before content
        detailText.addEventListener('click', function() {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            detailText.textContent = isExpanded ? '▶ Show Details' : '▼ Hide Details';
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
