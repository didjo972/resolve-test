import { assert } from 'chai';
import { generator } from '../domain/object';

describe('UnsortedObjects', () => {
    it('can generate object with max root key', () => {
        const maxRootKey = 10;
        const maxDepth = 2;
        const unsortedObject = generator(maxRootKey, maxDepth);
        
        assert.equal(Object.keys(unsortedObject.object).length, maxRootKey);
        
    });

    it('can generate object with max depth', () => {
        const countDepth = (obj) => {
            let rootKey = 0;
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                if (typeof obj[key] === "object" && Object.keys(obj[key]).length > 0) {
                    const depth = countDepth(obj[key]) + 1;
                    rootKey = Math.max(depth, rootKey);
                }
            }
            return rootKey;
        }

        const maxRootKey = 20;
        const maxDepth = 3;
        const unsortedObject = generator(maxRootKey, maxDepth);

        assert.equal(countDepth(unsortedObject.object), maxDepth);
    });
});