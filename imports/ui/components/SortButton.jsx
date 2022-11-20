import React, { useState } from 'react';

export const SortButton = ({ objectGenerated, title }) => {
  const [isSorting, setIsSorting] = useState(false);
  const onClick = () => {
    setIsSorting(true);
    if (objectGenerated) {
      Meteor.call(
        'unsortedObject.sort', 
        objectGenerated._id,  
        (error, result) => {
          if (error) {
            alert('An error occured trying sort this object');
          } else {
            alert(`It tooks ${result.sortDuration} ms to sort this object !`);
          }
          setIsSorting(false);
        });
    } else {
      Meteor.call(
        'unsortedObject.sortAll',
        (error, result) => {
          if (error) {
            alert('An error occured trying sort those objects');
          } else {
            alert(`It tooks ${result
                .map(res => res.sortDuration)
                .reduce(
                  (duration, sortDuration) => duration + sortDuration
                )} ms to sort those objects !`);
          }
          setIsSorting(false);
        });
    }
  }
  return (
    <button disabled={isSorting} onClick={onClick}>{title}</button>
  );
}