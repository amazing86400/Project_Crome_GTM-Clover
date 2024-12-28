document.addEventListener("DOMContentLoaded", () => {
  // const toggleButton = document.getElementById("toggleButton");
  const gtmIdsElement = document.getElementById("gtmIds");

  // chrome.action.onClicked.addListener(async (tab) => {
  //   chrome.action.getBadgeText({}, async (currentText) => {
  //     const newText = currentText === "OFF" ? "ON" : "OFF";
  //     const newColor = newText === "ON" ? "#00FF00" : "#FF0000";

  //     chrome.action.setBadgeText({ text: newText });
  //     chrome.action.setBadgeBackgroundColor({ color: newColor });

  //     if (newText === "ON") {
  //       if (tab && tab.id) {
  //         chrome.scripting.executeScript(
  //           {
  //             target: { tabId: tab.id },
  //             files: ["content.js"],
  //           },
  //           () => {
  //             console.log("GTM Checker script executed (ON).");
  //           }
  //         );
  //       }
  //     } else {
  //       console.log("GTM Checker turned OFF.");
  //     }
  //   });
  // });

  // toggleButton.addEventListener("click", async () => {
  //   chrome.action.getBadgeText({}, async (currentText) => {
  //     const newText = currentText === "OFF" ? "ON" : "OFF";
  //     chrome.action.setBadgeText({ text: newText });

  //     if (newText === "ON") {
  //       const [tab] = await chrome.tabs.query({
  //         active: true,
  //         currentWindow: true,
  //       });
  //       if (!tab || !tab.id) {
  //         console.error("No active tab found.");
  //         return;
  //       }

  //       chrome.scripting.executeScript(
  //         {
  //           target: { tabId: tab.id },
  //           files: ["content.js"],
  //         },
  //         () => {
  //           console.log("GTM Checker script executed.");
  //         }
  //       );
  //     } else {
  //       gtmIdsElement.textContent = "";
  //     }
  //   });
  // });

  chrome.runtime.onMessage.addListener((message) => {
    const { gtmIds } = message;
    if (gtmIds && gtmIds.length > 0) {
      gtmIdsElement.textContent = `GTM IDs Found: ${gtmIds.join(", ")}`;
    } else {
      gtmIdsElement.textContent = "No GTM IDs Found.";
    }
  });
});
