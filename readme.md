# Octaive Babel Presets

## Installation

    yarn add @octaive/preset-babel

### Usage

Add the following preset to babel presets

    module:@octaive/preset-babel

The following options are available

 - `typescript = false` - include @babel/preset-typescript
 - `frontend = false` - include various react related frontend plugins
 - `fastRefresh = false` - include react fast refresh
 - `cacheUsing = () => process.env.NODE_ENV` - configure cache function

## babel.config.js example

```
module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        'module:@octaive/preset-babel',
        {
          fastRefresh: true,
          frontend: true,
        },
      ],
    ],
  };
};
```
