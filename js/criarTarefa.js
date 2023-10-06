import {consultarTarefasLocalStorage} from './consultarTarefas.js'
import { KEY_LOCAL_STORAGE } from './seletorDOM.js'

function gerarTarefa(textoTarefa){
    let tarefasSalvas = []
    let id

    if (localStorage.getItem(KEY_LOCAL_STORAGE)){
        tarefasSalvas = consultarTarefasLocalStorage()
    }
    
    tarefasSalvas.length < 1 ? id = 1 : id = tarefasSalvas[tarefasSalvas.length-1].id + 1 ;
    
    let tarefa = {
        id: id,
        texto: textoTarefa,
        status: ''
    }
    
    return tarefa
}

export {gerarTarefa}