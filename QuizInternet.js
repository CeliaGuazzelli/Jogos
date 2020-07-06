const comecar = document.getElementById("comecar");
const quiz = document.getElementById("quiz");
const question = document.getElementById("pergunta");
const alternativaA = document.getElementById("A");
const alternativaB = document.getElementById("B");
const alternativaC = document.getElementById("C");
const alternativaD = document.getElementById("D");
const contador = document.getElementById("contador");
const barraTempo = document.getElementById("barraTempo");
const progresso = document.getElementById("progresso");
const pontuacaoDiv = document.getElementById("pontuacaoContainer");

let perguntas = [
    {
        pergunta : "O que sigfifica TCP?",
        alternativaA : "Protocolo com Transmissão",
        alternativaB : "Termos Corretos para Pesquisa",
        alternativaC : "Protocolo de Controle de Transmissão",
        alternativaD : "Teorema de Computador Portátil",
        certo : "C"
    },{
        pergunta : "A zona obscura na Internet, inacessível através dos mecanismos mais populares de busca como o Google e o Bing é denominada",
        alternativaA : "Gray Web",
        alternativaB : "Deep Web",
        alternativaC : "Surface Web",
        alternativaD : "Navegação anônima:",
        certo : "B"
    },{
        pergunta : "O que significa WWW?",
        alternativaA : "WorldWideWeb ",
        alternativaB : "WordWideWeb",
        alternativaC : "World Wide Web",
        alternativaD: "Word Wide Web",
        certo : "C"
    },{
        pergunta : "Das alternativas abaixo, qual não é um browser?",
        alternativaA : "Firefox",
        alternativaB : "Mosaic",
        alternativaC : "Chrome",
        alternativaD: "Zafari",
        certo : "D"
    },{
        pergunta : "Em que período surgiu a Internet?",
        alternativaA : "Antes de Cristo",
        alternativaB : "Primeira Guerra Mundial",
        alternativaC : "Segunda Guerra Mundial",
        alternativaD: "Guerra Fria",
        certo : "D"
    },{
        pergunta : "O que significa IP?",
        alternativaA : "Endereço de Internet",
        alternativaB : "Protocolo de Internet",
        alternativaC : "Internet Pública",
        alternativaD: "Internet Pessoal",
        certo : "B"
    },{
        pergunta : "Quando a Internet foi criada, qual era seu objetivo?",
        alternativaA : "Compartilhar vídeos/fotos",
        alternativaB : "Fazer o PC funcionar",
        alternativaC : "Distribuir informações",
        alternativaD: "Interligar Labs. de pesq.",
        certo : "D"
    },{
        pergunta : "O que significa URL?",
        alternativaA : "Linguagem Restrita Universal ",
        alternativaB : "Endereço de Links Redistribuídos ",
        alternativaC : "Localizador Uniforme de Recursos",
        alternativaD: "Endereço Eletrônico Universal ",
        certo : "C"
    },{
        pergunta : "O que significa a sigla HTTP?",
        alternativaA : "Protocolo de Transmissão de Texto ",
        alternativaB : "Transferência de Hipertexto de Harper",
        alternativaC : "Hardware com Proteção Tunado",
        alternativaD: "Protocolo de Transferência de Hipertexto",
        certo : "D"
    },{
        pergunta : "Qual alternativa possui apenas domínios?",
        alternativaA : ".gov - .com - .ind",
        alternativaB : ".com - .ong - .net ",
        alternativaC : ".br - .com - .org",
        alternativaD: ".com - .br - .gov",
        certo : "A"
}
];

const ultimaPergunta = perguntas.length - 1;
let perguntaAtual = 0;
let contagem = 0;
const tempoPergunta = 30;
const larguraBarra = 150;
const unidadeBarra = larguraBarra / tempoPergunta;
let tempo;
let pontuacao = 0;

function carregarPergunta(){
    let p = perguntas[perguntaAtual];
    
    pergunta.innerHTML =p.pergunta ;
    alternativaA.innerHTML = p.alternativaA;
    alternativaB.innerHTML = p.alternativaB;
    alternativaC.innerHTML = p.alternativaC;
    alternativaD.innerHTML = p.alternativaD;
}

comecar.addEventListener("click",comecarQuiz);

function comecarQuiz(){
    comecar.style.display = "none";
    carregarPergunta();
    quiz.style.display = "block";
    carregarProgresso();
    carregarContador();
    tempo = setInterval(carregarContador,1000); // 1000ms = 1s
}

function carregarProgresso(){
    for(let pIndex = 0; pIndex <= ultimaPergunta; pIndex++){
        progresso.innerHTML += "<div class='prog' id="+ pIndex +"></div>";
    }
}


function carregarContador(){
    if(contagem <= tempoPergunta){
        contador.innerHTML = contagem;
        barraTempo.style.width = contagem * unidadeBarra + "px";
        contagem++
    }else{
        contagem = 0;
        respostaErrada();
        if(perguntaAtual < ultimaPergunta){
            perguntaAtual++;
            carregarPergunta();
        }else{
            clearInterval(tempo);
            carregarPontuacao();
        }
    }
}

function checarResposta(resposta){
    if( resposta == perguntas[perguntaAtual].certo){
        pontuacao++;
        respostaCerta();
    }else{
        respostaErrada();
    }
    contagem = 0;
    if(perguntaAtual < ultimaPergunta){
        perguntaAtual++;
        carregarPergunta();
    }else{
        clearInterval(tempo);
        carregarPontuacao();
    }
}

function respostaCerta(){
    document.getElementById(perguntaAtual).style.backgroundColor = "#0f0";
}

function respostaErrada(){
    document.getElementById(perguntaAtual).style.backgroundColor = "#f00";
}

function carregarPontuacao(){
    pontuacaoDiv.style.display = "block";
    
    const pontuacaoPorcento = Math.round(100 * pontuacao/perguntas.length);
    
    let img = (pontuacaoPorcento >= 80) ? "surpreso.png" :
              (pontuacaoPorcento >= 60) ? "feliz.png" :
              (pontuacaoPorcento >= 40) ? "neutro.png" :
              (pontuacaoPorcento >= 20) ? "triste.png" :
              "bravo.png";
    
    pontuacaoContainer.innerHTML = "<img width='250px' height='250px' src="+ img + ">";
    pontuacaoContainer.innerHTML += "<pre><center><font size='8' color='white'> Você acertou "+ pontuacaoPorcento +"% das questões</font></center></pre>";
    pontuacaoContainer.innerHTML += "<div class='denovo'><a href='QuizInternet.html'>Tentar Novamente</a></div>";
    pontuacaoContainer.innerHTML += "<div class='voltar'><a href='EscolherJogo.html'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspVoltar&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></div>";
}