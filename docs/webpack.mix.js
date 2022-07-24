const mix = require("laravel-mix");

mix
  .react("./index.js", "public/index.js")
  .copy("node_modules/@fa-repo/shard-docs/dist/index.css", "public/css/index.css")
  .copy(
    "node_modules/@fa-repo/shard-docs/dist/shards/CodeSampleShard.css",
    "public/css/CodeSampleShard.css"
  )
  .copy("node_modules/@fa-repo/shard-docs/dist/shards/SectionShard.css", "public/css/SectionShard.css")
  .webpackConfig({
    module: {
      rules: [
        { test: /\.md$/, use: "raw-loader" },
        { test: /\.mdx?$/, use: ["babel-loader", "@mdx-js/loader"] }
      ]
    }
  })
  .sourceMaps();
