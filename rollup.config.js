import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import json from "rollup-plugin-json";

export default [
  transpile("src/index.js", "dist", "shard-docs"),
  transpile("src/components/shards/CodeSampleShard", "dist/shards", "CodeSampleShard"),
  transpile("src/components/shards/SectionShard", "dist/shards", "Section"),
  transpile("src/components/renderers/CodeBlockRenderer", "dist/renderers", "CodeBlockRenderer")
];

function transpile(input, outputPath, outputFileName) {
  return {
    input,
    output: [
      {
        file: outputPath + "/" + outputFileName + ".js",
        format: "cjs",
        sourcemap: true,
        exports: "named"
      },
      {
        file: outputPath + "/" + outputFileName + ".es.js",
        format: "es",
        sourcemap: true,
        exports: "named"
      }
    ],
    plugins: [
      external(),
      postcss({ extract: true }),
      url({ exclude: ["**/*.svg"] }),
      svgr(),
      babel({ exclude: "node_modules/**" }),
      resolve(),
      commonjs(),
      json()
    ]
  };
}
