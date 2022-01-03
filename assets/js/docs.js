let sidenavDoc = new Axentix.Sidenav('#main-sidenav');

setTimeout(() => {
  try {
    new Axentix.Axentix('collapsible');
  } catch (error) {
    console.error(error);
  }
}, 50);

let scrollSpy = new Axentix.ScrollSpy('#scrollspy-auto', {
  auto: {
    enabled: true,
    classes: 'text-grey mt-2 font-w500 pl-2 bd-l-solid bd-l-3',
    selector: 'h1,h2',
  },
});

const content = document.querySelector('.content');
const tryIt = document.querySelector('.try-it');
const tryItCodeOverlay = document.querySelector('.try-it .code-overlay');

document.addEventListener('DOMContentLoaded', updateDocs);
document.addEventListener('DOMContentLoaded', addAnchors);

if (tryItCodeOverlay) {
  tryItCodeOverlay.addEventListener('click', handleShowCode);
}

window.addEventListener('resize', updateDocs);

function updateDocs() {
  // Sidenav
  if (sidenavDoc.el.classList.contains('large') && window.innerWidth <= 1279) {
    sidenavDoc.el.classList.remove('large');
    sidenavDoc.reset();
  } else if (!sidenavDoc.el.classList.contains('large') && window.innerWidth > 1279) {
    sidenavDoc.el.classList.add('large');
    sidenavDoc.reset();
  }

  // Scrollspy
  const right = content.getBoundingClientRect().right;

  scrollSpy.el.style.left = right + 'px';
}

function addAnchors() {
  const subtitles = Array.from(document.querySelectorAll('.subtitle'));
  subtitles.map((subtitle) => {
    const a = document.createElement('a');
    a.className = 'ml-2 subtitle-anchor';
    a.href = `#${subtitle.id}`;
    a.innerHTML = '#';
    subtitle.appendChild(a);
  });
}

function updateCode() {
  if (!tryItCodeOverlay.classList.contains('hide')) return;

  const tryItExample = tryIt.querySelector('.try-it-example');
  const htmlCode = tryIt.querySelector('.language-markup');

  if (htmlCode) {
    const code = Prism.plugins.NormalizeWhitespace.normalize(tryItExample.innerHTML);
    const html = Prism.highlight(code, Prism.languages.html, 'html').trim();
    htmlCode.innerHTML = html;
  }
}

function handleShowCode() {
  tryItCodeOverlay.classList.add('hide');
  updateCode();
}
