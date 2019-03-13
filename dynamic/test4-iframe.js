var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
var nightmare = Nightmare({ show: true ,webPreferences: { webSecurity:false},openDevTools: {
        mode: 'detach'
    }});
nightmare.goto('https://confluence.cpaglobal.com/pages/editpage.action?pageId=72699828')
    .wait(200)
    .type('input[id="os_username"]','jtony@cpaglobal.com')
    .type('input[id="os_password"]','Lovedale11')
    .click('input[id="loginButton"]')
    .wait('body')
    .wait('iframe')
    //.enterIFrame('iframe[id="wysiwygTextarea_ifr"]')
    //.wait('tbody')
    //.type('tbody','<table class="wysiwyg-macro" style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;locale=en_US&amp;version=2); background-repeat: no-repeat;" data-macro-name="html" data-macro-id="1f2efb0e-8fd2-47f0-b04d-e1a7c1441cc3" data-macro-schema-version="1" data-macro-body-type="PLAIN_TEXT" data-mce-style="background-image: url(\'https://confluence.cpaglobal.com/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;locale=en_US&amp;version=2\'); background-repeat: no-repeat;"><tbody><tr><td class="wysiwyg-macro-body"><pre>&lt;TTTXXXDDDEEE&gt;</pre></td></tr></tbody></table>')
    //.exitIFrame()
    .click('#rte-button-insert')
    .wait('#rte-insert-macro')
    .click('#rte-insert-macro')
    .wait('#macro-browser-search')
    .type('input[id="macro-browser-search"]','html')
    .click('span[class="macro-icon-holder icon-html"]')
    .wait('button[class="button-panel-button ok"]')
    .click('button[class="button-panel-button ok"]')
    .evaluate(() =>{
        return document.querySelector('body').innerHTML})
    //.end()
    .then(response => {
        //console.log(response);
    })


//.wait('body')
//.title()
//.then(function(title){
// `title` is the title of the child frame #someIFrame
//   console.log(title);
// })
//.evaluate(() => document.querySelector('body').innerHTML)


