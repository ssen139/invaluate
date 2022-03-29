import React, { useState, useEffect } from 'react';
import { Message, Icon } from 'semantic-ui-react'

export const BalanceMessage = (props) => {

    const [balanceColour, setBalanceColour] = useState(props.balanceColour);
    const [balance, setBalance] = useState(props.balance);
    const [fieldCound, setfieldCound] = useState(props.fieldCound);

    useEffect(() => {
        setBalance(props.balance);
    }, [props.balance])

    return (
        <div className="top-margin-20">
            <Message placeholder color={balanceColour}>
                <div className="float-right"
                    style={{ display: (balanceColour === "warning" && fieldCound > 0) ? 'block' : 'none' }}>
                    <Icon name='warning sign' color='black' size='large' />
                    Your Ending balance is too Low!! <br />
                    Try Reducing Your Expenditures going forward.
                </div>
                <Message.Header>Ending Balance</Message.Header>
                <p>₹{balance}.00</p>
            </Message>
        </div>
    );
}
