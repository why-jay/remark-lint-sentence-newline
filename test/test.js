var assert = require('assert');
var fs = require('fs');
var remark = require('remark');
var lintPlugin = require('remark-lint');
var path = require('path');

var directories = fs.readdirSync(__dirname).filter(function(file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

describe('The rule passes', function () {

  directories.forEach(function (dir) {

    it(dir, function (done) {

      var processor = remark().use(lintPlugin, {
        external: ['../index.js']
      });

      processor.process(
        fs.readFileSync(path.join(__dirname, dir, 'file.md')).toString(),
        function (err, file) {
          if (err) {
            throw err;
          }
          assert.deepEqual(
            file.messages,
            require(path.join(__dirname, dir, 'expected.js'))
          );
          done();
        }
      );

    });

  })

});
