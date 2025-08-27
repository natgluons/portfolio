document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Get the theme from local storage or default to light
    let theme = localStorage.getItem('theme') || 'light';

    function setTheme(newTheme) {
        // Set the data-theme attribute on the html element
        html.setAttribute('data-theme', newTheme);
        // Store the new theme in local storage
        localStorage.setItem('theme', newTheme);
    }

    // Set the initial theme on page load
    setTheme(theme);

    // Add click event listener to the toggle switch
    toggleBtn.addEventListener('click', () => {
        // Toggle between light and dark
        theme = theme === 'light' ? 'dark' : 'light';
        setTheme(theme);
    });
});