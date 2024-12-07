document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = '/login/';
        return;
    }

    const response = await fetch('/api/protected/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-info').innerHTML = `
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
        `;
    } else if (response.status === 401) {
        alert('Your session has expired. Redirecting to login page.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login/';
    } else {
        alert('An error occurred while accessing the dashboard.');
    }
});


document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('You have been logged out.');
    window.location.href = '/login/';
});