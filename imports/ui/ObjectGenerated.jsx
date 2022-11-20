import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { DeleteButton } from './components/DeleteButton';
import { SortButton } from './components/SortButton';
import { SortStatsComponent } from './components/SortStatsComponent';

export const ObjectGenerated = () => {
  const unsortedObjects = useTracker(() => {
    return UnsortedObjectsCollection.find().fetch();
  });

  const formatObjectSize = (bytes, decimals=5) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
      <h2 style={{gridColumn: '1/4'}}>Your generated objects</h2>
      <div style={{gridColumn: '5/5'}}><SortButton title='Sort all' /></div>
      <div style={{gridColumn: '6/6'}}><DeleteButton title='Delete all' /></div>
      {unsortedObjects.map(unsortedObject => 
        <>
          <div style={{gridColumn: '1/1'}}>{unsortedObject.keyCount} keys</div>
          <div style={{gridColumn: '2/2'}}>{unsortedObject.depth} depth</div>
          <div style={{gridColumn: '3/3'}}>{formatObjectSize(unsortedObject.size)}</div>
          <div style={{gridColumn: '4/4'}}>{unsortedObject.generationTime} ms</div>
          <div style={{gridColumn: '5/5'}}><SortButton objectGenerated={unsortedObject} title='Sort' /></div>
          <div style={{gridColumn: '6/6'}}><DeleteButton objectGenerated={unsortedObject} title='Delete' /></div>
          <div style={{gridColumn: '1/6'}}>
            <SortStatsComponent unsortedObject={unsortedObject} />
          </div>
        </>
      )}
    </div>
  );
};
