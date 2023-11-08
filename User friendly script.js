// ==UserScript==
// @name        Copy and Modify URL 2
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/8/2023, 5:09:44 PM
// @grant        GM_setClipboard
// ==/UserScript==

//Define basic Markdown Before [](), write your Markdown between the quotes, for example for bolded links we need ** before and after the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD1 = "**"

//Define basic Markdown After [](), write your Markdown between the quotes, for example for bolded links we need ** before and after the Mardown as such: **[]()**
  //if you don't want anything leave the quotes empty such as: ""
const MD2 = "**"

/* The contents of [] will have 3 parts:

- Beginning_Part:     Optional, will be the same for every link.


- Selected_Text:      Mandatory, this part WILL BE FORMATTED FOR YOU, using either the Text you selected while copying,
                      or Guru Card Titles, Internal Dashboard Shop IDs / Invoices IDs, Issue Numbers, Zendesk Ticket Numbers,

- Ending_Part:        Optional, this part will be used to add content based on the language of the resource.
                      For example, when I copy a guide from the Help Center in English I want to display **[Connecting Domains (visit link here)](actual-link)**,
                      but if the guide comes from the Help Center in Spanish, I want to display **[Conectar Dominios (visitar enlace)](actual-link)**

                      For multiple language options, complete the set up at the footer of this code.
*/


// Define the contents of Beginning_Part and Ending_Part:

const Beginning_Part = "";

const Ending_Part = "";




document.addEventListener('keydown', function(event) { //open evenListener code

// Define two keys to be pressed to trigger this code:       (The code below defaults to pressing Control + Spacebar)

  const Key1 = event.ctrlKey;

  const Key2 = event.code === 'Space';


  // Check if Key1 and Key2 are pressed simultaneously

  if (Key1 && Key2) {


    const pageUrl = window.location.href;
    const Selected_Text = window.getSelection().toString();
    let fullFormat = `${MD1}[${Beginning_Part}${Selected_Text}${Ending_Part}](${pageUrl})${MD2}`;

    // Copy the modified text to the clipboard using GM_setClipboard

    GM_setClipboard(fullFormat);

    event.preventDefault();

    }
}); //close eventListener code
