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
        pergunta : "Quantos estados há no Brasil?",
        alternativaA : "23 estados e dois DFs",
        alternativaB : "27 estados e nenhum DF",
        alternativaC : "27 estados e um DF",
        alternativaD : "26 estados e um DF",
        certo : "C"
    },{
        pergunta : "Qual foi o tipo de produto, que muito se desenvolveu no período colonial nos estados atuais de: São Paulo, Santa Catarina, Minas Gerais e Rio Grande do Sul?",
        alternativaA : "Carne de Gado",
        alternativaB : "Pau Brasil",
        alternativaC : "Café",
        alternativaD : "Cana de açúcar",
        certo : "C"
    },{
        pergunta : "Qual é o menor número primo?",
        alternativaA : "0 ",
        alternativaB : "1",
        alternativaC : "2",
        alternativaD: "3",
        certo : "C"
    },{
        pergunta : "Onde é produzido o suco gástrico usado na digestão do nosso corpo",
        alternativaA : "Fígado",
        alternativaB : "Esôfago",
        alternativaC : "Pâncreas",
        alternativaD: "Estômago",
        certo : "D"
    },{
        pergunta : "Quanto tempo a luz do Sol demora para chegar à Terra?",
        alternativaA : "Segundos",
        alternativaB : "12 dias",
        alternativaC : "12 horas",
        alternativaD: "8 minutos",
        certo : "D"
    },{
        pergunta : "Qual destes verbos é irregular?",
        alternativaA : "Comer",
        alternativaB : "Ser",
        alternativaC : "Trazer",
        alternativaD: "Cantar",
        certo : "B"
    },{
        pergunta : "Qual das frases a seguir contém o Present Continous?",
        alternativaA : "I am eating",
        alternativaB : "I am hot",
        alternativaC : "I like to start",
        alternativaD: "Do you like to watch TV?",
        certo : "A"
    },{
        pergunta : "Um ângulo de 90° é considerado um ângulo?",
        alternativaA : "Reto",
        alternativaB : "Agudo",
        alternativaC : "Obtuso",
        alternativaD: "Raso",
        certo : "A"
    },{
        pergunta : "O que significa SBT?",
        alternativaA : "Sistema Brasileiro de Televisão ",
        alternativaB : "Silvio Brasileiro de Televisão",
        alternativaC : "Sistema Brasileiro da Televisão",
        alternativaD: "Série Brasileira da Televisão",
        certo : "A"
    },{
        pergunta : "De quem é a famosa frase “Penso, logo existo”",
        alternativaA : "Platão",
        alternativaB : "Galileu Galilei",
        alternativaC : "Descartes",
        alternativaD: "Sócrates",
        certo : "C"
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
    pontuacaoContainer.innerHTML += "<div class='denovo'><a href='QuizGeral.html'>Tentar Novamente</a></div>";
    pontuacaoContainer.innerHTML += "<div class='voltar'><a href='EscolherJogo.html'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspVoltar&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></div>";
}