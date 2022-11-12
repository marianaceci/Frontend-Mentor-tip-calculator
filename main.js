document.getElementById('amount-value').innerText = '0.00';
document.getElementById('total-value').innerText = '0.00';

const bill = document.getElementById('bill')
const people = document.getElementById('people')

function calculateTipAmount() {    
    if (numberOfpeople < 1) {
        return
    }
    let tipAmount = (billAmount * (selectedTip/100))/numberOfpeople
    let totalAmount = (billAmount + (billAmount * (selectedTip / 100))) / numberOfpeople

    document.getElementById('amount-value').innerText = `${tipAmount.toFixed(2)}`
    document.getElementById('total-value').innerText = `${totalAmount.toFixed(2)}`
}

const getBillAmount = bill.addEventListener('blur', (e) => {
    billAmount = +e.composedPath()[0].value
    return billAmount
})

const getNumberOfPeople = people.addEventListener('blur', (e) => {
    document.getElementById('reset').classList.remove('disabled')
    numberOfpeople = +e.composedPath()[0].value
    return numberOfpeople
})

const tipSectionButtons = document.querySelectorAll('.tip-btn')
const getTipPercentage = tipSectionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {        
        tipSectionButtons.forEach(f => f.classList.remove('selected'));
        e.target.classList.toggle('selected');
        if (e.composedPath()[0].type == 'number') {
            btn.addEventListener('blur', (e) => {
                selectedTip = +e.composedPath()[0].value
                return selectedTip
            })
        } else {    
            let percentValue = e.composedPath()[0].innerText.split('');
            percentValue.pop();
            selectedTip = +percentValue.join('');
            return selectedTip
        } 
    })
})

let billAmount = getBillAmount
let numberOfpeople = getNumberOfPeople
let selectedTip = getTipPercentage

people.addEventListener('click', cantBeZero)
people.addEventListener('focusout', cantBeZero)
function cantBeZero(e) {    
    let zero = document.getElementById('zero')
    if (e.composedPath()[0].value <= '0') {
        zero.innerText = "Can't be zero"
        e.composedPath()[0].value = ''       
    } else {
        zero.innerText = '' 
        calculateTipAmount()
    }
}

//document.querySelector('main').addEventListener('click', calculateTipAmount)

document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('amount-value').innerText = '0.00';
    document.getElementById('total-value').innerText = '0.00';
    bill.value = ''
    people.value = ''
    document.querySelectorAll('.tip-btn').forEach(f => {
        if (f.classList.contains('selected')) f.classList.remove('selected')
        if (f.type == 'number') f.value = ''
    })        
})


