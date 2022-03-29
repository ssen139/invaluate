import React, { useState } from 'react'
import { Container, Form, Button, Message, Label, Input, Icon, Modal } from 'semantic-ui-react'
import { InvField } from './InvField';
import { Head } from './Head';
import { MonthSelector } from './MonthSelector';
import store from "../Store/store.js";
import { BalanceMessage } from './BalanceMessage';

export const Home = () => {
    const [fields, setFields] = useState([]);
    const [totalIncome, setTotalIncome] = useState('');
    const [invAccrued, setInvAccrued] = useState(0);
    const [balance, setBalance] = useState(0);
    const [balanceColour, setBalanceColour] = useState("warning");
    const [showAddInput, setShowAddInput] = useState(false);
    const [showDuplicateError, setShowDuplicateError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [addInputValue, setAddInputValue] = useState('');
    const background = process.env.PUBLIC_URL + 'bg-img.jpg';

    const resetState = () => {
        setFields([]);
        setTotalIncome('');
        setInvAccrued(0);
        setBalance(0);
        setBalanceColour("warning");
        setShowAddInput(false);
        setShowDuplicateError(false);
        setModalMessage('');
        setAddInputValue('');

    }

    const calculateBalance = (inputName, inputVal) => {
        inputVal = (isNaN(inputVal) || inputVal === '' || inputVal === "") ? 0 : inputVal;
        let updatedInvAccrued = parseInt(invAccrued) + parseInt(inputVal);

        //if existing field is changed
        let existingFields = (fields || []);
        for (let i = 0; i < existingFields.length; i++) {
            if (existingFields[i].name === inputName) {
                updatedInvAccrued = parseInt(updatedInvAccrued) - ((isNaN(existingFields[i].value) || existingFields[i].value === '' || existingFields[i].value === "") ? 0 : existingFields[i].value);
                existingFields[i].value = inputVal;
                break;
            }
        }
        let endingBalance = parseInt(totalIncome) - updatedInvAccrued;

        setFields(existingFields);
        setBalance(endingBalance);
        setInvAccrued(updatedInvAccrued);
        setBalanceColour(endingBalance > 10000 ? "info" : "warning");
    }

    const handleTotalBalanceChange = (e) => {
        let totalInc = (isNaN(e.target.value) || e.target.value === '' || e.target.value === "") ? 0 : e.target.value;
        let bal = parseInt(totalInc) - parseInt(invAccrued);
        setTotalIncome(e.target.value);
        setBalance(bal);
        setBalanceColour(bal > 10000 ? "info" : "warning");

    }

    const handleAddInput = () => {
        if (addInputValue === '' || addInputValue === "") {
            setShowDuplicateError(true);
            setModalMessage('Cannot Leave Inv Name blank!');
            return;
        }

        let fieldIndex = -1;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].name === addInputValue) {
                fieldIndex = i;
                break;
            }
        }
        if (fieldIndex !== -1) {
            setShowDuplicateError(true);
            setModalMessage('You have already added ' + addInputValue);
        } else {
            setFields([...fields, { "name": addInputValue, "value": '' }]);
            setAddInputValue('');
            setShowAddInput(false);
        }
    }

    const handleNewInput = () => {
        if (totalIncome) {
            setShowAddInput(true);
        } else {
            setShowDuplicateError(true);
            setModalMessage('Total balance is not set');
        }
    }

    const handleCancelNewInput = () => {
        setAddInputValue('');
        setShowAddInput(false);
    }

    const handleRemoveInput = (inputName) => {
        let existingFields = [...(fields || [])];
        let valueToRemove = 0;
        for (let i = 0; i < existingFields.length; i++) {
            if (existingFields[i].name === inputName) {
                valueToRemove = parseInt((isNaN(existingFields[i].value) || existingFields[i].value === ''
                    || existingFields[i].value === "") ? 0 : existingFields[i].value);
                existingFields.splice(i, 1);
                break;
            }
        }

        let endingBalance = parseInt(balance) + valueToRemove;
        let updatedInvAccrued = parseInt(invAccrued) - valueToRemove;
        setFields(existingFields);
        setBalance(endingBalance);
        setInvAccrued(updatedInvAccrued);
        setAddInputValue('');
        setShowAddInput(false);
        setBalanceColour(balance > 10000 ? "info" : "warning");
    }

    const handleUploadData = () => {
        setModalMessage('Inv Progress Saved!!')
        setShowDuplicateError(true);
    }

    return (
        <div className="base"
        // style={{backgroundImage: `url(${background})`}}
        >
            <Head />

            <Container text className="container-back">
                <MonthSelector store={store} />
                <Form  className="top-margin-20">

                    <Form.Field inline>
                        <Input labelPosition='right' type='text' placeholder='Total Income'>
                            <Label basic className="inputLabel">TOTAL INCOME
                                <div className="currency-symbol">₹</div>
                            </Label>
                            <input value={totalIncome} onChange={(e) => handleTotalBalanceChange(e)} />
                            <Label>.00</Label>
                        </Input>
                        <Button content='Reset' disabled={totalIncome === ''} icon='backward' labelPosition='left' size='small'
                            onClick={() => resetState()} />
                    </Form.Field>

                    {fields.map((field) => (
                        <div className="top-margin-20">
                            <InvField name={field.name} value={field.value}
                                calcFn={(inputName, inputValue) => calculateBalance(inputName, inputValue)}
                                removeInputFn={(inputName, inputValue) => handleRemoveInput(inputName, inputValue)} />
                        </div>


                    ))}
                </Form>

                <div className="top-margin-20" style={{ display: showAddInput ? 'block' : 'none' }} >
                    <Input labelPosition='right' type='text' placeholder='Inv Name' size='small'
                        value={addInputValue} onChange={(e) => setAddInputValue(e.target.value.toUpperCase())} />
                    <Icon name='plus square outline' color='black' size='large' link onClick={() => handleAddInput()} />
                    <Icon name='window close outline' color='red' size='large' link onClick={() => handleCancelNewInput()} />
                </div>

                <div className="top-margin-20">
                    <Button content='Add More' icon='add circle' labelPosition='left' size='small'
                        disabled={showAddInput} onClick={() => handleNewInput()} />
                </div>

                <BalanceMessage balance={balance} balanceColour={balanceColour} fieldCound={fields.length} />

                <div>
                    <Modal dimmer='true' size='mini' open={showDuplicateError} onClose={() => setShowDuplicateError(false)}>
                        <Modal.Header>There was a Problem!!</Modal.Header>
                        <Modal.Content>{modalMessage}</Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={() => setShowDuplicateError(false)}>Okay</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </Container>
        </div >
    );

}