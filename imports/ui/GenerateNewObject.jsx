import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

import { AlertObjectSize } from './components/AlertObjectSize';

export const GenerateNewObject = () => {

  const [amountKeysAtRoot, setAmountKeysAtRoot] = useState(0);
  const [amountNestedObject, setAmountNestedObject] = useState(0);
    
  const handleSubmit = e => {
    e.preventDefault();

    if (amountKeysAtRoot <= 0) return;
    
    Meteor.call('unsortedObject.generate', +amountKeysAtRoot, +amountNestedObject);

    setAmountKeysAtRoot(0);
    setAmountNestedObject(0);
  };

  return (
    <div style={{ position: 'fixed', left: '50%' }}>
      <h2>Create new object</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount of keys at the root"
          value={amountKeysAtRoot}
          onChange={(e) => setAmountKeysAtRoot(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount of nested object"
          value={amountNestedObject}
          onChange={(e) => setAmountNestedObject(e.target.value)}
        />
        <p><AlertObjectSize amountKeysAtRoot={+amountKeysAtRoot} amountNestedObject={+amountNestedObject} /></p>

        <button type="submit">Generate object</button>
      </form>
    </div>
  );
};
