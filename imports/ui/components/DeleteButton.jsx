import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const DeleteButton = ({ objectGenerated, title }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const onClick = () => {
    setIsDeleting(true);
    if (objectGenerated) {
      Meteor.call(
        'unsortedObject.delete', 
        objectGenerated._id, 
        (error, result) => {
          if (error) {
            alert('An error occured trying delete this object');
          } else {
            alert('Delete successfull !');
          }
          setIsDeleting(false);
        }
      );
    } else {
      Meteor.call(
        'unsortedObject.deleteAll',
        (error, result) => {
          if (error) {
            alert('An error occured trying delete all objects');
          } else {
            alert('Delete successfull !');
          }
          setIsDeleting(false);
        }
      );
    }
    
  }

  return (
    <button disabled={isDeleting} onClick={onClick} style={{ color: 'red' }}>{title}</button>
  );
};
