// Manipulacion de elementos del DOM
const botonMenu = document.getElementById('botonMenu');
const menuNavegacion = document.getElementById('menuNavegacion');
const formPQR = document.getElementById('formPQR');
const modalConfirmacion = document.getElementById('modalConfirmacion');
const cerrarModal = document.getElementById('cerrarModal');

// Alternar la visibilidad del menú de navegación
botonMenu.addEventListener('click', () => {
    menuNavegacion.classList.toggle('mostrar');
});

// Mostrar modal al enviar el formulario
formPQR.addEventListener('submit', (event) => {
    event.preventDefault(); 
    modalConfirmacion.style.display = 'flex';

    // Limpiar el formulario
    formPQR.reset();
});

// Cerrar el modal al hacer clic en la "X"
cerrarModal.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
    }
});
