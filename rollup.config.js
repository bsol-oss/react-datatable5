import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

import alias from '@rollup/plugin-alias';
import path from 'path';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = path.resolve(__dirname);
export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "./dist/index.js",
        format: "cjs",
      },
      {
        file: "./dist/index.mjs",
        format: "es",
      },
    ],
    plugins: [
      typescript({ exclude: "./src/stories/**/*" }),
      alias({
        entries: [
          {
            find: "@atlaskit/pragmatic-drag-and-drop",
            replacement: path.resolve(
              root,
              "./node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/entry-point"
            ),
          },
        ],
      }),
    ],
  },
  {
    input: "./dist/types/index.d.ts",
    output: [
      {
        file: "./dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
