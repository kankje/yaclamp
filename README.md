# yaclamp [![build status](https://travis-ci.org/kankje/yaclamp.svg?branch=master)](https://travis-ci.org/kankje/yaclamp)

Yet another multi-line clamping package.

Instead of checking element height, we check for width and attempt to re-create the wrapped lines the user sees.

During my tests, yaclamp has been around ~90% faster than [Clamp.js](https://github.com/josephschmitt/Clamp.js) and [shave](https://github.com/dollarshaveclub/shave) when clamping 100+ elements.

## Limitations

- depends on jQuery (though this could be fixed quite easily)
- assumes all elements have the same width and font
- truncates text at the last letter that fits instead of the last word (words can get split)
- requires canvas support (`CanvasRenderingContext2D.measureText`)
- doesn't use `-webkit-line-clamp` even if it's supported

## Usage

```css
.clamp-me {
  margin-bottom: 10px;
  width: 100px;
  font-family: Arial;
  font-size: 12px;
  font-weight: 400;
}
```

```html
<div>
  <div class="clamp-me">Fits single line</div>
  <div class="clamp-me">This sentence fits two lines</div>
  <div class="clamp-me">This is a longer sentence that should be split on four lines</div>
</div>
```

```js
import clamp from 'yaclamp';

clamp('.clamp-me', 2, '...');
```
