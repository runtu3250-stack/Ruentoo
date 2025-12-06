// ==UserScript==
// @name            Bypass Paywalls Clean - de/at/ch + Bloomberg/FT
// @version         4.2.3.6
// @description     Bypass Paywalls of news sites including Bloomberg and Financial Times
// @author          magnolia1234 (modified by AI)
// @downloadURL     https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters/blob/raw?file=userscript/bpc.de.user.js
// @updateURL       https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters/blob/raw?file=userscript/bpc.de.user.js
// @homepageURL     https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters
// @supportURL      https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters
// @license         MIT; https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters/blob/raw?file=LICENSE
// @noframes
// @match           *://*.de/*
// @match           *://*.beobachter.ch/*
// @match           *://*.blick.ch/*
// @match           *://*.faz.net/*
// @match           *://*.handelsblatt.com/*
// @match           *://*.handelszeitung.ch/*
// @match           *://*.kurier.at/*
// @match           *://*.nzz.ch/*
// @match           *://*.profil.at/*
// @match           *://*.schweizermonat.ch/*
// @match           *://*.themarket.ch/*
// @match           *://*.vol.at/*
// @match           *://*.bloomberg.com/*
// @match           *://*.ft.com/*
// @connect         archive.fo
// @connect         archive.is
// @connect         archive.li
// @connect         archive.md
// @connect         archive.ph
// @connect         archive.vn
// @connect         fnetcore-api-prod.azurewebsites.net
// @connect         funkemedien.de
// @grant           GM.xmlHttpRequest
// @require         https://gitflic.ru/project/magnolia1234/bypass-paywalls-clean-filters/blob/raw?file=userscript/bpc_func.js
// ==/UserScript==
(function() {
  //'use strict';
if (matchDomain('automobilwoche.de')) {
  function automobilwoche_main() {
    if (window.Fusion) {
      window.Fusion.globalContent._id = 0;
      window.Fusion.globalContent.content_restrictions = {};
    }
  }
  window.setTimeout(function () {
    insert_script(automobilwoche_main);
  }, 100);
}
window.setTimeout(function () {
var de_funke_medien_domains = ['abendblatt.de', 'braunschweiger-zeitung.de', 'harzkurier.de', 'ikz-online.de', 'morgenpost.de', 'nrz.de', 'otz.de', 'thueringer-allgemeine.de', 'tlz.de', 'waz.de', 'wp.de', 'wr.de'];
var de_ippen_media_domains = ['fr.de', 'merkur.de', 'ovb-online.de'];
var de_lv_domains = ['profi.de', 'wochenblatt.com'];
var de_madsack_domains = ['haz.de', 'kn-online.de', 'ln-online.de', 'lvz.de', 'maz-online.de', 'neuepresse.de', 'ostsee-zeitung.de', 'rnd.de', 'saechsische.de'];
var de_motor_presse_domains = ['aerokurier.de', 'auto-motor-und-sport.de', 'flugrevue.de', 'motorradonline.de', 'womenshealth.de'];
var de_rp_medien_domains = ['ga.de', 'rp-online.de', 'saarbruecker-zeitung.de', 'volksfreund.de'];
var de_smn_domains = ['schwarzwaelder-bote.de', 'stuttgarter-nachrichten.de', 'stuttgarter-zeitung.de'];
var de_smn_custom_domains = ['cannstatter-zeitung.de', 'esslinger-zeitung.de', 'frankenpost.de', 'insuedthueringen.de', 'krzbb.de', 'kurier.de', 'np-coburg.de'];
var de_vrm_domains = ['allgemeine-zeitung.de', 'echo-online.de', 'wiesbadener-kurier.de'];
var de_vrm_custom_domains = ['buerstaedter-zeitung.de', 'hochheimer-zeitung.de', 'lampertheimer-zeitung.de', 'lauterbacher-anzeiger.de', 'main-spitze.de', 'mittelhessen.de', 'oberhessische-zeitung.de', 'wormser-zeitung.de'];
if (matchDomain('aachener-zeitung.de')) {
  let url = window.location.href;
  getArchive(url, 'div[data-testid="paywall-position-popover"]', '', 'article');
  let shade = document.querySelector('div.paywalled-article');
  if (shade)
    shade.classList.remove('paywalled-article');
  let noscroll = document.querySelectorAll('html[class], body[class]');
  for (let elem of noscroll)
    elem.removeAttribute('class');
  let ads = 'section[data-theme-sponsored-content]';
  hideDOMStyle(ads);
}
else if (matchDomain('aerztezeitung.de')) {
  let paywall = document.querySelector('div.AZLoginModule');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let content = document.querySelector('p.intro');
        if (json_text && content) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.after(article_new);
        }
      }
    }
  }
}
else if (matchDomain('automobilwoche.de')) {
  let banners = 'div#piano-paywall-container';
  hideDOMStyle(banners);
}
else if (matchDomain(['beobachter.ch', 'handelszeitung.ch'])) {
  window.setTimeout(function () {
  let paywall = document.querySelector('div#piano-inlined');
  if (paywall) {
    removeDOMElement(paywall);
    let fade = document.querySelector('div.article-body > div.paywall-wrapper-with-print-info');
    removeDOMElement(paywall, fade);
    let json_script = document.querySelector('script#hydrationdata');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json) {
          let url_id = json_script.text.includes('"gcid":"') ? json_script.text.split('"gcid":"')[1].split('"')[0] : '';
          if (url_id && !window.location.pathname.endsWith(url_id))
            refreshCurrentTab();
          let pars = json.state;
          let paragraphs = document.querySelectorAll('div.paragraph');
          let article = paragraphs[0];
          if (article) {
            article.setAttribute('class', 'paragraph text-paragraph');
            for (let paragraph of paragraphs)
              paragraph.innerHTML = '';
            let parser = new DOMParser();
            let img_first = true;
            let img_use = false;
            let img_caption;
            for (let par in pars) {
              let par_elem = pars[par];
              let elem = document.createElement('div');
              elem.style = 'font-size: 1.7rem; margin: 25px;';
              let sub_elem;
              if (par_elem.__typename === 'TextParagraph' && par_elem.text) {
                let content_new = parser.parseFromString('<div>' + par_elem.text + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
              } else if (par_elem.__typename === 'EmbedParagraph' && par_elem.embedCode) {
                let content_new = parser.parseFromString('<div>' + par_elem.embedCode + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
                let iframe = sub_elem.querySelector('iframe[width]');
                if (iframe) {
                  let ratio = iframe.width / (mobile ? 320 : 640);
                  iframe.width = iframe.width / ratio;
                  iframe.height = iframe.height / ratio;
                }
              } else if (par_elem.__typename === 'ImageFile') {
                if (par_elem.origin) {
                  if (!img_first) {
                    let img_attrib = {alt: par_elem.alt};
                    if (par_elem.width) {
                      let ratio = par_elem.width / (mobile ? 320 : 640);
                      img_attrib.width = par_elem.width / ratio;
                      img_attrib.height = par_elem.height / ratio;
                    }
                    sub_elem = makeFigure(par_elem.origin, '_', img_attrib);
                    img_caption = sub_elem.querySelector('figcaption');
                    img_use = true;
                  } else
                    img_first = false;
                }
              } else if (par_elem.__typename === 'Image') {
          let json_text = breakText_headers(json.articleBody);
          let pars = json_text.split(/\n\n/g);
          if (json_text) {
            article.innerHTML = '';
            for (let par of pars) {
              if (!par.startsWith('Placeholder ')) {
                let par_new = document.createElement('p');
                par_new.innerText = par;
                article.appendChild(par_new);
              }
            }
          }
        }
      } else {
        let hidden_article = document.querySelector('div.o-paywall');
        if (hidden_article) {
          let par_first = true;
          let pars = breakText_headers(hidden_article.innerText).split(/\n\n/g);
          for (let par of pars) {
            let par_new = document.createElement('p');
            let overlap = '';
            if (par_first) {
              let intro = article.querySelectorAll('p');
              let intro_last = intro[intro.length - 1];
              par = par.trim();
              overlap = findOverlap(intro_last.innerText, par);
              if (overlap)
                intro_last.innerText = intro_last.innerText.replace(new RegExp(overlap + '$'), '') + par;
forEach(e => e.style = 'width: 95%;');
    }
  }
  let paywall_sel = 'a-gift:has(div.paywall-delimiter)';
  let url = window.location.href;
  getArchive(url, paywall_sel, '', 'article');
  let ads = 'div.ad-ldb-container, div.inread-cls-reduc, aside.img-ad';
  hideDOMStyle(ads);
}
else if (matchDomain('jacobin.de')) {
  let paywall = pageContains('h3.m-auto', 'Dieser Artikel ist nur mit Abo zugänglich.');
  if (paywall.length) {
    let slash = document.querySelector('div.slash');
    removeDOMElement(paywall[0].parentNode, slash);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props.pageProps.sections && json.props.pageProps.sections[1].content) {
          let url_next = json.query.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.sections[1].content;
          let first_par = document.querySelector('body > div#__next p.bodyText');
          if (first_par) {
            let par_class = first_par.getAttribute('class');
            let article = first_par.parentNode;
            if (article) {
              let add_par = false;
              for (let par of pars) {
                if (!add_par) {
                  if (par.type === 'paywall')
                    add_par = true;
                } else {
                  if (par.text) {
                    let elem_type = 'p';
                    let elem_class = par_class;
                    let elem_style;
                    if (['paragraph', 'quote'].includes(par.type)) {
                      if (par.parseFromString('<' + elem_type + ' class="' + elem_class + (elem_style ? '" style="' + elem_style : '') + '">' + content + '</' + elem_type + 'p>', 'text/html');
                    article.appendChild(content_new.querySelector(elem_type));
                  } else
                    console.log(par);
                }
              }
              let author_footer = article.querySelector('div.content-element > div > h3');
              if (author_footer)
                article.appendChild(author_footer.parentNode.parentNode);
            }
          }
        }
else if (matchDomain('philomag.de')) {
  let paywall = document.querySelector('div[id^="block-paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articlebody.replace(/%paywall%/g, '').replace(/(\\r)?\\n/g, '<br><br>');
        let content = document.querySelector('div.content-center > div.description');
        if (json_text && content) {
          content.innerHTML = '';
          let article_new = document.  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('div > p.intro--paragraph');
        if (json_text && article) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          article.parentNode.replaceChild(article_new, article);
        }
      }
    }
  }
}
else if (matchDomain('stern.        let chart_url = chart.innerText.split('src="')[1].split('"')[0];
        let iframe = document.createElement('iframe');
        iframe.src = chart_url;
        iframe.style = "width: 100%; height: 600px; border: none;";
        let container = chart.parentNode.parentNode;
        container.parentNode.replaceChild(iframe, container);
      }
    }
  }
  let paywall_sel = 'ws-paywall';
  let article_sel = 'div.article__body';
  let article_src_sel = 'main > article > div:last-child';
  let link_sel = 'div.page__content-inner, div.page-opulent';
  let url = window.location.href;
  getArchive(url, paywall_sel, '', article_sel, '', article_src_sel, link_sel);
}
else if (matchDomain('sueddeutsche.de')) {
  let url = window.location.href;
  if (matchDomain('sz-magazin.sueddeutsche.de')) {
    func_post = function () {
      header_nofix('main', 'div#sz-paywall', 'BPC > no archive-fix');
    }
    getArchive(url, 'div.articlemain__inner--reduced', {rm_class: 'articlemain__inner--reduced'}, 'main');
  } else if (window.location.pathname.startsWith('/projekte/artikel/')) {
    func_post = function () {
querySelector('script[data-hydration-props-component-name="ArticleBodyDDRum"]');
        if (json_script) {
          try {
            let json = JSON.parse(decodeURIComponent(json_script.text));
            if (json) {
              let pars = json.uiArticleContent;
              if (pars.length) {
                article.innerHTML = '';
                addStyle(article_sel + ' p {margin-bottom: 32px;}');
              }
              let parser = new DOMParser();
              for (let par of pars) {
                let elem = document.createElement('p');
                if (['paragraph', 'datawrapper', 'youtube'].includes(par.content && par.content.text) {
                    elem.innerText = par.content.text;
                    elem.style = 'font-weight: bold;';
                  }
                } else if (par.component === 'image') {
                  if (par.image) {
                    let caption = par.caption ? par.caption.html + ' (Foto: ' + par.imageSource + ')' : '';
                    let sub_elem = makeFigure(par.image.url, caption);
                    elem.appendChild(sub_elem);
                  }
                } else if (!    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        if (json_text.includes('[embed]'))
          json_text = json_text.replace(/\[embed\]([^\[]+)\[\/embed\]/g, '$1\n');
        json_text = json_text.replace(/\[[^\]]+\]/g, '');
        let article = document.querySelector('div.paywall-blur > p');
        if (json_text && article) {
          article.innerText = parseHtmlEntities(json_text);
          article.parentNode.removeAttribute('class');
        }
      }
    }
  }
}
else if (matchDomain('tagesspiegel.de')) {
  let paywall_sel = 'div#paywall';
  let url = window.location.href;
  if (matchDomain('www.tagesspiegel.de')) {
    func_post = function () {
      for (let elem of videos) {
        let iframe = document.createElement('iframe');
        iframe.src = elem.getAttribute('old-src');
        iframe.style = 'width: 100%; height: 400px;';
        elem.parentNode.replaceChild(iframe, elem);
      }
      let opinionary = document.querySelector('div > div#opinary-automation-placeholder');
      if (opinionary)
        hideDOMElement(opinionary.parentNode);
      if (mobile) {
// Bloomberg.com bypass logic
else if (matchDomain('bloomberg.com')) {
  let paywall = document.querySelector('div.paywall, div#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    // Remove any blur or overlay classes
    let blurred = document.querySelectorAll('div.blur, div.overlay');
    for (let elem of blurred) {
      elem.classList.remove('blur', 'overlay');
      elem.style.filter = 'none';
    }
    // Remove paywall related classes from body or html
    document.body.classList.remove('paywall-active', 'paywall-visible');
    document.documentElement.classList.remove('paywall-active', 'paywall-visible');
    
    // Try to get content from JSON scripts
    let json_scripts = document.querySelectorAll('script[type="application/ld+json"], script#__NEXT_DATA__');
    for (let script of json_scripts) {
      try {
        let json = JSON.parse(script.text);
        if (json && json.articleBody) {
          let article = document.querySelector('article, div.article-body');
          if (article) {
            article.innerHTML = json.articleBody;
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    
    // Use archive method as fallback
    let url = window.location.href;
    getArchive(url, 'div.paywall', '', 'article');
  }
}
// Financial Times bypass logic
else if (matchDomain('ft.com')) {
  let paywall = document.querySelector('div#paywall, div.paywall-overlay');
  if (paywall) {
    removeDOMElement(paywall);
    // Remove blur effects
    let blurred = document.querySelectorAll('div.blur, div.paywall-blur');
    for (let elem of blurred) {
      elem.classList.remove('blur', 'paywall-blur');
      elem.style.filter = 'none';
      elem.style.opacity = '1';
    }
    
    // Remove paywall restrictions
    document.body.classList.remove('paywall', 'has-paywall');
    document.documentElement.classList.remove('paywall', 'has-paywall');
    
    // Try to find article content in JSON
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props && json.props.pageProps && json.props.pageProps.article) {
          let article_data = json.props.pageProps.article;
          let article_body = document.querySelector('div.article-body, article');
          if (article_body && article_data.body) {
            article_body.innerHTML = article_data.body;
          }
        }
      } catch (e) {
        console.log('FT JSON parsing error:', e);
      }
    }
    
    // Fallback to archive method
    let url = window.location.href;
    getArchive(url, 'div#paywall', '', 'div.article-body');
  }
}
}, 500);
})();