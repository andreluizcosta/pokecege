//Consulta API e cria a lista da Pokédex

const pokedex = document.getElementById("pokedex");
const pokedexInfo = document.getElementById("pokedexInfo");
const carregando = document.getElementById("carregando");
const nenhumEncontrado = document.getElementById("nenhumEncontrado");


var pokemonList = [];
var viewPokemon = 20; //diminuir
var maxPokemon = 649;
var stepLazyLoad = 10;
var isCardInfo = false;
var isLoading = false;


const carregarPokemon = async () => {
	isLoading = true;
	const promises = [];


	for(let i = 1; i <= maxPokemon; i++){
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
				weight: calculaStatus(data.weight),
				abilities: data.abilities.map((ability) => ability.ability.name),
				height: calculaStatus(data.height)
			}));

			return pokemons;
		}); 
	isLoading = false;
};


const exibirPokemon = (pokemons) => {
	if (isLoading){
		return;
	}
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
	isCardInfo = false;
}

const filtarPokemons = () => {
	const pokemonListFiltrado = pokemonList.filter(pokemon => {
		if(!filtroNome) return true;
		return pokemon.name.indexOf(filtroNome) >= 0
	})	
	.slice(0, viewPokemon);

	return pokemonListFiltrado;
}

carregarPokemon().then(response => filtarPokemons()).then(pokemonListFiltrado => exibirPokemon(pokemonListFiltrado));
