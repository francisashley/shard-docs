<div align="center">

# Shard Docs

An engine for composing beautiful, interactive documentation.

[![version][version-badge]][package] [![MIT License][license-badge]][license]

[**Read The Docs**](https://skystash.github.io/shard-docs/#/docs)
</div>

<hr/>

<image src="example.png" alt="screenshot" style="box-shadow: 0 0 8px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.3);border-radius: 8px;">

## Install and setup

Currently there is some configuration involved in getting shard-docs working on a fresh build. I do hope to automate this process in the future with a CLI script.

**For now let's walk through the steps.**

1) Create a fresh new react project under a `/docs` folder.

```bash
npx create-react-app docs
```

2) Install the dependencies.

```bash
yarn add @fa-repo/shard-docs react-router-dom @mdx-js/loader @mdx-js/react --dev
```

3) (optional) Configure MDXJS as a loader to enable support for MDX.
https://www.npmjs.com/package/@mdx-js/loader

4) Update index.js to look like the `basic usage` example.


## Basic usage

```jsx index.ts
import React from "react";
import ReactDOM from "react-dom";
import ShardDocs from "@fa-repo/shard-docs";
import BasicUsageContent from "./content/basic-usage.mdx";
import "@fa-repo/shard-docs/dist/index.css";

const data = [
  // Compose pages from JSX
  { name: "Get started", content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p> },

  // Compose pages from MDX after configuring @mdx-js/react loader.
  { name: "Basic usage", content: <BasicUsageContent /> },

  // Organise pages into collapsible sections on the sidebar. These are infinitely nestable.
  {
    name: "Examples",
    content: [
      { name: "Use case A", content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p> },
      { name: "Use case B", content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p> }
    ]
  },

  // Display links on the sidebar. Relative paths will use internal routing, absolute paths will open in new tab.
  { name: "Github", content: "https://www.github.com" },
];

ReactDOM.render(<ShardDocs title="ShardDocs demo" data={data} />, document.getElementById("root"));
```

## ShardDocs API
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
   * Use react routers BrowserRouter instead of HashRouter (default) for routing..
   * @string "hash"|"browser"
   * @default "hash"
  */
  routerType="browser"
  /**
   * Data is fed in through the content prop. Scroll down for an explanation of the schema.
   * @boolean
   * @default false
  */
  data={[
    {
      name: "Essentials",
      content: [
        { name: "Get started", content: <p>Lorem ipsum dolor sit amet..</p> }
      ]
    }
  ]}
/>
```

## Data schema 

Data passed to ShardDocs is composed of three types of items. Pages, Categories and Links. To
keep the schema as simple as possible, each item shares the same fields and the type is implicitly
determined by the data provided.

**The anatomy of an item**

Each item shares a `name` field and the type of data provided to `content` will determine how the item is treated.

```typescript
type item = {
  name: string;
  content: react.ReactNode | item[] | string;
}
```

**Pages** are created by providing `JSX`. The world's your oyster in what you choose to display here.

```typescript
type page = {
  name: string;
  content: React.ReactNode;
}
```

**Categories** are created by providing an array of items. These are used for grouping items in the sidebar and are infinitely nestable.

```typescript
type category = {
  name: string;
  content: item[];
}
```

**Links** are created by providing a url string. Relative urls will use the internal router, absolute urls will open in a new tab.

```typescript
type link = {
  name: string;
  content: string;
}
```

## Bundled shards

Shard docs comes with a few pre-built shards (components you can drop in on the page).

### &lt;CodeSample />

This shard displays a component in a preview box, with access to the source code and a link to github.

```jsx
import { CodeSampleShard } from "@fa-repo/shard-docs";
import "@fa-repo/shard-docs/dist/shards/CodeSampleShard.css";

...

<CodeSampleShard>
<h1>Hello world</h1>
</CodeSampleShard>
```

#### Props
| Name        | Type    | Default | Required  | Description                                         |
|-------------|---------|---------|-----------|-----------------------------------------------------|
| github      | string  | `""`    |           | Link to Github.                                     |
| lang        | string  | `jsx`   |           | Supported languages: `markup`, `bash`, `clike`, `c`, `cpp`, `css`, `css-extras`, `javascript`, `jsx`, `js-extras`, `coffeescript`, `diff`, `git`, `go`, `graphql`, `handlebars`, `json`, `less`, `makefile`, `markdown`, `objectivec`, `ocaml`, `python`, `reason`, `sass`, `scss`, `sql`, `stylus`, `tsx`, `typescript`, `wasm`, `yaml`. |`}
| useIframe   | boolean | `false` |           | Load the code sample in an iframe.                  |
| iframeHead  | string  | `""`    |           | Add things to the iframe `<head />`.                |
| iframeStyle | object  | `{}`    |           | Set the iframes inline style.                       |


### &lt;Section />

This shard displays content in a collapsible area.

```jsx
import { SectionShard } from "@fa-repo/shard-docs";
import "@fa-repo/shard-docs/dist/shards/SectionShard.css";

...

<SectionShard title="Heading">
  Lorem ipsum...
</SectionShard>
```
#### Props

| Name       | Type    | Default  | Required  | Description           |
|------------|---------|----------|-----------|-----------------------|
| `title`  | string  | `""`   | required  | Title of the section. |
| `persistState`  | string  | `""`   | sometimes  | Provide a custom id to persist collapsed state on page refresh. |

## TODO

- [ ] Add github corner feature
- [ ] Add search feature
- [ ] Update to React 18.x
- [ ] Add native support for MDX
- [ ] Add CLI scripts to bootstrap the project, build and serve locally
- [ ] Fully optimise package size
- [ ] Simplify the entry point by exposing a config file instead of having to manually setup a react project each time. Something like:

```tsx
// src/entry.ts

import BasicUsageContent from "./content/basic-usage.mdx";

export default {
  title: "Docs",
  basePath: "/docs/",
  data: [
    { name: "Get started", content: <p>Lorem ipsum dolor sit amet..</p> },
    { name: "Basic usage", content: BasicUsageContent },
  ]
};
``` 

## License
MIT

[version-badge]: https://img.shields.io/npm/v/@fa-repo/shard-docs.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@testing-library/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@fa-repo/shard-docs
[license]: https://github.com/fa-repo/shard-docs/blob/master/LICENSE.md
