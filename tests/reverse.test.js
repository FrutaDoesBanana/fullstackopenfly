const {test} = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testings').reverse

test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})

test('reverse of palindrom'), () =>{
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
}