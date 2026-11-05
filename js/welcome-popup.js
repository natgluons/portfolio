document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcome-popup');
    const closeBtn = document.getElementById('welcome-popup-close');

    if (!popup || !closeBtn) {
        return;
    }

    const DISMISS_KEY = 'welcomePopupDismissed';

    try {
        if (localStorage.getItem(DISMISS_KEY) === 'true') {
            popup.remove();
            return;
        }
    } catch (e) { /* ignore unavailable storage */ }

    const dismiss = function () {
        popup.classList.add('is-dismissed');
        try {
            localStorage.setItem(DISMISS_KEY, 'true');
        } catch (e) { /* ignore quota errors */ }
        window.setTimeout(function () {
            popup.remove();
        }, 220);
    };

    closeBtn.addEventListener('click', dismiss);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            dismiss();
        }
    });
});
