// ==UserScript==
// @name        Copy and Modify URL 2
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @include     https://admin.shopify.com/store/*
// @include     https://*.myshopify.com/admin*
// @grant       none
// @version     1.5.0
// @author      Fernando Galvez-Luis (added code from Graham Connell to Hide Devtools)
// @description Recognize most used urls to apply appropriate Markdown automatically
// @grant       GM_setClipboard
// @grant       GM_addStyle

// ==/UserScript==

// Started project circa Nov/3/2023, 5:09:44 PM

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

//Latest version feature (version     1.5.0): Added funtionality: Generate full @spy commands within the own Guru Card: https://app.getguru.com/card/inpxx8oT/Merchantstaffcustomer-not-receiving-Shopify-emails-or-notifications

//Latest version feature (version     1.4.9): Incorporated Graham Connel code to HideDevtools

//Latest version feature (version     1.4.8): Added Shopify Communities entry titles, and changed default text of fullFormat for them.

//Latest version feature (version     1.4.7): Recognizes Slack conversations copying text from messages, at the moment it only returns a generic message "Slack conversation".

//Will be implmenting changes to set appropriate messages recognizing each channel and if it's a thread within the channel or a message in the main channel.

// Example for main channels message:     Slack #Support-SSA     || Example thread:     Slack #Support-SSA → Thread

//Previous version feature (version     1.4.6): Recognizes and returns Mechant Frustration Number and Title

//Previous version feature (version     1.4.5): Simplified code and instructions. Added option for Blogs pages and list of Blogs urls at bottom.

//Define basic Markdown Before [](), write your markdown BETWEEN THE QUOTES, for example for bolded links we need ** before (MD1 will be the before) and after (MD2 will be the after) the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD1 = "**";

//Define basic Markdown After [](), write your markdown BETWEEN THE QUOTES, for example for bolded links we need ** before and after the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD2 = "**";

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—--------



