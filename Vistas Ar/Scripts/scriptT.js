// Selección de elementos del DOM
const btnNuevaTarea = document.getElementById('añadir-tarea');
const modal = document.getElementById('tarea-modal');
const tareaFormulario = document.getElementById('tarea-formulario');
const listaTareas = document.querySelector('.lista-tareas');
let tareaEditando = null;

// Función para asignar la clase de color según la prioridad
function obtenerClasePrioridad(prioridad) {
    return `prioridad-${prioridad.toLowerCase()}`;
}

// Mostrar el modal
btnNuevaTarea.addEventListener('click', () => {
    modal.classList.remove('modal-hidden');
    tareaFormulario.reset();
    tareaEditando = null;
});

// Crear o actualizar una tarea
tareaFormulario.addEventListener('submit', (Event) => {
    Event.preventDefault();

    const titulo = document.getElementById('tarea-titulo').value;
    const descripcion = document.getElementById('tarea-descripcion').value;
    const prioridad = document.getElementById('tarea-prioridad').value;
    const fecha = document.getElementById('tarea-fecha').value || new Date().toISOString();

    if (tareaEditando) {
        // Editar tarea existente
        tareaEditando.querySelector('h3').textContent = titulo;
        tareaEditando.querySelector('p').textContent = descripcion;
        const prioridadSpan = tareaEditando.querySelector('.prioridad');
        prioridadSpan.textContent = prioridad;
        prioridadSpan.className = `prioridad ${obtenerClasePrioridad(prioridad)}`;

        // Actualizar el evento en el calendario
        const eventoAEditar = miCalendario.getEvents().find(e => e.id === tareaEditando.dataset.id);
        if (eventoAEditar) {
            eventoAEditar.setProp('title', titulo);
            eventoAEditar.setStart(fecha);
            eventoAEditar.setProp('color', coloresPrioridad[prioridad]);
        }
    } else {
        // Crear nueva tarea
        const idUnico = `tarea-${Date.now()}`;
        const nuevaTarea = document.createElement('li');
        nuevaTarea.classList.add('tarea');
        nuevaTarea.dataset.id = idUnico;
        nuevaTarea.innerHTML = `
            <div class="tarea-info">
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <span class="prioridad ${obtenerClasePrioridad(prioridad)}">${prioridad}</span>
            </div>
            <div class="tarea-acciones">
                <button class="editar-tarea">Editar</button>
                <button class="eliminar-tarea">Eliminar</button>
            </div>
        `;
        listaTareas.appendChild(nuevaTarea);

        // Agregar la tarea al calendario
        miCalendario.addEvent({
            id: idUnico,
            title: titulo,
            start: fecha,
            color: coloresPrioridad[prioridad], // Asegúrate de tener un objeto coloresPrioridad definido
        });
    }

    // Cerrar el modal
    tareaFormulario.reset();
    modal.classList.add('modal-hidden');
});

// Editar tarea
listaTareas.addEventListener('click', (Event) => {
    if (Event.target.classList.contains('editar-tarea')) {
        const tarea = Event.target.closest('.tarea');
        const titulo = tarea.querySelector('h3').textContent;
        const descripcion = tarea.querySelector('p').textContent;
        const prioridad = tarea.querySelector('.prioridad').textContent.toLowerCase();

        document.getElementById('tarea-titulo').value = titulo;
        document.getElementById('tarea-descripcion').value = descripcion;
        document.getElementById('tarea-prioridad').value = prioridad;

        modal.classList.remove('modal-hidden');
        tareaEditando = tarea;
    }
});

// Eliminar tarea
listaTareas.addEventListener('click', (Event) => {
    if (Event.target.classList.contains('eliminar-tarea')) {
        const tarea = Event.target.closest('.tarea');

        // Eliminar tarea de la lista
        tarea.remove();
    }
});