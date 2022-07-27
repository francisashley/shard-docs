const { js } = require("laravel-mix");
const mix = require("laravel-mix");

mix
  .js("./index.js", "dist/index.js")
  .react()
  .copy("node_modules/@fa-repo/shard-docs/dist/index.css", "dist/css/shard-docs.css")
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
