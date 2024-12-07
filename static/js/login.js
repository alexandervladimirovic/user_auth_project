document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/accounts/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
        messageDiv.innerHTML = '<p style="color: green;">Login successful!</p>';
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
    } else {
        let errorMessages = '';
        for (const [key, value] of Object.entries(data)) {
            errorMessages += `<p style="color: red;">${key}: ${value}</p>`;
        }
        messageDiv.innerHTML = errorMessages;
    }
});