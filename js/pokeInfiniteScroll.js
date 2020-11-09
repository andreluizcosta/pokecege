window.addEventListener("scroll", () => {
    if(!isCardInfo){
        
    const { scrollTop, scrollHeight, clientHeight}
    = document.documentElement;
    

     if ((scrollTop + clientHeight + 400) >= scrollHeight) {  
            
         if(viewPokemon + stepLazyLoad < maxPokemon){
             viewPokemon+=stepLazyLoad;
         }
         else{
             viewPokemon = maxPokemon;
         }

         const newExibitionList = filtarPokemons();
         exibirPokemon(newExibitionList)
     }
    }
 });