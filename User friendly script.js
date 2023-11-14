// ==UserScript==
// @name        Copy and Modify URL 2
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.4.1
// @author      Fernando Galvez-Luis
// @description 11/8/2023, 5:09:44 PM
// @grant        GM_setClipboard
// ==/UserScript==

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------
//version     1.4.1 Latest addition to script: Identity Account Number 

//Define basic Markdown Before [](), write your markdown BETWEEN THE QUOTES, for example for bolded links we need ** before and after the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD1 = "**";

//Define basic Markdown After [](), write your markdown BETWEEN THE QUOTES, for example for bolded links we need ** before and after the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD2 = "**";

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—--------



/* The contents of [] will have 3 parts:

- Beginning_Part:     Optional, will be the same for every link.


- Selected_Text:      Mandatory, this part WILL BE FORMATTED FOR YOU, using either the Text you selected while copying,
                      or Guru Card Titles, Internal Dashboard Shop IDs / Invoices IDs, Issue Numbers, Zendesk Ticket Numbers,

- Ending_Part:        Optional, this part will be used to add content based on the language of the resource.
                      For example, when I copy a guide from the Help Center in English I want to display **[Connecting Domains (visit link here)](actual-link)**,
                      but if the guide comes from the Help Center in Spanish, I want to display **[Conectar Dominios (visitar enlace)](actual-link)**

                      For multiple language options, complete the set up at the footer of this code (pending).
*/







document.addEventListener('keydown', function(event) { //open evenListener code

// Define two keys to be pressed to trigger this code:       (The code below defaults to pressing Control + Spacebar)

  const Key1 = event.ctrlKey;

  const Key2 = event.code === 'Space';


  // Check if Key1 and Key2 are pressed simultaneously

  if (Key1 && Key2) { //open code for if Key1 && Key2 are pressed

console.log("triggered")

    // Define the contents of Beginning_Part and Ending_Part:

    let Beginning_Part = "";

    let Ending_Part = "";

    const pageUrl = window.location.href;

    let Selected_Text = window.getSelection().toString();

    let fullFormat;


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





    // 5 - Check for Incident Number

    const incident_number = extractIncidentNumber(pageUrl);

    if (incident_number) { fullFormat = `${MD1}[Incident ${incident_number}](${pageUrl})${MD2}`; }




    // 6 - Check for Indentity Account Number

    const account_Number = extractIdentityAccountNumber(pageUrl);

    if (account_Number) { fullFormat = `${MD1}[Identity Account → ${account_Number}](${pageUrl})${MD2}`; }





    // This is the default on any other site, it will apply only the format defined with MD1 and MD2:

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

// Extract Identity Account Number

function extractIdentityAccountNumber(url) {
  let regex = /\/accounts\/(\d+)(?=\/|$)/;
  let match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
