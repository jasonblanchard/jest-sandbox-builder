const webpack = require('webpack');

function SandboxWebpackPlugin(options) {
  // Setup the plugin instance with options...
}

SandboxWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(compiler) {
    console.log('Replaced Jest globals with sandbox functions');
  });

  compiler.options.plugins.push(new webpack.ProvidePlugin({
    describe: ['jestbox-builder', 'describe'],
    it: ['jestbox-builder', 'it'],
    expect: ['jestbox-builder', 'expect'],
    jest: ['jestbox-builder', 'jest'],
    beforeEach: ['jestbox-builder', 'beforeEach']
  }));
};

module.exports = SandboxWebpackPlugin;
