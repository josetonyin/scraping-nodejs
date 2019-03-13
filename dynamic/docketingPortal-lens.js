const Nightmare = require('nightmare')
const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
const request1 = require('./request-service');
const nightmare = Nightmare({ show: true });
const url = 'https://thelens.clarivate.com/groups/technology-asset-management/projects/ipdocketingportal/content';

const init = async (url) => {
    try {
        const result = await request({
            method: 'GET',
            uri: url,
            baseUrl: 'https://thelens.clarivate.com/',
            headers:  {"Cookie": "sp=40ae2a7a-065f-451b-b58b-a3f05b9c5dc2; _gid=GA1.2.1557208856.1552016673; _ga=GA1.2.1289584606.1523267847; route=7386de0ddbbd7aca06bbe78266438619; JSESSIONID=A2BAD76F0108B90585C67E38AC17F3D6; jive.login.ts=1552016665977; jive.security.context=b3V3nI1nXMtZ33bWH3bpcgAAAAAADq/xQY32EDzeNVYRlqmNbmJ7N5A/I67bfWQyG5SrjJsWtQueKNRpz+DTx4oJin4=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-fsxr5:localPort=9443:localAddr=172.16.130.21; X-JCAPI-Token=9R2Hit9w; jive.loginEventFired=true; _csrf=wgpGVS8PPshOfHWIc4V9p-ck; containerSecurityToken=default:-m1i5TzWVKjiKNbWiUy-QHof7llVrgWfStM8am-0B1CSX8m7z-HbFhPhCVyjyC4Cq7nb9_xJ-hCs4KlKJepxeG78Hfr2bBUB4o3MDSfBcpSsUpM4#3600#false#1552024060898; jive.login.type=saml"},            
        })
        return result;
    }
    catch (err) {
        console.error(err)
    }
}
async function main() {

    nightmare
        .goto(url,
            {"Cookie": "sp=40ae2a7a-065f-451b-b58b-a3f05b9c5dc2; _gid=GA1.2.1557208856.1552016673; _ga=GA1.2.1289584606.1523267847; route=7386de0ddbbd7aca06bbe78266438619; JSESSIONID=A2BAD76F0108B90585C67E38AC17F3D6; jive.login.ts=1552016665977; jive.security.context=b3V3nI1nXMtZ33bWH3bpcgAAAAAADq/xQY32EDzeNVYRlqmNbmJ7N5A/I67bfWQyG5SrjJsWtQueKNRpz+DTx4oJin4=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-fsxr5:localPort=9443:localAddr=172.16.130.21; X-JCAPI-Token=9R2Hit9w; jive.loginEventFired=true; _csrf=wgpGVS8PPshOfHWIc4V9p-ck; containerSecurityToken=default:-m1i5TzWVKjiKNbWiUy-QHof7llVrgWfStM8am-0B1CSX8m7z-HbFhPhCVyjyC4Cq7nb9_xJ-hCs4KlKJepxeG78Hfr2bBUB4o3MDSfBcpSsUpM4#3600#false#1552024060898; jive.login.type=saml"})
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(response => {
            var data= getData(response);
            console.log(data);
            var data1 = [];
            for (var i = 0, len = data.length; i < len; i++) {
                let res = await getDocument(data[i]);
                data1.push(res);
            }
            console.log(data1);

        }).catch(err => {
        console.log(err);
    });
}

    let getData = html => {
        data = [];
        const $ = cheerio.load(html);
        $('li.js-browse-thumbnail').find('p').each(function(i, elem) {
            data[i] = {"title" : $(this).text(), "link":   $(this).parent().find('a').attr('href')};
        });
        return data;
    }




 let getDocument =  async data =>{
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            headers:  {"Cookie": "sp=40ae2a7a-065f-451b-b58b-a3f05b9c5dc2; _gid=GA1.2.1557208856.1552016673; _ga=GA1.2.1289584606.1523267847; route=7386de0ddbbd7aca06bbe78266438619; JSESSIONID=A2BAD76F0108B90585C67E38AC17F3D6; jive.login.ts=1552016665977; jive.security.context=b3V3nI1nXMtZ33bWH3bpcgAAAAAADq/xQY32EDzeNVYRlqmNbmJ7N5A/I67bfWQyG5SrjJsWtQueKNRpz+DTx4oJin4=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-fsxr5:localPort=9443:localAddr=172.16.130.21; X-JCAPI-Token=9R2Hit9w; jive.loginEventFired=true; _csrf=wgpGVS8PPshOfHWIc4V9p-ck; containerSecurityToken=default:-m1i5TzWVKjiKNbWiUy-QHof7llVrgWfStM8am-0B1CSX8m7z-HbFhPhCVyjyC4Cq7nb9_xJ-hCs4KlKJepxeG78Hfr2bBUB4o3MDSfBcpSsUpM4#3600#false#1552024060898; jive.login.type=saml"},
            url: 'https://thelens.clarivate.com/' +  data.link
        }, function(err, response, body) {
            if (err) reject(err);
    
            //console.log(data.link);
    
            // Tell Cherrio to load the HTML
            $ = cheerio.load(body);
            var title=  $('div.j-content.clearfix').find('h1').text();
            //console.log(title);
            var text = $('div.jive-rendered-content').html();
            //console.log(text);
            resolve( {
                "title": title, "text": text
            });
                /*.find(.each(function() {
                var href = $('a.collection-card-image', this).attr('href');
                if (href.lastIndexOf('/') > 0) {
                    console.log($('h3', this).text());
                }
            });*/
        });

    });


    //  let res = await init(data.link);
    //  //console.log(res)     
    //  $ = cheerio.load(res);
    //     var title=  $('div.j-content.clearfix').find('h1').text();
    //     //console.log(title);
    //     var text = $('div.jive-rendered-content').html();
    //     //console.log(text);
    //     return{
    //         "title": title, "text": text
    //     }


   /* request({
        method: 'GET',
        headers:  {"Cookie": "sp=40ae2a7a-065f-451b-b58b-a3f05b9c5dc2; _gid=GA1.2.1557208856.1552016673; _ga=GA1.2.1289584606.1523267847; route=7386de0ddbbd7aca06bbe78266438619; JSESSIONID=A2BAD76F0108B90585C67E38AC17F3D6; jive.login.ts=1552016665977; jive.security.context=b3V3nI1nXMtZ33bWH3bpcgAAAAAADq/xQY32EDzeNVYRlqmNbmJ7N5A/I67bfWQyG5SrjJsWtQueKNRpz+DTx4oJin4=; jive.user.loggedIn=true; jive.server.info=serverName=thelens.clarivate.com:serverPort=443:contextPath=:localName=webapp-rc-fsxr5:localPort=9443:localAddr=172.16.130.21; X-JCAPI-Token=9R2Hit9w; jive.loginEventFired=true; _csrf=wgpGVS8PPshOfHWIc4V9p-ck; containerSecurityToken=default:-m1i5TzWVKjiKNbWiUy-QHof7llVrgWfStM8am-0B1CSX8m7z-HbFhPhCVyjyC4Cq7nb9_xJ-hCs4KlKJepxeG78Hfr2bBUB4o3MDSfBcpSsUpM4#3600#false#1552024060898; jive.login.type=saml"},
        url: 'https://thelens.clarivate.com/' +  data.link
    }, function(err, response, body) {
        if (err) return console.error(err);

        console.log(data.link);

        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        var title=  $('div.j-content.clearfix').find('h1').text();
        //console.log(title);
        var text = $('div.jive-rendered-content').html();
        //console.log(text);
        return{
            "title": title, "text": text
        }
            /*.find(.each(function() {
            var href = $('a.collection-card-image', this).attr('href');
            if (href.lastIndexOf('/') > 0) {
                console.log($('h3', this).text());
            }
        });*/
   // });
}
main();