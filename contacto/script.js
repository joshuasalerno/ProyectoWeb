

// ============================
// MENÚ HAMBURGUESA 
// ============================
const btn = document.getElementById('hamburger-btn');
const menu = document.querySelector('.nav-links');

btn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');
});

window.addEventListener('click', (e) => {
  if (menu.classList.contains('show') && !menu.contains(e.target) && e.target !== btn) {
    menu.classList.remove('show');
  }
});

