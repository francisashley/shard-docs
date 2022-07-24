const mix = require("laravel-mix");

mix
  .react("./index.js", "dist/index.js")
  .copy("node_modules/@fa-repo/shard-docs/dist/index.css", "dist/css/index.css")
  .copy("node_modules/@fa-repo/shard-docs/dist/shards/CodeSampleShard.css", "dist/css/CodeSampleShard.css")
  .copy("node_modules/@fa-repo/shard-docs/dist/shards/SectionShard.css", "dist/css/SectionShard.css")
  .copy("static", "dist")
  .webpackConfig({
    module: {
      rules: [
        { test: /\.md$/, use: "raw-loader" },
        { test: /\.mdx?$/, use: ["babel-loader", "@mdx-js/loader"] }
      ]
    }
  })
  .sourceMaps();