document.addEventListener('keydown', function(event) { //open evenListener code

// Define two keys to be pressed to trigger this code:       (The code below defaults to pressing Control + Spacebar)

  const Key1 = event.ctrlKey;

  const Key2 = event.code === 'Space';


  // Check if Key1 and Key2 are pressed simultaneously

  if (Key1 && Key2) { //open code for if Key1 && Key2 are pressed

    const pageUrl = window.location.href;

    let Selected_Text = window.getSelection().toString();

    let fullFormat;


    // 0 - Check if it's a Slack Conversation

    if (pageUrl.includes("https://app.slack.com/client/")) {   fullFormat = `${MD1}[Slack Conversation](${getSlackConversationLink()})${MD2}`;    }





    // 1 - Check for ZenDesk url and format: Ticket XXXXXX

    const ticketNumber = extractTicketNumber(pageUrl);

    if (ticketNumber) { fullFormat = `${MD1}[Ticket ${ticketNumber}](${pageUrl})${MD2}`; }





    //2 - Check for Merchant Internal Dashboard - Shop ID  within url and format: Internal Dashboard XXXXXXX

    const shopId = extractShopId(pageUrl);

    if (shopId) {  fullFormat = `${MD1}[Internal Dashboard ${shopId}](${pageUrl})${MD2}`; }





    // 3 - Check for Invoice Number from : Merchant Internal → Invoice Number

    const invoiceNumber = extractInvoiceNumber(pageUrl);

    if (invoiceNumber) {  fullFormat = `${MD1}[Int. Dash. ${shopId} → Invoice: ${invoiceNumber}](${pageUrl})${MD2}`; }





    // 4 - Check for Guru Card Titles

    const guruTitle = extractGuruTitle(pageUrl);

    if (guruTitle) { fullFormat = `${MD1}[ Guru Card: ${guruTitle}](${pageUrl})${MD2}`; }





    // 5 - Check for Incident Number and Title of Incident

    const incidentNumber = extractIncidentNumber(pageUrl);

    if (incidentNumber) {     const incidentTitle = extractIncidentTitle(pageUrl);

    fullFormat = `${MD1}[Incident ${incidentNumber}: ${incidentTitle}](${pageUrl})${MD2}`;    }





    // 6 - Check for Indentity Account Number

    const account_Number = extractIdentityAccountNumber(pageUrl);

    if (account_Number) { fullFormat = `${MD1}[Identity Account → ${account_Number}](${pageUrl})${MD2}`; }





    // 7 - Optional: Add Help Center Languages resources BELOW this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    /* Some Merchants are not as tech savvy as you'd expect, sometimes it's worth adding some clafication like "click here".     If you'd like to add that to the Languages you support, copy /pase
     the code for that Language and modify it for your use case.

     Remember to change the HC_text_English to the Language of your preference and update the url inside pageUrl.includes("")

     Below you can see an example for the English Language (remove it if you don't want to use this part): */

    // English - Check for English Help Center Resource:

    const HC_text_English = ""; // If I write inside the quotes " (clic here)" what the Merchant will see for the link is: The text I selected (click here)

    if (pageUrl.includes("https://help.shopify.com/en/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_English}](${pageUrl})${MD2}`;   }

    // Spanish - Check for Spanish Help Center Resource:

    const HC_text_Spanish = " (clic aquí)"; // Here is the one I actually use, keep it, delete it or modify it, your call.

    if (pageUrl.includes("https://help.shopify.com/es/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Spanish}](${pageUrl})${MD2}`;   }

   // Optional: Add Help Center Languages resources ABOVE this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------





    // 8 - Optional: Add Shopify Communities Languages resources BELOW this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--

    /* Same concept as of number 7, grab from below within this document whatever languages you support if you want Communities post with extra indications */

    //Remember to change the Language at .textContent.trim() === ""

    //Languages available for Shopify Communities: ["English", "Français", Japanese → "日本語", German → "Deutsch", "Italiano", "Nederlands", "Português do Brasil", Chinese → "简体中文"]

    // Spanish - Check for Spanish Shopify Communities Resource:

    const SC_text_Spanish = " (clic aqui)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Español")

    {  fullFormat = `${MD1}[Comunidad Shopify: ${getCommunityEntryTitle()} ${SC_text_Spanish}](${pageUrl})${MD2}`;  }

    else if (pageUrl.includes("https://community.shopify.com")) {  fullFormat = `${MD1}[Shopify Community: ${getCommunityEntryTitle()}](${pageUrl})${MD2}`;  }

   // Optional: Add Shopify Blogs Languages resources ABOVE this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--------





    // 9 - Optional: Add Shopify Communities Languages resources BELOW this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--

    /* Same concept as of number 7, grab from below within this document whatever languages you support if you want Communities post with extra indications */

    //Remember to change the url inside the quotes at pageUrl.includes(""). Full list of Blogs url at bottom of document

    // Spanish - Check for Spanish Shopify Blogs Resource:

    const Blog_text_Spanish = " (clic aqui)";

    if (pageUrl.includes("https://www.shopify.com/es/blog"))    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Spanish}](${getSlackConversationLink()})${MD2}`;  }

   // Optional: Add Shopify Blogs Languages resources ABOVE this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--------





    // 10 Check for Merchant Frustration Number

    const merchantFrustrationNumber = extractMerchantFrustrationNumber(pageUrl);

    if (merchantFrustrationNumber) {    const merchantFrustrationTitle = extractMerchantFrustrationTitle();

    fullFormat = `${MD1}[Merchant Frustration ${merchantFrustrationNumber}: ${merchantFrustrationTitle}](${pageUrl})${MD2}`;    }







    // This is the default on any other site, it will apply only the format defined with MD1 and MD2, you can modify it to your needs/liking:

    if (typeof fullFormat === 'undefined') { fullFormat = `${MD1}[${Selected_Text}](${pageUrl})${MD2}`; }


    // Copy the modified text to the clipboard using GM_setClipboard

    GM_setClipboard(fullFormat);

    event.preventDefault();

    }//close code for if Key1 && Key2 are pressed
}); //close eventListener code



// Extract ticketNumber

function extractTicketNumber(url) {
    let regex = /shopify\.zendesk\.com.*\/tickets\/(\d+)/;
    let match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

// Extract Shop ID

function extractShopId(url) {
    let regex = /https:\/\/app\.shopify\.com\/services\/internal\/shops\/(\d+)/;
    let match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

// Extract Invoice Number

function extractInvoiceNumber(url) {
    let regex = /https:\/\/app\.shopify\.com\/services\/internal\/shops\/(\d+)\/invoices\/(\d+)/;
    let match = url.match(regex);

    if (match && match[2]) {
        return match[2];
    }

    return null;
}

// Extract Guru Title

function extractGuruTitle(url) {
    if (url.includes("https://app.getguru.com/card")) {
        var guruTitle = url.substring(url.lastIndexOf("/") + 1);
        guruTitle = guruTitle.split("?")[0]; // Remove "?" and anything after that
        guruTitle = guruTitle.replace(/-/g, " "); // Replace hyphens with blank spaces
        return guruTitle;
    } else {
        return null;
    }
}

// Extract Incident Number

function extractIncidentNumber(url) {
    var regex = /incidents\.shopify\.io.*\/incidents\/(\d+)/;
    var match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

// Extract Incident Title
function extractIncidentTitle() {
  const incidentElement = document.querySelector('h1.ui-title-bar__title');
  if (incidentElement) {
    return incidentElement.textContent.trim();
  }
  return null;
}

// Extract Identity Account Number

function extractIdentityAccountNumber(url) {
  let regex = /\/accounts\/(\d+)(?=\/|$)/;
  let match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

// Extract Merchant Frustration Number

function extractMerchantFrustrationNumber(url) {
    var regex = /merchant-frustrations\.shopifycloud\.com.*\/features\/(\d+)/;
    var match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

// Extract Merchant Frustration Title

function extractMerchantFrustrationTitle() {
  const titleElement = document.querySelector('h1.ui-title-bar__title');
  if (titleElement) {
    return titleElement.textContent.trim();
  }
  return null;
}

// Extract Community entry title

function getCommunityEntryTitle()

{   return document.querySelector('head title').textContent.trim().replace(" - Shopify Community", "")   }

// Extract Slack URL

function getSlackConversationLink() //Based on the structure of the messages within Slack

{  return window.getSelection().anchorNode
.parentElement
.parentElement
.parentElement
.parentElement
.parentElement
.parentElement
.parentElement
.querySelector('a')
.getAttribute('href')  }




    // Hide dev tools: This part was developed by Graham Connell, I just copy pasted this here to keep it all in one place.
    //For more details see: https://app.getguru.com/card/irBKaLKT/Hiding-Shopify-tools-from-the-merchant-admin

    GM_addStyle('.tCaSv, .vNwaY {height: 4.3em; overflow: hidden;} .tCaSv:hover, .vNwaY:hover {overflow: visible;}')


/*  Shopify Blogs url (start)

Australia url:            "https://www.shopify.com/au/blog/"
English url:              "https://www.shopify.com/blog/"
Netherlands url:          "https://www.shopify.com/nl/blog/"
Brasil url:               "https://www.shopify.com/br/blog/"
Canad url:                "https://www.shopify.com/ca/blog/"
Español Int. url:         "https://www.shopify.com/es/blog/"
German url:               "https://www.shopify.com/de/blog/"
France url:               "https://www.shopify.com/fr/blog/"
Hong Kong url:            "https://www.shopify.com/hk-en/blog/"
India url:                "https://www.shopify.com/in/blog/"
Indonesia url:            "https://www.shopify.com/id/blog/"
Ireland url:              "https://www.shopify.com/ie/blog/"
Malaysia url:             "https://www.shopify.com/my/blog/"
New Zealand url:          "https://www.shopify.com/nz/blog/"
Nigeria url:              "https://www.shopify.com/ng/blog/"
Philippines url:          "https://www.shopify.com/ph/blog/"
Singapore url:            "https://www.shopify.com/sg/blog/"
South Africa url:         "https://www.shopify.com/za/blog/"
United Kingdom:           "https://www.shopify.com/uk/blog/"
Japan url:                "https://www.shopify.com/jp/blog/"
Chinese Simplified url:   "https://www.shopify.com/zh/blog/"

Shopify Blogs url (end)  */

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

//Check for Guru Card: Merchant/staff/customer not receiving Shopify emails or notifications

// Add onsite command creation by getting Shop_Id and Email:

if (window.location.href === 'https://app.getguru.com/card/inpxx8oT/Merchantstaffcustomer-not-receiving-Shopify-emails-or-notifications') {

  function addRedRowToTable() {
    const table = document.querySelector('.ghq-next-card-content__table');
    if (table) {
      const newRow = document.createElement('tr');
      newRow.classList.add('ghq-next-card-content__tr');
      newRow.style.backgroundColor = 'rgb(44, 130, 67)';

      const cell = document.createElement('td');
      cell.classList.add('ghq-next-card-content__td');
      cell.colSpan = table.rows[0].cells.length;

      const input1 = document.createElement('input');
      input1.type = 'text';
      input1.placeholder = 'Shop ID';
      input1.style.marginRight = '50px'; // Add 50px of horizontal spacing

      const input2 = document.createElement('input');
      input2.type = 'text';
      input2.placeholder = 'Email address';
      input2.style.marginRight = '50px'; // Add 50px of horizontal spacing

      const button = document.createElement('button');
      button.textContent = 'Set Shop ID + Email for Spy Commands';
      button.style.marginRight = '50px'; // Add 50px of horizontal spacing
      button.addEventListener('click', function() {
        const shopId = input1.value;
        const email = input2.value;
        const cells = document.querySelectorAll('.ghq-next-card-content__td');
        cells.forEach(cell => {
          cell.innerHTML = cell.innerHTML.replace(/shop_id/g, shopId).replace(/hi@example.com/g, email);
        });

        // Check if divs exist and remove them if they do
        const divsToRemove = document.querySelectorAll('.ghq-next-card-content__code-block__block-menu');
        if (divsToRemove.length > 0) {
          divsToRemove.forEach(div => {
            div.parentNode.removeChild(div);
          });
        }

        // Call the function to add a "Copy" button to each span element
        addCopyButtonToSpans();
      });

      cell.appendChild(input1);
      cell.appendChild(input2);
      cell.appendChild(button);

      newRow.appendChild(cell);

      const firstRow = table.querySelector('tbody tr:first-child');
      table.querySelector('tbody').insertBefore(newRow, firstRow);
    } else {
      setTimeout(addRedRowToTable, 200); // Retry after 200 milliseconds
    }
  }

  // Function to add a "Copy" button inside each span element
  function addCopyButtonToSpans() {
    const spans = document.querySelectorAll('.ghq-next-card-content__table span[data-slate-string="true"]');
    spans.forEach(span => {
      if (span.textContent.includes('@spy courier')) {
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.addEventListener('click', function() {
          const text = span.parentElement.textContent;
          const modifiedText = text.replace(/Copy$|Copied!$/, ''); //Remove the word "Copy" or "Copied" from text
          navigator.clipboard.writeText(modifiedText)
            .then(() => {
              console.log('Text copied to clipboard:', modifiedText);
              button.textContent = 'Copied!';
              setTimeout(() => {
                button.textContent = 'Copy';
              }, 2000); // Reset button text after 2 seconds
            })
            .catch(error => {
              console.error('Error copying text to clipboard:', error);
            });
        });
        span.insertAdjacentElement('afterend', button);
      }
    });
  }

  // Call the function to add a new red row to the table
  addRedRowToTable();

};
