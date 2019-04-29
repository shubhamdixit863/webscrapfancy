const Request = require("request");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var phantom = require("phantom");
var api ={

    apirequest:(req,res)=>{
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            let eventid=29253476; // pass eventid from request
            let marketid=1.158147115; // pass marketid from request
            let url=`https://www.skyexchange.com/exchange/member/fullMarket?eventType=4&eventId=${eventid}&marketId=${marketid}`;
          
            await page.goto(url);
          
            const textContent = await page.evaluate(() => {
              return document.querySelector('#fancyBetMarketList').outerHTML
            });
          
           
            //console.log(textContent)
            const $ = cheerio.load(textContent);
          
          let arr=[];
          
          $( "tr[id^='fancyBetMarket_']" ).each(
            function (i, elem) {
            //  console.log($(this).attr('id'));
             arr.push($(this).attr('id'));
            }
          )
          
          //console.log(arr);
          
          let result=arr.reduce((o,a)=>{
            let numericid= a.split("_")[1];
            let style=$(`#suspend_${numericid}`).css("display");
            if(style=="none")
            {
              // market is open here
              // get the text of respective fancy id
              let text=$(`#${a}`).text().replace(/\s\s+/g, '#');
              let onearray=text.split("#");
              //console.log(onearray);
          let object=new Object();
          
          object.fancyname=onearray[1];
          object.fancyid=a;
          object.status="";
          if(onearray[3]!="Min/Max")
          {  
            // here the rate is present
          let layarray=Array.from(onearray[3]);
          let backarry=Array.from(onearray[4]);
          
          let layrunarray=layarray.slice(-layarray.length,layarray.length-3);
          let backrunarray=backarry.slice(-backarry.length,backarry.length-3);
          
          let laypricearray=layarray.splice(layarray.length-3);
          let backpricearray=backarry.splice(backarry.length-3);
          
          object.layruns=layrunarray.join('');
          object.layprice=laypricearray.join('');
          object.backruns=backrunarray.join('');
          object.backprice=backpricearray.join('');
          
          
          
          
          }
          
          else{
          
            object.layruns="";
          object.layprice="";
          object.backruns="";
          object.backprice="";
          }
          
              o.push(object);
              
          
            }
          
            else{
          
            // market is open here
              // get the text of respective fancy id
              let text=$(`#${a}`).text().replace(/\s\s+/g, '#');
              let onearray=text.split("#");
              console.log(onearray);
          let object=new Object();
          
          object.fancyname=onearray[1];
          object.fancyid=a;
          object.status="SUSPENDED";
          if(onearray[3]!="Min/Max")
          {  
            // here the rate is present
          let layarray=Array.from(onearray[3]);
          let backarry=Array.from(onearray[4]);
          
          let layrunarray=layarray.slice(-layarray.length,layarray.length-3);
          let backrunarray=backarry.slice(-backarry.length,backarry.length-3);
          
          let laypricearray=layarray.splice(layarray.length-3);
          let backpricearray=backarry.splice(backarry.length-3);
          
          object.layruns=layrunarray.join('');
          object.layprice=laypricearray.join('');
          object.backruns=backrunarray.join('');
          object.backprice=backpricearray.join('');
          
          
          
          
          
          }
          
          else{
          
            object.layruns="";
          object.layprice="";
          object.backruns="";
          object.backprice="";
          }
          
              o.push(object);
              
          
          
            }
          
            return o;
          
          
          },[])
          
          
            browser.close();
            return result;
            
          })().then(a=>{
            res.json(a);
          })
    },

    fancyapirequest:(req,res)=>{
      (async () => {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
          console.info('Requesting', requestData.url);
        });
       
        let eventid=29253476; // pass eventid from request
        let marketid=1.158147115; // pass marketid from request
        let url=`https://www.skyexchange.com/exchange/member/fullMarket?eventType=4&eventId=${eventid}&marketId=${marketid}`;
      
        const status = await page.open(url);
        const content = await page.property('#fancyBetMarketList');
        console.log(content);
       
        await instance.exit();
         
          //console.log(textContent)
          const $ = cheerio.load(content);
        
        let arr=[];
        
        $( "tr[id^='fancyBetMarket_']" ).each(
          function (i, elem) {
          //  console.log($(this).attr('id'));
           arr.push($(this).attr('id'));
          }
        )
        
        //console.log(arr);
        
        let result=arr.reduce((o,a)=>{
          let numericid= a.split("_")[1];
          let style=$(`#suspend_${numericid}`).css("display");
          if(style=="none")
          {
            // market is open here
            // get the text of respective fancy id
            let text=$(`#${a}`).text().replace(/\s\s+/g, '#');
            let onearray=text.split("#");
            //console.log(onearray);
        let object=new Object();
        
        object.fancyname=onearray[1];
        object.fancyid=a;
        object.status="";
        if(onearray[3]!="Min/Max")
        {  
          // here the rate is present
        let layarray=Array.from(onearray[3]);
        let backarry=Array.from(onearray[4]);
        
        let layrunarray=layarray.slice(-layarray.length,layarray.length-3);
        let backrunarray=backarry.slice(-backarry.length,backarry.length-3);
        
        let laypricearray=layarray.splice(layarray.length-3);
        let backpricearray=backarry.splice(backarry.length-3);
        
        object.layruns=layrunarray.join('');
        object.layprice=laypricearray.join('');
        object.backruns=backrunarray.join('');
        object.backprice=backpricearray.join('');
        
        
        
        
        }
        
        else{
        
          object.layruns="";
        object.layprice="";
        object.backruns="";
        object.backprice="";
        }
        
            o.push(object);
            
        
          }
        
          else{
        
          // market is open here
            // get the text of respective fancy id
            let text=$(`#${a}`).text().replace(/\s\s+/g, '#');
            let onearray=text.split("#");
            console.log(onearray);
        let object=new Object();
        
        object.fancyname=onearray[1];
        object.fancyid=a;
        object.status="SUSPENDED";
        if(onearray[3]!="Min/Max")
        {  
          // here the rate is present
        let layarray=Array.from(onearray[3]);
        let backarry=Array.from(onearray[4]);
        
        let layrunarray=layarray.slice(-layarray.length,layarray.length-3);
        let backrunarray=backarry.slice(-backarry.length,backarry.length-3);
        
        let laypricearray=layarray.splice(layarray.length-3);
        let backpricearray=backarry.splice(backarry.length-3);
        
        object.layruns=layrunarray.join('');
        object.layprice=laypricearray.join('');
        object.backruns=backrunarray.join('');
        object.backprice=backpricearray.join('');
        
        
        
        
        
        }
        
        else{
        
          object.layruns="";
        object.layprice="";
        object.backruns="";
        object.backprice="";
        }
        
            o.push(object);
            
        
        
          }
        
          return o;
        
        
        },[])
        
        
          browser.close();
          return result;
          
        })().then(a=>{
          res.json(a);
        })
  }




}


module.exports = api;