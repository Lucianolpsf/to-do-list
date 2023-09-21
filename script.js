const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')
const listaTarefas = document.querySelector('ul')
let tarefasSalvas = []
var id = 1

if (localStorage.getItem('tarefasSalvas')){renderizarTarefa()}

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
       
        let tarefa = itemClicado.parentElement.parentElement.firstElementChild.innerText

        excluirTarefa(tarefa)
        renderizarTarefa()
    }

    if (itemClicado.classList.contains('concluir')){
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')
    //    concluirTarefa()
    }
})

function excluirTarefa(tarefa){

    tarefasSalvas = JSON.parse(localStorage.getItem('tarefasSalvas'))

    let indice = tarefasSalvas.indexOf(tarefa)

    tarefasSalvas.splice(indice, 1)

    localStorage.setItem('tarefasSalvas',JSON.stringify(tarefasSalvas))

}

function renderizarTarefa(){
    const listaTarefas = document.querySelector('ul')

    listaTarefas.innerHTML = '' 

    tarefasSalvas = JSON.parse(localStorage.getItem('tarefasSalvas'))

    tarefasSalvas.forEach((tarefa) => {

        const li = document.createElement('li')

        li.innerHTML = `
        <p>${tarefa.texto}</p> 
        <div>
            <button class="excluir"></button>
            <button class="concluir"></button>
        </div>`

        listaTarefas.appendChild(li)
    });
}

function salvarTarefa (textoTarefa){

    if (localStorage.getItem('tarefasSalvas')){
        tarefasSalvas = JSON.parse(localStorage.getItem('tarefasSalvas'))
            
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )

        localStorage.setItem('tarefasSalvas',JSON.stringify(tarefasSalvas))
    }
    else
    {
        tarefasSalvas.push(gerarTarefa(textoTarefa)  )
        localStorage.setItem('tarefasSalvas',JSON.stringify(tarefasSalvas))
    }   
}

function gerarTarefa(textoTarefa){

    let tarefa = {
        id: id ,
        texto: textoTarefa,
        status: ''
    }
    id++
    return tarefa
}

function concluirTarefa(){

}

function log(mensagem){
    console.log(mensagem)
}