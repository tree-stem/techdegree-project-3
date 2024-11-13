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

// created variables to display color choices according to the design theme
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const colorOptions = document.querySelectorAll('option[data-theme]');

color.hidden = true;
color.parentNode.hidden = true;

design.addEventListener('change', () => {

    for (let i = 0; i < colorOptions.length; i++)

    if (design.value !== colorOptions[i].getAttribute('data-theme')) {
        color.hidden = false;
        color.parentNode.hidden = false;
        colorOptions[i].hidden = true;
        colorOptions[i].disabled = true; 
    } else {
        color.hidden = false;
        color.parentNode.hidden = false;
        colorOptions[i].hidden = false;
        colorOptions[i].disabled = false; 
    }

    if (color.value !== '') {
        color.value = 'reselect';
    }
});

