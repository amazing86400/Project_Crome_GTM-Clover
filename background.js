chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ badgeState: "OFF" });
  chrome.action.setBadgeText({ text: "" });
  chrome.action.setBadgeBackgroundColor({ color: "#A4A4A4" });
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.storage.local.get("badgeState", async (data) => {
    const prevState = data.badgeState || "OFF";
    const nextState = prevState === "ON" ? "" : "ON";

    chrome.storage.local.set({ badgeState: nextState });

    await chrome.action.setBadgeText({ text: nextState });
    const badgeColor = nextState === "ON" ? "#819FF7" : "#A4A4A4";
    chrome.action.setBadgeBackgroundColor({ color: badgeColor });

    if (nextState === "ON" && tab.id) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"],
        },
        () => {
          console.log("GTM Clover script executed.");
        }
      );
    } else {
      console.log("GTM Clover turned OFF. No scripts will be injected.");
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("badgeState", (data) => {
      if (data.badgeState === "ON" && tab.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            console.log("GTM Clover script executed on page load.");
          }
        );
      }
    });
  }
});
