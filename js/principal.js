
//Recebendo Busca Pokémon - Click do botão
botaoBuscar.addEventListener("click", function(event){ //passando uma função anônima 

	event.preventDefault();
	console.log("Busca Iniciada..");

	var form = document.querySelector("#form-busca");

	var nome = form.nome.value;	

	if(nome){
		window.open("index.html?name="+nome,'_self');
	}
	else {		
		window.open("index.html",'_self');
	}


});

const getPokeInfo = async(pokeId) => {


	const pokemon = pokemonList.find(poke => poke.id === pokeId); 


	const description = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokeId}`)
	.then(response => response.json())
	.then(characteristic => characteristic.descriptions.find(item => item.language.name === 'en').description)
	.catch(error => console.log(error));

	const polemonHTMLString = `
		<div class = "margin-card">
		<a href="index.html">
		<img  class = "voltar" src="img/Voltar.png">
		</a>
		</div>

		<li class="card">
		<img class = "card-image" src = "${pokemon.image}"/>
		<h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
		<div id = "badge-solo">
			${pokemon.types.map(type=> 
				`<div class = "tipo-badge ${type}">
				<img  src = "img/types/${type}.svg"/>
				
				<p class = "card-subtitle">${type}</p>
				</div>`
			).join('')}
		</div>
		<p class = "card-subtitle">Height: ${pokemon.height}</p>
		<p class = "card-subtitle">Weight: ${pokemon.weight}</p>
		
		<p class = "card-subtitle">Abilities: ${pokemon.abilities}</p>
		</li>

		`; //<p class = "card-subtitle">Description: ${description}</p>
	pokedexInfo.innerHTML = polemonHTMLString;

	pokedex.style.display = "none";
	pokedexInfo.style.display = "block";
}

