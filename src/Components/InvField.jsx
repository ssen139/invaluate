import React, { useState } from 'react'
import { Form, Input, Icon, Label } from 'semantic-ui-react'

export const InvField = (props) => {

    const [inputValue, setInputValue] = useState(props.value);

    const handleValueChange = (e) => {
        setInputValue(e.target.value);
        props.calcFn(props.name, e.target.value);
    }

    return (
        <div>
            <Form.Field inline>
                <Input labelPosition='right' type='text' placeholder={props.name}>
                    <Label basic className="inputLabel">{props.name}
                        <div className="currency-symbol">₹</div>
                    </Label>
                    <input value={props.value} onChange={(e) => handleValueChange(e)} />
                    <Label>.00</Label>
                </Input>
                <Icon name='window close outline' color='red' size='large' onClick={() => props.removeInputFn(props.name)} />

            </Form.Field>
        </div >
    );

}