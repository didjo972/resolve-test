import sizeof from 'object-sizeof';

import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { SortStatsCollection } from '../db/SortStatsCollection';

export const generateObject = (rootKeyCount, maxDepth) => {
    let nbKey = 0;
    let nbDepth = 0;

    const increaseKey = () => nbKey++;
    const increaseDepth = () => nbDepth++;

    const start = new Date();
    const obj = generator(rootKeyCount, maxDepth, increaseKey, increaseDepth);
    const end = new Date();
    return { object: obj, keyCount: nbKey, depth: nbDepth, size: sizeof(obj), generationTime: end.getTime()-start.getTime()};
};

const generator = (rootKeyCount, maxDepth, increaseKey, increaseDepth, depth=1) => {
    const generatedObject = {};
    increaseDepth();
    for(let i=0; i<rootKeyCount; i++) {
        increaseKey();
        generatedObject[generateKeyRandomly()] = initializeValue(rootKeyCount, maxDepth, increaseKey, increaseDepth, depth);
    }
    return generatedObject;
}

const typeOfKey = ['number', 'string', 'object', 'boolean', 'array'];
const characters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';

const initializeValue = (parentRootKeyCount, parentMaxDepth, increaseKey, increaseDepth, depth) => {
    switch (selectTypeRandomly()) {
        case 'number':
            return generateStringOrNumber(numbers);
        case 'string':
            return generateStringOrNumber(characters);
        case 'object':
            return depth === parentMaxDepth ? {} : generator(parentRootKeyCount/2, parentMaxDepth, increaseKey, increaseDepth, depth+1);
        case 'boolean':
            return generateBoolean();
        case 'array':
            return [];
        default:
            return null;
    }
}

const selectTypeRandomly = () => typeOfKey[getRndInteger(0, typeOfKey.length)];

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min;

const generateKeyRandomly = () => generateStringOrNumber(characters);

const generateStringOrNumber = (from) => {
    let value = '';
    for (let i=0; i<getRndInteger(1, 20); i++) {
        value += from.charAt(getRndInteger(0, from.length));
    }
    return value;
}

const generateBoolean = () => getRndInteger(0, 1) === 1;

export const sortAndUpdate = (unsortedObject) => {
    const start = new Date();
    const sortedObj = sortObjectByKey(unsortedObject.object);
    const end = new Date();

    UnsortedObjectsCollection.update(
    unsortedObject._id, {
        $set: {
        object: sortedObj
        }
    });
    
    const sortStatsId = SortStatsCollection.insert({
    objectId: unsortedObject._id,
    sortDuration: end.getTime()-start.getTime()
    });

    return SortStatsCollection.findOne(sortStatsId);
}

const sortObjectByKey = (obj) => {
    return Object.keys(obj).sort().reduce((result, key) => {
        if (typeof obj[key] != "object" || !obj[key] instanceof Array) {
            result[key] = obj[key];
        } else {
            result[key] = sortObjectByKey(obj[key]);
        }
        return result;
      }, {});
}