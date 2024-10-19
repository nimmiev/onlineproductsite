// Dynamically set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// contact us form page validation and success message
function contactusdata() {
    const contactForm = document.getElementById('contact-us-data'); // Correct ID for the form
    const nameInput = document.getElementById('name'); // Name input field
    const emailInput = document.getElementById('email'); // Email input field
    const messageInput = document.getElementById('message'); // Message input field

    // Select the success message div (already present in the HTML)
    const successMessageDiv = document.getElementById('form-success-message');

    // Helper function to show validation messages
    function showMessage(message, type) {
        successMessageDiv.innerHTML = `<div class="alert alert-${type} mt-3">${message}</div>`;
        setTimeout(() => {
            successMessageDiv.innerHTML = ''; // Remove message after 3 seconds
        }, 3000);
    }

    // Trim input values to avoid unnecessary spaces
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Basic validation for empty fields
    if (name === '' || email === '' || message === '') {
        showMessage('Please fill out all fields.', 'danger');
        return false; // Prevent form submission
    }

    // Simple email format validation using a regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address.', 'danger');
        return false; // Prevent form submission
    }

    // Display success message if validation passes
    showMessage('Your message has been sent successfully!', 'success');

    // Clear the form fields after submission
    contactForm.reset();

    return false; // Prevent the default form submission
}