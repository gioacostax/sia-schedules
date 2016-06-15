'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: './app/index.html',
    type: 'popup',
    width: 1024,
    height: 800
  });
});
