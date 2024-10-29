// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = document.getElementById('data').value;
    const cpf = document.getElementById('cpf').value;
    const contato = document.getElementById('contato').value;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let errors = [];

    if (!emailRegex.test(email)) {
        errors.push("O email deve estar em um formato válido.");
    }

    if (!passwordStrengthRegex.test(password)) {
        errors.push("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
    }

    if (errors.length > 0) {
        displayErrors(errors);
    } else {
        const user = { name, email, password, data, cpf, contato };
        addUser(user);
        alert("Cadastro realizado com sucesso!");
        document.getElementById('registration-form').reset();
        updateUserList();
    }
}

// Função para exibir os erros
function displayErrors(errors) {
    const errorList = document.getElementById('error-list');
    errorList.innerHTML = ''; 

    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });
}

// Função para adicionar usuário
function addUser(user) {
    let users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para obter usuários
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Função para remover usuário
function removeUser(email) {
    let users = getUsers();
    users = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
    updateUserList(); 
}

// Função para atualizar a lista de usuários
function updateUserList() {
    const users = getUsers();
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = ''; 

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email}), Data: ${user.data}, CPF: ${user.cpf}, Telefone: ${user.contato}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            removeUser(user.email);
        };

        li.appendChild(removeButton);
        userListElement.appendChild(li);
    });
}

// Adicionando evento de submit ao formulário
document.getElementById('registration-form').addEventListener('submit', validateForm);
updateUserList(); // Atualiza a lista de usuários ao carregar a página
