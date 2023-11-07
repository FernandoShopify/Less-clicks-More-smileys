# Less-clicks-More-smileys
Let's automatically detect URLs to convert that into an appropriate Markdown to share with Merchant and internal Teams

Initially we want this to run via Violent Monky in the browser, but will later decide if it's best to implement this as a Text Expander since Violent Monkey can copy contents from the DOM but not from other parts of the broswer such as the search bar. 

Once advanced, we want to asses if it would be best to create a Custom Chrome Extension.

To-do:

- [ ] Create original Markdown, the same for every link
- [ ] Have the script recognize when the url is coming from  Help Center, and add "(visit)" in each language to the Markdown
- [ ] Have the script recognize when the url is coming from  Blog, and add "(visit)" in each language to the Markdown
- [ ] Have the script recognize when the url is coming from  Shopify Communities
- [ ] Have the script recognize when the url is coming from  ZenDesk ticket to add a custom Markdown for that ticket
- [ ] Have the script recognize when the url is coming from  Merchant Internal Dashboard and add custom Markdown for that Internal
- [ ] Have the script recognize when the url is coming from  Merchant Internal Dashboard + **Invoice Number**, add custom Markdown for that
- [ ] Have the script recognize when the url is coming from  Slack Channel add custom Markdown for that
- [ ] Have the script recognize when the url is coming from  Slack Channel + Thread add custom Markdown for that
- [ ] Have the script recognize when the url is coming from  Guru Cards
- [ ] Recognize Partner Dashboard?
- [ ] Get feedback, what else could be added to this script? What would make our life easier when it comes to copy / pasting? We prefer key combination, or Text Expanders, or custom Chrome Extension?
- [ ] Make sure that every new user can get it's **Preferred Markdown** at least for links coming from   help.shopify.com,   shopify.com/${language}/blog,   community.shopify.com. Do it a editable settings or as a one time configuration?
