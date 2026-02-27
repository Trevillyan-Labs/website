/**
 * Hotjar initialization. Depends on analytics-config.js (ANALYTICS_CONFIG.hotjar).
 */
(function (h, o, t, j, a, r) {
  var config = window.ANALYTICS_CONFIG && window.ANALYTICS_CONFIG.hotjar;
  if (!config) return;
  h.hj = h.hj || function () {
    (h.hj.q = h.hj.q || []).push(arguments);
  };
  h._hjSettings = { hjid: config.hjid, hjsv: config.hjsv };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script');
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
