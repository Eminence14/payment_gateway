
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
let isBlank = false;
submit.addEventListener('click', e => {
    e.preventDefault()

    // Verify if there is no string in the card number

    const cardNum = document.getElementById('card_number').value;
    for (let i = 0; i < cardNum.length; i++) {
        if (isNaN(cardNum.charAt(i)))
            hasString = true;
    }
    const [cardNumSpan, cardNumInput] = getSpan('card_number')
    if (hasString) {
        cardNumSpan.style.display = 'block';
        cardNumInput.classList.add('unapproved')
    } else {
        cardNumSpan.style.display = 'none';
        cardNumInput.classList.remove('unapproved')
    }
    hasString = false;


    // verify if dates are not blank
    const month = document.getElementById('exp_date_MM');
    const year = document.getElementById('exp_date_YY');
    const blanker = document.getElementById('blanker')
    if (month.value === '') {
        month.classList.add('unapproved')
    } else {
        month.classList.remove('unapproved')
    }
    if (year.value === '') {
        year.classList.add('unapproved')
    } else {
        year.classList.remove('unapproved')
    }
    if (month.value === '' || year.value === '') {
        blanker.style.display = 'block'
    } else {
        blanker.style.display = 'none'
    }


    // verify if cvc is not blank
    const [cvcSpan, cvcInp] = getSpan('cvc')
    if (cvcInp.value === '') {
        cvcSpan.style.display = 'block';
        cvcInp.classList.add('unapproved')
    } else {
        cvcSpan.style.display = 'none';
        cvcInp.classList.remove('unapproved')
    }
})



// get span and input elements of a given input tag/ classname
function getSpan(input) {
    const div = document.getElementById(`${input}`).parentElement.children
    const span = Array.from(div)[2]
    const inp = Array.from(div)[1]
    return [span, inp]
}