document.addEventListener("DOMContentLoaded", function () {
    const themeSelect = document.getElementById('theme-select');
    const html = document.documentElement;
    const DEFAULT_THEME = 'dark';

    const applyTheme = (newTheme) => {
        html.setAttribute('data-theme', newTheme);
    };

    applyTheme(DEFAULT_THEME);

    if (themeSelect) {
        themeSelect.value = DEFAULT_THEME;

        themeSelect.addEventListener('change', (event) => {
            const selectedTheme = event.target.value === 'light' ? 'light' : 'dark';
            applyTheme(selectedTheme);
        });
    }
});
