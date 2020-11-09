//Recebendo Busca Pokémon - Click do botão
const botaoBuscar = document.querySelector("#botao-busca");

botaoBuscar.addEventListener("click", function(event){ 

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

//Recebe valor da Busca
var filtroNome = getURLParameter('name');

if(filtroNome){
	var form = document.querySelector("#form-busca");
	form.nome.value = filtroNome;	
}