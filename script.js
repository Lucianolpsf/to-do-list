const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')
const listaTarefas = document.querySelector('ul')
const KEY_LOCAL_STORAGE = 'tarefasSalvas'
let tarefasSalvas = []

if (localStorage.getItem(KEY_LOCAL_STORAGE)){renderizarTarefa()}

btnAdicionar.addEventListener('click', (evento)=>{
    evento.preventDefault();

    if (textoTarefa.value == ''){
        alert('Digite uma tarefa valida')
    } else {
        salvarTarefa(textoTarefa.value)
        renderizarTarefa()
    }   
    textoTarefa.value = ''
})

listaTarefas.addEventListener('click',(elemento) =>{

    const itemClicado = elemento.target 
    let idTarefa = itemClicado.parentElement.parentElement.getAttribute('tarefa-id')
    
    if (itemClicado.classList.contains('excluir')){
        excluirTarefa(+idTarefa)
        renderizarTarefa()
    }

    if (itemClicado.classList.contains('concluir')){
       
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')

       concluirTarefa(+idTarefa)
    }
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