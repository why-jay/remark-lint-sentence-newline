var visit = require('unist-util-visit');

function sentenceNewline(ast, file, preferred, done) {
  visit(ast, 'text', function (node) {
    var lastDotFoundIdx = -1;

    while (lastDotFoundIdx < node.value.length) {

      var dotIdx = node.value.indexOf('.', lastDotFoundIdx + 1);

      if (dotIdx === -1) {
        break;
      }

      if (dotIdx >= node.value.length - 1) {
        lastDotFoundIdx = dotIdx;
        continue;
      }

      if (node.value.charAt(dotIdx + 1) === '\n') {
        lastDotFoundIdx = dotIdx;
        continue;
      }

      lastDotFoundIdx = dotIdx;
      file.warn(
        'Newline should follow end of sentence',
        file.offsetToPosition(file.positionToOffset(node.position.start) + dotIdx)
      );

    }

  });

  done();
}

module.exports = {
  'sentence-newline': sentenceNewline
};
