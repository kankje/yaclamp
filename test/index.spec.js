import $ from 'jquery';
import clamp from '../src';

test('clamps lines', () => {
  document.body.innerHTML = `
    <style>
      .clamp-me {
        margin-bottom: 10px;
        width: 100px;
        font-family: Arial;
        font-size: 12px;
        font-weight: 400;
      }
    </style>
    <div>
      <div class="clamp-me">Fits single line</div>
      <div class="clamp-me">This sentence fits two lines</div>
      <div class="clamp-me">This is a longer sentence that should be split on four lines</div>
    </div>
  `;

  clamp('.clamp-me', 2, '...');

  expect($('.clamp-me:eq(0)').text()).toEqual('Fits single line');
  expect($('.clamp-me:eq(1)').text()).toEqual('This sentence fits two lines');
  expect($('.clamp-me:eq(2)').text()).toEqual('This is a longer sentence that s...');
});
