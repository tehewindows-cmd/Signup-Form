import React, { useState } from "react";

function Calculator() {

    const [display, setDisplay] = useState("");
    const [isResult, setIsResult] = useState(false);

    function appendToDisplay(input) {
        setDisplay(prev => prev + input);
        setIsResult(false);
    }

    function clearDisplay() {
        setDisplay("");
        setIsResult(false);
    }

    function calculate() {
        setDisplay(eval(display).toFixed(5).toString());
        setIsResult(true);
    }

    return (
        <div className="calculator">
            <input id="display" className={isResult ? "result" : ""} readOnly value={display} />
                <div className="keys">
                    <button onClick={() => appendToDisplay('+')} className="signs">+</button>
                    <button onClick={() => appendToDisplay('7')}>7</button>
                    <button onClick={() => appendToDisplay('8')}>8</button>
                    <button onClick={() => appendToDisplay('9')}>9</button>
                    <button onClick={() => appendToDisplay('-')} className="signs">-</button>
                    <button onClick={() => appendToDisplay('4')}>4</button>
                    <button onClick={() => appendToDisplay('5')}>5</button>
                    <button onClick={() => appendToDisplay('6')}>6</button>
                    <button onClick={() => appendToDisplay('*')} className="signs">*</button>
                    <button onClick={() => appendToDisplay('1')}>1</button>
                    <button onClick={() => appendToDisplay('2')}>2</button>
                    <button onClick={() => appendToDisplay('3')}>3</button>
                    <button onClick={() => appendToDisplay('/')} className="signs">/</button>
                    <button onClick={() => appendToDisplay('0')}>0</button>
                    <button onClick={() => appendToDisplay('.')}>.</button>

                    <button onClick={calculate}>=</button>
                    <button onClick={clearDisplay} className="signs">C</button>
                </div>
        </div>
    )
}

export default Calculator