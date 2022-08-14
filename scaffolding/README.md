# Welcome to your new Shard Docs project

To get started, first ensure all packages have been installed.

```bash
yarn
```

Then you can run the docs locally.

```bash
yarn dev
```

The docs should look a little empty so let's fix that by copying this code into `docs.config.ts`.

```tsx

const AppleContent = () => <p>An apple a day keeps the doctor away</p> 

export default {
  title: "My Docs",
  data: [
    { name: "Hello world", content: <p>Ain't the world great ??</p> },
    {
      name: "Fruit",
      content: [
        { name: "Apple", content: <AppleContent /> },
        { name: "Banana", content: <p>Bananas are good for you</p> },
        { name: "Orange", content: <p>Oranges are great for you</p> },
      ]
    }
  ]
}
```

And it's just that simple. Have fun!

## Configuration

### title

The title of your docs.

### data

An array of items which control the data and structure of your app (reflected in the sidebar).

There are three distinct types of items. Each item has a 'name' and 'content' property. The type of the item is inferred by the value passed to the 'content' property.

#### page item

Page items contain the content of the page and are determined by providing JSX or custom components to `content`.

```tsx
{
  name: string,
  content: JSX | React.Component,
}
```

#### category item

Categories are for creating collapsible sections on the sidebar and are inferred by providing an array of items to `content`.

```tsx
{
  name: string,
  content: item[],
}
```

#### link item

Links are for creating easy access internal (paths) or external (urls) links to other pages. Links are inferred by providing a url to `content`.

```tsx
{
  name: string,
  content: path (for internal routing) | url (for opening in a new tab),
}
```

## Scripts

Run the docs locally:

```bash
$ yarn dev
```

Generate static docs for deployment:

```bash
$ yarn build
```

preview the generated static docs locally:

```bash
$ yarn preview
```

## License
MIT