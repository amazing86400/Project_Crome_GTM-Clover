(function () {
  const scripts = Array.from(document.scripts);
  const gtmScripts = scripts.filter((script) => script.src.includes("gtm.js"));

  if (gtmScripts.length > 0) {
    const gtmIds = [
      ...new Set(
        gtmScripts.map((script) => {
          const matches = script.src.match(/GTM-[\w\d]+/);
          return matches ? matches[0] : "Unknown ID";
        })
      ),
    ];

    console.log("GTM Container ID:", gtmIds);
    alert(`GTM Container ID: ${gtmIds.join(", ")}`);
  } else {
    console.log("No GTM found on this page.");
    alert("No GTM found on this page.");
  }
})();
