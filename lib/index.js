'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clamp;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clamp(selector, maxLines) {
  var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

  // Create a hidden canvas for measuring text width.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  // Assume all elements have the same width and font.
  var $first = (0, _jquery2.default)(selector).first();
  var maxLineWidth = $first.width();
  var maxLastLineWidth = maxLineWidth - context.measureText(ellipsis).width * 2;

  // The context font has the following format: weight size name (e.g. 400 12px Arial).
  var font = $first.css('font-family').split(',')[0].replace(/"/g, '').trim();
  context.font = $first.css('font-weight') + ' ' + $first.css('font-size') + ' ' + font;

  (0, _jquery2.default)(selector).each(function () {
    // Split text into words and re-create the wrapped lines the user sees.
    var lines = [];
    var words = (0, _jquery2.default)(this).text().trim().split(' ');
    var index = 1;

    while (index < words.length && words.length > 0 && lines.length < maxLines - 1) {
      var metrics = context.measureText(words.slice(0, index).join(' '));
      if (metrics.width > maxLineWidth) {
        lines.push(words.slice(0, index - 1).join(' '));
        words = words.slice(index - 1);
        index = 1;
      } else {
        index += 1;
      }
    }

    // Check if the text fits in [maxLines - 1] lines.
    if (lines.length < maxLines - 1 || lines.length === maxLines - 1 && words.length === 0) {
      return;
    }

    // Handle last line separately letter by letter instead of splitting.
    var rest = words.join(' ');

    for (var i = 0; i < rest.length; i++) {
      var _metrics = context.measureText(rest.slice(0, i + 1));
      if (_metrics.width > maxLastLineWidth) {
        lines.push(rest.slice(0, i));
        break;
      }
    }

    // Check if the text fits in [maxLines] lines.
    if (lines.length < maxLines) {
      return;
    }

    // Finally, apply the ellipsis and modify DOM.
    (0, _jquery2.default)(this).text(lines.join(' ') + ellipsis);
  });
}