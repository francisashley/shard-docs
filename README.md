<div align="center">

# Shard Docs

A doc manager written in React for organising and viewing MDX files.

[![version][version-badge]][package] [![MIT License][license-badge]][license]

[**Read The Docs**](https://skystash.github.io/shard-docs/#/docs)
</div>

<hr/>

<image src="/example.jpg" alt="screenshot" style="box-shadow: 0 0 8px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.3);border-radius: 8px;">

## Table of Contents

- [Requirements](#install)
- [Install](#install)
- [Basic usage](#basic-usage)
- [API](#api)
- [Content schema](#content-schema)
- [Write docs with MDX](#write-docs-with-mdx)
- [License](#license)

## Requirements
This package relies internally on [react router](https://reacttraining.com/react-router/web/guides/quick-start) for routing.

## Install
```
npm install @fa-repo/shard-docs react-router-dom
```


## Basic usage

```jsx
// documentation.js
import React from "react";
import { render } from "react-dom";
import ShardDocs from "@fa-repo/shard-docs";
import "@fa-repo/shard-docs/dist/index.css";

const content = [
  { type: "document", name: "Install", document: <><h1>Install</h1></> },
  { type: "document", name: "Basic usage", document: <><h1>Basic usage</h1></> },
  {
    type: "category",
    name: "Examples",
    items: [
      { type: "document", name: "Use case A", document: <><h1>Use case A</h1></> },
      { type: "document", name: "Use case B", document: <><h1>Use case B</h1></> }
    ]
  },
  { type: "link", name: "Github", url: "https://github.com", external: true },
]

render(
  <ShardDocs title="ShardDocs demo" content={content} />,
  document.getElementById("root")
);
```

## API
```jsx
<ShardDocs
  /**
   * Assign docs a title. Title appears at the top of the sidebar.
   * @string
   * @default ""
  */
  title="Documentation title"
  /**
   * Add a prefix to all routes. E.g. "/docs/".
   * @optional
   * @string
   * @default "/"
  */
  basePath="/docs/"
  /**
   * Hide "Built with Shard Docs" at the bottom of the sidebar.
   * @optional
   * @boolean
   * @default false
  */
  hideBuiltWithShardDocs={true}
  /**
   * Data is fed in through the content prop. Scroll down for an explanation of the schema.
   * @string "hash"|"browser"
   * @default "hash"
  */
  routerType="hash"
  /**
   * Use react routers BrowserRouter instead of HashRouter (default) for routing..
   * @boolean
   * @default false
  */
  content={[
    {
      type: "category",
      name: "Essentials",
      items: [
        { type: "document", name: "Get started", document: <p>Lorem ipsum dolor sit amet..</p> }
      ]
    }
  ]}
/>
```

## Content schema
Data is composed in a way that describes the relationship of items to each other - like a tree structure. The structure of the data influences the paths generated for document and category routes as well as how the sidebar menu is rendered.

Each item has a common `name` property. The combination of subsequent properties define their types.

### The different types of items:

`document`:  Represents a document endpoint.
```jsx
  {
    /**
     * Document type.
     * @required
     * @string
    */
    type: "document",
    /**
     * Document name
     * @string
    */
    name: "Install",
    /**
     * Document content
     * @jsx
    */
    document: <h1>Install</h1>
  }
```

`category`: Contains any array with any number of items.
```jsx
  {
    /**
     * Category type.
     * @required
     * @string
    */
    type: "category",
    /**
     * Category name.
     * @optional
     * @string
    */
    name: "Install",
    /**
     * Category items. Can contain any type of node.
     * @array
    */
    items: [ /* items */ ]
  }
```

`link`: A link.
```jsx
  {
    /**
     * Link type.
     * @required
     * @string
    */
    type: "link",
    /**
     * Link name.
     * @string
    */
    name: "Github",
    /**
     * Link url.
     * @string
    */
    url: "http://www.github.com",
    /**
     * External links will open in a new tab.
     * @string
    */
   external: true,
  }
```


## Write docs with MDX
Documents are composed from JSX which offers a lot of power but the syntax can get unwieldy. MDX makes writing docs a breaze by combining the syntaxes of JSX and markdown. [MDXJS](https://github.com/mdx-js/mdx) is wholly recomended for handling MDX. Cursory installation instructions below.

### Example MDX script
```mdx
// doc.mdx
import "SomeComponent" from "./SomeComponent";

# Title

Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

<SomeComponent>
```

### MDJSX Prerequisite
- babel
- webpack ([or other module bundlers](https://mdxjs.com/getting-started))

### Install MDJSX
```bash
npm install --save-dev @mdx-js/loader @babel/preset-env @babel/preset-react babel-loader
```

### Configure MDJSX

```js
//webpack.config.js
module.exports = {
  module: {
    // ...
    rules: [
      // ...
      {
        test: /\.mdx?$/,
        use: [
          'babel-loader',
          '@mdx-js/loader'
        ]
      }
    ]
  }
}
```

```jsx
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};

```

## TODO

- Add github corner feature
- Add search feature
- Add ability to set max height of CodeExampleShard example container.
- Add ability to set IframeShard height.
- Extend the composition key to support objects as well as arrays.

## License
[MIT](https://choosealicense.com/licenses/mit/)

[version-badge]: https://img.shields.io/npm/v/@fa-repo/shard-docs.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@testing-library/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@fa-repo/shard-docs
[license]: https://github.com/fa-repo/shard-docs/blob/master/LICENSE.md
