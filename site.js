const puppeteer = require("puppeteer");
const id = "acd830980@gmail.com";
const pw = "abcd@2021";

(async function(){
    try { 
        let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args:["--start-maximized"],
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.imdb.com");
    await tab.click(".imdb-header__signin-text");
    await tab.waitForSelector("#signin-options div>a", {visible: true});
    let signinIMDB = await tab.$("#signin-options div>a"); 
    await signinIMDB.click();
    await tab.waitForSelector('input[type="email"]', {visible: true});
    await tab.type('input[type="email"]', id);
    await tab.waitForSelector('input[type="password"]', {visible: true});
    await tab.type('input[type="password"]', pw);
    await tab.click('#signInSubmit');
    await tab.waitForSelector('.ipc-tabs .ipc-tab', {visible: true});
    const allLis = await tab.$$('.ipc-tabs .ipc-tab');
    let ottName = ["PRIME VIDEO", "NETFLIX", "HOTSTAR", "MX PLAYER", "JIOCINEMA", "SONYLIV", "EROSNOW", "VOOT"];
    
    for(let i=0; i<allLis.length; i++)
    {   
        //await tab.waitForNavigation();  
        let currentLi = allLis[i];
        //await waitForTimeout(1000);
        await currentLi.click({delay:2000}); 
        await checkEligibility(ottName[i], tab, currentLi);       
    }
        
        let watchlistSection = await tab.$('.imdb-header__watchlist-button a div');
        await watchlistSection.click();
    //console.log(allLis.length);
    // ottPlatform(ottName);    
    }catch(error){
        console.log(error);
    }
})();

async function checkEligibility(ottName, tab, currentLi){
    try{
        //await tab.waitForSelector('.streaming-picks .ipc-sub-grid .ipc-poster-card .ipc-rating-star--imdb', {visible: true});
        let allRatings = await tab.$$('.streaming-picks .ipc-sub-grid .ipc-poster-card .ipc-rating-star--imdb');
        console.log(allRatings.length," is the allRating length");
        //let count = 0;
        for(i=0; i<allRatings.length; i++)
        {
            //await tab.waitForNavigation();
            let element = allRatings[i];
            let currentRating = await tab.evaluate(function (element) { return element.textContent}  , element);
            if(Number(currentRating) >= 8.5)
            {
                //count++;
                console.log(currentRating);
                //let index = i;                
                //await tab.waitForTimeout(900);
                //await addToWatchList(tab, index);
                //await tab.waitForSelector('div[data-testid="streaming-picks-shoveler"] .ipc-sub-grid .ipc-poster div.ipc-focusable', {visible: true});
                let addWatchlistLink = await tab.$$('div[data-testid="streaming-picks-shoveler"] .ipc-sub-grid .ipc-poster div.ipc-focusable');       
                //await tab.evaluate(function(element){ return element.click();}, addWatchlistLink[i]);
                //console.log(addWatchlistLink.length);
                await tab.waitForTimeout(1000);
                await addWatchlistLink[i].click();
                
            }
        }
        console.log(ottName); 
    }
    catch(error){
        console.log(error);
    }
}


 async function addToWatchList(tab, index ){
  try{
      //await tab.waitForNavigation();
      
      //console.log(addWatchlistLink.length, " is all Watchlist length"); 
      
      
    //    for(let i=0; i<addWatchlistLink.length; i++)
    //    {
    //        if(i == index)
    //        {
    //             
                 
    //        }
    //        else
    //        {
    //            //do nothing
    //        }
    //    }
               
      }catch(error){
       console.log(error);
    }
 }