import {consultarTarefasLocalStorage} from './consultarTarefas.js';
import {
        totalTarefas,
        tarefasConcluidas, 
        tarefasIncompletas, 
        circleCompletas,
        circleIncompletas,
        circleTarefas  
} from './seletorDOM.js'

function contarTarefasTotais(){
    let tarefas = consultarTarefasLocalStorage()
    return tarefas.length
}

function contarTarefasConcluidas(){
    let tarefas = consultarTarefasLocalStorage()

    let tarefaConcluidas = tarefas.filter((tarefa)=>{
        if (tarefa.status == 'concluido'){
            return tarefa
        }
    })

    return tarefaConcluidas.length
}

function contarTarefasIncompletas(){
    return contarTarefasTotais() - contarTarefasConcluidas()
}

function atualizarGraficos(){
    totalTarefas.innerHTML = contarTarefasTotais()
    
    contarTarefasTotais() > 0 ? circleTarefas.style.strokeDashoffset = 0: circleTarefas.style.strokeDashoffset = 315;

    let porcentagemConcluidas = Math.round((contarTarefasConcluidas()*100/contarTarefasTotais()))
    let porcentagemIncompletas = Math.round(contarTarefasIncompletas()*100/contarTarefasTotais())
    
    let calculo1 = isNaN(porcentagemConcluidas)? 0 : porcentagemConcluidas;
    let calculo2 = isNaN(porcentagemConcluidas)? 0 : porcentagemIncompletas;
    let calculo3 = isNaN((315 * porcentagemConcluidas)/100)? 0: (315 * porcentagemConcluidas)/100;
    let calculo4 = isNaN((315 * porcentagemIncompletas)/100)? 0: (315 * porcentagemIncompletas)/100;

    tarefasConcluidas.innerHTML = calculo1 +'%'
    circleCompletas.style.strokeDashoffset = 315 -calculo3

    tarefasIncompletas.innerHTML = calculo2 +'%'
    circleIncompletas.style.strokeDashoffset = 315 -calculo4
}

export{ atualizarGraficos};