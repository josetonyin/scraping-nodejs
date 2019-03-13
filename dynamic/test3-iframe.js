var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
var nightmare = Nightmare({ show: true ,webPreferences: { webSecurity:false},openDevTools: {
        mode: 'detach'
    }});
nightmare.goto('https://confluence.cpaglobal.com/pages/editpage.action?pageId=72700529')
    .wait(200)
    .type('input[id="os_username"]','jtony@cpaglobal.com')
    .type('input[id="os_password"]','Lovedale11')
    .click('input[id="loginButton"]')
    .wait('body')
    .wait('iframe')
    .enterIFrame('iframe[id="wysiwygTextarea_ifr"]')
    .type('body p','TTTTTT')
    .evaluate(() =>{
        return document.querySelector('body').innerHTML})
    //.end()
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


