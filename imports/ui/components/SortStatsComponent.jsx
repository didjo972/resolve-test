import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const SortStatsComponent = ({ unsortedObject }) => {
    const [sortStats, setSortStats] = useState([]);
    useEffect(() => {
        Meteor.call(
            'sortStats.findByUnsortedObject',
            unsortedObject._id,
            (error, result) => {
              if (error) {
                alert('An error occured trying find those sort stats');
              } else {
                setSortStats(result);
              }
            });
    }, [unsortedObject]);

    return <>{
        sortStats.map(sortStat => 
        <div key={sortStat._id} style={{textAlign: 'center'}}>Sorted in {sortStat.sortDuration} ms</div>)
    }</>;
}