module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
};
