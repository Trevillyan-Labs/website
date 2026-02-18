/**
 * Populates Webflow CMS list and detail templates from data/patents.json and data/team_members.json.
 * Run "npm run build:data" after editing data JSON to refresh the sitemap.
 * Serve the site over HTTP (e.g. npx serve) so fetch() can load the JSON files.
 */
(function () {
  var BASE = '';
  function dataUrl(name) { return BASE + 'data/' + name + '.json'; }

  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('slug');
    if (q) return q;
    var path = (window.location.pathname || '').replace(/\/$/, '');
    var m = path.match(/^\/(?:patents|team)\/([^/]+)$/);
    return m ? m[1] : '';
  }

  function showEl(el) {
    if (el && el.classList) el.classList.remove('w-dyn-bind-empty');
  }
  function setText(el, text) {
    if (!el) return;
    el.textContent = text || '';
    showEl(el);
  }
  function setHtml(el, html) {
    if (!el) return;
    el.innerHTML = html || '';
    showEl(el);
  }
  function setSrc(el, url) {
    if (!el) return;
    el.src = url || '';
    el.alt = el.alt || '';
    if (url) showEl(el);
  }
  function setHref(el, url) {
    if (!el) return;
    el.href = url || '#';
  }
  function setSocialLink(el, url) {
    if (!el) return;
    var hasUrl = typeof url === 'string' && url.trim() !== '';
    el.href = hasUrl ? url : '#';
    el.style.display = hasUrl ? '' : 'none';
  }

  function stripIds(node) {
    if (node.id) node.removeAttribute('id');
    var children = node.querySelectorAll('[id]');
    for (var i = 0; i < children.length; i++) children[i].removeAttribute('id');
  }

  var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function formatDateLong(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return fullMonths[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function renderPatentList(container, patents, limit) {
    var list = container.querySelector('.w-dyn-items');
    var empty = container.querySelector('.w-dyn-empty');
    var itemTemplate = container.querySelector('.w-dyn-item');
    if (!list || !itemTemplate) return;
    var sorted = patents.slice().sort(function (a, b) {
      var da = new Date(a['Published'] || a['Published On'] || 0).getTime();
      var db = new Date(b['Published'] || b['Published On'] || 0).getTime();
      return db - da;
    });
    var items = limit ? sorted.slice(0, limit) : sorted;
    list.innerHTML = '';
    items.forEach(function (p) {
      var clone = itemTemplate.cloneNode(true);
      stripIds(clone);
      var a = clone.querySelector('a.focus-wrapper');
      if (a) a.href = '/patents/' + encodeURIComponent(p.Slug);
      var img = clone.querySelector('.focus-image img');
      setSrc(img, p['Main Image']);
      var dateEl = clone.querySelector('.focus-date');
      setText(dateEl, p['Published'] || p['Published On'] || '');
      var titleEl = clone.querySelector('.text-42px');
      setText(titleEl, p['Invention Title']);
      var summaryEl = clone.querySelector('.focus-paragraph');
      setText(summaryEl, p['Post Summary']);
      list.appendChild(clone);
    });
    if (empty) empty.style.display = items.length ? 'none' : '';
    var pagination = container.querySelector('.w-pagination-wrapper');
    if (pagination) pagination.style.display = 'none';
  }

  function renderTeamList(container, team) {
    var list = container.querySelector('.w-dyn-items');
    var empty = container.querySelector('.w-dyn-empty');
    var itemTemplate = container.querySelector('.w-dyn-item');
    if (!list || !itemTemplate) return;
    list.innerHTML = '';
    team.forEach(function (t) {
      var clone = itemTemplate.cloneNode(true);
      stripIds(clone);
      var a = clone.querySelector('a.about-value-wrapper');
      if (a) a.href = '/team/' + encodeURIComponent(t.Slug);
      var nameEl = clone.querySelector('.text-42px.medium');
      setText(nameEl, t.Name);
      var titleEl = clone.querySelector('.text-18px.title');
      setText(titleEl, t['Job Title']);
      var img = clone.querySelector('.team-image-cover');
      setSrc(img, t['Profile Picture']);
      list.appendChild(clone);
    });
    if (empty) empty.style.display = team.length ? 'none' : '';
    var pagination = container.querySelector('.w-pagination-wrapper');
    if (pagination) pagination.style.display = 'none';
  }

  function renderPatentDetail(patent, team) {
    var authorSlug = patent['Author (Team Member)'];
    var author = team && authorSlug ? team.find(function (t) { return t.Slug === authorSlug; }) : null;
    var dateEl = document.querySelector('.focus-view-date');
    if (dateEl) setText(dateEl, formatDateLong(patent['Published'] || patent['Published On']));
    var heroSection = dateEl && dateEl.closest('.container-medium');
    var h1 = heroSection ? heroSection.querySelector('h1.text-60px.semibold') : document.querySelector('h1.text-60px.semibold');
    if (h1) setText(h1, patent['Invention Title']);
    var catDiv = h1 && h1.nextElementSibling;
    if (catDiv && catDiv.classList.contains('w-dyn-bind-empty')) setText(catDiv, patent['Patent Number']);
    var authorLink = document.querySelector('a.team-member-name');
    if (authorLink) {
      authorLink.href = author ? '/team/' + encodeURIComponent(author.Slug) : '#';
      var authorNameEl = authorLink.querySelector('.text-18px.underline');
      setText(authorNameEl, author ? author.Name : authorSlug);
    }
    var patentNumEl = document.querySelector('.focus-view-name-wrapper .text-18px.punctuation-mark');
    var next = patentNumEl && patentNumEl.nextElementSibling;
    if (next) setText(next, author ? author['Job Title'] : '');
    var posting = document.querySelector('.posting.w-richtext');
    if (posting) setHtml(posting, patent['Post Body'] || '');
    var viewLink = document.getElementById('body-google-patent-redirect-button');
    if (viewLink) setHref(viewLink, patent['Source URL'] || '#');
    var heroImg = document.querySelector('.content-hero-image img');
    setSrc(heroImg, patent['Main Image']);
    document.title = (patent['Invention Title'] || 'Patent') + ' | Trevillyan Labs';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', patent['Post Summary'] || '');
  }

  function renderTeamDetail(member) {
    var h1 = document.querySelector('.text-60px.semibold');
    if (h1) setText(h1, member.Name);
    var nameEl = document.querySelector('.team-view-name');
    setText(nameEl, member['Job Title']);
    var links = {
      twitter: document.querySelector('#body-twitter-button'),
      facebook: document.querySelector('.social-media-wrapper.team-view a:nth-of-type(2)'),
      instagram: document.querySelector('.social-media-wrapper.team-view a:nth-of-type(3)'),
      linkedin: document.querySelector('#body-linkedin-button'),
      youtube: document.querySelector('.social-media-wrapper.team-view a:nth-of-type(5)')
    };
    setSocialLink(links.twitter, member['Twitter Link']);
    setSocialLink(links.facebook, member['Facebook Link']);
    setSocialLink(links.instagram, member['Instagram Link']);
    setSocialLink(links.linkedin, member['Linkedin Link']);
    setSocialLink(links.youtube, member['Youtube Link']);
    var bio = document.querySelector('.div-block-5 p.w-dyn-bind-empty');
    setText(bio, member['Bio Summary']);
    var img = document.querySelector('.team-view-image-wrapper img.image-contain');
    setSrc(img, member['Profile Picture']);
    document.title = (member.Name || 'Team') + ' | Trevillyan Labs';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', member['Bio Summary'] || '');
  }

  function detectBase() {
    var path = (window.location.pathname || '').replace(/\/$/, '');
    if (pathIsDetailPage(path, 'patents') || pathIsDetailPage(path, 'team')) {
      BASE = '';
      return;
    }
    if (path.endsWith('.html') && path !== '/index.html') {
      BASE = './';
    } else if (path.indexOf('/') > -1 && !path.endsWith('/')) {
      BASE = path.replace(/\/[^/]+$/, '/');
    }
  }
  function pathIsDetailPage(path, type) {
    if (!path) return false;
    if (type === 'patents') return /^\/patents\/[^/]+$/.test(path.replace(/\/$/, ''));
    if (type === 'team') return /^\/team\/[^/]+$/.test(path.replace(/\/$/, ''));
    return false;
  }

  function init() {
    detectBase();
    var slug = getSlug();
    var pathname = (window.location.pathname || '').replace(/\/$/, '');
    var isPatentDetail = /detail_patents\.html$/i.test(pathname) || pathIsDetailPage(pathname, 'patents');
    var isTeamDetail = /detail_team\.html$/i.test(pathname) || pathIsDetailPage(pathname, 'team');

    if (isPatentDetail && slug) {
      Promise.all([
        fetch(dataUrl('patents')).then(function (r) { return r.json(); }),
        fetch(dataUrl('team_members')).then(function (r) { return r.json(); })
      ]).then(function (arr) {
        var patent = arr[0].find(function (p) { return p.Slug === slug; });
        if (patent) renderPatentDetail(patent, arr[1]);
      }).catch(function () {});
      return;
    }

    if (isTeamDetail && slug) {
      fetch(dataUrl('team_members')).then(function (r) { return r.json(); }).then(function (team) {
        var member = team.find(function (t) { return t.Slug === slug; });
        if (member) renderTeamDetail(member);
      }).catch(function () {});
      return;
    }

    var patentList = document.querySelector('.w-dyn-list .focus-grid');
    var teamList = document.querySelector('.w-dyn-list ._3-column-grid');
    var patentWrapper = patentList ? patentList.closest('.w-dyn-list') : null;
    var teamWrapper = teamList ? teamList.closest('.w-dyn-list') : null;

    if (patentWrapper) {
      fetch(dataUrl('patents')).then(function (r) { return r.json(); }).then(function (patents) {
        var limit = document.querySelector('.collection-list-wrapper') ? 3 : null;
        renderPatentList(patentWrapper, patents, limit);
      }).catch(function () {});
    }
    if (teamWrapper) {
      fetch(dataUrl('team_members')).then(function (r) { return r.json(); }).then(function (team) {
        renderTeamList(teamWrapper, team);
      }).catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
