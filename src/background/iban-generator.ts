
import { DynamicObject } from '../common/type';

// set value of each alphabet from 10 to 35
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

function modulus(divident: string, divisor: number): number {
  if (divident.length <= 2) {
    return parseInt(divident, 10);
  }

  const strippedDivident = divident.substring(0, Math.min(divident.length, 9));
  const remainingDivident = divident.substring(Math.min(divident.length, 9));

  return modulus(`${(parseInt(strippedDivident, 10) % divisor)}${remainingDivident}`, divisor);
}

function generateBSN(countryCode = 'NL', bankCode = 'INGB'): string {
  const randomNumber = Math.random().toString().slice(2, 12);

  // assume random bsn with 00 checksum digit
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

export {
  generateBSN,
};
