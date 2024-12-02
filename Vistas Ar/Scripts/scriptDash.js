document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendary');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        editable: true,
        selectable: true,
    });

    calendar.render();
    window.miCalendario = calendar; // Hacer el calendario accesible globalmente
});

document.getElementById("hamburgerBtn").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("visible");
});