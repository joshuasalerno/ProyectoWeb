// ============================
// CONFIGURACIÓN BÁSICA
// ============================
const adminPassword = "admin123"; 
const XML_FILE = "eventos.xml";

let eventos = [];

// ============================
// CARGAR XML INICIAL
// ============================
async function cargarEventosDesdeXML() {
    try {
        const res = await fetch(XML_FILE + "?_=" + Date.now()); // evitar caché
        const xmlText = await res.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const items = xml.getElementsByTagName("evento");
        eventos = [];

        for (let ev of items) {
            eventos.push({
                fecha: ev.getElementsByTagName("fecha")[0].textContent,
                titulo: ev.getElementsByTagName("titulo")[0].textContent,
                descripcion: ev.getElementsByTagName("descripcion")[0].textContent
            });
        }

        mostrarEventos();
    } catch (err) {
        console.error(err);
        alert("No se pudo cargar el archivo XML de eventos.");
    }
}

// ============================
// MOSTRAR EN PÁGINA PRINCIPAL
// ============================
function mostrarEventos() {
    const container = document.getElementById("eventos-container");
    container.innerHTML = "";

    eventos.forEach(ev => {
        const fechaFormateada = ev.fecha.split("-").reverse().join("/");

        container.innerHTML += `
            <div class="evento">
                <div class="fecha">${fechaFormateada}</div>
                <div class="titulo">${ev.titulo}</div>
                <div class="descripcion">${ev.descripcion}</div>
            </div>
        `;
    });
}

// ============================
// MOSTRAR EN PANEL ADMIN
// ============================
function mostrarEventosAdmin() {
    const lista = document.getElementById("lista-eventos");
    lista.innerHTML = "";

    eventos.forEach((ev, index) => {
        const fechaFormateada = ev.fecha.split("-").reverse().join("/");

        lista.innerHTML += `
            <li>
                ${fechaFormateada} - ${ev.titulo}
                <button class="eliminar-btn" onclick="eliminarEvento(${index})">X</button>
            </li>
        `;
    });
}

// ============================
// AÑADIR EVENTO
// ============================
document.getElementById("evento-form").addEventListener("submit", function(e) {
    e.preventDefault();

    eventos.push({
        fecha: document.getElementById("fecha").value,
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value
    });

    mostrarEventos();
    mostrarEventosAdmin();
    generarXMLparaDescargar();
    this.reset();
});

// ============================
// ELIMINAR EVENTO
// ============================
function eliminarEvento(index) {
    eventos.splice(index, 1);
    mostrarEventos();
    mostrarEventosAdmin();
    generarXMLparaDescargar();
}

// ============================
// GENERAR XML Y DESCARGAR
// ============================
function generarXMLparaDescargar() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<eventos>\n`;

    eventos.forEach(ev => {
        xml += `  <evento>\n`;
        xml += `    <fecha>${ev.fecha}</fecha>\n`;
        xml += `    <titulo>${ev.titulo}</titulo>\n`;
        xml += `    <descripcion>${ev.descripcion}</descripcion>\n`;
        xml += `  </evento>\n`;
    });

    xml += `</eventos>`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "eventos.xml";
    a.click();

    URL.revokeObjectURL(url);
}

// ============================
// MODAL ADMIN 
// ============================
const modal = document.getElementById("admin-modal");
const btnAdmin = document.getElementById("admin-btn");
const closeModal = document.getElementById("close-modal");

btnAdmin.onclick = function() {
    const pass = prompt("Introduce la contraseña de administrador:");
    if (pass === adminPassword) {
        modal.style.display = "block";
        mostrarEventosAdmin();
    } else if (pass !== null) {
        alert("Contraseña incorrecta.");
    }
};

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

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

// ============================
// INICIO
// ============================
cargarEventosDesdeXML();
