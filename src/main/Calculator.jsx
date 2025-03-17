import React, {useState} from "react";

import Display from "../components/Display";
import Button from "../components/Button";

import "./Calculator.css"


const Calculator = () => {

    const [state, setState] = useState({
        displayValue: "0",
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0,
    });

    function clearMemory() {
        setState({
            displayValue: "0",
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0,
        });
    }

    function calculate(a, b, operation) {
        switch (operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b !== 0 ? a / b : "Erro"; // Evita divisão por zero
            default:
                return b;
        }
    }

    function setOperation(operation) {
        if (state.current === 0) {
            setState((prevState) => ({
                ...prevState,
                operation,
                current: 1,
                clearDisplay: true,
            }));
        } else {
            const equals = operation === "=";
            const currentOperation = state.operation;

            if (!currentOperation) return;

            try {
                const values = [...state.values];
                values[0] = calculate(values[0], values[1], currentOperation);
                values[1] = 0;

                setState({
                    displayValue: values[0].toString(),
                    operation: equals ? null : operation,
                    current: equals ? 0 : 1,
                    clearDisplay: !equals,
                    values,
                });
            } catch (error) {
                console.error("Erro ao calcular:", error);
                clearMemory();
            }
        }
    }

    function addDigit(n) {
        if (n === "." && state.displayValue.includes(".")) {
            return;
        }

        const clearDisplay = state.displayValue === "0" || state.clearDisplay;
        const currentValue = clearDisplay ? "" : state.displayValue;
        const displayValue = currentValue + n;

        setState((prevState) => {
            const i = prevState.current;
            const values = [...prevState.values];

            if (n !== ".") {
                values[i] = parseFloat(displayValue);
            }

            return {
                ...prevState,
                displayValue,
                clearDisplay: false,
                values,
            };
        });
    }

    return (
        <div className="Calculator">
            <Display value={state.displayValue} />
    <Button  label="AC" click={() => clearMemory()} triple/>
    <Button label="/" click={setOperation} operation/>
    <Button label="7" click={addDigit}/>
    <Button label="8" click={addDigit}/>
    <Button label="9" click={addDigit}/>
    <Button label="*" click={setOperation} operation/>
    <Button label="4" click={addDigit}/>
    <Button label="5" click={addDigit}/>
    <Button label="6" click={addDigit}/>
    <Button label="-" click={setOperation} operation/>
    <Button label="1" click={addDigit}/>
    <Button label="2" click={addDigit}/>
    <Button label="3" click={addDigit}/>
    <Button label="+" click={setOperation} operation/>
    <Button label="0" click={addDigit} double/>
    <Button label="." click={addDigit}/>
    <Button label="=" click={setOperation} operation/>
        </div>
    )
}





export default Calculator;