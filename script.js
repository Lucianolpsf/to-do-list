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
    
    if (itemClicado.classList.contains('excluir')){
        let idTarefa = itemClicado.parentElement.parentElement.getAttribute('tarefa-id')
        excluirTarefa(+idTarefa)
        renderizarTarefa()
    }

    if (itemClicado.classList.contains('concluir')){
       
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')

       let idTarefa = itemClicado.parentElement.parentElement.getAttribute('tarefa-id')
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
        tarefasSalvas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))
            
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )

        localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
    }
    else
    {
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )
        localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
    }   
}

function concluirTarefa(id){

    tarefasSalvas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))

    tarefaParaAtulizar = tarefasSalvas.findIndex((tarefa)=> {            

        return tarefa.id == id
    })

    if (tarefasSalvas[tarefaParaAtulizar].status == 'concluido') {
        tarefasSalvas[tarefaParaAtulizar].status = ''
        localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
    }
    else{
        tarefasSalvas[tarefaParaAtulizar].status = 'concluido'
        localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
    }
}

function excluirTarefa(id){

    tarefasSalvas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))

    indiceTarefa = tarefasSalvas.findIndex((tarefa)=> {            
        return tarefa.id == id
    })
    tarefasSalvas.splice(indiceTarefa, 1)
    localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
}

function renderizarTarefa(){
    const listaTarefas = document.querySelector('ul')

    listaTarefas.innerHTML = '' 

    tarefasSalvas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))

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