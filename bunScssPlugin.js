// import { plugin } from "bun";

// plugin({
//   name: "SASS",

//   setup(builder) {
//     const { load } = require("sass-loader");
//     const { readFileSync } = require("fs");
//     // Run this function on any import that ends with .yaml or .yml
//     builder.onLoad({ filter: /\.(yaml|yml)$/ }, (args) => {
//       // Read the YAML file from disk
//       const text = readFileSync(args.path, "utf8");

//       // parse the YAML file with js-yaml
//       const exports = load(text);

//       return {
//         // Copy the keys and values from the parsed YAML file into the ESM module namespace object
//         exports,

//         // we're returning an object
//         loader: "object",
//       };
//     });
//   },
// });
