import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';

export const AlertObjectSize = ({ amountKeysAtRoot, amountNestedObject }) => {
    const [showAlertSize, setShowAlertSize] = useState(false);

    useEffect(() => {
        console.log(showAlertSize);
        console.log(amountKeysAtRoot + amountNestedObject);
        if (amountKeysAtRoot + amountNestedObject >= 250) {
            setShowAlertSize(true);
        } else {
            setShowAlertSize(false);
        }
    }, [amountKeysAtRoot, amountNestedObject, setShowAlertSize]);

  return  showAlertSize ? <label style={{ color: 'red' }}>Be carefull, your object will have a big size !</label> : null;
};
