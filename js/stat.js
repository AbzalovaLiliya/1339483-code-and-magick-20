'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SMALL = 10;
var GAP = 30;
var INTERVAL = 100;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT_MAX = 140;
var BAR_WIDTH = 40;
var MY_RESULT_COLOR = 'rgba(255, 0, 0, 1)';
var BOTTOM_LINE = 250;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomColor = function () {
  var randomColor = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  return randomColor;
};

var drawColumn = function (ctx, player, time, maxTime, i) {
  if (player === 'Вы') {
    ctx.fillStyle = MY_RESULT_COLOR;
  } else {
    ctx.fillStyle = getRandomColor();
  }
  ctx.fillRect(CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE - GAP_SMALL, BAR_WIDTH, -(BAR_HEIGHT_MAX * time) / maxTime);
};

var writeScore = function (ctx, time, maxTime, i) {
  ctx.fillStyle = '#000000';
  ctx.fillText(Math.round(time), CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE - GAP_SMALL * 3 - (BAR_HEIGHT_MAX * time) / maxTime);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SMALL, CLOUD_Y + GAP_SMALL, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE);

    drawColumn(ctx, players[i], times[i], maxTime, i);
    writeScore(ctx, times[i], maxTime, i);
  }
};
