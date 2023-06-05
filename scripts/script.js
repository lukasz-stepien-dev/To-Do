// Znajdowanie elementów DOM
const taskNameInput = document.getElementById('task-name');
const taskSubmitButton = document.getElementById('task-submit');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const taskList = document.getElementById('task-list');

// Funkcja pomocnicza do aktualizacji daty zadania
function updateTaskDate(taskItem) {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pl-PL');
    const dateElement = document.createElement('span');
    dateElement.classList.add('task-date');
    dateElement.textContent = dateString;
    taskItem.appendChild(dateElement);
}

// Definiowanie funkcji obsługujących zdarzenia
function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    if (taskName.trim() === '') {
        alert('Wpisz nazwę zadania.');
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.textContent = taskName;
    updateTaskDate(taskItem);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edytuj';
    editButton.classList.add('edit-button');
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskNameInput.value = '';
}

function searchTasks(event) {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();
    const tasks = taskList.getElementsByClassName('task-item');

    Array.from(tasks).forEach(function(task) {
        const taskName = task.textContent.toLowerCase();
        if (taskName.includes(searchTerm)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function editTask(event) {
    const taskItem = event.target.parentNode;
    const taskName = taskItem.firstChild;
    const newTaskName = prompt('Edytuj zadanie:', taskName.textContent);
    if (newTaskName !== null) {
        taskName.textContent = newTaskName;
        updateTaskDate(taskItem);
    }
}

function deleteTask(event) {
    const taskItem = event.target.parentNode;
    taskList.removeChild(taskItem);
}

// Dodawanie nasłuchiwaczy zdarzeń
taskSubmitButton.addEventListener('click', addTask);
searchForm.addEventListener('submit', searchTasks);

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        editTask(event);
    } else if (event.target.classList.contains('delete-button')) {
        deleteTask(event);
    }
});
