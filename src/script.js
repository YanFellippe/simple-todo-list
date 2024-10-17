const form = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list');

// Função para adicionar uma nova tarefa à lista na interface
function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-title">${task.title}</span>
        <button class="complete-btn" onclick="markAsComplete(${task.id})">Completar</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Remover</button>
    `;
    taskList.appendChild(li);
}

// Função para enviar a nova tarefa para o backend
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;

    // Verificar se o título da tarefa está preenchido
    if (!title) {
        alert('O título da tarefa não pode estar vazio!');
        return;
    }

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })  // Enviar a tarefa para o servidor
    });

    const data = await response.json();

    if (response.ok) {
        // Adicionar a nova tarefa à lista na interface
        addTaskToList(data.task);
        document.getElementById('task-title').value = '';  // Limpar o campo após adicionar
    } else {
        alert(data.error || 'Erro ao adicionar a tarefa');
    }
});

// Função para marcar uma tarefa como completa
async function markAsComplete(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completa' })  // Atualiza o status da tarefa
    });

    if (response.ok) {
        alert('Tarefa marcada como completa!');
        // Aqui você pode atualizar a interface conforme necessário
    } else {
        alert('Erro ao atualizar a tarefa');
    }
}

// Função para remover uma tarefa
async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Tarefa removida com sucesso!');
        // Aqui você pode remover o item da lista visualmente
    } else {
        alert('Erro ao remover a tarefa');
    }
}