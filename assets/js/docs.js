let scrollSpy = new Axentix.ScrollSpy('#scrollspy-auto', {
  auto: {
    enabled: true,
    classes: 'mt-2 font-w500 pl-2 bd-l-solid bd-l-3',
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
  scrollSpy.el.style.left = content.getBoundingClientRect().right + 'px';
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
    const html = Prism.highlight(code, Prism.languages.html, 'html');
    htmlCode.innerHTML = html;
  }
}

function handleShowCode() {
  tryItCodeOverlay.classList.add('hide');
  updateCode();
}
