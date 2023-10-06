import { renderizarTarefa } from './renderizarTarefa.js'
import { excluirTarefa } from './excluirTarefa.js'
import { atualizarGraficos } from './graficos.js'
import { salvarTarefa } from './salvarTarefa.js'
import { concluirTarefa } from './concluirTarefa.js'
import {
    KEY_LOCAL_STORAGE,
    btnAdicionar,
    textoTarefa,
    listaTarefas,
    modal,
    confirmarExclusao,
    cancelarExclusao
} from './seletorDOM.js'

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