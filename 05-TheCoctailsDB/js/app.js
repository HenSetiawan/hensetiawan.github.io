
const input =document.querySelector('.search input');
const itemsContainer=document.querySelector('.items');
const itemsTitle=document.querySelector('.items-title');


// event handling
input.addEventListener('keyup',async function(){
    try{
     let urlApi=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
    const inputValue=input.value;
   const items= await getData(urlApi,inputValue);
   console.log(items);
   cretaCards(items.drinks)
   itemsTitle.innerHTML=`<h2>Cocktails</h2>`;
    }catch(err){
        itemsTitle.innerHTML=`<h2>No Cocktails Matched Your Search Criteria</h2>`;
        itemsContainer.innerHTML='';
        console.log(err);
    }

});





// details button on click
document.addEventListener('click',async function(){  
    if(event.target.classList.contains('detailId')){
        event.preventDefault();
        const dataId=event.target.dataset.id;
        let urlApi=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
        let dataDetails = await getData(urlApi,dataId);
        cretaCardsDetails(dataDetails.drinks);
       
 
    }
});



// function

function getData(url,keyword){
   return fetch(url+keyword)
                .then(response=>response.json())
                .then(response=>{return response})
                .catch(response=>console.log(`error :${response}`))
}


function cretaCards(cocktails ){
    let card=``;
    cocktails.forEach(cocktail  => {
        card+=`<div class="card">
                <div class="card-header">
                    <img src="${cocktail.strDrinkThumb}" alt="" srcset="">
                </div>
                <div class="card-item">
                    <h3>${cocktail.strDrink}</h3>
                    <p>${cocktail.strGlass}</p>
                    <p>${cocktail.strAlcoholic}</p>
                    <a href="./detail.html" class="detailId" data-id=${cocktail.idDrink}>Details</a>
                </div>       
            </div>`
    });

    itemsContainer.innerHTML=card;
}


function cretaCardsDetails(cocktails){
    let card=``;
    cocktails.forEach(cocktail  => {
        card+=`<div class="card detail">
                <div class="card-header">
                    <img src="${cocktail.strDrinkThumb}" alt="" srcset="">
                </div>
                <div class="card-item">
                    <h3>Name :${cocktail.strDrink}</h3>
                    <p>Glass :${cocktail.strGlass}</p>
                    <p>Alcoholic :${cocktail.strAlcoholic}</p>
                    <p>Ingredients :${cocktail.strIngredient1},${cocktail.strIngredient2},${cocktail.strIngredient3}</p>
                    <p>Instructions :${cocktail.strInstructions}</p>
                    
                </div>       
            </div>`
    });

    itemsContainer.innerHTML=card;
}


