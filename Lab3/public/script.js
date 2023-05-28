function mostrarLista() {
  fetch('http://localhost:3000/list')
  .then(response => response.json())
  .then(events => {
    console.log(events);
    let html = '<h1>Agenda Personal</h1>\n';
    html += '<h2>Ver eventos</h2>\n';

    html += '<ul>\n';

    // Itera sobre las fechas y eventos del JSON
    for (const date in events) {
      if (events.hasOwnProperty(date)) {
        const eventsForDate = events[date];
        html += `<li>${date}<ul>`;
        // Itera sobre los eventos de la fecha y crea elementos de lista para cada uno
        eventsForDate.forEach(event => {
          html += `
        <li>
          <a href="#" onclick="verEvento('${event.date}','${event.time}')">${event.time}->[${event.title}]</a>
          <a href="#" onclick="editarEvento('${event.date}','${event.time}')">Editar</a>   
          <a href="#" onclick="borrarEvento('${event.date}','${event.time}')">Eliminar</a>
        </li>
        `;

        });
        html += '</ul></li>';
      }
    }      
    html += '</ul>';
    html +='<br>';
    html += '<button type="button" onclick="formCrearEvento()">CREAR NUEVO EVENTO</button>';
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = html;
  })
  .catch(error => {
    console.error('Error al obtener el HTML:', error);
  });
}