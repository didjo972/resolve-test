import { Meteor } from 'meteor/meteor';
import React from 'react';

export const DeleteObject = ({ objectGenerated }) => {
  const deleteObject = () => {
    Meteor.call('unsortedObject.delete', objectGenerated._id);
  }

  return (
    <button onClick={deleteObject} style={{ color: 'red' }}>Delete</button>
  );
};
