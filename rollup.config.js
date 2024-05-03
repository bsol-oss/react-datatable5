import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [typescript()],
};
