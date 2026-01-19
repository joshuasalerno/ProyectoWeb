
// ======= MENU HAMBURGUESA =======
const btn = document.getElementById('hamburger-btn');
const menu = document.querySelector('.nav-links');

// Toggle del menú al pulsar el botón
btn.addEventListener('click', (e) => {
  e.stopPropagation(); // evita que el click burbujee y lo cierre inmediatamente
  menu.classList.toggle('show');
});

// Cerrar el menú si se hace click fuera
window.addEventListener('click', (e) => {
  if (menu.classList.contains('show') && !menu.contains(e.target) && e.target !== btn) {
    menu.classList.remove('show');
  }
});
