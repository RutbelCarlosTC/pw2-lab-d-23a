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
function formCrearEvento(){
  let html='<h2>Crear evento</h2>';
  html += `
      <form>
        <label for="date">Fecha:</label>
        <input type="date" id="date" name="date" required><br>
        <label for="time">Hora:</label>
        <input type="time" id="time" name="time" required><br>
        <label for="title">Título:</label>
        <input type="text" id="title" name="title" required><br>
        <label for="description">Descripción:</label>
        <textarea id="description" name="description" required></textarea><br>
        <button type="button" onclick="crearEvento()">Crear</button>
      </form>
  `;
  const mainDiv = document.getElementById('main');
  mainDiv.innerHTML = html;
}
function verEvento(date,time){
  fetch(`http://localhost:3000/event/${date}/${time}`)
  .then(response => response.json())
  .then(data => {
    let html = `
      <h1>Detalles del evento</h1>
      <h2>Fecha: ${data.fecha}</h2>
      <h2>Hora: ${data.hora}</h2>
      <h2>Titulo: ${data.titulo}</h2>
      <h2>Descripcion:</h2>
      <p>${data.descripcion}</p>
      <a href="#" onclick="mostrarLista()">Volver</a>
    `;
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = html;
  })
  .catch(error =>{
    console.error('Error al obtener detalles de evento: ',error);
  });
}