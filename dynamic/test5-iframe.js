var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
var nightmare = Nightmare({ show: true ,webPreferences: { webSecurity:false},openDevTools: {
        mode: 'detach'
    }});

function insertPage(title,text)
{
    nightmare.goto('https://confluence.cpaglobal.com/pages/createpage.action?spaceKey=~jtony@cpaglobal.com&fromPageId=72699826')
        .wait(200)
        .type('input[id="os_username"]', 'jtony@cpaglobal.com')
        .type('input[id="os_password"]', 'Lovedale11')
        .click('input[id="loginButton"]')
        .wait('body')
        .wait('input[name="title"]')
        .type('input[name="title"]', title)
        .wait('iframe')
        .enterIFrame('iframe[id="wysiwygTextarea_ifr"]')
        .wait('body')
        .type('body', text)
        .exitIFrame()
        .click('#rte-button-publish')
        //.click('#rte-button-insert')
        //.wait('#rte-insert-macro')
        //.click('#rte-insert-macro')
        //.wait('#macro-browser-search')
        //.type('input[id="macro-browser-search"]','html')
        //.click('span[class="macro-icon-holder icon-html"]')
        //.wait('button[class="button-panel-button ok"]')
        //.click('button[class="button-panel-button ok"]')
        .evaluate(() => {
            return document.querySelector('body').innerHTML
        })
        .end()
        .then(response => {
            //console.log(response);
        })
}

//.wait('body')
//.title()
//.then(function(title){
// `title` is the title of the child frame #someIFrame
//   console.log(title);
// })
//.evaluate(() => document.querySelector('body').innerHTML)
insertPage('test - ttile - test','test descrption')

