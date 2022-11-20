import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SortStatsCollection } from '../db/SortStatsCollection';

Meteor.methods({
  async 'sortStats.findByUnsortedObject'(unsortedObjectId) {
    check(unsortedObjectId, String);

    try {
        const result = await SortStatsCollection
            .find({ objectId: unsortedObjectId })
            .mapAsync(sortStat => sortStat);
        return result;
    } catch (err) {
        return console.log(err);
    }
  }
});