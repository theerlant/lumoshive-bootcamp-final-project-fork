module.exports = {
  plugin: ["import"],
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/public",
            from: "./src/admin",
            message:
              "Strict Boundary: Public components cannot import from the Admin directory.",
          },
          {
            target: "./src/admin",
            from: "./src/public",
            message:
              "Strict Boundary: Admin components cannot import from the Public directory.",
          },
        ],
      },
    ],
  },
};
