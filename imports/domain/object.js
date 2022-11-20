import sizeof from 'object-sizeof';

import { UnsortedObjectsCollection } from '../db/UnsortedObjectsCollection';
import { SortStatsCollection } from '../db/SortStatsCollection';

export const generator = (rootKeyCount, maxDepth) => {
    let nbTotalKey = 0;
    let nbTotalDepth = 0;

    const increaseTotalKey = () => {nbTotalKey++};
    const setNbTotalDepth = (newTotalDepth) => {nbTotalDepth = newTotalDepth > nbTotalDepth ? newTotalDepth : nbTotalDepth};

    const start = new Date();
    const obj = generateObject(rootKeyCount, maxDepth, increaseTotalKey, setNbTotalDepth, undefined);
    const end = new Date();
    return { object: obj, keyCount: nbTotalKey, depth: nbTotalDepth, size: sizeof(obj), generationTime: end.getTime()-start.getTime()};
};

const generateObject = (rootKeyCount, maxDepth, increaseTotalKey, setNbTotalDepth, nbNestedObj) => {
    const generatedObject = {};
    for(let i=0; i<rootKeyCount; i++) {
        let nbNested = nbNestedObj ? nbNestedObj : 0;
        const increaseNbNested = () => {
            nbNested++;
            return nbNested; 
        };
        increaseTotalKey();
        generatedObject[generateKeyRandomly()] = initializeValue(rootKeyCount, maxDepth, increaseTotalKey, increaseNbNested, setNbTotalDepth, nbNested);
        setNbTotalDepth(nbNested);
    }
    return generatedObject;
}

const typeOfKey = ['number', 'string', 'object', 'boolean', 'array'];
const characters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';

const initializeValue = (parentRootKeyCount, maxDepth, increaseTotalKey, increaseNbNestedObj, setNbTotalDepth, nbNested) => {
    switch (selectTypeRandomly()) {
        case 'number':
            return generateStringOrNumber(numbers);
        case 'string':
            return generateStringOrNumber(characters);
        case 'object':
            if (nbNested >= maxDepth) {
                return {};
            }
            return generateObject(parentRootKeyCount/2, maxDepth, increaseTotalKey, setNbTotalDepth, increaseNbNestedObj());        
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