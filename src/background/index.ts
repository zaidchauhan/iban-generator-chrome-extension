import { generateBSN } from './iban-generator';
import { copyToClipboard, indicateSuccessOnToolbar } from '../common/until';
import { initContextMenu } from './context-menu';

chrome.browserAction.onClicked.addListener(() => {
  const randomBSNNumber = generateBSN();
  copyToClipboard(randomBSNNumber);
  indicateSuccessOnToolbar();
});

initContextMenu();
