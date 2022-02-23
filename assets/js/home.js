var sidenav = new Axentix.Sidenav('#main-sidenav');
var collapsible = new Axentix.Axentix('collapsible');

const HomeAxentix = (() => {
  let hiddenSentence,
    sentenceCheckbox,
    colors,
    colorComponent,
    btnColors,
    currentColor = 'blue',
    neuSwitch,
    neuElems,
    neuTheme = 'dark',
    navbarFixed;

  const updateSentence = () => {
    sentenceCheckbox.checked ? hiddenSentence.classList.add('visible') : hiddenSentence.classList.remove('visible');
  };

  /** Colors */
  const updateColors = (e) => {
    if (e) updateColorComponentVars(window.getComputedStyle(e.target).backgroundColor);
    const selectedColor = e ? e.target.dataset.colorBtn : currentColor;

    colors.map((color) => {
      const type = color.dataset.colors.split(',');
      type.map((colType) => {
        if (colType === 'text' || colType === 'bd') {
          color.classList.remove(`${colType}-${currentColor}`);
          color.classList.add(`${colType}-${selectedColor}`);
        } else if (colType === 'bg') {
          color.classList.remove(currentColor);
          color.classList.add(selectedColor);
        }
      });
    });

    currentColor = selectedColor;
  };

  const updateColorComponentVars = (colorCode) => {
    colorComponent.style.setProperty('--ax-form-switch-active-color', colorCode);
  };

  /** Neu */
  const switchNeuTheme = () => {
    neuElems.map((elem) => {
      elem.classList.remove(`neu-${neuTheme}`);
      neuTheme = neuTheme === 'light' ? 'dark' : 'light';
      elem.classList.add(`neu-${neuTheme}`);
    });
  };

  const onScroll = () => {
    const navbar = navbarFixed.querySelector('.navbar');
    if (window.scrollY > navbarFixed.offsetTop + 20) navbar.classList.add('white', 'light-shadow-1');
    else navbar.classList.remove('white', 'light-shadow-1');
  };

  const setup = () => {
    hiddenSentence = document.querySelector('#hidden-sentence');
    if (hiddenSentence) {
      sentenceCheckbox = document.querySelector('#sentence-checkbox');

      sentenceCheckbox.addEventListener('change', updateSentence);
    }

    colors = Array.from(document.querySelectorAll('[data-colors]'));
    btnColors = Array.from(document.querySelectorAll('[data-color-btn]'));
    colorComponent = document.querySelector('.color-components');

    updateColors();

    btnColors.map((btn) => btn.addEventListener('click', updateColors));

    neuSwitch = document.querySelector('#neu-switch');
    neuSwitch.addEventListener('change', switchNeuTheme);

    neuElems = Array.from(document.querySelectorAll('[data-neu]'));

    navbarFixed = document.querySelector('.navbar-fixed');
    window.addEventListener('scroll', onScroll);
    onScroll();
  };

  return {
    setup,
  };
})();

document.addEventListener('DOMContentLoaded', HomeAxentix.setup);
