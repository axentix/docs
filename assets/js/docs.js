let scrollSpy = new Axentix.ScrollSpy('#scrollspy-auto', {
  auto: {
    enabled: true,
    classes: 'mt-2 font-w500 pl-2 bd-l-solid bd-l-3',
    selector: 'h1,h2',
  },
});

const content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', updateDocs);
document.addEventListener('DOMContentLoaded', addAnchors);

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
