//Pega query string da url 
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

const calculaStatus = (num) =>{
	return (num/10).toFixed(1);
}