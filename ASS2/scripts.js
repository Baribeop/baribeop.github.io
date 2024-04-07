// scripts.js

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Fetch form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const priority = document.getElementById('priority').value;

    // You can perform further validation here if needed

    // Log form values (you can replace this with your desired action)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Priority:', priority);

    // Clear form fields after submission (optional)
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Event listener for form submission
document.getElementById('contact-form').addEventListener('submit', handleSubmit);
