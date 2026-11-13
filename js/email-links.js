const mobileUserAgent = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|BlackBerry/i;

document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }

    const copyButton = target.closest('[data-copy-email]');
    if (copyButton) {
        copyEmail(copyButton);
        return;
    }

    const link = target.closest('a[href^="mailto:"]');
    if (link && !mobileUserAgent.test(navigator.userAgent)) {
        event.preventDefault();
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=kristynatasha011%40gmail.com', '_blank', 'noopener');
    }
});

async function copyEmail(button) {
    const email = button.dataset.copyEmail;
    const status = button.parentElement.querySelector('[data-copy-status]');

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(email);
            showCopyStatus(status, 'Email copied!');
            return;
        } catch (error) {
            console.error('Unable to copy email address to the clipboard.', error);
        }
    }

    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    let copied = false;
    try {
        copied = document.execCommand('copy');
    } finally {
        textArea.remove();
    }

    if (copied) {
        showCopyStatus(status, 'Email copied!');
    } else {
        showCopyStatus(status, 'Could not copy');
        console.error('Unable to copy email address to the clipboard.');
    }
}

function showCopyStatus(status, message) {
    if (!status) {
        return;
    }

    status.textContent = message;
    window.setTimeout(() => {
        status.textContent = '';
    }, 2000);
}
