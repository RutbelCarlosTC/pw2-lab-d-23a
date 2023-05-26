const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuración de la plantilla de vista
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//lista
app.get('/list', (req, res) => {
  // Lee los eventos guardados y genera el contenido HTML
  const eventTree = getEventTree();
  const html = generateEventListHTML(eventTree);
  res.send(html);
});
// Ruta para crear un evento
app.post('/event', (req, res) => {
    const { date, time, title, description } = req.body;
    const eventPath = path.join(__dirname, 'events', date);
    const eventFile = path.join(eventPath, `${time}.txt`);
  
    // Verificar si el archivo del evento ya existe
    if (fs.existsSync(eventFile)) {
      res.send('El evento ya existe.');
    } else {
      // Crear el directorio de la fecha si no existe
      if (!fs.existsSync(eventPath)) {
        fs.mkdirSync(eventPath);
      }
  
      // Guardar el evento en el archivo
      fs.writeFileSync(eventFile, `${title}\n${description}`);
  
      res.redirect('/list');
    }
  });
// Ruta para ver detalles de un evento
app.get('/event/:date/:time', (req, res) => {
    const { date, time } = req.params;
    const eventFile = path.join(__dirname, 'events', date, `${time}.txt`);
  
    // Leer el contenido del archivo
    const content = fs.readFileSync(eventFile, 'utf8');
  
    const html = `
      <h1>Detalles del evento</h1>
      <h2>Fecha: ${date}</h2>
      <h2>Hora: ${time}</h2>
      <h2>Contenido:</h2>
      <p>${content}</p>
      <a href="/list">Volver</a>
    `;
  
    res.send(html);
  });
  
// Obtener la estructura de eventos
function getEventTree() {
    const eventsPath = path.join(__dirname, 'events');
    const dates = fs.readdirSync(eventsPath);
    const eventTree = [];
  
    for (const date of dates) {
      const datePath = path.join(eventsPath, date);
      const files = fs.readdirSync(datePath);
      const eventFiles = [];
  
      for (const file of files) {
        const filePath = path.join(datePath, file);
        const stats = fs.statSync(filePath);
        
        const content = fs.readFileSync(filePath, 'utf8');
        const titleEvent = getTitleFromContent(content);
        
        // Agregar solo archivos de texto al árbol de eventos
        if (stats.isFile() && path.extname(file) === '.txt') {
          const time = path.basename(file, '.txt');
          eventFiles.push({
            time,
            file: `${date}/${file}`,
            title: titleEvent,
          });
        }
      }
  
      if (eventFiles.length > 0) {
        eventTree.push({
          date,
          files: eventFiles,
        });
      }
    }
  
    return eventTree;
  }
  
  // Generar el HTML para la lista de eventos
  function generateEventListHTML(eventTree) {
    let html = '<h1>Agenda Personal</h1>';
  
    html += '<h2>Ver eventos</h2>';
    html += '<ul>';
  
    eventTree.forEach(date => {
      html += `<li>${date.date}<ul>`;
  
      date.files.forEach(file => {
        html += `
          <li>
            <a href="/event/${date.date}/${file.time}">${file.time}->[${file.title}]</a>
            <a href="/event/${date.date}/${file.time}/delete" onclick="return confirm('¿Estás seguro de eliminar este evento?')">Eliminar</a>
            <a href="/event/${date.date}/${file.time}/edit">Editar</a>
          </li>
        `;
      });
  
      html += '</ul></li>';
    });
  
    html += '</ul>';
  
    html += `
      <h2>Crear evento</h2>
      <form action="/event" method="POST">
        <label for="date">Fecha:</label>
        <input type="date" id="date" name="date" required><br>
        <label for="time">Hora:</label>
        <input type="time" id="time" name="time" required><br>
        <label for="title">Título:</label>
        <input type="text" id="title" name="title" required><br>
        <label for="description">Descripción:</label>
        <textarea id="description" name="description" required></textarea><br>
        <button type="submit">Crear</button>
      </form>
    `;
  
    return html;
  }
  
  // Obtener el título del contenido de un evento
  function getTitleFromContent(content) {
    const lines = content.split('\n');
    return lines[0];
  }
  
  // Obtener la descripción del contenido de un evento
  function getDescriptionFromContent(content) {
    const lines = content.split('\n');
    return lines.slice(1).join('\n');
  }
  
  // Iniciar el servidor
  app.listen(3000, () => {
    console.log(`Servidor iniciado en http://localhost:3000`);
  });
  