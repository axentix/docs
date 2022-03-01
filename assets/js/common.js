const sidenav = new Axentix.Sidenav('#main-sidenav');
const collapsible = new Axentix.Axentix('collapsible');

const AxentixTheme = (() => {
  let navbarFixed,
    themeMode = 'system',
    theme,
    themeLightBtn,
    themeDarkBtn,
    themeSystemBtn;

  const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const updateActiveDropdown = () => {
    themeSystemBtn.classList.remove('active');
    themeDarkBtn.classList.remove('active');
    themeLightBtn.classList.remove('active');

    if (themeMode === 'system') themeSystemBtn.classList.add('active');
    else if (themeMode === 'light') themeLightBtn.classList.add('active');
    else themeDarkBtn.classList.add('active');
  };

  const toggleDarkMode = (forceTheme = 'system') => {
    themeMode = forceTheme;

    if (forceTheme === 'system') {
      forceTheme = isDarkMode() ? 'dark' : 'light';
      localStorage.removeItem('ax-theme');
    }

    if (forceTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      theme = 'light';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      theme = 'dark';
    }

    onScroll();

    updateActiveDropdown();

    if (themeMode !== 'system') localStorage.setItem('ax-theme', theme);
  };

  const onScroll = () => {
    const colorClass = (theme && theme === 'dark') || (!theme && isDarkMode()) ? 'dark-secondary-bg' : 'white';
    const navbar = navbarFixed.querySelector('.navbar');

    if ((navbar.classList.contains('dark-secondary-bg') && theme && theme === 'light') || !isDarkMode())
      navbar.classList.remove('dark-secondary-bg');

    if (window.scrollY > navbarFixed.offsetTop + 20) navbar.classList.add('light-shadow-1', colorClass);
    else navbar.classList.remove('light-shadow-1', 'dark-secondary-bg', 'white');
  };

  const setup = () => {
    navbarFixed = document.querySelector('.navbar-fixed');
    window.addEventListener('scroll', onScroll);
    onScroll();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => themeMode === 'system' && toggleDarkMode('system'));

    themeLightBtn = document.querySelector('#toggle-light');
    themeLightBtn.addEventListener('click', () => toggleDarkMode('light'));

    themeDarkBtn = document.querySelector('#toggle-dark');
    themeDarkBtn.addEventListener('click', () => toggleDarkMode('dark'));

    themeSystemBtn = document.querySelector('#toggle-system');
    themeSystemBtn.addEventListener('click', () => toggleDarkMode('system'));

    const localTheme = localStorage.getItem('ax-theme');
    if (localTheme) toggleDarkMode(localTheme);
    else toggleDarkMode('system');
  };

  return {
    setup,
  };
})();

document.addEventListener('DOMContentLoaded', AxentixTheme.setup);
