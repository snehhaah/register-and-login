let users = [];

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const regMessage = document.getElementById('regMessage');

    regMessage.textContent = '';

    if (password !== confirmPassword) {
        regMessage.textContent = 'Passwords do not match!';
        return;
    }
    
    if (users.find(user => user.username === username)) {
        regMessage.textContent = 'Username already exists!';
        return;
    }
    
    users.push({ username, password });
    regMessage.className = 'success';
    regMessage.textContent = 'Registration successful!';

    document.getElementById('registerForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    loginMessage.textContent = '';

    const user = users.find(user => user.username === username);

    if (user) {
        if (user.password === password) {
            loginMessage.className = 'success';
            loginMessage.textContent = 'Login successful!';
            showWelcomeMessage(username);
        } else {
            loginMessage.textContent = 'Incorrect password!';
        }
    } else {
        loginMessage.textContent = 'Invalid username or password!';
    }

    document.getElementById('loginForm').reset();
});

function showWelcomeMessage(username) {
    const loginContainer = document.querySelector('.form-container:nth-child(2)');

    loginContainer.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        <p>You are now logged in.</p>
        <button onclick="logout()">Logout</button>
    `;
}

function logout() {
    const loginContainer = document.querySelector('.form-container:nth-child(2)');

    loginContainer.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="loginUsername" placeholder="Username" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button type="submit">Login</button>
            <p id="loginMessage"></p>
        </form>
    `;

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const loginMessage = document.getElementById('loginMessage');

        loginMessage.textContent = '';

        const user = users.find(user => user.username === username);
        
        if (user) {
            if (user.password === password) {
                loginMessage.className = 'success';
                loginMessage.textContent = 'Login successful!';
                showWelcomeMessage(username);
            } else {
                loginMessage.textContent = 'Incorrect password!';
            }
        } else {
            loginMessage.textContent = 'Invalid username or password!';
        }
    });
}
