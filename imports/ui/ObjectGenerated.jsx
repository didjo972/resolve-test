import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { GenerateNewObject } from './GenerateNewObject';
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
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div>
      <h2>Your generated objects</h2>
      <ul>{unsortedObjects.map(
        unsortedObject => <li key={unsortedObject._id}>
            <p>{unsortedObject.keyCount} keys</p>
            <p>{unsortedObject.depth} depth</p>
            <p>{formatObjectSize(unsortedObject.size)}</p>
            <p>{unsortedObject.generationTime} ms</p>
            <DeleteObject objectGenerated={unsortedObject} />
        </li>
      )}</ul>
      <GenerateNewObject />
    </div>
  );
};
