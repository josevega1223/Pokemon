//IIFE
let pokemonRepository=(function(){
let pokemonList= [];
let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer= document.querySelector('#modal-container');
  
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
        button.addEventListener('click', function(event){
          showDetails(pokemon);
        });
      }

      function loadingMessageHidden(hide){
        let loadingMessage = document.querySelector('.loading-message')
		    if (hide) {
			  loadingMessage.classList.add('hidden');
		    } else {
			  loadingMessage.classList.remove('hidden');
		    }
      }

      
      function loadList(){
        loadingMessageHidden(false);
        return fetch(apiUrl).then(function(response) {
          loadingMessageHidden(true);
          return response.json();
        }).then(function(json){
          json.results.forEach(function(item){
            let pokemon = {
              name: item.name,
              detailsUrl: item.url 
            };
            add(pokemon);
          });
        }).catch(function(e){
          loadingMessageHidden(true);
          console.error(e);
        })
      }

      function loadDetails(pokemon){
        loadingMessageHidden(false);
        let url= pokemon.detailsUrl;
        return fetch(url).then(function(response){
          loadingMessageHidden(true);
          return response.json();
        }).then(function(details){
          
          pokemon.imageUrlFront= details.sprites.front_default;
          pokemon.imageUrlBack= details.sprites.back_default;
          pokemon.height= details.height;
          pokemon.weight= details.weight;
          pokemon.types= details.types;
          let types = [];
			details.types.forEach((item) => types.push(item.type.name));
			pokemon.types = types;

        }).catch(function(e){
          loadingMessageHidden(true);
          console.error(e);
        });
      }

      function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function(){
        showModal(pokemon);
      });
    }

    function showModal(pokemon){
      modalContainer.innerHTML= '';
      
      let modal= document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement= document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText='Close';
      closeButtonElement.addEventListener('click', hideModal);

      let imgFront= document.createElement('img');
      imgFront.src= pokemon.imageUrlFront;
      imgFront.classList.add('pokemon-front-image');
      imgFront.setAttribute('alt', 'image of' + pokemon.name);

      let imgBack= document.createElement('img');
      imgBack.src= pokemon.imageUrlBack;
      imgBack.classList.add('pokemon-back-image');
      imgBack.setAttribute('alt', 'image of' + pokemon.name);

      let titleElement= document.createElement('h2');
      titleElement.innerText= pokemon.name;

      let heightElement= document.createElement('p');
      heightElement.innerText= `Height: ${pokemon.height}`;

      let weightElement= document.createElement('p');
      weightElement.innerText= `Weight: ${pokemon.weight}`;

      let typesElement= document.createElement('p');
      typesElement.innerText= `Types: ${pokemon.types.join(' ,')}`;

      modal.appendChild(closeButtonElement);
      modal.appendChild(imgFront);
      modal.appendChild(imgBack);
      modal.appendChild(titleElement);
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);


      modalContainer.classList.add('is-visible');
    }

    function hideModal(){
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e)=> {
      if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e)=> {
      let target = e.target;
      if (target=== modalContainer){
        hideModal();
      }
    })

    return{
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
  })();
  

pokemonRepository.loadList().then(function(){
   pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});





