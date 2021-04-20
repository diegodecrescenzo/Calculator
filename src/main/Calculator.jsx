import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    display: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    state = { ...initialState }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({
                clearDisplay: true,
                operation,
                current: 1
            })
        } else {
            const result = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            switch (currentOperation) {
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                case '/':
                    values[0] = values[0] / values[1]
                    break

                default:
                    break
            }

            values[1] = 0
            this.setState({
                display: values[0],
                clearDisplay: !result,
                operation: result ? null : operation,
                current: result ? 0 : 1,
                values
            })
        }
    }

    addDigit(d) {
        if (d === '.' && this.state.display.includes('.')) {
            return
        }

        const clearDisplay = this.state.display === '0' || this.state.clearDisplay // Será atribuido a constante True || False.
        const currentValue = clearDisplay ? '' : this.state.display // Será testado o valor de clearDisplay, e em base ao resultado será atribuido um valor.
        const display = currentValue + d
        this.setState({ display, clearDisplay: false })

        if (d !== '.') {
            const i = this.state.current
            const newValue = parseFloat(display)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Calculadora</h1>
                <div className="calculator">
                    <Display value={this.state.display} />
                    <Button type="triple" label="AC" click={this.clearMemory} />
                    <Button type="operation" label="/" click={this.setOperation} />
                    <Button label="7" click={this.addDigit} />
                    <Button label="8" click={this.addDigit} />
                    <Button label="9" click={this.addDigit} />
                    <Button type="operation" label="*" click={this.setOperation} />
                    <Button label="4" click={this.addDigit} />
                    <Button label="5" click={this.addDigit} />
                    <Button label="6" click={this.addDigit} />
                    <Button type="operation" label="-" click={this.setOperation} />
                    <Button label="1" click={this.addDigit} />
                    <Button label="2" click={this.addDigit} />
                    <Button label="3" click={this.addDigit} />
                    <Button type="operation" label="+" click={this.setOperation} />
                    <Button type="double" label="0" click={this.addDigit} />
                    <Button label="." click={this.addDigit} />
                    <Button type="operation" label="=" click={this.setOperation} />
                </div>
            </React.Fragment>
        )
    }
}