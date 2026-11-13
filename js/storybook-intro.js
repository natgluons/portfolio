(function () {
    const SEEN_KEY = 'nat-storybook-seen';
    const SVG_BASE = 'assets/svg/intro/';
    const PNG_BASE = 'assets/images/intro/';

    function storageGet(key) {
        try {
            return window.sessionStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function storageSet(key, value) {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (error) {
        }
    }

    function storageRemove(key) {
        try {
            window.sessionStorage.removeItem(key);
        } catch (error) {
        }
    }

    function mount(options) {
        const config = options || {};
        const root = config.root || document.getElementById('nat-storybook-intro');
        if (!root) {
            return null;
        }

        if (!config.showEveryVisit && storageGet(SEEN_KEY) === 'yes') {
            root.remove();
            return null;
        }

        const header = document.querySelector('.main-header');
        const artButton = root.querySelector('.nat-intro__art') || root.querySelector('.nat-intro__start');
        const title = root.querySelector('.nat-intro__title');
        const welcomeTitle = title ? title.innerHTML : null;
        const preludeLines = Array.from(root.querySelectorAll('.nat-intro__prelude-line'));
        const preludeTexts = Array.from(root.querySelectorAll('.nat-intro__prelude-text'));
        const footer = root.querySelector('.nat-intro__footer');
        const explicitTheme = config.theme === 'light' || config.theme === 'dark' ? config.theme : null;
        const onEnter = typeof config.onEnter === 'function' ? config.onEnter : null;
        const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
        const timers = new Set();
        let themeObserver = null;
        let headerObserver = null;
        let locked = false;
        let closed = false;
        let opening = false;
        let previousOverflow = '';
        let previousFocus = document.activeElement;
        let loadHandler = null;

        function prefersReducedMotion() {
            return Boolean(motionQuery && motionQuery.matches);
        }

        function later(callback, delay) {
            const timer = window.setTimeout(function () {
                timers.delete(timer);
                callback();
            }, delay);
            timers.add(timer);
            return timer;
        }

        function clearTimers() {
            timers.forEach(function (timer) {
                window.clearTimeout(timer);
            });
            timers.clear();
        }

        function currentTheme() {
            if (explicitTheme) {
                return explicitTheme;
            }
            return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        }

        function applyTheme(theme) {
            const nextTheme = theme === 'dark' || theme === 'light' ? theme : currentTheme();
            root.setAttribute('data-theme', nextTheme);

            root.querySelectorAll('[data-intro-img]').forEach(function (image) {
                const name = image.getAttribute('data-intro-img');
                if (name) {
                    image.src = SVG_BASE + nextTheme + '/' + name + '.svg';
                }
            });

            root.querySelectorAll('[data-intro-cover]').forEach(function (image) {
                const name = image.getAttribute('data-intro-cover');
                if (name) {
                    image.src = PNG_BASE + nextTheme + '-' + name + '.png';
                }
            });

            if (footer) {
                footer.style.backgroundImage = 'url("' + SVG_BASE + nextTheme + '/pixel-grass-footer.svg")';
            }
        }

        function syncHeaderOffset() {
            const height = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
            root.style.setProperty('--ni-top', (height > 0 ? height : 64) + 'px');
        }

        function lockScroll() {
            if (locked) {
                return;
            }
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            document.documentElement.classList.add('nat-intro-active');
            locked = true;
        }

        function unlockScroll() {
            if (!locked) {
                return;
            }
            document.body.style.overflow = previousOverflow;
            document.documentElement.classList.remove('nat-intro-active');
            locked = false;
        }

        function observeTheme() {
            if (explicitTheme || themeObserver || !window.MutationObserver) {
                return;
            }
            themeObserver = new MutationObserver(function () {
                if (!explicitTheme) {
                    applyTheme();
                }
            });
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme', 'class']
            });
        }

        function focusStart() {
            const target = artButton || root;
            if (!target || typeof target.focus !== 'function') {
                return;
            }
            window.requestAnimationFrame(function () {
                target.focus({ preventScroll: true });
            });
        }

        function conceal() {
            clearTimers();
            closed = true;
            opening = false;
            root.classList.add('is-hidden');
            root.setAttribute('aria-hidden', 'true');
            root.hidden = true;
            unlockScroll();
            if (themeObserver) {
                themeObserver.disconnect();
                themeObserver = null;
            }
            if (previousFocus && previousFocus !== document.body && document.contains(previousFocus)) {
                try {
                    previousFocus.focus({ preventScroll: true });
                } catch (error) {
                }
            }
            if (onEnter) {
                onEnter();
            }
        }

        function finish(settings) {
            const animate = !settings || settings.animate !== false;
            if (closed) {
                return;
            }
            storageSet(SEEN_KEY, 'yes');
            if (!animate || prefersReducedMotion()) {
                conceal();
                return;
            }
            closed = true;
            opening = false;
            root.classList.add('is-leaving');
            later(conceal, 650);
        }

        function enter() {
            if (closed || opening || !root.classList.contains('is-revealed')) {
                return;
            }
            opening = true;
            storageSet(SEEN_KEY, 'yes');
            if (title) {
                title.textContent = 'chapter 01';
            }
            root.classList.add('is-opening');
            const reduced = prefersReducedMotion();
            later(function () {
                finish({ animate: !reduced });
            }, reduced ? 420 : 1480);
        }

        function typeLine(line, speed) {
            const target = line ? line.querySelector('.nat-intro__prelude-text') : null;
            if (!target) {
                return;
            }
            const fullText = target.getAttribute('data-text') || '';
            let index = 0;
            line.classList.add('is-typing');
            function typeNext() {
                index += 1;
                target.textContent = fullText.slice(0, index);
                if (index < fullText.length) {
                    later(typeNext, speed);
                } else {
                    line.classList.remove('is-typing');
                    line.classList.add('is-typed');
                }
            }
            typeNext();
        }

        function resetPrelude() {
            preludeLines.forEach(function (line) {
                line.classList.remove('is-typing', 'is-typed');
                const target = line.querySelector('.nat-intro__prelude-text');
                if (target) {
                    target.textContent = '';
                }
            });
            root.classList.remove('is-cloud-away', 'is-revealing', 'is-revealed', 'is-opening', 'is-leaving');
            root.classList.add('is-prelude');
        }

        function startPrelude() {
            resetPrelude();

            if (prefersReducedMotion()) {
                preludeTexts.forEach(function (target) {
                    target.textContent = target.getAttribute('data-text') || '';
                });
                root.classList.add('is-revealing');
                later(function () {
                    root.classList.add('is-revealed');
                    focusStart();
                }, 80);
                return;
            }

            later(function () {
                typeLine(preludeLines[0], 70);
            }, 350);
            later(function () {
                typeLine(preludeLines[1], 58);
            }, 900);
            later(function () {
                root.classList.add('is-cloud-away');
            }, 1750);
            later(function () {
                root.classList.add('is-revealing');
            }, 2550);
            later(function () {
                root.classList.add('is-revealed');
                focusStart();
            }, 3450);
        }

        function show() {
            clearTimers();
            closed = false;
            opening = false;
            if (title && welcomeTitle !== null) {
                title.innerHTML = welcomeTitle;
            }
            previousFocus = document.activeElement;
            if (!root.isConnected) {
                document.body.appendChild(root);
            }
            root.hidden = false;
            root.removeAttribute('aria-hidden');
            root.classList.remove('is-opening', 'is-leaving', 'is-hidden');
            root.classList.add('is-booting');
            syncHeaderOffset();
            applyTheme();
            observeTheme();
            lockScroll();
            if (loadHandler) {
                window.removeEventListener('load', loadHandler);
                loadHandler = null;
            }
            startPrelude();
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    root.classList.remove('is-booting');
                });
            });
        }

        function destroy() {
            clearTimers();
            if (themeObserver) {
                themeObserver.disconnect();
                themeObserver = null;
            }
            if (headerObserver) {
                headerObserver.disconnect();
                headerObserver = null;
            }
            document.removeEventListener('keydown', onKeydown);
            window.removeEventListener('resize', syncHeaderOffset);
            if (loadHandler) {
                window.removeEventListener('load', loadHandler);
                loadHandler = null;
            }
            unlockScroll();
            root.remove();
        }

        function onKeydown(event) {
            if (event.key === 'Escape' && !closed) {
                event.preventDefault();
                finish();
            }
        }

        root.querySelectorAll('[data-intro-open]').forEach(function (button) {
            button.addEventListener('click', enter);
        });

        const skipButton = root.querySelector('[data-intro-skip]');
        if (skipButton) {
            skipButton.addEventListener('click', function () {
                finish();
            });
        }

        document.addEventListener('keydown', onKeydown);
        window.addEventListener('resize', syncHeaderOffset, { passive: true });

        if (header && window.ResizeObserver) {
            headerObserver = new ResizeObserver(syncHeaderOffset);
            headerObserver.observe(header);
        }

        syncHeaderOffset();
        applyTheme();
        observeTheme();
        lockScroll();

        if (document.readyState === 'complete') {
            startPrelude();
        } else {
            loadHandler = function () {
                loadHandler = null;
                if (!closed) {
                    startPrelude();
                }
            };
            window.addEventListener('load', loadHandler, { once: true });
        }

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(syncHeaderOffset).catch(function () {
            });
        }

        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                root.classList.remove('is-booting');
            });
        });

        const instance = {
            enter: enter,
            finish: finish,
            skip: function () {
                finish();
            },
            show: show,
            setTheme: applyTheme,
            destroy: destroy
        };

        return instance;
    }

    function autoMount() {
        const root = document.getElementById('nat-storybook-intro');
        if (!root || root.getAttribute('data-auto-mount') === 'false') {
            return;
        }
        const instance = mount({ root: root });
        if (instance) {
            window.NatStorybookIntro.current = instance;
        }
    }

    window.NatStorybookIntro = {
        mount: mount,
        replay: function () {
            storageRemove(SEEN_KEY);
            window.location.reload();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoMount, { once: true });
    } else {
        autoMount();
    }
})();
