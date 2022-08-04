const payeeIdInput = document.querySelector('#payee_id_input')
const payeeIdTextElem = document.querySelector('#payee_id')
const accountInput = document.querySelector('#account_input')
const accountTextElem = document.querySelector('#account_id')
const checkDigitElement = document.querySelector('#check_digit')

function rjust(string, width, padding) {
    padding = padding.substr(0, 1);
    if (string.length < width)
        return padding.repeat(width - string.length) + string;
    else
        return string;
}

function calculateCheckDigit(reference) {
    let sum = 0;
    let weight = [1, 2, 1, 1, 1, 2, 2, 2].reverse();
    let size = weight.length;

    reference.toUpperCase().split('').reverse().forEach((char, index) => {
        sum += char.charCodeAt() * weight[index % size]
    })

    sum %= 101
    sum %= 100

    return rjust(sum.toString(), 2, '0');
}

function valid(reference) {
    cd = calculateCheckDigit(reference.slice(0, -2))
    return cd === reference.slice(-2);
}

const setText = (evt, maxLength, setTo) => {


    let textValue = evt.target.value

    if (textValue.toString().length < maxLength + 1) {
        textValue = textValue.padStart(maxLength, "0")
        setTo.textContent = textValue
        let checkDigit = calculateCheckDigit(`AP001${payeeIdTextElem.textContent}${accountTextElem.textContent}`)
        checkDigitElement.textContent = checkDigit
    }

    if (payeeIdTextElem.textContent === '0000000' &&
        accountTextElem.textContent === '000000000000000000') {

        checkDigitElement.textContent = 'CD'
    }


}

payeeIdInput.addEventListener('input', evt => { setText(evt, 7, payeeIdTextElem) })
accountInput.addEventListener('input', evt => { setText(evt, 18, accountTextElem) })

