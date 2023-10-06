import {consultarTarefasLocalStorage} from './consultarTarefas.js'
import {listaTarefas} from './seletorDOM.js'

let tarefasSalvas = []
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

export { renderizarTarefa}