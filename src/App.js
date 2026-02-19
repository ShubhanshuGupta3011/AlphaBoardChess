import './App.css';

const screen = [
    'AC', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
];
const rightSide = ['+', '-', '*', '/','='];
const topSide = ['AC', '+/-','%'];
let a = 0;
let operation = null;
let b = null;

function clear() {
    a = 0;
    operation = null;
    b = null;
}

function calculated() {
    if(b === null) {
        operation = null;
    }
    if(operation === null) {
        return
    }
    let numa = Number(a);
    let numb = Number(b);
    if(operation === '+') {
        document.getElementById('display').value = numa + numb;
    } else if(operation === '-') {
        document.getElementById('display').value = numa - numb;
    } else if(operation === '*') {
        document.getElementById('display').value = numa * numb;
    }  else {
        document.getElementById('display').value = numa / numb;
    }
    clear();
    if(document.getElementById('display').value === 'Infinity') {
        document.getElementById('display').value = '';
    }else{
        a = document.getElementById('display').value;
    }
}
function handleClick(item) {
    if(topSide.includes(item)) {
        if(item === 'AC') {
            clear();
            document.getElementById('display').value = '';
            return
        }
        if(item === '+/-') {
            if(document.getElementById('display').value === '0') {
                return ;
            }
            if(document.getElementById('display').value[0] === '-') {
                document.getElementById('display').value = document.getElementById('display').value.slice(1);
            }else {
                document.getElementById('display').value = '-' + document.getElementById('display').value;
            }
            if(b !== null) {
                b = String(document.getElementById('display').value);
            } else {    
                a = String(document.getElementById('display').value);
            }
            console.log(a,operation,b);
            return 
        }
        document.getElementById('display').value = Number(document.getElementById('display').value);
        document.getElementById('display').value = document.getElementById('display').value / 100;
        clear();
        a = String(document.getElementById('display').value);
        return
    } 
    if(rightSide.includes(item)) {
        if(item === '=') {
            calculated();
            return
        }
        if(operation !== null && b !== null) {
            calculated();
        }
        operation = item; 
        document.getElementById('display').value = '';
        return
    }

    if(document.getElementById('display').value === '0' && item !== '.') {
        document.getElementById('display').value = item;
    } else {
        if(document.getElementById('display').value.includes('.') && item === '.') {
            return
        }
        document.getElementById('display').value = document.getElementById('display').value + item;
    }
    if(operation === null) {
        a = document.getElementById('display').value;
    }else{
        b = document.getElementById('display').value;
    }
}
function App() {
    return (
        <div className="App">
            <input 
             id="display" 
             readOnly={true}
            ></input>
            {screen.map((item) => {return (
                <button 
                style={{
                    ...item==='0' ? {width: '50%'} : {},
                    ...rightSide.includes(item) ? {backgroundColor: '#ff9500'} : {},
                    ...topSide.includes(item) ? {backgroundColor: '#d4d4d2'} : {},
                }}
                key={item}
                onClick={() => handleClick(item)}>
                    {item}
                </button>
            )})}
        </div>
    ); 
}

export default App;
