const Request = require("request");
const cheerio = require('cheerio');
var api ={

    apirequest:(req,res)=>{
        Request.get("http://time.com/" , (error, response, body) => {
            if(error) {
             console.log(error);
             //   return console.dir(error);
            }
            
            else{
                let news=[];
       const $=cheerio.load(body);
       const homepage=$(".with-main-column").html();
       const $$=cheerio.load(homepage);
       /////Working above part
       const imppara=$$(".text-align-left").html();
       const $$$=cheerio.load(imppara);
       $$$('.column-tout-metadata a').each(function(i, elm) {
           let j={};
           j["title"]=$$$(this).text().trim();
           j["link"]=`http://time.com${$$$(this).attr("href").trim()}`;
           news.push(j);
        //console.log($(this).text()) // for testing do text() 
        //console.log($(this).attr("href")) // for testing do text() 
    });
         //console.log($$$.html());
          res.json({
              news
          })
            }
        })
    },




}


module.exports = api;