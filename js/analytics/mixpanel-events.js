/**
 * Mixpanel event tracking: element-id → event mapping and scroll tracking.
 * Single place to add/change tracked events. Elements must have class "mixpanel-trigger" and an id.
 */
(function () {
  if (typeof mixpanel === 'undefined') return;

  function getPath(el) {
    try {
      var href = (el && el.href) ? String(el.href) : '';
      return href ? new URL(href).pathname : '';
    } catch (e) {
      return '';
    }
  }

  function getHref(el) {
    return (el && el.href) ? String(el.href) : '';
  }

  // Element ID → { eventName, getProperties?: function(el) }
  var EVENT_MAP = {
    'navbar-logo-button': { event: 'Home Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-logo-button-mobile': { event: 'Home Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-home-button': { event: 'Home Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-patents-button': { event: 'Patents Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-patents-button-mobile': { event: 'Patents Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-products-button': { event: 'Products Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-contact-button': { event: 'Contact Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-contact-button-mobile': { event: 'Contact Page Opened', props: function (el) { return { button: el.id }; } },
    'navbar-hamburger-menu-button': { event: 'Navbar Menu Opened', props: function (el) { return { button: el.id }; } },
    'body-patent-button': { event: 'Patent Opened', props: function (el) { return { button: el.id, patent: getPath(el) }; } },
    'body-patents-button': { event: 'Patents Page Opened', props: function (el) { return { button: el.id }; } },
    'body-team-button': { event: 'Team Page Opened', props: function (el) { return { button: el.id }; } },
    'body-team-member-button': { event: 'Team Member Opened', props: function (el) { return { button: el.id, team_member: getPath(el) }; } },
    'body-google-patent-redirect-button': { event: 'Google Patent Opened', props: function (el) { return { button: el.id, patent: getPath(el) }; } },
    'body-linkedin-button': { event: 'LinkedIn Profile Opened', props: function (el) { return { button: el.id, team_member: getPath(el) }; } },
    'body-twitter-button': { event: 'Twitter Profile Opened', props: function (el) { return { button: el.id, team_member: getPath(el) }; } },
    'body-contact-email-link': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-contact-form-name-input': { event: 'Contact Form Field Clicked', props: function (el) { return { input: el.id, field: 'name' }; } },
    'body-contact-form-email-input': { event: 'Contact Form Field Clicked', props: function (el) { return { input: el.id, field: 'email' }; } },
    'body-contact-form-subject-input': { event: 'Contact Form Field Clicked', props: function (el) { return { input: el.id, field: 'subject' }; } },
    'body-contact-form-body-input': { event: 'Contact Form Field Clicked', props: function (el) { return { input: el.id, field: 'message body' }; } },
    'body-contact-form-checkbox': { event: 'Contact Form Field Clicked', props: function (el) { return { input: el.id, field: 'consent checkbox' }; } },
    'body-contact-form-submit-button': { event: 'Contact Form Submitted', props: function (el) { return { input: el.id }; } },
    'body-privacy-policy-button': { event: 'Privacy Policy Opened', props: function (el) { return { input: el.id }; } },
    'body-contact-email-link-1': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-contact-email-link-2': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-contact-email-link-3': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-contact-email-link-4': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-contact-email-link-5': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'body-data_access_request-link': { event: 'Data Access Requested', props: function (el) { return { button: el.id }; } },
    'body-privacy-policy-link': { event: 'Privacy Policy Opened', props: function (el) { return { button: el.id }; } },
    'body-company-logo-button': { event: 'Company Website Opened', props: function (el) { return { button: el.id, company: getHref(el) }; } },
    'body-view-project-button-1': { event: 'Product Opened', props: function (el) { return { button: el.id, product: getPath(el) }; } },
    'body-view-project-button-2': { event: 'Product Opened', props: function (el) { return { button: el.id, product: getPath(el) }; } },
    'body-products-button': { event: 'Products Page Opened', props: function (el) { return { button: el.id }; } },
    'body-working-backwards-link': { event: 'Working Backwards Opened', props: function (el) { return { button: el.id }; } },
    'body-product-button': { event: 'Product Opened', props: function (el) { return { button: el.id, product: getPath(el) }; } },
    'body-contact-button': { event: 'Contact Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-logo-button': { event: 'Home Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-home-button': { event: 'Home Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-patents-button': { event: 'Patents Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-products-button': { event: 'Products Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-team-button': { event: 'Team Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-contact-button': { event: 'Contact Page Opened', props: function (el) { return { button: el.id }; } },
    'footer-contact-email-link': { event: 'Contact Email Clicked', props: function (el) { return { button: el.id }; } },
    'footer-linkedin-icon-button': { event: 'LinkedIn Profile Opened', props: function (el) { return { button: el.id }; } },
    'footer-linkedin-button': { event: 'LinkedIn Profile Opened', props: function (el) { return { button: el.id }; } },
    'footer-twitter-button': { event: 'Twitter Profile Opened', props: function (el) { return { button: el.id }; } },
    'footer-privacy-policy-button': { event: 'Privacy Policy Opened', props: function (el) { return { button: el.id }; } },
    'footer-terms-conditions-button': { event: 'Terms and Conditions Opened', props: function (el) { return { button: el.id }; } }
  };

  function trackClick(el) {
    var id = el && el.id;
    var entry = id && EVENT_MAP[id];
    if (entry) {
      mixpanel.track(entry.event, entry.props ? entry.props(el) : { button: id });
    } else {
      mixpanel.track('Unknown Event Triggered', { 'Active Element': id || 'unknown' });
    }
  }

  function initClickTracking() {
    var list = document.querySelectorAll('.mixpanel-trigger');
    for (var i = 0; i < list.length; i++) {
      list[i].addEventListener('click', function (e) {
        // Use currentTarget: it's the .mixpanel-trigger element we attached to (has the id).
        // target can be a child (e.g. img, span) with no id, which caused "Unknown Event Triggered".
        trackClick(e.currentTarget);
      });
    }
  }

  // Scroll tracking: one event per 25% milestone (25, 50, 75, 100)
  var scroll25 = false, scroll50 = false, scroll75 = false, scroll100 = false;
  var lastKnownScrollPosition = 0;
  var debounce = true;

  function triggerScrollEvent() {
    if (lastKnownScrollPosition < window.scrollY) {
      lastKnownScrollPosition = window.scrollY;
    }
    var max = document.body.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    if (lastKnownScrollPosition >= max / 4) {
      if (!scroll25) { scroll25 = true; debounce = true; }
    }
    if (lastKnownScrollPosition >= max / 2) {
      if (!scroll50) { scroll50 = true; debounce = true; }
    }
    if (lastKnownScrollPosition >= max * 3 / 4) {
      if (!scroll75) { scroll75 = true; debounce = true; }
    }
    if (lastKnownScrollPosition >= max) {
      if (!scroll100) { scroll100 = true; debounce = true; }
    }
    if (!debounce) return;
    var pct = lastKnownScrollPosition / max * 100;
    var label = pct >= 100 ? '100' : pct >= 75 ? '75' : pct >= 50 ? '50' : pct >= 25 ? '25' : '0';
    mixpanel.track('Page Scrolled', { scrolled_past: label });
    debounce = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initClickTracking();
      document.addEventListener('scroll', triggerScrollEvent);
    });
  } else {
    initClickTracking();
    document.addEventListener('scroll', triggerScrollEvent);
  }
})();
