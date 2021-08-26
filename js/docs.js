let sidenavDoc = new Axentix.Sidenav('#main-sidenav');

setTimeout(() => {
  let collapsible = new Axentix('collapsible');
}, 50);

let scrollSpy = new Axentix.ScrollSpy('#scrollspy-auto', {
  auto: {
    enabled: true,
    classes: 'txt-grey mt-2 font-w500 pl-2 bd-l-solid bd-l-3',
    selector: 'h1,h2'
  }
});

const content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', updateDocs);
document.addEventListener('DOMContentLoaded', addAnchors);
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
  subtitles.map(subtitle => {
    const a = document.createElement('a');
    a.className = 'ml-2 subtitle-anchor';
    a.href = `#${subtitle.id}`;
    a.innerHTML = '#';
    subtitle.appendChild(a);
  });
}
