const btnAdicionar = document.getElementById('adicionar')
const textoTarefa = document.getElementById('texto-input')

btnAdicionar.addEventListener('click', (evento)=>{
    evento.preventDefault();

    if (textoTarefa.value == ''){
        alert('Digite uma tarefa valida')
    } else {
        const tarefa =  criarTarefa(textoTarefa.value)
        renderizarTarefa(tarefa)
    }
    
    textoTarefa.value = ''

})

const listaTarefas = document.querySelector('ul')

listaTarefas.addEventListener('click',(elemento) =>{

    const itemClicado = elemento.target 

    if (itemClicado.classList.contains('excluir')){
       itemClicado.parentElement.parentElement.remove()
    }

    if (itemClicado.classList.contains('concluir')){
       itemClicado.parentElement.parentElement.firstElementChild.classList.toggle('concluido')
    }
})


function criarTarefa (textoTarefa){
    const li = document.createElement('li')

    li.innerHTML = `
    <p>${textoTarefa}</p> 
    <div>
        <button class="excluir"></button>
        <button class="concluir"></button>
    </div>`

    return li
}

function renderizarTarefa(tarefa){
    const listaTarefas = document.querySelector('ul')

    listaTarefas.appendChild(tarefa)
}
