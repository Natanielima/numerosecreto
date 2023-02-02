// para não ter letras, apenas números.
//  const inputNumero = document.getElementById('inputNumeroPrincipal')
// inputNumero.addEventListener("keydown", (e)=> {  
//     if (e.key>="a"&&e.key<="z" || e.key>="A"&&e.key<="Z") {
//         e.preventDefault();
//     }
// });

const inputNome = document.getElementById('inputNomes')
const btnAdicionar = document.getElementById('btn-adicionar-nomes')
const form = document.getElementById('formulario')
const btnIniciarJogo = document.getElementById('btn-iniciar-jogo')
const listaCadastro = document.querySelector('.cadastro')
const arrayDeCadastro=[]
const arrayDeTentativas=[]
const nomeDoTentador=""




btnAdicionar.addEventListener('click',()=>adicionandoNomes())
btnAdicionar.addEventListener('click', ()=>adicionarAArray())
inputNome.addEventListener('change', () => mudandoCorInputValido())



const validaInput = () =>{
    return inputNome.value.trim().length>0
}


const adicionandoNomes=()=>{
    const inputEValido = validaInput();
    if (!inputEValido) {
       return inputNome.classList.add("error");
    }
    const cadastro = document.createElement("div");
    cadastro.classList.add("jogadorCadastrado");

    const nomeDoJogador = document.createElement("p");
    nomeDoJogador.innerHTML=inputNome.value

    const deletarJogador = document.createElement("i");
    deletarJogador.classList.add("fa-solid");
    deletarJogador.classList.add("fa-trash");

    deletarJogador.addEventListener('click', ()=>deletandoJogadores(cadastro,nomeDoJogador))
    deletarJogador.addEventListener('click', ()=>deletandoDaArray(cadastro,nomeDoJogador))
    

    cadastro.appendChild(nomeDoJogador);
    cadastro.appendChild(deletarJogador);

    listaCadastro.appendChild(cadastro)

    adicionarAArrayNome(inputNome);


    const deletandoDaArray =(nomeDoJogador)=>{
        const nomeBuscado=nomeDoJogador.firstChild.innerHTML
        for (let i = 0; i < arrayDeCadastro.length; i++) {
            if(nomeBuscado===arrayDeCadastro[i]){
                arrayDeCadastro.splice(i,1)
                arrayDeTentativas.splice(0,1)
            }
        }
    }        
    const deletandoJogadores=(cadastro,nomeDoJogador)=>{
        const tasks = listaCadastro.childNodes;
    
        for(const task of tasks){
            if (task.firstChild===nomeDoJogador) {
                cadastro.remove()
            }
        }
    }
  
    inputNome.value="";
    
}

const adicionarAArrayNome =(inputNome) =>{
    const nomeQueFoiAdicionado = inputNome.value
    arrayDeCadastro.push(nomeQueFoiAdicionado)
    console.log(arrayDeCadastro)
}




const mudandoCorInputValido = () =>{
    const inputEValido = validaInput();
    if (inputEValido) {
        return inputNome.classList.remove("error")
    }
}


