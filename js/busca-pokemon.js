const pokedex = document.getElementById("pokedex");
const pokedexInfo = document.getElementById("pokedexInfo");
const carregando = document.getElementById("carregando");
const nenhumEncontrado = document.getElementById("nenhumEncontrado");
const botaoBuscar = document.querySelector("#botao-busca");

var pokemonList = [];

const getURLParameter = sParam => {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (let index = 0; index < sURLVariables.length; index++) {
		const element = sURLVariables[index];

		var sParameterName = element.split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}


const buscarPokemon = async () => {

	const promises = [];


	for(let i = 1; i <= 151; i++){
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		

		promises.push(fetch(url)
		.then(response => response.json()));

	}

	pokemonList = await	
		Promise.all(promises).then(results => {
			console.log(results);
			let pokemons = results.map((data) => ({
				name: data.name,
				id: data.id,
				image: `img/svg/${data.id}.svg`,
				types: data.types.map((type) => type.type.name),
				weight: data.weight,
				abilities: data.abilities.map((ability) => ability.ability.name),
				height: data.height
			}));
			//pokemonList = pokemons;
			//console.log(pokemonList);

			return pokemons;
		});
};


const exibirPokemon = (pokemons) => {
	carregando.style.display = "none";
	pokedexInfo.style.display = "none";

	if(pokemons.length === 0){		
		pokedex.style.display = "none";
		nenhumEncontrado.style.display = "block";
		return;
	}

	const polemonHTMLString = pokemons.map ( poke => `
	<li class="card" onclick="getPokeInfo(${poke.id})">
		<img class = "card-image" src = "${poke.image}"/>
		<h2 class = "card-title">${poke.id}. ${poke.name}</h2>
		<div id = "badge">
		${poke.types.map(type=> 
			`<div class="tipo-badge ${type}">
			<img  src = "img/types/${type}.svg"/>
			<p class = "card-subtitle">${type}</p>
			</div>`
		).join('')}
		</div>
	</li>
	`).join('');
	pokedex.innerHTML = polemonHTMLString;
	pokedex.style.display = "grid";
	nenhumEncontrado.style.display = "none";
}

const filtarPokemons = () => {

	var filtroNome = getURLParameter('name');

	if(filtroNome){
		var form = document.querySelector("#form-busca");
		form.nome.value = filtroNome;	
	}


	const pokemonListFiltrado = pokemonList.filter(pokemon => {
		if(!filtroNome) return true;
		return pokemon.name.indexOf(filtroNome) >= 0
	});

	return pokemonListFiltrado;
}

// INFINITE SCROLL - para isso pensei em passar um parâmetreo limite na buscarPokemon
//window.addEventListener("scroll", () => {
//	
//	
//    const { scrollTop, scrollHeight, clientHeight}
//    = document.documentElement;
//
//    console.log({scrollTop, scrollHeight, clientHeight});
//
//    if( clientHeight+scrollTop >= scrollHeight-150){ //clientHeight + scrollTop >= scrollHeight - 100
//		console.log("to the bottom");
//		buscarPokemon(10).then(response => filtarPokemons()).then(pokemonListFiltrado => exibirPokemon(pokemonListFiltrado));
//		//show the loading animation
//	}
//	
//	
//});
//

buscarPokemon(6).then(response => filtarPokemons()).then(pokemonListFiltrado => exibirPokemon(pokemonListFiltrado));
