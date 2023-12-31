// ==UserScript==
// @name         Copy and Modify URL
// @namespace    ViolentMonkey Scripts
// @version      1.0
// @description  Format selectedText + url into appropriate Markdown
// @match        *://*/*
// @grant        GM_setClipboard
// ==/UserScript==



var languages = ['es', 'en', 'da', 'de', 'fr', 'it', 'nl', 'nb', 'pl', 'pt-BR', 'pt-PT', 'fi', 'sv', 'tr', 'th', 'ja', 'vi', 'zh-CN', 'zh-TW', 'ko', 'cs'];

document.addEventListener('keydown', function(event) {
    // Check if Control key and Spacebar key are pressed simultaneously
    if (event.ctrlKey && event.code === 'Space') {
        var pageUrl = window.location.href;
        var ticketNumber = extractTicketNumber(pageUrl);
        var selectedText = window.getSelection().toString();
        var copiedText;
        var shopId = extractShopId(pageUrl);
        var invoiceNumber = extractInvoiceNumber(pageUrl);
        var incident_number = extractIncidentNumber(pageUrl);
        var guruTitle = extractGuruTitle(pageUrl);




        function getLanguageCode(url) {
            var regex = /https:\/\/www\.shopify\.com\/([a-z-]+)\/blog\//;
            var match = url.match(regex);
            if (match) {
                return match[1];
            }
            regex = /https:\/\/help\.shopify\.com\/([a-z-]+)\/manual\//;
            match = url.match(regex);
            if (match) {
                return match[1];
            }
            return "";
        }

        var languageCode = getLanguageCode(pageUrl);



        if (languageCode) {
            switch (languageCode) {
                case "es":
                    copiedText = `**[${selectedText} (visitar)](${pageUrl})**`;
                    break;
                case "de":
                    copiedText = `**[${selectedText} (besuchen)](${pageUrl})**`;
                    break;
                case "fr":
                    copiedText = `**[${selectedText} (visite)](${pageUrl})**`;
                    break;
                case "hk-en":
                case "in":
                case "id":
                case "ie":
                case "my":
                case "nz":
                case "ng":
                case "ph":
                case "sg":
                case "za":
                case "uk":
                    copiedText = `**[${selectedText} (visit)](${pageUrl})**`;
                    break;
                case "jp":
                case "zh":
                    copiedText = `**[${selectedText} (訪問)](${pageUrl})**`;
                    break;
                case "nl":
                    copiedText = `**[${selectedText} (bezoek)](${pageUrl})**`;
                    break;
                case "au":
                    copiedText = `**[${selectedText} (visit)](${pageUrl})**`;
                    break;
                default:
                    copiedText = `**[${selectedText} (${getLanguageFormat(languageCode)})](${pageUrl})**`;
                    break;
            }
        } else if (pageUrl.includes("https://community.shopify.com")) {
            var spanElement = document.querySelector('span[itemprop="name"]');
            if (spanElement) {
                var spanText = spanElement.textContent.trim();
                if (spanText === "Comunidad de Shopify (ES)") {
                    copiedText = `**[${selectedText} (visitar)](${pageUrl})**`;
                } else if (spanText === "Shopify Community") {
                    copiedText = `**[${selectedText} (visit)](${pageUrl})**`;
                } else if (spanText === "Communauté Shopify (FR)") {
                    copiedText = `**[${selectedText} (visite)](${pageUrl})**`;
                } else if (spanText === "Shopify Community Japan (JP)") {
                    copiedText = `**[${selectedText} (訪問)](${pageUrl})**`;
                } else if (spanText === "Shopify-Community (DE)") {
                    copiedText = `**[${selectedText} (besuchen)](${pageUrl})**`;
                } else if (spanText === "Community di Shopify (IT)") {
                    copiedText = `**[${selectedText} (visita)](${pageUrl})**`;
                } else if (spanText === "Shopify Community (NL)") {
                    copiedText = `**[${selectedText} (bezoek)](${pageUrl})**`;
                } else if (spanText === "Comunidade da Shopify (PT-BR)") {
                    copiedText = `**[${selectedText} (visita)](${pageUrl})**`;
                } else if (spanText === "Shopify Community (zh-CN)") {
                    copiedText = `**[${selectedText} (访问)](${pageUrl})**`;
                }
            }
        } else {
            if (ticketNumber) {
                copiedText = `**[Ticket ${ticketNumber}](${pageUrl})**`;
            } else if (pageUrl && guruTitle) {
            copiedText = `**[Guru Card: ${guruTitle}](${pageUrl})**`;
        } else {
                copiedText = `**[${selectedText}](${pageUrl})**`;
            }
        }

        // Update copiedText to include shop_id and invoice_number
        if (shopId) {
            if (invoiceNumber) {
                copiedText = `**[Internal Dashboard ${shopId} → Invoice Number ${invoiceNumber}](${pageUrl})**`;
            } else {
                copiedText = `**[Internal Dashboard ${shopId}](${pageUrl})**`;
            }
        }

        // Update copiedText to include incident_number
        if (incident_number) {

                copiedText = `**[Incident ${incident_number}](${pageUrl})**`;
            }

        function extractInvoiceNumber(url) {
            var regex = /https:\/\/app\.shopify\.com\/services\/internal\/shops\/(\d+)\/invoices\/(\d+)/;
            var match = url.match(regex);

            if (match && match[2]) {
                return match[2];
            }

            return null;
        }

function extractIncidentNumber(url) {
    var regex = /incidents\.shopify\.io.*\/incidents\/(\d+)/;
    var match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}





        // Copy the modified text to the clipboard using GM_setClipboard
        GM_setClipboard(copiedText);

        event.preventDefault();
    }
});

