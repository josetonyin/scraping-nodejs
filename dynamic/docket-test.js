const Nightmare = require('nightmare')
const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
//const request1 = require('./request-service');
const nightmare = Nightmare({ show: true });
require('nightmare-iframe-manager')(Nightmare);
const url = 'https://thelens.clarivate.com/groups/technology-asset-management/projects/ipdocketingportal/content';
const { promisify } = require('util')
var _ = require('lodash');
var fs = require('fs');
const writeFile = promisify(fs.writeFile)
//const readFile = promisify(fs.readFile)
require('nightmare-inline-download')(Nightmare);
require('nightmare-download-manager')(Nightmare);

const cookie =  {"Cookie": "_sp_id.2f26=2f13d6d5-1037-49ac-a983-3d6bbfaf6823.1540307720.4.1542735343.1542385389.a01ba71e-eb78-4cfa-91cd-898f7ab96a1d; sp=3e1d0f0b-d35c-4fc1-a853-7f610099e9c9; _gid=GA1.2.511184856.1552253364; _ga=GA1.2.683619370.1511194813; _gat=1; jive.login.type=saml; route=7386de0ddbbd7aca06bbe78266438619; jive.login.ts=1552470971341; JSESSIONID=F0D06FAE1EE18A15F728C6AD60243AE7; jive.security.context=/k6wcln5ZE+2TQQFgAdiKAAAAAAADtVpmWMf8ZO/iDzQsPOX+2hiO+MXp2/ZW1vfBvZDN7RSQDpn8OsbeqUOhJr1Rh0=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-fsxr5:localPort=9443:localAddr=172.16.130.21; X-JCAPI-Token=5un8V7FA"};

// const writeAndRead = async () => {
//     await writeFile('./test.txt', 'Hello World')
//     const content = await readFile('./test.txt', 'utf-8')
  
//     return content
//   }

const getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('li.js-browse-thumbnail').find('p').each(function(i, elem) {
        data[i] = {"title" : $(this).text(), "link":   $(this).parent().find('a').attr('href')};
    });
    return data;
}
const download = ( async (url) => {
   
    nightmare.on('download', function(state, downloadItem){
        if(state == 'started'){
            nightmare.emit('download', downloadItem.filename, downloadItem);
        }
    });

    let test = nightmare
        .downloadManager()
        .goto(url, cookie)
        .wait("#jive-attachments")
        .evaluate( () => {
            document.querySelectorAll("#attachments li .attachment-thumb a").forEach( function(elem) {
                elem.click()
            })
        })
        .waitDownloadsComplete()
        .end()
        .then(data => {
        })
        .catch((error) => {
            console.error('Search failed:', error);
        });
})

 async function doRequest(data) {
    return new Promise( async function (resolve, reject) {
        request({
            method: 'GET',
            headers:  cookie,
            url: 'https://thelens.clarivate.com/' +  data.link
        }, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            $ = cheerio.load(body);
            var title=  $('div.j-content.clearfix').find('h1').text();
            //console.log(title);
            var text = $('div.jive-rendered-content').html();

            var  files= [];
            var att =  $('a.j-attachment-icon').each(function(i, elem){
                files[i] = 'https://thelens.clarivate.com/'.concat($(this).attr("href"));
            })
            _.each(files, download1);
            var  images = [];
            var att =  $('div.jive-rendered-content img').each(function(i, elem){
                images[i] = $(elem).attr("src");
            })
             _.each(images, download1);
            //console.log(text);
            resolve( {
                "title": title, "text": text , "filess" : files, "images" : images
            });
        } else {
          reject(error);
        }
      });
    });
  }
  
  
function dobaseRequest() {
    return new Promise(function (resolve, reject) {
        nightmare
        .goto(url,
            cookie)
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(response => {
            var data= getData(response);
        console.log(data);
        resolve(data);
        });
    })
}

async function download1(url, i) {
    return new Promise( async function (resolve, reject) {
        var filename, filepath, file;
        filename = url.split('/');
        filename = filename[filename.length - 1];
        filepath = [__dirname, '/downloads/', filename].join('');

        function callback() {
                  console.log(filename, 'done');
                resolve('done')
        }

        file = fs.createWriteStream(filepath);
       await request(url).pipe(file).on('close',  callback);
    })
}

  
 async function insertPage(title,text)
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


  
  async function main() {
    let res = await dobaseRequest();
    console.log(res);
    var data1 = [];
    for (var i = 0, len = data.length; i < len; i++) {
        let res = await doRequest(data[i]);        
        data1.push(res);
        //insertPage(res.title, res.text);
    }

      var filename, filepath, file;

      filename = 'page1.json';
      filepath = [__dirname, '/downloads/', filename].join('');
      function callback() {

          console.log(filename, 'done');

      }



      file = fs.createWriteStream(filepath);

      await writeFile(filepath, JSON.stringify(data1));
      //data1.pipe(file).on('close', callback);

      // let res = await doRequest("/docs/DOC-3493728");
     //console.log(data1);
}
  
  main();