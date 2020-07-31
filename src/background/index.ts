import { generateIBAN, init as initGenerator } from './iban-generator';
import { copyToClipboard, indicateSuccessOnToolbar, issueNotification } from '../common/until';
import { initContextMenu } from './context-menu';

chrome.browserAction.onClicked.addListener(() => {
  copyToClipboard(generateIBAN());
  indicateSuccessOnToolbar();
  issueNotification('IBAN copied to clipboard!');
});

initContextMenu();
initGenerator();
