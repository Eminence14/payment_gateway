// A token to proceed to the final
let completed = false;


const reset = document.querySelector('button[type="reset"]')
reset.addEventListener('click', () => {
    set_details('Jane Appleseed', '0000 0000 0000 0000', '00', '00', '000')
    card_display();
})


function spacer() {
    let input = document.getElementById('card_number').value
    len = input.length
    document.getElementById('card_number').addEventListener('keydown', (e) => {
        if (e.code === 'Backspace')
            document.getElementById('card_number').value = input;
    })
    if (len == 4 || len == 9 || len == 14)
        document.getElementById('card_number').value += ' ';
}
const submit = document.querySelector('.confirm')
let hasString = false;
submit.addEventListener('click', e => {
    e.preventDefault()

    // Confirm if name is blank
    const cardName = document.getElementById('name').value;
    if (cardName === '') {
        completed = false;
    } else {
        completed = true;
    }

    // Verify if there is no string in the card number

    const cardNum = document.getElementById('card_number').value;
    for (let i = 0; i < cardNum.length; i++) {
        if (isNaN(cardNum.charAt(i)))
            hasString = true;
    }
    const [cardNumSpan, cardNumInput] = getSpan('card_number')
    if (hasString) {
        cardNumSpan.style.display = 'block';
        cardNumInput.classList.add('unapproved');
        completed = false;
        return;
    } else {
        cardNumSpan.style.display = 'none';
        cardNumInput.classList.remove('unapproved')
        completed = true;
    }
    hasString = false;



    // verify if dates are not blank
    const month = document.getElementById('exp_date_MM');
    const year = document.getElementById('exp_date_YY');
    const blanker = document.getElementById('blanker')
    if (month.value === '') {
        month.classList.add('unapproved');
        completed = false;
    } else {
        month.classList.remove('unapproved')
        completed = true;
    }
    if (year.value === '') {
        year.classList.add('unapproved');
        completed = false;
    } else {
        year.classList.remove('unapproved');
        completed = true;
    }
    if (month.value === '' || year.value === '') {
        blanker.style.display = 'block';
        completed = false;
        return
    } else {
        blanker.style.display = 'none'
        completed = true;
    }

    // verify if cvc is not blank
    const [cvcSpan, cvcInp] = getSpan('cvc')
    if (cvcInp.value === '') {
        cvcSpan.style.display = 'block';
        cvcInp.classList.add('unapproved');
        completed = false;
        return;
    } else {
        cvcSpan.style.display = 'none';
        cvcInp.classList.remove('unapproved')
        completed = true;
    }



    // store values in the local storage
    const name = document.getElementById('name').value;
    const form_month = month.value;
    const form_year = year.value;
    const form_cvc = cvcInp.value;

    set_details(name, cardNum, form_month, form_year, form_cvc)
    card_display();

})



// get span and input elements of a given input tag/ classname
function getSpan(input) {
    const div = document.getElementById(`${input}`).parentElement.children
    const span = Array.from(div)[2]
    const inp = Array.from(div)[1]
    return [span, inp]
}



// a function to set values on the card from the local storage

function set_details(name, num, mon, yr, cvc) {
    localStorage.setItem('name', name);
    localStorage.setItem('card_number', num)
    localStorage.setItem('month', mon)
    localStorage.setItem('year', yr)
    localStorage.setItem('cvc', cvc)
}



// a function to display the localStorage values on the card
function card_display() {
    // get current card details
    const cvc = document.querySelector('.card_cvv')
    const card_number = document.querySelector('.card_number');
    const card_name = document.querySelector('.card_name');
    const card_month = document.querySelector('#card_exp_month')
    const card_year = document.querySelector('#card_exp_year')


    // set their text content from the localStorage
    cvc.textContent = localStorage.getItem('cvc')
    card_number.textContent = localStorage.getItem('card_number')
    card_name.textContent = localStorage.getItem('name')
    card_month.textContent = localStorage.getItem('month')
    card_year.textContent = localStorage.getItem('year')
}

const openMod = document.getElementById('confirm');
const closeMod = document.getElementById('continue');
const form = document.getElementById('form');
const modal = document.getElementById('modal');

openMod.addEventListener('click', () => {
    if (completed) {
        form.classList.add('active');
        modal.classList.add('active');
    }
})
closeMod.addEventListener('click', () => {
    form.classList.remove('active');
    modal.classList.remove('active');
    const all_input = document.querySelectorAll('input');
    all_input.forEach(inp => {
        inp.value = '';
    })
})