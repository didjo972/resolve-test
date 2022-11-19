import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { DeleteObject } from './components/DeleteObject';

export const ObjectGenerated = () => {
  const unsortedObjects = useTracker(() => {
    return UnsortedObjectsCollection.find().fetch();
  });

  const formatObjectSize = (bytes, decimals=5) => {
    console.log(bytes);
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div>
      <h2>Your generated objects</h2>
      <ul>{unsortedObjects.map(
        unsortedObject => <li key={unsortedObject._id}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
            <div style={{gridColumn: '1/1'}}>{unsortedObject.keyCount} keys</div>
            <div style={{gridColumn: '2/2'}}>{unsortedObject.depth} depth</div>
            <div style={{gridColumn: '3/3'}}>{formatObjectSize(unsortedObject.size)}</div>
            <div style={{gridColumn: '4/4'}}>{unsortedObject.generationTime} ms</div>
            <div style={{gridColumn: '5/5'}}><DeleteObject objectGenerated={unsortedObject} /></div>
            </div>
        </li>
      )}</ul>
    </div>
  );
};
