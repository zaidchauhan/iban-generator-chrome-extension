import { DynamicObject } from '../common/type';

//
let bankCode: string;

// setup char to number directory
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charToNumberDirectory: DynamicObject = {};
chars.split('').forEach((char, index) => {
  charToNumberDirectory[char] = index + 10;
});

function replaceCharWithNumber(inputValue: string): string {
  let returningValue = '';
  inputValue.split('').forEach((char) => {
    returningValue += charToNumberDirectory[char] || char;
  });

  return returningValue;
}

// find modulus
function modulus(divident: string, divisor: number): number {
  if (divident.length <= 2) {
    return parseInt(divident, 10);
  }

  const strippedDivident = divident.substring(0, Math.min(divident.length, 9));
  const remainingDivident = divident.substring(Math.min(divident.length, 9));

  return modulus(`${(parseInt(strippedDivident, 10) % divisor)}${remainingDivident}`, divisor);
}

// generate random IBAN
function generateIBAN(): string {
  const countryCode = 'NL';
  const randomNumber = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();

  // assume checksum digit as 00
  let bsn = `${countryCode}00${bankCode}${randomNumber}`;

  // move first four digits to last
  bsn = bsn.substring(4) + bsn.substring(0, 4);

  // replace letters with value a = 10 to z = 35
  bsn = replaceCharWithNumber(bsn);

  // remove leading 0 if any
  bsn = bsn.replace(/^0+/, '');

  // calculate checksum digit
  let checkSumDigit = (98 - modulus(bsn, 97)).toString();

  // pad check sum digit
  checkSumDigit = checkSumDigit.length === 1 ? `0${checkSumDigit}` : checkSumDigit;

  return `${countryCode}${checkSumDigit}${bankCode}${randomNumber}`;
}

function init(): void {
  // register storage change listener
  chrome.storage.onChanged.addListener((changes) => {
    const bankCodeChange = changes.bankCode && changes.bankCode.newValue;
    if (bankCodeChange) {
      bankCode = bankCodeChange;
    }
  });

  // initial value
  chrome.storage.sync.get({
    bankCode: 'INGB',
  }, (items) => {
    bankCode = items.bankCode;
  });
}

export {
  init,
  generateIBAN,
};
