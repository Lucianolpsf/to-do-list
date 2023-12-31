import {consultarTarefasLocalStorage} from './consultarTarefas.js'
import {KEY_LOCAL_STORAGE} from './seletorDOM.js'
import {gerarTarefa} from './criarTarefa.js'

function enviarTarefasLocalStorage(tarefasSalvas){
    localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
}

function salvarTarefa (textoTarefa){
    let tarefasSalvas = []

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

export {salvarTarefa, enviarTarefasLocalStorage}