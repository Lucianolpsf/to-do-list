const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')
const listaTarefas = document.querySelector('ul')
const modal = document.querySelector('#modal')
const tarefaParaExcluir = document.querySelector('#texto-tarefa-excluir')
const confirmarExclusao = document.querySelector('.confirmar')
const cancelarExclusao = document.querySelector('.cancelar')
const totalTarefas = document.querySelector('#tarefas-totais')
const tarefasConcluidas = document.querySelector('#concluidas')
const tarefasIncompletas = document.querySelector('#incompletas')
const KEY_LOCAL_STORAGE = 'tarefasSalvas'
const circleCompletas = document.getElementById('circle-completas')
const circleIncompletas = document.getElementById('circle-incompletas')

let tarefasSalvas = []
let itemClicado

if (localStorage.getItem(KEY_LOCAL_STORAGE)){
    renderizarTarefa()
    atualizarGraficos()
}

btnAdicionar.addEventListener('click', (evento)=>{
    evento.preventDefault();

    if (textoTarefa.value == ''){
        alert('Digite uma tarefa valida')
    } else {
        salvarTarefa(textoTarefa.value)
        renderizarTarefa()
        atualizarGraficos()
    }   
    textoTarefa.value = ''
})

listaTarefas.addEventListener('click',(elemento) =>{

    itemClicado = elemento.target 
    let idTarefa = itemClicado.parentElement.parentElement.getAttribute('tarefa-id')
    
    if (itemClicado.classList.contains('excluir')){

        modal.classList.remove('hide')
        modal.querySelector('p').innerText = itemClicado.parentElement.parentElement.firstElementChild.innerText  
    }

    if (itemClicado.classList.contains('concluir')){
       
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')

       concluirTarefa(+idTarefa)
       atualizarGraficos()
    }
})

confirmarExclusao.addEventListener('click',(evento)=>{

    evento.stopPropagation()
    
    let idTarefa = itemClicado.parentElement.parentElement.getAttribute('tarefa-id')

    excluirTarefa(idTarefa)
    modal.classList.add('hide')
    renderizarTarefa()
    atualizarGraficos()
})

cancelarExclusao.addEventListener('click', ()=>{
    modal.classList.add('hide')
})

function gerarTarefa(textoTarefa){
    
    tarefasSalvas.length < 1 ? id = 1 : id = tarefasSalvas[tarefasSalvas.length-1].id + 1 ;
    
    let tarefa = {
        id: id,
        texto: textoTarefa,
        status: ''
    }

    return tarefa
}

function salvarTarefa (textoTarefa){

    if (localStorage.getItem(KEY_LOCAL_STORAGE)){
        tarefasSalvas = consultarTarefasLocalStorage()
            
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )

        enviarTarefasLocalStorage(tarefasSalvas)
    }
    else
    {
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )
        enviarTarefasLocalStorage(tarefasSalvas)
    }   
}

function concluirTarefa(id){

    tarefasSalvas = consultarTarefasLocalStorage()

    tarefaParaAtulizar = tarefasSalvas.findIndex((tarefa)=> {            

        return tarefa.id == id
    })

    if (tarefasSalvas[tarefaParaAtulizar].status == 'concluido') {
        tarefasSalvas[tarefaParaAtulizar].status = ''
        enviarTarefasLocalStorage(tarefasSalvas)
    }
    else{
        tarefasSalvas[tarefaParaAtulizar].status = 'concluido'
        enviarTarefasLocalStorage(tarefasSalvas)
    }
}

function excluirTarefa(id){

    tarefasSalvas = consultarTarefasLocalStorage()

    indiceTarefa = tarefasSalvas.findIndex((tarefa)=> {            
        return tarefa.id == id
    })
    tarefasSalvas.splice(indiceTarefa, 1)
    enviarTarefasLocalStorage(tarefasSalvas)
}

function renderizarTarefa(){
   
    listaTarefas.innerHTML = '' 

    tarefasSalvas = consultarTarefasLocalStorage()

    tarefasSalvas.forEach((tarefa) => {

        const li = document.createElement('li')
        li.setAttribute('tarefa-id', `${tarefa.id}`)

        li.innerHTML = `
        <p class="${tarefa.status}">${tarefa.texto}</p> 
        <div>
            <button class="excluir"></button>
            <button class="concluir"></button>
        </div>`

        listaTarefas.appendChild(li)
    });
}

function consultarTarefasLocalStorage(){
    return JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))
}

function enviarTarefasLocalStorage(tarefasSalvas){
    localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
}

function contarTarefasTotais(){
    let tarefas = consultarTarefasLocalStorage()
    return tarefas.length
}

function contarTarefasConcluidas(){
    let tarefas = consultarTarefasLocalStorage()

    let tarefaConcluidas = tarefas.filter((tarefa)=>{
        if (tarefa.status == 'concluido'){
            return tarefa
        }
    })

    return tarefaConcluidas.length
}

function contarTarefasIncompletas(){
    return contarTarefasTotais() - contarTarefasConcluidas()
}

function atualizarGraficos(){

    totalTarefas.innerHTML = contarTarefasTotais()
    let porcentagemConcluidas = Math.round((contarTarefasConcluidas()*100/contarTarefasTotais()))
    let porcentagemIncompletas = Math.round(contarTarefasIncompletas()*100/contarTarefasTotais())

    tarefasConcluidas.innerHTML = porcentagemConcluidas +'%'
    circleCompletas.style.strokeDashoffset = 315 -(315 * porcentagemConcluidas)/100

    tarefasIncompletas.innerHTML = porcentagemIncompletas +'%'
    circleIncompletas.style.strokeDashoffset = 315 -(315 * porcentagemIncompletas)/100
}