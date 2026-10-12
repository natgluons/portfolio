document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle');

    if (!audio || !toggleBtn) {
        return;
    }

    const PREF_KEY = 'musicEnabled';   // user's on/off preference
    const TIME_KEY = 'musicTime';      // last playback position (seconds)

    // Restore the user's preference (default: on).
    let musicEnabled = localStorage.getItem(PREF_KEY) !== 'false';

    // Restore the playback position so the song continues where it left off
    // instead of restarting when navigating between pages.
    const savedTime = parseFloat(localStorage.getItem(TIME_KEY));
    const hasSavedTime = !isNaN(savedTime) && savedTime > 0;

    // Returns a promise that resolves once the saved position has been applied
    // (or immediately when there is nothing to restore).
    function restorePosition() {
        if (!hasSavedTime) {
            return Promise.resolve();
        }
        return new Promise(function (resolve) {
            const applyTime = function () {
                // Clamp in case the saved value is stale / beyond the track.
                if (savedTime < audio.duration) {
                    audio.currentTime = savedTime;
                }
                resolve();
            };
            if (audio.readyState >= 1) {
                applyTime();
            } else {
                audio.addEventListener('loadedmetadata', applyTime, { once: true });
            }
        });
    }

    // Continuously remember the current playback position.
    let lastSaved = 0;
    audio.addEventListener('timeupdate', function () {
        if (Math.abs(audio.currentTime - lastSaved) >= 1) {
            lastSaved = audio.currentTime;
            try {
                localStorage.setItem(TIME_KEY, String(audio.currentTime));
            } catch (e) { /* ignore quota errors */ }
        }
    });

    function updateButton() {
        toggleBtn.classList.toggle('is-playing', musicEnabled);
        toggleBtn.setAttribute('aria-pressed', String(musicEnabled));
        toggleBtn.setAttribute('aria-label', musicEnabled ? 'Pause background music' : 'Play background music');
    }

    function playMusic() {
        audio.volume = 0.35;
        const promise = audio.play();
        if (promise !== undefined) {
            promise.catch(function () {
                // Autoplay was blocked; wait for the first user interaction.
                document.addEventListener('click', startOnInteraction, { once: true });
                document.addEventListener('keydown', startOnInteraction, { once: true });
            });
        }
    }

    function startOnInteraction() {
        if (musicEnabled) {
            audio.play().catch(function () {});
        }
    }

    // Set initial state.
    updateButton();
    if (musicEnabled) {
        // Wait for the saved position to be applied before starting playback
        // so the track resumes from the same spot rather than restarting.
        restorePosition().then(playMusic);
    }

    toggleBtn.addEventListener('click', function () {
        musicEnabled = !musicEnabled;

        if (musicEnabled) {
            playMusic();
        } else {
            audio.pause();
        }

        localStorage.setItem(PREF_KEY, String(musicEnabled));
        updateButton();
    });

    // Save the exact position right before leaving the page so the next page
    // picks up smoothly from the same spot.
    window.addEventListener('pagehide', function () {
        try {
            localStorage.setItem(TIME_KEY, String(audio.currentTime));
            localStorage.setItem(PREF_KEY, String(musicEnabled && !audio.paused));
        } catch (e) { /* ignore */ }
    });

    window.addEventListener('beforeunload', function () {
        try {
            localStorage.setItem(TIME_KEY, String(audio.currentTime));
        } catch (e) { /* ignore */ }
    });
});
