window.addEventListener('keydown',function(event){
    try{ const key=document.querySelector(`div[data-key="${event.keyCode}"]`);
        const sound=this.document.querySelector(`audio[data-key="${event.keyCode}"]`);
        sound.play();
        key.classList.add('playing');
        setTimeout(function(){
            key.classList.remove('playing');
        },150)
}catch(e){}
   
})