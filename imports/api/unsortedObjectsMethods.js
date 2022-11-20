import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { generateObject, sortAndUpdate } from '../domain/object';

Meteor.methods({
    'unsortedObject.generate'(rootKeyCount, maxDepth) {
        check(rootKeyCount, Number);
        check(maxDepth, Number);
        UnsortedObjectsCollection.insert(generateObject(rootKeyCount, maxDepth));
    },

    'unsortedObject.delete'(_id) {
        check(_id, String);
        UnsortedObjectsCollection.remove(_id);
    },

    'unsortedObject.sort'(_id) {
      check(_id, String);
      const unsortedObject = UnsortedObjectsCollection.findOne(_id);
      return sortAndUpdate(unsortedObject);
  },

  'unsortedObject.deleteAll'() {
    UnsortedObjectsCollection._dropCollection();
  },

  'unsortedObject.sortAll'() {
    const unsortedObjects = UnsortedObjectsCollection.find({});
    return unsortedObjects.mapAsync(unsortedObject => sortAndUpdate(unsortedObject));
  }
});