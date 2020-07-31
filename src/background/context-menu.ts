import { generateIBAN } from './iban-generator';

function init(): void {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'paste-random-iban',
      title: 'Paste random IBAN',
      contexts: ['editable'],
    });
  });

  chrome.contextMenus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
      case 'paste-random-iban':
        chrome.tabs.executeScript({
          code: `
            document.execCommand('selectAll');
            document.execCommand('insertText', false, '${generateIBAN()}');
          `,
        });
        break;
      default:
        break;
    }
  });
}

export {
  init as initContextMenu,
};
