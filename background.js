chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch(message.type) {
    case "updateBadge":
      chrome.browserAction.setBadgeText({text: '' + message.text})
      break;
    default:
      console.warn('Unrecognized message type received')
      break;
  }
});
