/**************************************************************************
* How to Mass Import Addresses and Other Autofill Info into Google Chrome *
**************************************************************************/

/**
  * Problem: There is no easy way to mass import save and fill Addresses and other information into Google Chrome natively.
  * Solution: We can use the Google Chrome developer tools console to run a Javascript command that adds this functionality for us.
  * Inspiration: An answer on Stack Overflow from a user named wOxxOm.
  * Link: https://stackoverflow.com/questions/56967729/import-autofill-data-from-a-file-into-chrome
  */

/**
  * Documentation:
  * - chrome.autofillPrivate.saveAddress(address) documented at https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/resources/settings/autofill_page/autofill_section.js;drc=31944011fe8ab26755dce300b1ec86c311860609;l=68
  * - Supported fields and their types documented at https://source.chromium.org/chromium/chromium/src/+/main:third_party/closure_compiler/externs/autofill_private.js
  */

/**
  * Procedure:
  * 1. Go to chrome://settings/addresses
  * 2. Open the devtools Javascript console (option + command + j)
  * 3. Run the Javascript code below to add an input button in the top right corner of the page.
  * 4. Use this button to import a .csv file with all of the addresses and other information you'd like to import.
  *
  * NOTE: The .csv file doesn't need headings, just put in each entry in the order listed below.
  * NOTE: The whole thing breaks if any cell in the .csv has a comma, so please remove any from the file.
  */

/*********************
* Start Code Snippet *
*********************/

// Remove any input elements from the body of the page.
for (const element of document.querySelectorAll ('body > input'))
    element.remove();

// The primary code snippet which adds the button and then reads the file.
Object.assign(document.body.appendChild(document.createElement('input')), {
    type: 'file',
    style: 'position:absolute; top:2ex; right:0; z-index:999',
    onchange(e) {
        if (!this.files[0])
            return;
        const fr = new FileReader();
        fr.readAsText(this.files[0], 'UTF-8');
        fr.onload = () => {

            for (const line of fr.result.split(/\r?\n/)) {
                const [name, company, address, state, city, postal, country, phone, email] = line.split(',');
                chrome.autofillPrivate.saveAddress({
                    fullNames: [name],
                    companyName: company,
                    addressLines: address,
                    addressLevel1: state,
                    addressLevel2: city,
                    postalCode: postal,
                    countryCode: country,
                    phoneNumbers: [phone],
                    emailAddresses: [email],
                });
            }

        };
        fr.onerror = console.error;
    },
});

/*******************
* End Code Snippet *
*******************/

/**
  * Explanation:
  * The following code snippet works for importing a single entry into the save and fill Chrome settings:
  */

      chrome.autofillPrivate.saveAddress({
          fullNames: ["Jacob Tingen"],
          companyName: "Tingen Law, PLLC",
          addressLines: "1801 Bayberry Court, Suite 203",
          addressLevel1: "Virginia",
          addressLevel2: "Richmond",
          postalCode: "23226",
          countryCode: "US",
          phoneNumbers: ["8044771720"],
          emailAddresses: ["jacob@tingen.law"],
      });

/**
  * It specifically uses the saveAddress function combined with several supported fields to import entries all at once.
  * For bulk importing, we just have to make a Javascript snippet that iterates over this function for each entry in a .csv file.
  */
