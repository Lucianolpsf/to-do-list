import { KEY_LOCAL_STORAGE } from "./seletorDOM.js"

function enviarTarefasLocalStorage(tarefasSalvas){
    localStorage.setItem(KEY_LOCAL_STORAGE,JSON.stringify(tarefasSalvas))
}

export {enviarTarefasLocalStorage}