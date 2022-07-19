const tryIt = document.querySelector('.try-it');
const tryItCodeOverlay = document.querySelector('.try-it .code-overlay');
const loadInitalContent = tryIt && tryIt.classList.contains('try-it-load-initial');

let initialContent,
  isTryItInit = true;

if (tryItCodeOverlay) tryItCodeOverlay.addEventListener('click', handleShowCode);

if (loadInitalContent) {
  initialContent = tryIt.querySelector('.try-it-example').innerHTML;
}

function updateCode() {
  if (!tryItCodeOverlay.classList.contains('hide')) return;

  const tryItExample =
    loadInitalContent && isTryItInit ? initialContent : tryIt.querySelector('.try-it-example').innerHTML;
  const htmlCode = tryIt.querySelector('.language-markup');

  if (isTryItInit) isTryItInit = false;

  if (htmlCode) {
    const code = Prism.plugins.NormalizeWhitespace.normalize(tryItExample);
    const html = Prism.highlight(code, Prism.languages.html, 'html');
    htmlCode.innerHTML = html;
  }
}

function handleShowCode() {
  tryItCodeOverlay.classList.add('hide');
  updateCode();
}
