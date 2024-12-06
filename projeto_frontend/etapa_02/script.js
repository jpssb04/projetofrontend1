// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = document.getElementById('data').value;
    const cpf = document.getElementById('cpf').value;
    const contato = document.getElementById('contato').value;

    // Regex das variáveis
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/; 
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; 
    const phoneRegex = /^(\(\d{2}\) \d{4,5}-\d{4}|\d{11})$/;


    let errors = [];

    if (!nameRegex.test(name)) {
        errors.push("O nome deve conter apenas letras e espaços, sem números ou caracteres especiais.");
    }

    if (!emailRegex.test(email)) {
        errors.push("O email deve estar em um formato válido.");
    }

    if (!passwordStrengthRegex.test(password)) {
        errors.push("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
    }

    if (!cpfRegex.test(cpf)) {
        errors.push("O CPF deve estar em um formato válido (123.456.789-00 ou 12345678900).");
    }

    if (!phoneRegex.test(contato)) {
        errors.push("O telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.");
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

// Função para aplicar o formato de telefone
function formatPhoneInput() {
    const phoneInput = document.getElementById('contato');
    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove tudo que não é número
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            value = value.replace(/^(\d*)/, "($1");
        }
        phoneInput.value = value;
    });
}

// Chamada da função para formatar telefone
if (document.getElementById('contato')) {
    formatPhoneInput();
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

// Função para atualizar a lista de usuários na página principal
function updateUserList() {
    if (!document.getElementById('user-list')) return; // Verifica se está na página correta

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

// Função para carregar usuários na página users.html
function loadUserListOnUsersPage() {
    if (!document.getElementById('user-list')) return; // Evita execução se não for a página certa

    const users = getUsers();
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = ''; 

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email}), Data: ${user.data}, CPF: ${user.cpf}, Telefone: ${user.contato}`;
        userListElement.appendChild(li);
    });
}

// Adicionando evento de submit ao formulário
if (document.getElementById('registration-form')) {
    document.getElementById('registration-form').addEventListener('submit', validateForm);
}

// Atualiza a lista na página correta
updateUserList();
loadUserListOnUsersPage();