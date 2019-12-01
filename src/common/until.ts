
function copyToClipboard(message: string): boolean {
  try {
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = message;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
    return true;
  } catch (error) {
    return false;
  }
}

function indicateSuccessOnToolbar(): void {
  chrome.browserAction.setTitle({ title: 'Copied...' });
  chrome.browserAction.setBadgeText({ text: 'ok' });
  chrome.browserAction.setIcon({ path: '/static-content/iban_green.png' }, () => {
    setTimeout(() => {
      chrome.browserAction.setBadgeText({ text: '' });
      chrome.browserAction.setIcon({ path: '/static-content/iban_blue.png' });
      chrome.browserAction.setTitle({ title: 'Random IBAN Gnerator' });
    }, 1000);
  });
}

export {
  copyToClipboard,
  indicateSuccessOnToolbar,
};
