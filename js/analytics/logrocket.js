/**
 * LogRocket: load script, init, and identify with Mixpanel distinct_id.
 * Depends on analytics-config.js. Load after mixpanel.js so localStorage may have distinct_id.
 */
(function () {
  var config = window.ANALYTICS_CONFIG && window.ANALYTICS_CONFIG.logrocket;
  if (!config || !config.appId) return;

  var script = document.createElement('script');
  script.src = config.scriptUrl || 'https://cdn.intake-lr.com/LogRocket.min.js';
  script.crossOrigin = 'anonymous';
  script.onload = function () {
    if (window.LogRocket) {
      window.LogRocket.init(config.appId);
      var mpToken = window.ANALYTICS_CONFIG.mixpanel && window.ANALYTICS_CONFIG.mixpanel.token;
      if (mpToken) {
        try {
          var blob = localStorage.getItem('mp_' + mpToken + '_mixpanel');
          if (blob) {
            var j = JSON.parse(blob);
            if (j && j.distinct_id) window.LogRocket.identify(j.distinct_id);
          }
        } catch (e) {}
      }
    }
  };
  document.head.appendChild(script);
})();
