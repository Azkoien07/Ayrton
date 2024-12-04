document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Crear la gráfica
    const myChart = new Chart(ctx, {
      type: 'line', // Tipo de gráfica
      data: {
        labels: ['Nov 9, 2024', 'Nov 10, 2024', 'Nov 11, 2024', 'Nov 12, 2024', 'Nov 13, 2024'], // Etiquetas
        datasets: [{
          label: 'Progreso',
          data: [4, 2, 3, 2, 4], // Datos de progreso
          borderColor: '#2D4A53', // Color de la línea
          backgroundColor: 'rgba(45, 74, 83, 0.2)', // Color del área debajo de la línea
          borderWidth: 2, // Ancho de la línea
          pointBackgroundColor: '#5055df', // Color de los puntos
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Ocultar la leyenda si no es necesaria
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fechas',
              color: '#4d4d4d',
              font: {
                size: 14
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Puntaje',
              color: '#4d4d4d',
              font: {
                size: 14
              }
            },
            min: 0,
            max: 5
          }
        }
      }
    });
});
