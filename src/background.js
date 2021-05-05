const ID = 'configure';

// Add right-click action
chrome.contextMenus.create({
  title: 'Configure',
  // prettier-ignore
  contexts: [
      'action', /* rm-firefox */
      'browser_action', /* rm-chrome */
  ],
  id: ID,
});

// Action handler
chrome.contextMenus.onClicked.addListener((menuItem) => {
  if (menuItem.menuItemId === ID) {
    chrome.runtime.openOptionsPage();
  }
});
