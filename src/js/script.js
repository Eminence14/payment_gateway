
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