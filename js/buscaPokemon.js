//Recebendo Busca Pokémon - Click do botão
const botaoBuscar = document.querySelector("#botao-busca");

botaoBuscar.addEventListener("click", function(event){ 

	event.preventDefault();

	var form = document.querySelector("#form-busca");

	var filter = form.nome.value;	

	if(filter){
		window.open("index.html?filter="+filter,'_self');
	}
	else {		
		window.open("index.html",'_self');
	}
});

//Recebe valor da Busca
var filtroNome = getURLParameter('filter');

if(filtroNome){
	var form = document.querySelector("#form-busca");
	form.nome.value = filtroNome;	
}