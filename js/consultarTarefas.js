import {KEY_LOCAL_STORAGE} from './seletorDOM.js'

function consultarTarefasLocalStorage(){
    return JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE))
}
    
export {consultarTarefasLocalStorage};