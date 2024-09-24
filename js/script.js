// Sélection des éléments
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const sections = document.querySelectorAll('.section');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main');

// Vérifier si l'utilisateur est déjà connecté
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showSection('tasks');
        toggleSidebar();
        loadTasks(); // Charger les tâches lors de la connexion
    } else {
        showSection('loginSection');
    }
});

// Formulaire de connexion
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        localStorage.setItem('loggedInUser', username);
        alert('Connexion réussie !');
        showSection('tasks');
        toggleSidebar();
        loadTasks(); // Charger les tâches après la connexion
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});

// Formulaire d'inscription
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;

    if (localStorage.getItem(registerUsername)) {
        alert('Nom d\'utilisateur déjà pris.');
    } else {
        const newUser = {
            username: registerUsername,
            password: registerPassword
        };
        localStorage.setItem(registerUsername, JSON.stringify(newUser));
        alert('Compte créé avec succès !');
        showSection('loginSection');
    }
});

// Déconnexion
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Vous avez été déconnecté.');
    showSection('loginSection');
}

// Toggle sidebar
function toggleSidebar() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('active');
}

// Changer de section
function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// ==========================
// Gestion des tâches
// ==========================

// Formulaire d'ajout de tâche
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    if (taskTitle) {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            completed: false
        };

        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        addTaskToDOM(newTask);
        taskForm.reset();
    }
});

// Charger les tâches depuis localStorage
function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = ''; // Vider la liste avant de la remplir
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Récupérer les tâches depuis localStorage
function getTasks() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return JSON.parse(localStorage.getItem(`tasks_${loggedInUser}`)) || [];
}

// Sauvegarder les tâches dans localStorage
function saveTasks(tasks) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    localStorage.setItem(`tasks_${loggedInUser}`, JSON.stringify(tasks));
}

// Ajouter une tâche à la liste DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    taskItem.classList.toggle('completed', task.completed);

    taskItem.innerHTML = `
        <div>
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <div>
            <button class="btn btn-success btn-sm" onclick="toggleCompleteTask(this)">Marquer ${task.completed ? 'Incomplète' : 'Complète'}</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Supprimer</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

// Marquer une tâche comme complète/incomplète
function toggleCompleteTask(button) {
    const taskItem = button.closest('li');
    const taskTitle = taskItem.querySelector('h5').innerText;
    const tasks = getTasks();

    const task = tasks.find(t => t.title === taskTitle);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        taskItem.classList.toggle('completed', task.completed);
        button.innerText = `Marquer ${task.completed ? 'Incomplète' : 'Complète'}`;
    }
}

// Supprimer une tâche
function deleteTask(button) {
    const taskItem = button.closest('li');
    const taskTitle = taskItem.querySelector('h5').innerText;
    let tasks = getTasks();

    tasks = tasks.filter(task => task.title !== taskTitle);
    saveTasks(tasks);
    taskItem.remove();
}
