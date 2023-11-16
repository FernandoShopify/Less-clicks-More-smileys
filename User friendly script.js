// ==UserScript==
// @name        Copy and Modify URL 2
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.4.4
// @author      Fernando Galvez-Luis
// @description Started project circa Nov/8/2023, 5:09:44 PM
// @grant        GM_setClipboard
// ==/UserScript==

//—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

//Latest version feature (version     1.4.4): Added Optional format for extra text in SHOPIFY COMMUNITIES for each language

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

    /* Some Merchants are not as tech savvy as you'd expect, sometimes it's worth adding some clafication like "click here", that's added in the optional Help Center
     Languages settings down below.     If you'd like to add that to the Languages you support, copy the code for that Language and paste it within this section
     of the code blow this comment.    Feel free to change the text "click here" for whatever it's culturaly appropriate for that Language.

     Below you can see an example for the English Language (remove it if you don't want to use this part): */

    // English - Check for English Help Center Resource:

    const HC_text_English = " (click here)";

    if (pageUrl.includes("https://help.shopify.com/en/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_English}](${pageUrl})${MD2}`;   }

    // Spanish - Check for Spanish Help Center Resource:

    const HC_text_Spanish = " (clic aquí)";

    if (pageUrl.includes("https://help.shopify.com/es/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Spanish}](${pageUrl})${MD2}`;   }


   // Optional: Add Help Center Languages resources ABOVE this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // 8 - Optional: Add Shopify Communities Languages resources BELOW this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--

    /* Same concept as of number 7, grab from below within this document whatever languages you support if you want Communities post with extra indications */





   // Optional: Add Shopify Communities Languages resources ABOVE this line:—-------—-------—-------—-------—-------—-------—-------—-------—-------—--------





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


/* HELP CENTER custom links per language: —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—------- (Help Center Start)



    // Spanish - Check for Spanish Help Center Resource:

    const HC_text_Spanish = " (clic aquí)";

    if (pageUrl.includes("https://help.shopify.com/es/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Spanish}](${pageUrl})${MD2}`;   }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------


    // English - Check for English Help Center Resource:

    const HC_text_English = " (click here)";

    if (pageUrl.includes("https://help.shopify.com/en/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_English}](${pageUrl})${MD2}`;   }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Danish - Check for Danish Help Center Resource:

    const HC_text_Danish = " (klik her)";

    if (pageUrl.includes("https://help.shopify.com/da/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Danish}](${pageUrl})${MD2}`;   }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // German - Check for German Help Center Resource:

    const HC_text_German = " (klicken Sie hier)";

    if (pageUrl.includes("https://help.shopify.com/de/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_German}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Czech Republic - Check for Czech Republic Help Center Resource:

    const HC_text_Czech_Republic = " (klikněte zde)";

    if (pageUrl.includes("https://help.shopify.com/cs/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Czech_Republic}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // French - Check for Frech Help Center Resource:

    const HC_text_French = " (Cliquez ici)";

    if (pageUrl.includes("https://help.shopify.com/fr/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_French}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Italian - Check for Italian Help Center Resource:

    const HC_text_Italian = " (clicca qui)";

    if (pageUrl.includes("https://help.shopify.com/it/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Italian}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Netherlands - Check for Netherlands Help Center Resource:

    const HC_text_Netherlands = " (Klik hier)";

    if (pageUrl.includes("https://help.shopify.com/nl/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Netherlands}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Norwegian - Check for Norwegian Help Center Resource:

    const HC_text_Norwegian = " (Klikk her)";

    if (pageUrl.includes("https://help.shopify.com/nb/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Norwegian}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Polish - Check for Polish Help Center Resource:

    const HC_text_Polish = " (Kliknij tutaj)";

    if (pageUrl.includes("https://help.shopify.com/pl/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Polish}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Portuguese BR and PT - Check for Portuguese Help Center Resource:

    const HC_text_Portuguese = " (Clique aqui)";

    if (pageUrl.includes("https://help.shopify.com/pt-BR/" || "https://help.shopify.com/pt-PT/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Portuguese}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Finnish - Check for Finnish Help Center Resource:

    const HC_text_Finnish = " (Klikkaa tästä)";

    if (pageUrl.includes("https://help.shopify.com/fi/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Finnish}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Swedish - Check for Swedish Help Center Resource:

    const HC_text_Swedish = " (Klicka här)";

    if (pageUrl.includes("https://help.shopify.com/sv/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Swedish}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Turkish - Check for Turkish Help Center Resource:

    const HC_text_Turkish = " (buraya tıklayın)";

    if (pageUrl.includes("https://help.shopify.com/tr/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Turkish}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Thailand - Check for Thailand Help Center Resource:

    const HC_text_Thailand = " (คลิกที่นี่)";

    if (pageUrl.includes("https://help.shopify.com/th/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Thailand}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Japanese - Check for Japanese Help Center Resource:

    const HC_text_Japanese = " (ここをクリック)";

    if (pageUrl.includes("https://help.shopify.com/ja/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Japanese}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Vietnamese - Check for Vietnamese Help Center Resource:

    const HC_text_Vietnamese = " (bấm vào đây)";

    if (pageUrl.includes("https://help.shopify.com/vi/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Vietnamese}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Korean - Check for Korean Help Center Resource:

    const HC_text_Korean = " (여기를 클릭하세요)";

    if (pageUrl.includes("https://help.shopify.com/ko/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Korean}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Chinese Simplified - Check for Chinese Simplified Help Center Resource:

    const HC_text_Chinese_Simplified = " (点击这里)";

    if (pageUrl.includes("https://help.shopify.com/zh-CN/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Chinese_Simplified}](${pageUrl})${MD2}`;   }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Chinese Traditional - Check for Chinese Traditional Help Center Resource:

    const HC_text_Chinese_Traditional = " (點這裡)";

    if (pageUrl.includes("https://help.shopify.com/zh-TW/")) {   fullFormat = `${MD1}[${Selected_Text} ${HC_text_Chinese_Traditional}](${pageUrl})${MD2}`;   }



HELP CENTER custom links per language: —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—------- (Help Center End) */




/* SHOPIFY COMMUNITIES custom links per language: —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—------- (Shopify Communities Start)

    // Spanish - Check for Spanish Shopify Communities Resource:

    const SC_text_Spanish = " (clic aqui)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Español")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Spanish}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // English - Check for English Shopify Communities Resource:

    const SC_text_English = " (click here)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "English")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_English}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // French - Check for French Shopify Communities Resource:

    const SC_text_French = " (Cliquez ici)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Français")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_French}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Japanese - Check for Japanese Shopify Communities Resource:

    const SC_text_Japanese = " (ここをクリック)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "日本語")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Japanese}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // German - Check for German Shopify Communities Resource:

    const SC_text_German = " (klicken Sie hier)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Deutsch")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_German}](${pageUrl})${MD2}`;  }

  —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

  // Italian - Check for Italian Shopify Communities Resource:

    const SC_text_Italian = " (clicca qui)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Italiano")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Italian}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Netherlands - Check for Netherlands Shopify Communities Resource:

    const SC_text_Netherlands = " (Klik hier)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Nederlands")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Netherlands}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

    // Portuguese - Check for Portuguese Shopify Communities Resource:

    const SC_text_Portuguese = " (Clique aqui)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "Português do Brasil")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Portuguese}](${pageUrl})${MD2}`;  }

    —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—-------

     // Chinese - Check for Chinese Shopify Communities Resource:

    const SC_text_Chinese = " (点击这里)";

    if (pageUrl.includes("https://community.shopify.com") && document.querySelector('button.header-country-select__trigger').textContent.trim() === "简体中文")

    {  fullFormat = `${MD1}[${Selected_Text} ${SC_text_Chinese}](${pageUrl})${MD2}`;  }





SHOPIFY COMMUNITIES custom links per language: —-------—-------—-------—-------—-------—-------—-------—-------—-------—-------—------- (Shopify Communities End) */
