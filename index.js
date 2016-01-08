var visit = require('unist-util-visit');

function sentenceNewline(ast, file, preferred, done) {
  var blacklist = [];
  if (typeof preferred === 'object' && !('length' in preferred)) {
    blacklist = preferred.blacklist;
  }

  visit(ast, 'text', function (node) {
    var sentenceStops = ['!', '.', '?'];

    function getNextSentenceStop(value, startIndex) {
      var result = {index: -1, sentenceStop: ''};
      if (startIndex >= value.length) {
        return result;
      }
      // search for all sentence stop types
      // return the one with the lowest index
      for (var i = 0; i < sentenceStops.length; ++i) {
        var index = value.indexOf(sentenceStops[i], startIndex);
        if (index === -1) {
          continue;
        }
        if (result.index === -1 || index < result.index) {
          result.index = index;
          result.sentenceStop = sentenceStops[i];
        }
      }
      return result;
    }

    var lastCandidate = {index: 0, sentenceStop: ''};
    while (true) {
      lastCandidate = getNextSentenceStop(
        node.value, lastCandidate.index + lastCandidate.sentenceStop.length);
      // abort if no more sentence stops are found
      if (lastCandidate.index === -1) {
        break;
      }
      // ignore if the sentence stop is the last character
      if (lastCandidate.index >= node.value.length - 1) {
        continue;
      }
      // ignore if the next character is not a space
      if (node.value.charAt(lastCandidate.index + lastCandidate.sentenceStop.length) !== ' ') {
        continue;
      }
      // ignore if the sentence stop (and its preceeding characters match a blacklisted string
      var isBlacklisted = false;
      for (var i = 0; i < blacklist.length; ++i) {
        var needle = blacklist[i];
        var startIndex = lastCandidate.index + lastCandidate.sentenceStop.length - needle.length;
        if (node.value.substr(startIndex, needle.length) == needle) {
          isBlacklisted = true;
          break;
        }
      }
      if (isBlacklisted) {
        continue;
      }

      file.warn(
        'Newline should follow end of sentence',
        file.offsetToPosition(file.positionToOffset(node.position.start) + lastCandidate.index)
      );
    }

  });

  done();
}

module.exports = {
  'sentence-newline': sentenceNewline
};
