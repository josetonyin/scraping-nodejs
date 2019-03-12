var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
var nightmare = Nightmare({ show: true ,webPreferences: { webSecurity:false}});
nightmare.goto('file:///C:/Users/joset/Documents/scraping-nodejs/dynamic/TEst1.html')
    .wait('body')
     .enterIFrame('iframe')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log(response);
    })


    //.wait('body')
    //.title()
    //.then(function(title){
    // `title` is the title of the child frame #someIFrame
     //   console.log(title);
   // })
    //.evaluate(() => document.querySelector('body').innerHTML)


