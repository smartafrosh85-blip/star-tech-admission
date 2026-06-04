// Toggle application form visibility
function showForm() {
    const formDiv = document.getElementById('apply-form');
    formDiv.style.display = formDiv.style.display === 'block' ? 'none' : 'block';
}

// Formspree endpoint for admission notification emails
const FORMSPREE_URL = 'https://formspree.io/f/mykaydqr';

const applicationForm = document.getElementById('application-form');
const statusDiv = document.getElementById('application-status');

applicationForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const gender = document.querySelector('select[name="gender"]').value;
    const email = document.querySelector('input[name="email"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const program = document.querySelector('select[name="program"]').value;

    if (!name) {
        showStatus('Please enter your full name.', 'error');
        return;
    }
    if (!gender) {
        showStatus('Please select your gender.', 'error');
        return;
    }
    if (!email || !validateEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }
    if (!phone) {
        showStatus('Please enter your phone number.', 'error');
        return;
    }
    if (!program) {
        showStatus('Please select a program.', 'error');
        return;
    }

    showStatus('Sending your application…', 'info');

    try {
        const formData = new FormData(applicationForm);
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            applicationForm.reset();
            document.getElementById('apply-form').style.display = 'none';
            showStatus('Thank you! Your application has been submitted successfully. We will email you at ' + email + ' soon.', 'success');
        } else {
            const data = await response.json();
            showStatus(data.error || 'Submission failed. Please try again later.', 'error');
        }
    } catch (error) {
        showStatus('Network error, please try again in a moment.', 'error');
    }
});

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.className = type === 'success' ? 'status-success' : type === 'error' ? 'status-error' : 'status-info';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

let images = document.querySelectorAll('.slider img');
let currentImage = 0;

function slideImage() {
    if (images.length <= 1) return;
    images[currentImage].classList.remove('active');
    currentImage = (currentImage + 1) % images.length;
    images[currentImage].classList.add('active');
}

if (images.length > 0) {
    images[0].classList.add('active');
    setInterval(slideImage, 3000);
}
