document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        fetch('https://webaccounting.herokuapp.com/account/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "login": login,
                "password": password
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 409) {
                        throw new Error('User with this login already exists');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
            })
            .then(data => {
                console.log('User registered successfully:', data);
            })
            .catch(error => {
                console.error('There was a problem registering the user:', error);
            });
    });
});