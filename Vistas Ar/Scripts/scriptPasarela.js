// Obtener los elementos para manipular el DOM
const tipoPlanElement = document.getElementById('tipo-plan');
const precioPlanElement = document.getElementById('precio-plan');
const nombrePlanElement = document.getElementById('nombre-plan');
const formpago = document.getElementById('formPago');
const modalConfirmacion = document.getElementById('modalConfirmacion');
const cerrarModal = document.getElementById('cerrarModal');

// Obtener el parámetro de la URL (plan seleccionado)
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get('plan') || 'premium'; 

// Función para actualizar el precio y la descripción del plan
function actualizarPlan() {
    const tipoPlan = tipoPlanElement.value; // Obtener si es 'mensual' o 'anual'
    let precio;

    if (plan === 'premium') {
        nombrePlanElement.textContent = 'Plan Premium';
        if (tipoPlan === 'mensual') {
            precio = '$34,000/mes';
        } else {
            precio = '$408,000/año'; 
        }
    } else if (plan === 'platino') {
        nombrePlanElement.textContent = 'Plan Platino';
        if (tipoPlan === 'mensual') {
            precio = '$50,000/mes';
        } else {
            precio = '$600,000/año'; 
        }
    }

    precioPlanElement.textContent = precio;
}

// Llamar a la función al cambiar el valor del selector
tipoPlanElement.addEventListener('change', actualizarPlan);

// Llamar a la función para inicializar el precio al cargar la página
actualizarPlan();

// Mostrar modal al enviar el formulario
formpago.addEventListener('submit', (event) => {
    event.preventDefault(); 
    modalConfirmacion.style.display = 'flex';

    // Limpiar el formulario
    formpago.reset();
});

// Cerrar el modal al hacer clic en la "X"
cerrarModal.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    window.location.href = 'dashboard.html';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        window.location.href = 'dashboard.html';
    }
});