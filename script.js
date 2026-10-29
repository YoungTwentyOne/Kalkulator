let currentInput = '';
let previousValue = null;
let operator = null;

const bordDisplay = document.querySelector('.calc-screen p');


const $ = (cls) => document.getElementsByClassName(cls)[0];

const btnC     = $('btn C');
const btnLevo  = $('btn levo');
const btnPravo = $('btn pravo');
const btnDel   = $('btn del');
const btn7     = $('btn 7');
const btn8     = $('btn 8');
const btn9     = $('btn 9');
const btnUmnozh = $('btn umnozh');
const btn4     = $('btn 4');
const btn5     = $('btn 5');
const btn6     = $('btn 6');
const btnMinus = $('btn minus');
const btn1     = $('btn 1');
const btn2     = $('btn 2');
const btn3     = $('btn 3');
const btnPlus  = $('btn plus');
const btnDiv   = $('btn div');
const btn0     = $('btn 0');
const btnPoint = $('btn point');
const btnRavno = $('btn ravno');

function updateDisplay() {
    bordDisplay.textContent = currentInput || '0';
}

function clearAll() {
    currentInput = '';
    previousValue = null;
    operator = null;
    updateDisplay();
}
btnC.addEventListener('click', clearAll);

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}
btnDel.addEventListener('click', backspace);

function appendDigit(d) {
    currentInput += d;
    updateDisplay();
}
btn0.addEventListener('click', () => appendDigit('0'));
btn1.addEventListener('click', () => appendDigit('1'));
btn2.addEventListener('click', () => appendDigit('2'));
btn3.addEventListener('click', () => appendDigit('3'));
btn4.addEventListener('click', () => appendDigit('4'));
btn5.addEventListener('click', () => appendDigit('5'));
btn6.addEventListener('click', () => appendDigit('6'));
btn7.addEventListener('click', () => appendDigit('7'));
btn8.addEventListener('click', () => appendDigit('8'));
btn9.addEventListener('click', () => appendDigit('9'));

btnPoint.addEventListener('click', () => {
    const lastNumber = currentInput.split(/[\+\-\*\/\(\)]/).pop();
    if (!lastNumber.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
});

function appendOp(op) {
    currentInput += op;
    updateDisplay();
}
btnPlus.addEventListener('click',  () => appendOp('+'));
btnMinus.addEventListener('click', () => appendOp('-'));
btnUmnozh.addEventListener('click',() => appendOp('*'));
btnDiv.addEventListener('click',  () => appendOp('/'));
btnLevo.addEventListener('click', () => appendOp('('));
btnPravo.addEventListener('click',() => appendOp(')'));

btnRavno.addEventListener('click', () => {
    if (!currentInput) return;
    try {
        if (!/^[0-9+\-*/().\s]+$/.test(currentInput)) {
            throw new Error('bad input');
        }
        const result = Function('"use strict"; return (' + currentInput + ')')();
        currentInput = String(result);
        updateDisplay();
    } catch (e) {
        bordDisplay.textContent = 'Ошибка';
        currentInput = '';
    }
});

