var visit = require('unist-util-visit');

function sentenceNewline(ast, file, preferred, done) {
  visit(ast, 'text', function (node) {
    var dotIdx = node.value.indexOf('.');

    if (dotIdx === -1) {
      done();
      return;
    }

    if (dotIdx >= node.value.length - 1) {
      done();
      return;
    }

    if (node.value.charAt(dotIdx + 1) === '\n') {
      done();
      return;
    }

    file.warn(
      'Newline should follow end of sentence',
      file.offsetToPosition(file.positionToOffset(node.position.start) + dotIdx)
    );

    done();
  });
}

module.exports = {
  'sentence-newline': sentenceNewline
};
