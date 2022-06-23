const sidenav = new Axentix.Sidenav('#main-sidenav');
const collapsible = new Axentix.Axentix('collapsible');

const DocTheme = (() => {
  let navbarFixed, themeLightBtn, themeDarkBtn, themeSystemBtn, ethicaldAds;

  const updateActiveDropdown = () => {
    themeSystemBtn.classList.remove('active');
    themeDarkBtn.classList.remove('active');
    themeLightBtn.classList.remove('active');

    if (Axentix.Theme.themeMode === 'system') themeSystemBtn.classList.add('active');
    else if (Axentix.Theme.themeMode === 'light') themeLightBtn.classList.add('active');
    else themeDarkBtn.classList.add('active');
  };

  const onThemeChange = () => {
    if (ethicaldAds && Axentix.Theme.theme === 'light') {
      ethicaldAds.classList.remove('dark');
    } else if (ethicaldAds && Axentix.Theme.theme === 'dark') {
      ethicaldAds.classList.add('dark');
    }

    onScroll();

    updateActiveDropdown();
  };

  const onScroll = () => {
    const theme = Axentix.Theme.theme.replace('theme-', '');

    const colorClass = (theme && theme === 'dark') || (!theme && Axentix.isDarkMode()) ? 'dark-secondary-bg' : 'white';
    const navbar = navbarFixed.querySelector('.navbar');

    if ((navbar.classList.contains('dark-secondary-bg') && theme && theme === 'light') || !Axentix.isDarkMode())
      navbar.classList.remove('dark-secondary-bg');

    if (window.scrollY > navbarFixed.offsetTop + 20) navbar.classList.add('light-shadow-1', colorClass);
    else navbar.classList.remove('light-shadow-1', 'dark-secondary-bg', 'white');
  };

  const setup = () => {
    Axentix.Theme.enable();

    navbarFixed = document.querySelector('.navbar-fixed');
    window.addEventListener('scroll', onScroll);
    onScroll();
    ethicaldAds = document.querySelector('[data-ea-publisher="useaxentix-com"]');

    document.addEventListener('ax.theme.change', onThemeChange);

    themeLightBtn = document.querySelector('#toggle-light');
    themeLightBtn.addEventListener('click', () => Axentix.Theme.toggle('light'));

    themeDarkBtn = document.querySelector('#toggle-dark');
    themeDarkBtn.addEventListener('click', () => Axentix.Theme.toggle('dark'));

    themeSystemBtn = document.querySelector('#toggle-system');
    themeSystemBtn.addEventListener('click', () => Axentix.Theme.toggle('system'));

    onThemeChange();
  };

  return {
    setup,
  };
})();

document.addEventListener('DOMContentLoaded', DocTheme.setup);