btnIniciarJogo.addEventListener('click', (CarregaPaginaJogo)=>{
    document.body.innerHTML=`  <h1>Acerte o número secreto</h1>    
    <h3>O número secreto está entre <span id="menor-valor">0</span> e <span id="maior-valor">100</span></h3>
    <div id="chute" class="mensagem"> 
    </div>

    <div class="conteiner-redes-sociais">
    <div class="redes-sociais">
        <a href="https://github.com/Natanielima" class="icones" target="_blank">
            <i class="fa-brands fa-github icon">
            </i>
        </a>
        <a href="https://www.linkedin.com/in/cicero-nataniel-lima-de-pinho-1711361b8/" class="icones" target="_blank">
            <i class="fa-brands fa-linkedin-in icon">
            </i>
        </a>
        <a href="https://www.instagram.com/nataniellima/" class="icones" target="_blank">
            <i class="fa-brands fa-instagram icon" >
            </i>
        </a>
        <a href="https://br.pinterest.com/cicero_12_/" class="icones" target="_blank">
            <i class="fa-brands fa-pinterest icon">
            </i>
        </a>
        <a href="https://www.tiktok.com/@nataniellimaa" class="icones" target="_blank">
            <i class="fa-brands fa-tiktok icon">
            </i>
        </a>

    </div>
    <div class="nome-final">
        <p class="fa-regular fa-copyright"> Nataniel Lima © 2023</p>
    </div>
</div>
    `
    
    //marcação de tentativas
    console.log(arrayDeCadastro);

    const listaCompleta ={
        nome:arrayDeCadastro,
        tentativas:[],
        indices: []
    }

    for(let i=0; i<arrayDeCadastro.length;i++){
        listaCompleta["tentativas"].push([])
    }


    for(jogador in listaCompleta["nome"]){
        listaCompleta["indices"].push(jogador)
    }

    console.log(listaCompleta)

    //sorteia Numero
    const menorValor = 1
    const maiorValor = 1000
    const numeroSecreto= gerarNumeroAleatorio();
    
    function gerarNumeroAleatorio(){
        return parseInt(Math.random()*maiorValor+1)
    
    }
    console.log(numeroSecreto)
    
    const elementoMenorValor = document.getElementById('menor-valor')
    elementoMenorValor.innerHTML=menorValor
    
    const elementoMaiorValor = document.getElementById('maior-valor')
    elementoMaiorValor.innerHTML=maiorValor

    


    //verificaNumero
 
    
    function verificaSeOChutePossuiUmValorValido(chute){

	    const numero = +chute
        
	
	    if(chuteForInvalido(numero)){
	        elementoChute.innerHTML+='<div>Valor inválido</div>'
	        return
	    }
	    if(numeroForMaiorOuMenorQueOValorPermitido(numero)){
	        elementoChute.innerHTML+=`<div> Valor inválido: o número secreto precisa 
	        estar entre ${menorValor} e ${maiorValor}</div>`
	        return
	    }      
	    if(numero===numeroSecreto){
	        document.body.innerHTML=`<h2> ${listaCompleta["nome"][count]} ACERTOU!!!!!</h2>
            <h3>Você acertou com ${listaCompleta["tentativas"][count].length+1} tentativas</h3>
	        <h3>O número secreto era ${numeroSecreto}</h3>
	        <button id="jogar-novamente" class="btn-jogar"> Jogar novamente</button>
	        `
	    } else if(numero>numeroSecreto){
	            elementoChute.innerHTML+=`<div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>`
	    } else if(numero<numeroSecreto){
	        elementoChute.innerHTML+=`<div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>`
	    }
        alteraNomeJogador(numero)
	}
	
	function numeroForMaiorOuMenorQueOValorPermitido(numero) {
	    return numero>maiorValor || numero<menorValor
	}
	
	function chuteForInvalido(numero) {
	    return Number.isNaN(numero);
	}
	
	document.body.addEventListener('click', e =>{
	    if(e.target.id=='jogar-novamente'){
	        window.location.reload()
	    }
	})

    

    //chama Voz
    const elementoChute = document.getElementById('chute')
    
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    
    const recognition = new SpeechRecognition();
    
    
    
    recognition.lang = 'pt-Br'
    recognition.start()
    
    recognition.addEventListener('result', onSpeak)
    
    function onSpeak(e){
        chute= e.results[0][0].transcript
        exibeChuteNaTela(chute)
        
    }

    count= 0
    function exibeChuteNaTela(chute){
        while(Number(chute)!=numeroSecreto){
                // listaCompleta["tentativas"][count].push(Number(chute.value))
                if (Number(chute)!=numeroSecreto) {
                    elementoChute.innerHTML=`
                    <div> ${listaCompleta["nome"][count]} disse:</div>
                    <span class="box">${chute}</span>
                    `
                    listaCompleta["tentativas"][count].push(chute)
                }
        count++;
        if (count==arrayDeCadastro.length) {
            count=0
        }
        verificaSeOChutePossuiUmValorValido(chute)
        onSpeak();
        }
        verificaSeOChutePossuiUmValorValido(chute)
    }

    

    
    recognition.addEventListener("end",() => recognition.start())


})















