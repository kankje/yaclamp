// @flow

import $ from 'jquery';

export default function clamp(selector: string, maxLines: number, ellipsis: string = '...'): void {
  // Create a hidden canvas for measuring text width.
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Assume all elements have the same width and font.
  const $first = $(selector).first();
  if (!$first.length) {
    return;
  }

  const maxLineWidth = $first.width();
  const maxLastLineWidth = maxLineWidth - (context.measureText(ellipsis).width * 2);

  // The context font has the following format: weight size name (e.g. 400 12px Arial).
  const font = $first.css('font-family').split(',')[0].replace(/"/g, '').trim();
  context.font = `${$first.css('font-weight')} ${$first.css('font-size')} ${font}`;

  $(selector).each(function (): void {
    // Split text into words and re-create the wrapped lines the user sees.
    const lines = [];
    let words = $(this).text().trim().split(' ');
    let index = 1;

    while (index < words.length && words.length > 0 && lines.length < maxLines - 1) {
      const metrics = context.measureText(words.slice(0, index).join(' '));
      if (metrics.width > maxLineWidth) {
        lines.push(words.slice(0, index - 1).join(' '));
        words = words.slice(index - 1);
        index = 1;
      } else {
        index += 1;
      }
    }

    // Check if the text fits in [maxLines - 1] lines.
    if (lines.length < maxLines - 1 || (lines.length === maxLines - 1 && words.length === 0)) {
      return;
    }

    // Handle last line separately letter by letter instead of splitting.
    const rest = words.join(' ');

    for (let i = 0; i < rest.length; i++) {
      const metrics = context.measureText(rest.slice(0, i + 1));
      if (metrics.width > maxLastLineWidth) {
        lines.push(rest.slice(0, i));
        break;
      }
    }

    // Check if the text fits in [maxLines] lines.
    if (lines.length < maxLines) {
      return;
    }

    // Finally, apply the ellipsis and modify DOM.
    $(this).text(lines.join(' ') + ellipsis);
  });
}
