import {consultarTarefasLocalStorage} from './consultarTarefas.js';
import {enviarTarefasLocalStorage} from './salvarTarefa.js'

function excluirTarefa(id){
    let tarefasSalvas = []
    
    tarefasSalvas = consultarTarefasLocalStorage()

    let indiceTarefa = tarefasSalvas.findIndex((tarefa)=> {            
        return tarefa.id == id
    })
    tarefasSalvas.splice(indiceTarefa, 1)
    enviarTarefasLocalStorage(tarefasSalvas)
}

export {excluirTarefa};