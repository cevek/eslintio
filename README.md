# eslint-plugin-eslintio

Opinionated eslint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-eslintio`:

```
$ npm install eslint-plugin-eslintio --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-eslintio` globally.

## Usage

Add `eslintio` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslintio"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslintio/sort-keys": "error"
    }
}
```

## Supported Rules

* `sort-keys` - require object keys to be sorted by key length and then sorted alphabetically





