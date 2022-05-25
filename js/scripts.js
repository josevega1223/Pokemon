//Pokemon List with keys
let pokemonRepository=(function(){
let pokemonList= [];
  
      function add (pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "height" in pokemon &&
          "weight" in pokemon &&
          "type" in pokemon &&
          "number" in pokemon
        ) {
        repository.push(pokemon);
      }else {
        console.log("pokemon is not correct");
      }
    }
      
      function getAll() {
        return repository;
      }

      function addListItem(pokemon){
        let pokemonList= document.querySelector('.pokemon-list');
        let listPokemon= document.createElement('li');
        let button= document.createElement('button');
        button.innerText= pokemon.name;
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        addEvent(button,pokemon);
      }

      function addEvent(button,pokemon){
        button.addEventListener('click', function(){
          showDetails(pokemon);
        });
      }

      function showDetails(pokemon){
        console.log(pokemon);
      }


    return{
        add: add,
        getAll: getAll,
        addListItem:addListItem
    };
  })();
  


pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);

});




