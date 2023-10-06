const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')
const listaTarefas = document.querySelector('ul')
const modal = document.querySelector('#modal')
const tarefaParaExcluir = document.querySelector('#texto-tarefa-excluir')
const confirmarExclusao = document.querySelector('.confirmar')
const cancelarExclusao = document.querySelector('.cancelar')
const totalTarefas = document.querySelector('#tarefas-totais')
const tarefasConcluidas = document.querySelector('#concluidas')
const tarefasIncompletas = document.querySelector('#incompletas')
const KEY_LOCAL_STORAGE = 'tarefasSalvas'
const circleCompletas = document.getElementById('circle-completas')
const circleIncompletas = document.getElementById('circle-incompletas')
const circleTarefas = document.getElementById('circle-tarefas')

export { 
    btnAdicionar, 
    textoTarefa,
    listaTarefas,
    modal,
    tarefaParaExcluir,
    confirmarExclusao,
    cancelarExclusao,
    totalTarefas,
    tarefasConcluidas,
    tarefasIncompletas,
    KEY_LOCAL_STORAGE,
    circleCompletas,
    circleIncompletas,
    circleTarefas
}