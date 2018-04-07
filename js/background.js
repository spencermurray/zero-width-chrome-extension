chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch(message.type) {
    case "updateBadge":
    console.log(sender)
      chrome.tabs.get(sender.tab.id, tab => {
        // prerendered tab has been destroyed
        if (chrome.runtime.lastError) return;
        // tab is visible
        if (tab.index >= 0) {
          chrome.browserAction.setBadgeText({tabId: tab.id, text: '' + message.text});
        } else {
          // handle a prerendered tab that's not visible
          const tabId = sender.tab.id, text = message.text
          chrome.webNavigation.onCommitted.addListener(function update(details){
            if (details.tabId === tabId) {
              chrome.browserAction.setBadgeText({tabId: tabId, text: '' + text});
              chrome.webNavigation.onCommitted.removeListener(update);
            }
          });
        }
      })
      break;
    default:
      console.warn('Unrecognized message type received')
      break;
  }
});
