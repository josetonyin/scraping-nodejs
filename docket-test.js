const Nightmare = require('nightmare')
const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
const request1 = require('./request-service');
const nightmare = Nightmare({ show: true });
const url = 'https://thelens.clarivate.com/groups/technology-asset-management/projects/ipdocketingportal/content';
const { promisify } = require('util')
//const writeFile = promisify(fs.writeFile)
//const readFile = promisify(fs.readFile)
require('nightmare-inline-download')(Nightmare);
require('nightmare-download-manager')(Nightmare);

const cookie =  {"Cookie": "_sp_id.2f26=2f13d6d5-1037-49ac-a983-3d6bbfaf6823.1540307720.4.1542735343.1542385389.a01ba71e-eb78-4cfa-91cd-898f7ab96a1d; sp=3e1d0f0b-d35c-4fc1-a853-7f610099e9c9; _gat=1; _gid=GA1.2.511184856.1552253364; _ga=GA1.2.683619370.1511194813; route=8c7a8ee2ade812308831e23aa807635f; JSESSIONID=6F8F952C4DED0A4C75F2796F4309A4B3; jive.login.ts=1552063540794; jive.security.context=zZpPfKj0pLfbtXGAEK//+AAAAAAADsZQI0SpgWdjq1uT+KN9fvyegX8uKNtwnEf752m3kY3AU5OVS9Oix2xdmznbdBY=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-lrhhc:localPort=9443:localAddr=172.16.89.8; X-JCAPI-Token=jyWpsHHK; jive.loginEventFired=true; containerSecurityToken=default:29m4OMFdCLqReI1ZcnSzTMyS3SaGaQ-sqVtbAx2y_LyM4q4l2OwRyZOBuKaO6Zm_s2AsVN7qaOR_3hU78YJt0sMz7oOeH3oh-FvZ0Xjd7cjwYuf4#3600#false#1552336446021; _csrf=VghNk8kT91TWkwcfAPu7VU1e; jive.login.type=saml"};

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

function doRequest(data) {
    return new Promise(function (resolve, reject) {
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
                files[i] = $(this).attr("href");               
            })  
            //console.log(text);
            resolve( {
                "title": title, "text": text , "filess" : files
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

  
 


  
  async function main() {
    let res = await dobaseRequest();
    console.log(res);
    var data1 = [];
    for (var i = 0, len = data.length; i < len; i++) {
        let res = await doRequest(data[i]);        
        data1.push(res);
    }

    // let res = await doRequest("/docs/DOC-3493728");
     console.log(data1);
}
  
  main();