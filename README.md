<div align="center">

# Shard Docs

An engine for composing beautiful, interactive documentation.

[![version][version-badge]][package] [![MIT License][license-badge]][license]

[**Read The Docs**](https://skystash.github.io/shard-docs/#/docs)
</div>

<hr/>

<image src="example.png" alt="screenshot" style="box-shadow: 0 0 8px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.3);border-radius: 8px;">

## Installation

```bash
yarn create @fa-repo/shard-docs docs-name
```

## Commands

Run locally

```bash
yarn dev
```

Build to serve
  
```bash
yarn build
```

## Basic usage

The `docs.config.ts` file is the entry point and where shard-docs is configured.

```tsx
import MarkdownHelloWorldContent from './content/hello-world.mdx'
import ReactHelloWorldContent from './components/helloworld.tsx'

export default {
  title: "My Docs",
  data: [
    { name: "Hello world", content: <p>Anything can go in here!</p> },
    {
      name: "Fruit",
      content: [
        { name: "Markdown", content: MarkdownHelloWorldContent },
        { name: "React", content: ReactHelloWorldContent },
        { name: "Inline", content: <p>I am inline JSX</p>  },
      ]
    }
  ]
}
```

## API

```tsx
export default {
  /**
   * The title of the docs.
   * @optional
   * @string
   */
  title: "My Docs",

  /**
   * Add a prefix to all routes. E.g. "/docs/".
   * @optional
   * @string
   * @default "/"
  */
  basePath: "/docs/",

  /**
   * Hide "Built with Shard Docs" at the bottom of the sidebar.
   * @optional
   * @boolean
   * @default false
  */
  hideBuiltWithShardDocs: true,

  /**
   * Use react routers BrowserRouter instead of HashRouter (default) for routing..
   * @string "hash"|"browser"
   * @default "hash"
  */
  routerType: "browser",
 
  /**
   * The schema of the data is explained further down.
   * @array
   */
  data: data,
}
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
- [ ] Fully optimise package size

## License
MIT

[version-badge]: https://img.shields.io/npm/v/@fa-repo/shard-docs.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@testing-library/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@fa-repo/shard-docs
[license]: https://github.com/fa-repo/shard-docs/blob/master/LICENSE.md
