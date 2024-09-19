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

// Ajouter des fonctionnalités de gestion des tâches ici, comme dans les exemples précédents...
