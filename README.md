# Jest esbuild

[![npm version](https://badgen.net/npm/v/jest-esbuild)](https://www.npmjs.com/package/jest-esbuild)

A Jest esbuild transformer

## Install

```bash
npm install -D jest-esbuild
```

Set `transform` TypeScript file to `jest-esbuild` inside `jest.config.js`

```json5
{
  "transform": {
    "^.+\\.tsx?$": "jest-esbuild"
  }
}
```

Specify esbuild options

```js
const esbuildOptions = {}

module.export = {
  transform: {
    "^.+\\.tsx?$": [
      "jest-esbuild",
      esbuildOptions
    ]
  }
}
```

## License

MIT License © 2021 [hannoeru](https://github.com/hannoeru)