function extractTicketNumber(url) {
    var regex = /shopify\.zendesk\.com.*\/tickets\/(\d+)/;
    var match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

function extractShopId(url) {
    var regex = /https:\/\/app\.shopify\.com\/services\/internal\/shops\/(\d+)/;
    var match = url.match(regex);

    if (match && match[1]) {
        return match[1];
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

function manualContent(url, lang) {
    var regex = new RegExp(`https:\/\/help\.shopify\.com.*\/${lang}\/`);
    var isBlogUrl = url.includes("https://www.shopify.com/au/blog/") || url.includes("https://www.shopify.com/blog/") || url.startsWith("https://www.shopify.com/nl/blog/") || url.startsWith("https://www.shopify.com/br/blog/") || url.startsWith("https://www.shopify.com/ca/blog/") || url.startsWith("https://www.shopify.com/es/blog/") || url.startsWith("https://www.shopify.com/de/blog/") || url.startsWith("https://www.shopify.com/fr/blog/") || url.startsWith("https://www.shopify.com/hk-en/blog/") || url.startsWith("https://www.shopify.com/in/blog/") || url.startsWith("https://www.shopify.com/id/blog/") || url.startsWith("https://www.shopify.com/ie/blog/") || url.startsWith("https://www.shopify.com/my/blog/") || url.startsWith("https://www.shopify.com/nz/blog/") || url.startsWith("https://www.shopify.com/ng/blog/") || url.startsWith("https://www.shopify.com/ph/blog/") || url.startsWith("https://www.shopify.com/sg/blog/") || url.startsWith("https://www.shopify.com/za/blog/") || url.startsWith("https://www.shopify.com/uk/blog/") || url.startsWith("https://www.shopify.com/jp/blog/") || url.startsWith("https://www.shopify.com/zh/blog/");
    return regex.test(url) || isBlogUrl;
}

function getLanguageFormat(lang) {
    switch (lang) {
        case 'es':
            return 'visitar';
        case 'en':
            return 'visit';
        case 'da':
            return 'besøg';
        case 'de':
            return 'besuchen';
        case 'fr':
            return 'visite';
        case 'it':
            return 'visita';
        case 'nl':
            return 'bezoek';
        case 'nb':
            return 'besøk';
        case 'pl':
            return 'odwiedzać';
        case 'pt-BR':
            return 'visita';
        case 'pt-PT':
            return 'visita';
        case 'fi':
            return 'vierailla';
        case 'sv':
            return 'besök';
        case 'tr':
            return 'ziyaret etmek';
        case 'th':
            return 'เยี่ยม';
        case 'ja':
            return '訪問';
        case 'vi':
            return 'thăm nom';
        case 'zh-CN':
            return '访问';
        case 'zh-TW':
            return '訪問';
        case 'ko':
            return '방문하다';
        case 'cs':
            return 'návštěva';
        default:
            return '';
    }
}
