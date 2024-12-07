document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    const response = await fetch('/api/registration/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, password2 })
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
        messageDiv.innerHTML = '<p style="color: green;">Registration successful!</p>';
    } else {
        let errorMessages = '';
        for (const [key, value] of Object.entries(data)) {
            errorMessages += `<p style="color: red;">${key}: ${value}</p>`;
        }
        messageDiv.innerHTML = errorMessages;
    }
});