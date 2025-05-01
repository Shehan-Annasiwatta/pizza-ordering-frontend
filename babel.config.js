module.exports = {
  presets: [
    // Compile modern JS for the current Node (Jest) environment
    ["@babel/preset-env", { targets: { node: "current" } }],
    // Support React JSX with the new automatic runtime
    ["@babel/preset-react", { runtime: "automatic" }],
    // Support TypeScript
    "@babel/preset-typescript",
  ],
};
