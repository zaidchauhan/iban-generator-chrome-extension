# IBAN Generator (chrome extension) [![Build Status](https://travis-ci.com/zaidchauhan/iban-generator-chrome-extension.svg?branch=master)](https://travis-ci.com/zaidchauhan/iban-generator-chrome-extension)

This is simple chrome extension to generate random IBAN. \
Right now, it is limited to Netherlands as country.\
Will add more features, including option to select country and bank soon.


[![Install from chrome web store](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_340x96.png)](https://chrome.google.com/webstore/detail/iban-generator/pnalpiobekfhpfpjeabjjgnhdmgenbkb)

## Current Features
* Context menu on input field to paste random IBAN.
* Click on icon to copy random IBAN in clipbaord.

## Getting Started
* `yarn install`
* Then just run `yarn run build` to have unpacked version of chrome extension.
* Go to [chrome://extensions/](chrome://extensions/)
* Click on `Load unpacked` and select dist folder.

## Built With

* Typescript
* Webpack
* ESLint


## Contributing

Please create issue and discuss your solution/approach before making any PR.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on https://en.wikipedia.org/wiki/International_Bank_Account_Number
