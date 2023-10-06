import { consultarTarefasLocalStorage } from "./consultarTarefas.js"
import { enviarTarefasLocalStorage } from "./salvarTarefaLocalStorage.js"

function concluirTarefa(id){

    let tarefasSalvas = []

    tarefasSalvas = consultarTarefasLocalStorage()

    let tarefaParaAtulizar = tarefasSalvas.findIndex((tarefa)=> {            
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

export {concluirTarefa}