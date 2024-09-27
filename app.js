// Função de login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (username === 'admin' && password === 'admin') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('crudApp').style.display = 'block';
        loadUsers();
    } else {
        loginError.textContent = 'Usuário ou senha incorretos.';
    }
}

// Função para adicionar usuário
function addUser() {
    const name = document.getElementById('name').value;
    if (name === '') return alert('Por favor, insira um nome.');

    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    users.push(name);
    sessionStorage.setItem('users', JSON.stringify(users));

    document.getElementById('name').value = '';
    loadUsers();
}

// Função para carregar usuários
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    let users = JSON.parse(sessionStorage.getItem('users')) || [];

    users.forEach((user, index) => {
        let li = document.createElement('li');
        li.textContent = user;
        li.innerHTML += ` <button onclick="editUser(${index})">Editar</button>
                          <button onclick="deleteUser(${index})">Deletar</button>`;
        userList.appendChild(li);
    });
}

// Função para editar usuário
function editUser(index) {
    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    const newName = prompt('Insira o novo nome:', users[index]);
    if (newName === null || newName === '') return;

    users[index] = newName;
    sessionStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Função para deletar usuário

// Função para detectar o Enter e realizar o login
document.getElementById('password').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão
        login(); // Chama a função de login
    }
});

function deleteUser(index) {
    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    users.splice(index, 1);
    sessionStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function showLogin() {
    // Exibe o formulário de login e esconde o de CRUD
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('crudApp').style.display = 'none';

    // Limpa os campos de login e senha
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Opcional: também limpa qualquer mensagem de erro de login
    document.getElementById('loginError').textContent = '';
}
