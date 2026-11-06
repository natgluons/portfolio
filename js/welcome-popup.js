document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcome-popup');
    const closeBtn = document.getElementById('welcome-popup-close');

    if (!popup || !closeBtn) {
        return;
    }

    // Show the welcome popup only once per visitor.
    let alreadySeen = false;
    try {
        alreadySeen = localStorage.getItem('welcomePopupSeen') === 'true';
    } catch (e) { /* ignore unavailable storage */ }

    if (alreadySeen) {
        popup.remove();
        return;
    }

    try {
        localStorage.setItem('welcomePopupSeen', 'true');
    } catch (e) { /* ignore unavailable storage */ }

    const dismiss = function () {
        popup.classList.add('is-dismissed');
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
