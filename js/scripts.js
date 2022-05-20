//Pokemon List with keys
let pokemonRepository=(function(){
let pokemonList= [
    {name: 'Bulbasaur', height:2.04 , weight: 15.2 , type:['grass','poison'], number:'#001' },
    {name: 'Ivysaur', height:3.03 , weight: 28.7 , type:['grass', 'poison'], number:'#002' },
    {name: 'Venusaur', height:6.07 , weight: 220.5 , type:['grass', 'poison'], number:'#003' },
    {name: 'Charmander', height:2.00, weight: 18.7 , type:'fire', number:'#004'},
    {name: 'Charmeleon', height:3.07, weight: 41.9 , type:'fire', number:'#005'},
    {name: 'Charizard', height:5.07, weight: 199.5 , type:['fire', 'flying'], number:'#006'},
    {name: 'Squirtle', height:1.08, weight: 19.8 , type:'water', number:'#007'},
    {name: 'Wartortle', height:3.03, weight: 49.6 , type:'water', number:'#008'},
    {name: 'Blastoise', height:5.03, weight: 188.5 , type:'water', number:'#009'}

];
  
      function add (pokemon) {
        pokemonList.push(pokemon);
      }
      
      function getAll() {
        return pokemonList;
      }
    return{
        add: add,
        getAll: getAll
    };
  })();
  


pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if(pokemon.height>5.0){
        document.write(' is a big Pokemon!');
    }else if (pokemon.height>2.5 && pokemon.height<5.0){
        document.write(' is an average Pokemon.');
    }else{
        document.write(' is a small Pokemon.');
    }
    document.write('<br>');
})




