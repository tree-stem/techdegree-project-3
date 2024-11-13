// focuses on the first text field once page loads
document.getElementById('name').focus();

// created variables to hide 'Other job role?' text box unless selected using an addEventListener
const otherTextBox = document.getElementById('other-job-role');
const jobs = document.getElementById('title');

otherTextBox.style.display = 'none';

jobs.addEventListener('change', () => {
    
    if (jobs.value === 'other') {
        otherTextBox.style.display = 'block';
        otherTextBox.focus();
    } else {
        otherTextBox.style.display = 'none';
    }
});

