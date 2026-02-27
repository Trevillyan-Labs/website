/**
 * Single configuration for all analytics / third-party tools.
 * Update IDs and options here; no need to change HTML or other JS.
 */
window.ANALYTICS_CONFIG = {
  mixpanel: {
    token: 'c1b9890f66a916a9cf28c439d0b81784',
    options: {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage'
    }
  },
  logrocket: {
    appId: 'sn79l9/trevillyan-labs',
    scriptUrl: 'https://cdn.intake-lr.com/LogRocket.min.js'
  },
  hotjar: {
    hjid: 3852965,
    hjsv: 6
  }
};
