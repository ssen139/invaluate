import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from 'semantic-ui-react';

export const MonthSelector = (props) => {

    const [invMonth, setInvMonth] = useState(new Date());

    const handleDateSelect = (date) => {
        setInvMonth(date);
        console.log("Setting Month: " + invMonth);
        props.store.dispatch({
            type: 'get_invMonth',
            invMonth: invMonth
        });
    }

    return (
        <div>
            <Icon bordered corner name='calendar alternate outline'/>
            <DatePicker className="date-picker"
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                selected={invMonth}
                onChange={(date) => handleDateSelect(date)}
            />
        </div>

    );


}