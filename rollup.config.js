export default {
  input: "./index.js",

  output: [
    {
      file: "dist/es/v-throttle/index.js",
      format: "esm",
    },
    {
      file: "dist/v-throttle/index.js",
      format: "umd",
      name: "vThrottle",
    },
  ],

  watch: {
    exclude: "node_modules/**",
    include: "lib/**",
  },
};
