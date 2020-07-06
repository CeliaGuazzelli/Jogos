const easteregg = document.getElementById("easteregg");
var audio = document.getElementById("audio");
const respostas = document.getElementById("respostas");

respostas.addEventListener("click", carregareasteregg)


function carregareasteregg(){
	easteregg.style.display ="block";
	tocarAudio();

	easteregg.innerHTML = "<img width='250px' height='250px' src='bravo.png'>";
	easteregg.innerHTML += "<p><center><font size='8' color='white'<br> O QUE VOCÊ QUER AQUI? VAI ESTUDAR!</font></center></p>";
	easteregg.innerHTML += "<p><center><font size='8' color='white'>Clique para voltar ao Menu.</font></center></p>";
}

easteregg.addEventListener("click",removerEasteregg);

function removerEasteregg(){
	easteregg.style.display = "none";
	pararAudio();
}



window.onload = function(){
	pararAudio();
};

function tocarAudio() {
  audio.play();
}

function pararAudio() {
  audio.pause();
}