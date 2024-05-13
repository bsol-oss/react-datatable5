import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
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
    plugins: [typescript({ exclude: "./src/stories/**/*" })],
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
