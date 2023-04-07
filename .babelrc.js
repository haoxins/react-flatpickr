const presets = [["@babel/preset-env"], "@babel/preset-react"];

const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ],
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-throw-expressions",
  "@babel/plugin-proposal-export-default-from",
  [
    "@babel/plugin-proposal-pipeline-operator",
    {
      proposal: "minimal",
    },
  ],
  "@babel/plugin-proposal-do-expressions",
  "@babel/plugin-proposal-function-bind",
];

module.exports = { presets, plugins };
