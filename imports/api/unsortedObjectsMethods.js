import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { generateObject } from '../domain/objectGeneration';

Meteor.methods({
    'unsortedObject.generate'(rootKeyCount, maxDepth) {
        check(rootKeyCount, Number);
        check(maxDepth, Number);
        UnsortedObjectsCollection.insert(generateObject(rootKeyCount, maxDepth));
      },

    'unsortedObject.delete'(_id) {
        check(_id, String);
        UnsortedObjectsCollection.remove(_id);
    }
});