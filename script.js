window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            themeToggle.checked = true;
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        let theme = 'light-theme';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
        }
        localStorage.setItem('theme', theme);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.checked = !themeToggle.checked;
        document.body.classList.toggle('dark-theme');

        let theme = 'light-theme';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
        }
        localStorage.setItem('theme', theme);
    }
});

function openDialog(event, id) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'flex';
        disableScroll();

    }
}

function closeDialog(event, button) {
    event.preventDefault();
    const dialog = button.closest('.dialog');
    if (dialog) {
        dialog.style.display = 'none';
        document.body.classList.remove('dialog-open');
        enableScroll();
    }
}

function disableScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  const scrollY = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.dataset.scrollY = scrollY;
}

function enableScroll() {
  const scrollY = document.body.dataset.scrollY;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  window.scrollTo(0, parseInt(scrollY || '0'));
}