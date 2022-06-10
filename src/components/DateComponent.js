import React from 'react';

const DateComponent = ({datePurchase}) => {

    const date = new Date(datePurchase);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'};
    const dateString = date.toLocaleDateString('en-US', options);

    return (
        <p>{dateString}</p>
    );
};

export default DateComponent;