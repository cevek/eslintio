'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/sort-keys'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}});
ruleTester.run('sort-keys', rule, {
    valid: [
        {code: 'var x = {a: 2, abc: 1}'},
        {code: 'var x = {abc: 1, ...y, a: 1}'},
        {code: 'var x = {abc: 1, ...y, z: 1, ...g, a: 1, b: 2}'},
        {code: 'var x = {abc: 1, ...y, z: 1, ...g, a: 1, b: 2}'},
        {code: 'var x = {[a]: 1, b: 2}'},
        {code: 'var x = {a: 1, ["foo"]: 1}'},
    ],

    invalid: [
        {
            code: 'var x = {abc: 1, a:2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {a:2, abc: 1}',
        },
        {
            code: 'var x = {b: 1, a: 2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {a: 2, b: 1}',
        },
        {
            code: 'var x = {a: 1, ...u, b: 1, a: 2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {a: 1, ...u, a: 2, b: 1}',
        },
        {
            code: 'var x = {abc: 1, ...y, z: 1, ...g, b: 1, a: 2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {abc: 1, ...y, z: 1, ...g, a: 2, b: 1}',
        },
        {
            code: 'var x = {[b]: 1, a: 2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {a: 2, [b]: 1}',
        },
        {
            code: 'var x = {["foo"]: 1, a: 2}',
            errors: [{message: 'Object properties is not sorted properly'}],
            output: 'var x = {a: 2, ["foo"]: 1}',
        },
    ],
});
