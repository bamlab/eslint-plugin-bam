# eslint-plugin-bam

[BAM](https://www.bam.tech/)'s Eslint plugin, inspired from our learning on [React](https://reactjs.org/) and [React-Native](https://facebook.github.io/react-native/) projects.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add eslint --dev
```

Next, install `eslint-plugin-bam`:

```
$ yarn add eslint-plugin-bam --dev
```

**Note:** If you installed ESLint globally (using `global`) then you must also install `eslint-plugin-bam` globally.

## Usage

Add `bam` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["bam"]
}
```

Then either

- configure the rules you want to use under the rules section:

```json
{
  "rules": {
    "bam/no-react-unbound": "error",
    "bam/no-react-uncast-to-boolean": "error",
    "bam/react-only-native-animation": "error",
    "bam/no-new-date": "error"
  }
}
```

- or use the the recommended rule set:
```json
{
  "extends": ["plugin:bam/recommended"],
}
```

## Supported Rules

- `no-react-unbound`
- `no-react-uncast-to-boolean`
- `react-only-native-animation`
- `no-new-date`
