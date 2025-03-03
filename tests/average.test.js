const {test, describe} = require('node:test')
const assert = require('node:assert')

const average = require ('../utils/for_testings').average

describe('average', () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('many values is right calculate', () => {
        assert.strictEqual(average([1,2,3,4,5,6]), 3.5)
    })

    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
})