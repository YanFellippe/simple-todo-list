const form = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list');

//adicionar uma nova tarefa a lista na interface
function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-title">${task.title}</span>
        <button class="complete-btn" onclick="markAsComplete(${task.id})">Completar</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Remover</button>
    `;
    taskList.appendChild(li);
}

//enviar novas tarefas para o backend
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;

    //check do título da tarefa preenchido
    if (!title) {
        alert('O título da tarefa não pode estar vazio!');
        return;
    }

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })  //envia a tarefa para o servidor
    });

    const data = await response.json();

    if (response.ok) {
        //add nova tarefa a lista na interface
        addTaskToList(data.task);
        document.getElementById('task-title').value = '';  //limpa campo após adicionar
    } else {
        alert(data.error || 'Erro ao adicionar a tarefa');
    }
});

//função de marcar uma tarefa como completa
async function markAsComplete(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completa' })  //atualiza o status da tarefa
    });

    if (response.ok) {
        alert('Tarefa marcada como completa!');
        //atualizar a interface conforme necessário
    } else {
        alert('Erro ao atualizar a tarefa');
    }
}

//remover uma tarefa
async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Tarefa removida com sucesso!');
        //remover o item da lista visualmente
    } else {
        alert('Erro ao remover a tarefa');
    }
}