const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const tweetButton= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader=document.getElementById('loader')


let apiQuotes =[];

// show loading
// showLoadingSpinner()
function loading(){
// hidden attribute is on any html element 

// false- don't hide
loader.hidden=false;
// true- hide 
quoteContainer.hidden=true;

}

// hide loading 
// removeLoadingSpinner()
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// show new Quote 
function newQuote(){
    loading();
    // pick a random quote form apiQuotes array 
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // console.log(quote);
    // textContent allows to pass a string 
    
    
    // check if author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
authorText.textContent=quote.author;
    }
    // check quote length to determine styling
    if (quote.text.length>120){
        // add a css class 
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader 
    // here we don't see loader when we click new quote because we are fetching quotes locally
    quoteText.textContent=quote.text;

 complete();

}
// get quotes from outside source
// api to get quotes from- https://type.fit/api/quotes
// it returns array of quotes we have to select one quote randomly out of the array 
//  use asynchronous fetch  request within try catch statement 
// An asynchronous function can run at any time independently and it won't stop the browser from completing the loading of  page
async function getQuotes(){
    loading();
    const apiURL= 'https://type.fit/api/quotes';
    try{ 
        // this constant will not be populated until it has some data fetched from our api
 const response=await fetch(apiURL);
//  global variable -apiquotes
// we're getting json from our api as a response and then we're turning that response into a json object because from web server it's actually just a series of strings
apiQuotes = await response.json(); 
// console.log(apiQuotes);
// console.log(apiQuotes[12]);
// in order to get random quotes every time 
newQuote();
    }catch(error){
        // catch error here 
        
    }
}

// to tweet a quote on twitter
// we will pass a query parameter 'text' in the link and inside text parameter we'll pass template string  that feature our quote and our author values separated by a space and a dash
function tweetQuote(){
// ``-template string because we'll have query parameter here and it allows us to pass in a variable and it will be converted into a string
const tweetUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
// to open a window using twitter url
// _blank allows to open twitter in new tab 
window.open(tweetUrl,'_blank');
}
// event listeners
newQuoteBtn.addEventListener("click",newQuote);
tweetButton.addEventListener("click",tweetQuote);

// on load 
getQuotes(); 


// to fetch quotes present locally in our project 
// function newQuote(){
//     // pick a random quote form apiQuotes array 
//     const quote=localQuotes[Math.floor(Math.random()* localQuotes.length)];
//     console.log(quote);



// }
// newQuote();



// --------------------------------------------------------------------------------------------------------------------------------------------------

// optional
// below code doesn't work because fetch request we're using uses a Cors policy that means that by if you are calling an API like http://api.forismatic.com/api/1.0/ from different origin like localhost that doesn't work, it's blocked , this happens if we are using free api as this might happen because this api might not be properly configured to send Cors headers 
// get quotes form api
// http://api.forismatic.com/api/1.0/-free restapi for our quotes
// async function getQuote(){
//     const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//     try{
//     const response= await fetch(apiUrl);
//     const data= await response.json();
//     console.log(data);
//     }catch(error){
//         console.log('whoops,no quote',error);
//     }
    
    
//     }
    
//     // on load 
//     getQuote();
    
    
    
    // Solution
    // call aproxy api first then call quoe api  
    // READ BELOW ARTICLE FOR SOLUTION
    // https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
// getQuoteFormAPI
    // async function getQuote() {
    //     // we can also build our own version of proxyUrl because sometimes this server can be down and we can't fetch our data
    //     const proxyUrl='https://cors-anywhere.herokuapp.com/'
    //     const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    //     try{
    //     const response= await fetch(proxyUrl+apiUrl);
    //     const data= await response.json();
    //     console.log(data);
    //     }catch(error){
    //         // instead of just console logging the error we can also get a new quote 
    //         getQuote();
    //         console.log('whoops,no quote',error);
    //     }
        
        
    //     }
        
    //     // on load 
    //     getQuote();
        