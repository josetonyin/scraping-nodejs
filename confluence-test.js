const Nightmare = require('nightmare')
const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
const request1 = require('./request-service');
var iframe = require('nightmare-iframe');
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({ show: true, waitTimeout: 100000 , loadTimeout: 100000 ,
    'web-preferences': {'web-security': false}
});
const url = 'https://confluence.cpaglobal.com/display/~jtony@cpaglobal.com/test5';

const getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('li.js-browse-thumbnail').find('p').each(function(i, elem) {
        data[i] = {"title" : $(this).text(), "link":   $(this).parent().find('a').attr('href')};
    });
    return data;
}

// function doRequest(data) {
//     return new Promise(function (resolve, reject) {
//         request({
//             method: 'GET',
//             headers:  {"Cookie": "_sp_id.2f26=2f13d6d5-1037-49ac-a983-3d6bbfaf6823.1540307720.4.1542735343.1542385389.a01ba71e-eb78-4cfa-91cd-898f7ab96a1d; sp=3e1d0f0b-d35c-4fc1-a853-7f610099e9c9; _ga=GA1.2.683619370.1511194813; _gid=GA1.2.1728877703.1552063543; _gat=1; jive.login.type=saml; route=8c7a8ee2ade812308831e23aa807635f; jive.login.ts=1552063540794; JSESSIONID=23A1F23EE916540C74E76043FAA9B1C7; jive.security.context=UacVsFVfHjlfk/FiKJ8CgQAAAAAADrdA72W4aBhbYTUsuDXuDMGLxe5xOXroWWh5YoKD02DpMinRGcZ7e9t4/tZ5aLY=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-lrhhc:localPort=9443:localAddr=172.16.89.8; X-JCAPI-Token=sMeFynjW; jive.loginEventFired=true; containerSecurityToken=default:Jif5mxy6nryelKNswnmMrifgeeY87SnmaaHRPoH5koygLfWeteLRzXhiKUuiKV6xOI8JFSiqR2Nkx8wJzBeAn4uxUKWZzK7N7r3_GIA3G9BXSrpk#3600#false#1552067148466; _csrf=VghNk8kT91TWkwcfAPu7VU1e"},
//             url: 'https://thelens.clarivate.com/' +  data.link
//         }, function (error, res, body) {
//         if (!error && res.statusCode == 200) {
//             $ = cheerio.load(body);
//             var title=  $('div.j-content.clearfix').find('h1').text();
//             //console.log(title);
//             var text = $('div.jive-rendered-content').html();
//             //console.log(text);
//             resolve( {
//                 "title": title, "text": text
//             });
//         } else {
//           reject(error);
//         }
//       });
//     });
//   }
  
  
function doconfRequest(tile,text) {
    return new Promise(function (resolve, reject) {
        nightmare
        .goto(url,{"Cookie": "JSESSIONID=6E6512033432BBFBAAED75E7D0BCFBB6; seraph.confluence=69210659%3A79c193cc5e27b5d963d957152ffd77fbaa562069; AWSALB=rN76HvsXX2G8MdQ47g/yKzbf55Rzuf/AsTLG00rMSnIA0D/DuTFUVSZljknxSoLDXS/YzMhyWqltyKTD8ZQ1yRkNrXAl1HKMC7n/L8yZldzk3RBE9I9BL4L4/BWG"})
        //.wait(20000)                   
        .wait('body')        
        .evaluate(() =>{
            console.log(document.querySelector('body').innerHTML);
            //console.log(document.getElementById('tinymce'));
            //document.querySelector('pre').innerHTML= "ASDASDASD";
            return document.querySelector('body').innerHTML;
        })
        .click('#action-menu-link')        
        .wait('#action-copy-page-link')
        .click('#action-copy-page-link')
        .wait('#copy-dialog-next')
        .click('#copy-dialog-next')
        .wait('#content-title') 
        .type('input[name="title"]', tile)     
        //.insert('pre','')
        .wait('#content-title') 
         
        //.insert('td[class="wysiwyg-macro-body"]','<pre>test1`21212</pre>')
        .click('#rte-button-publish')        
        .end()
        .then(response => {
            //var data= getData(response);
        console.log(response);
        resolve(response);
        });
    })
}

function doconfRequest1(tile,text1) {
    return new Promise(function (resolve, reject) {
        nightmare
        .goto(url,{"Cookie": "JSESSIONID=6E6512033432BBFBAAED75E7D0BCFBB6; seraph.confluence=69210659%3A79c193cc5e27b5d963d957152ffd77fbaa562069; AWSALB=rN76HvsXX2G8MdQ47g/yKzbf55Rzuf/AsTLG00rMSnIA0D/DuTFUVSZljknxSoLDXS/YzMhyWqltyKTD8ZQ1yRkNrXAl1HKMC7n/L8yZldzk3RBE9I9BL4L4/BWG"})
        //.wait(20000)                   
        .wait('body')       
        .click('#action-menu-link')        
        .wait('#action-copy-page-link')
        .click('#action-copy-page-link')
        .wait('#copy-dialog-next')
        .click('#copy-dialog-next')
         .wait('#content-title') 
         .type('input[name="title"]', tile)     
        //.insert('pre','')
        .wait('#content-title')  
        .enterIFrame('#wysiwygTextarea_ifr')
        .type('pre','yyyyyyyyy')    
        // .use(iframe.withFrameName('#wysiwygTextarea_ifr', function(nightmare){
        //     nightmare
        //     .type('pre','yyyyyyyyy')              
        // }))
        // .backToParentFrame()
        //.type('#wysiwygTextarea','&lt;table class="wysiwyg-macro" data-macro-name="html" data-macro-id="da0b9e83-ab2c-4025-8b74-021a50ff9eb9" data-macro-schema-version="1" style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;amp;locale=en_US&amp;amp;version=2); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT"&gt;&lt;tr&gt;&lt;td class="wysiwyg-macro-body"&gt;&lt;pre&gt;CCCCCCC&lt;/pre&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;')
        //.type('textarea[name="wysiwygContent"]','&lt;table class="wysiwyg-macro" data-macro-name="html" data-macro-id="da0b9e83-ab2c-4025-8b74-021a50ff9eb9" data-macro-schema-version="1" style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2h0bWx9&amp;amp;locale=en_US&amp;amp;version=2); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT"&gt;&lt;tr&gt;&lt;td class="wysiwyg-macro-body"&gt;&lt;pre&gt;CCCCCCC&lt;/pre&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;')
        .wait(2000) 
        .evaluate(() =>{
          
       //document.querySelector('textarea').innerHTML =  document.querySelector('textarea').innerHTML.replace("asdadsa", "XXXXXXXXXXXX"); 
       return  document.querySelector('textarea').innerHTML;
            })  
        //.click('#rte-button-publish')        
        .end()
        .then(response => {
            //var data= getData(response);
        console.log(response);
        resolve(response);
        });
    })
}

  
 


  
  async function main() {
    let res = await doconfRequest1('jose2','tpmy');
    //console.log(res);    

    // let res = await doRequest("/docs/DOC-3493728");
     //console.log(data1);
}
  
  main();   