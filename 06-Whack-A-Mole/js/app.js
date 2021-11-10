
let data={
    scorePoints:0,
    game:false
}

const holes=document.querySelectorAll('.hole');
const btn=document.querySelector('.btn');
const moles=document.querySelectorAll('.mole');
const score=document.querySelector('.score');

function showMole(hole){
    const numberHole=Math.floor(Math.random()*holes.length);
    holes[numberHole].classList.add('show');
    setTimeout(function(){
        holes[numberHole].classList.remove('show');
    },1000)
}

function startGame(){

    if(data.game===false){
        data.game=true;
        data.scorePoints=0;
    let times=0;
    let intervalGame=setInterval(function(){
        showMole(holes);
        times++;
        if(times===10){
            window.clearInterval(intervalGame);
            data.game=false;    
        }
},1000)}else{
    alert('You Are on game')
}

}

function punchMole(){
   data.scorePoints++;
   score.innerText=data.scorePoints;
}

// event handling
btn.addEventListener('click',function(){
    startGame();
});

holes.forEach(hole=>{
    hole.addEventListener('click',function(){
        if(hole.classList.contains('show')){
           punchMole();
           hole.classList.remove('show');
        }
    })
    
})




