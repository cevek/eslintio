# sort object keys (sort-keys)

Has a fixer

## Rule Details


Examples of **incorrect** code for this rule:

```js
{abc: 1, a: 2}
{b: 1, a: 2}
```

Examples of **correct** code for this rule:

```js
{a: 2, b: 2, foo: 1}
{abc: 1, ...obj, a: 2}
{a: 2, bar: 1, ['foo-bar']: 1}
{a: 2, [b]: 2}
```
