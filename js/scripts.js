//Pokemon List with keys
let pokemonRepository=(function(){
let pokemonList= [];
let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
      function add (pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "detailsUrl" in pokemon
        ) {
        pokemonList.push(pokemon);
      }else {
        console.log("pokemon is not correct");
      }
    }
      
      function getAll() {
        return pokemonList;
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




