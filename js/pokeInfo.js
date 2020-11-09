//Mostra as informações na Badge Solo

const getPokeInfo = async(pokeId) => {

	const pokemon = pokemonList.find(poke => poke.id === pokeId); 

	const pokemonHTMLString = `
		<li class="card-solo">
		<img class = "card-image-solo" src = "${pokemon.image}"/>
		<h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
		<div id = "badge-solo">
			${pokemon.types.map(type=> 
				`<div class = "tipo-badge ${type}">
				<img  src = "img/types/${type}.svg"/>
				
				<p class = "card-subtitle">${type}</p>
				</div>`
			).join('')}
		</div>
		<p class = "card-subtitle-solo">Height: <span class="status-color">${pokemon.height} m</span></p>
		<p class = "card-subtitle-solo">Weight: <span class="status-color">${pokemon.weight} kg</span></p>
		
		<p class = "card-subtitle-solo">Abilities: <span class="status-color">${pokemon.abilities}</span></p>
		<div class = "margin-card">
		<a href="index.html">
		<img  class = "voltar" src="img/Voltar.png">
		</a>
		</div>
		</li>
		`; 

	pokedexInfo.innerHTML = pokemonHTMLString;

	pokedex.style.display = "none";
	pokedexInfo.style.display = "block";

	isCardInfo = true;
}

