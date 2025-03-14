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


// created an event listener that listens for checkbox changes and dynamically adds activity costs to the total
const activitiesFieldset = document.querySelector('fieldset[id="activities"]');
const activities = document.querySelectorAll('input[type="checkbox"]');
const totalCost = document.getElementById('activities-cost');
let selectedActivities = [];

activitiesFieldset.addEventListener('change', () => {

    let total = 0;
    let selectedActivities = [];
    
    for (let i = 0; i < activities.length; i++) {

        const price = activities[i].getAttribute('data-cost');

        if (activities[i].checked) {
            selectedActivities.push(parseInt(price));  
        }
    }

    selectedActivities.forEach(addCost);

    function addCost(activity) {
        total += activity;
    };

    totalCost.textContent = `Total: $${total}`;
});


// Set default option as credit card and hid credit card information boxes for other methods  
const selectPayment = document.querySelector('#payment');
const paymentOptions = selectPayment.options;
const paymentFieldset = document.querySelector('.payment-methods'); 
const creditCardBoxes = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

paymentOptions[1].selected = true;
paypal.hidden = true;
bitcoin.hidden = true;

paymentFieldset.addEventListener('change', () => {

    if (paymentOptions[2].selected) {
        creditCardBoxes.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;

    } else if (paymentOptions[3].selected) {
        creditCardBoxes.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }else {
        creditCardBoxes.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    };
});


// created variables to validate form submisisons
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const activityHint = document.querySelector('#activities-hint');
const creditCardNumberInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const isValidCardNumber = () => /^\d{13,16}$/.test(creditCardNumberInput.value);
const isValidZip = () => /^\d{5}$/.test(zipInput.value);
const isValidCVV = () => /^\d{3}$/.test(cvvInput.value);


/* already declared variables:

const activitiesFieldset = document.querySelector('fieldset[id="activities"]');
const activities = document.querySelectorAll('input[type="checkbox"]');

*/


form.addEventListener('submit', (e) => {
    
    if (nameInput.value === '') {
        e.preventDefault();
        nameInput.closest('label').className = 'not-valid';
        nameInput.nextElementSibling.style.display = 'block'; 
    } else {
        nameInput.closest('label').className = 'valid';
        nameInput.nextElementSibling.style.display = 'none'; 
    };

    if (isValidEmail()) {
        emailInput.closest('label').className = 'valid';
        emailInput.nextElementSibling.style.display = 'none';      
    } else {
        e.preventDefault();
        emailInput.closest('label').className = 'not-valid';
        emailInput.nextElementSibling.style.display = 'block';
    };

    let validActivities = [];

    for (let i = 0; i < activities.length; i++) {

        activities[i].closest('label').className = '';
        
        if (activities[i].checked) {
            validActivities.push(activities[i]);  
        };
    };

    if (validActivities.length === 0) {
        e.preventDefault();
        activityHint.style.display = 'block';
        
        for (let i = 0; i < activities.length; i++) {

            activities[i].closest('label').className = 'not-valid';
        };
    };

    validActivities.forEach(showValidity);

    function showValidity(activity) {
        activity.closest('label').className = 'valid';
        activityHint.style.display = 'none'; 
    };

    if (paymentOptions[1].selected) {
        if (isValidCardNumber()) {
            creditCardNumberInput.closest('label').className = 'valid';
            creditCardNumberInput.nextElementSibling.style.display = 'none';
        } else {
            e.preventDefault()
            creditCardNumberInput.closest('label').className = 'not-valid';
            creditCardNumberInput.nextElementSibling.style.display = 'block';
        };
    
        if (isValidZip()) {
            zipInput.closest('label').className = 'valid';
            zipInput.nextElementSibling.style.display = 'none';
        } else {
            e.preventDefault()
            zipInput.closest('label').className = 'not-valid';
            zipInput.nextElementSibling.style.display = 'block';
        };
    
        if (isValidCVV()) {
            cvvInput.closest('label').className = 'valid';
            cvvInput.nextElementSibling.style.display = 'none';
        } else {
            e.preventDefault()
            cvvInput.closest('label').className = 'not-valid';
            cvvInput.nextElementSibling.style.display = 'block';
        }; 
    };    
});

// Added focus to each checkbox in the activty section for more accessibility
activities.forEach(checkbox => {
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.classList.add('focus');
    });

    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.classList.remove('focus');
    });
});

// Thanks for reviewing :)