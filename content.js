(function () {
  const scripts = Array.from(document.scripts);
  const gtmScripts = scripts.filter((script) => script.src.includes("gtm.js"));

  let gtmIds = [];
  if (gtmScripts.length > 0) {
    gtmIds = gtmScripts.map((script) => {
      const matches = script.src.match(/GTM-[\w\d]+/);
      return matches ? matches[0] : "Unknown ID";
    });
  }

  // 팝업에 메시지 전송
  chrome.runtime.sendMessage({ gtmIds });
})();
