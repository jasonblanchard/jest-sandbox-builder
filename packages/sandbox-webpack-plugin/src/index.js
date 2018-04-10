const webpack = require('webpack');

function SandboxWebpackPlugin(options) {
  // Setup the plugin instance with options...
}

SandboxWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(compiler) {
    console.log('Replaced Jest globals with sandbox functions');
  });
  
  compiler.options.plugins.push(new webpack.ProvidePlugin({
    describe: ['jest-sandbox-builder', 'describe'],
    it: ['jest-sandbox-builder', 'it'],
    expect: ['jest-sandbox-builder', 'expect'],
    jest: ['jest-sandbox-builder', 'jest'],
    beforeEach: ['jest-sandbox-builder', 'beforeEach']
  }));
};

module.exports = SandboxWebpackPlugin;