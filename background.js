chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.action.getBadgeText({}, async (currentText) => {
    const newText = currentText === "" ? "ON" : "";

    chrome.action.setBadgeText({ text: newText });
    if (newText === "ON") {
      if (tab && tab.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            console.log("GTM Checker script executed (ON).");
          }
        );
      }
    } else {
      console.log("Badge text cleared.");
    }
  });
});
