// forked workspace

const activities = document.querySelectorAll('input[data-cost]');
const totalCost = document.getElementById('activities-cost');


const form = document.querySelector('form');

form.addEventListener('change', (e) => {
   
    const selectedCheckbox = e.target;
    let total = 0;
    

    for (let i = 0; i < activities.length; i++) {
        const price = activities[i].getAttribute('data-cost');
        return price;
    }

    if (selectedCheckbox.checked) {
        total += parseInt(price);
    }

    totalCost.textContent = `Total: ${total}`;
});