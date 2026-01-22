document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const THEME_KEY = 'theme';
    const THEME_VERSION_KEY = 'theme-version';
    const CURRENT_THEME_VERSION = '2';

    const savedTheme = localStorage.getItem(THEME_KEY);
    const savedVersion = localStorage.getItem(THEME_VERSION_KEY);
    const isCurrentVersion = savedVersion === CURRENT_THEME_VERSION;

    // Default to dark when there is no up-to-date override
    let theme = isCurrentVersion && savedTheme ? savedTheme : 'dark';

    function setTheme(newTheme) {
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        localStorage.setItem(THEME_VERSION_KEY, CURRENT_THEME_VERSION);
    }

    setTheme(theme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            theme = theme === 'light' ? 'dark' : 'light';
            setTheme(theme);
        });
    }
});
