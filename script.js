const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')
let tarefasSalvas = []

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

const listaTarefas = document.querySelector('ul')

listaTarefas.addEventListener('click',(elemento) =>{

    const itemClicado = elemento.target 
 
    if (itemClicado.classList.contains('excluir')){
       
        let tarefa = itemClicado.parentElement.parentElement.firstElementChild.innerText

        excluirTarefa(tarefa)
        renderizarTarefa()
    }

    if (itemClicado.classList.contains('concluir')){
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')
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

    tarefasSalvas.forEach(tarefa => {

        const li = document.createElement('li')

        li.innerHTML = `
        <p>${tarefa}</p> 
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
        tarefasSalvas.push(textoTarefa)
        localStorage.setItem('tarefasSalvas',JSON.stringify(tarefasSalvas))
    }
    else
    {
        tarefasSalvas.push(textoTarefa)
        localStorage.setItem('tarefasSalvas',JSON.stringify(tarefasSalvas))
    }
}

function log(mensagem){
    console.log(mensagem)
}