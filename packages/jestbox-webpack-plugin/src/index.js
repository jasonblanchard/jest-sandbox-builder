import webpack from 'webpack';

class SandboxWebpackPlugin {
  constructor(options) {
    // Setup the plugin instance with options...
  }

  apply(compiler) {
    compiler.plugin('done', function(compiler) {
      console.log('Replaced Jest globals with jestbox functions');
    });

    compiler.options.plugins.push(new webpack.ProvidePlugin({
      describe: ['jestbox-builder', 'describe'],
      it: ['jestbox-builder', 'it'],
    }));
  }
}

module.exports = SandboxWebpackPlugin;
