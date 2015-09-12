var fs = require('fs');
var mdast = require('mdast');
var lintPlugin = require('mdast-lint');
var path = require('path');

var directories = fs.readdirSync(__dirname).filter(function(file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

describe('The rule passes', function () {

  directories.forEach(function (dir) {

    it(dir, function (done) {

      var processor = mdast().use(lintPlugin, {
        external: ['../index.js']
      });

      processor.process(
        fs.readFileSync(path.join(__dirname, dir, 'file.md')).toString(),
        function (err, res, file) {
          if (err) {
            throw err;
          }
          // TODO: I keep getting `undefined, "string"` here?
          console.log(file.messages, typeof file);
          done();
        }
      );

    });

  })

});
