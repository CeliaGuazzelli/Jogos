const easteregg = document.getElementById("easteregg");
var audio = document.getElementById("audio");

let limite = 60; // tempo pra aparecer o easterEgg
let contagem = 0;
let tempo;

function comecarTempo() {
    tempo = setInterval(checarTempo,1000); // 1000ms = 1s
}
comecarTempo();
function checarTempo() {
	if (contagem < limite) {
		contagem++;
	}else{
		contagem = -99999 // Para não aparecer mais do que uma vez na tela
		carregarEasteregg();
	}
}


function carregarEasteregg(){
	easteregg.style.display ="block";
	tocarAudio();

	easteregg.innerHTML = "<img width='250px' height='250px' src='bravo.png'>";
	easteregg.innerHTML += "<p><center><font size='8' color='white'>O que você ta fazendo aí parado? VAI JOGAR!</font></center></p>";
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