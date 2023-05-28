const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuración de la plantilla de vista
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//lista de los eventos creados
app.get('/list', (req, res) => {
  // Lee los eventos guardados y devuelve un JSON
  const eventTree = getEventTree();
  res.json(eventTree);
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
    res.end();
  }
});
// Ruta para ver detalles de un evento
app.get('/event/:date/:time', (req, res) => {
    const { date, time } = req.params;
    const eventFile = path.join(__dirname, 'events', date, `${time}.txt`);
  
    // Leer el contenido del archivo
    const content = fs.readFileSync(eventFile, 'utf8');
    let title = getTitleFromContent(content);
    let description = getDescriptionFromContent(content);
  
    const evento ={
      fecha: date,
      hora: time,
      titulo: title,
      descripcion: description
    };
    res.json(evento);
});

// Ruta para actualizar un evento (procesamiento del formulario de edición)
app.put('/event/:date/:time/update', (req, res) => {
  const { date, time } = req.params;
  const eventFile = path.join(__dirname, 'events', date, `${time}.txt`);
  const { title, description } = req.body;

  // Actualizar el contenido con los nuevos valores
  const updatedContent = `${title}\n${description}`;
  // Escribir el contenido actualizado en el archivo
  fs.writeFileSync(eventFile, updatedContent);
  res.end();
});

// Ruta para eliminar un evento
app.get('/event/:date/:time/delete', (req, res) => {
  const { date, time } = req.params;
  const eventFile = path.join(__dirname, 'events', date, `${time}.txt`);

  // Eliminar el archivo del evento
  fs.unlinkSync(eventFile);

  res.redirect('/list');
});
  

  

// Obtener la estructura de eventos
function getEventTree() {
  const folderPath = path.join(__dirname, 'events');

  const events = {};

  // Lee los nombres de las carpetas dentro de la carpeta "events"
  const folderNames = fs.readdirSync(folderPath);

  // Recorre cada carpeta por su nombre
  folderNames.forEach(folderName => {
    const folderPath = path.join(__dirname, 'events', folderName);

    // Verifica si es una carpeta
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);
      const eventFiles = files.filter(file => file.endsWith('.txt'));

      // Recorre los archivos de eventos de la carpeta actual
      eventFiles.forEach(eventFile => {
        const filePath = path.join(folderPath, eventFile);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Extrae el título y la descripción del archivo de texto
        let title = getTitleFromContent(fileContent);
        let description = getDescriptionFromContent(fileContent);
        let time = path.parse(eventFile).name;

        // Construye un objeto de evento
        const event = {
          date: folderName,
          time: time,
          title: title,
          description: description
        };

        // Agrega el evento al objeto de eventos, usando el nombre de la carpeta como clave
        if (!events[folderName]) {
          events[folderName] = [];
        }
        events[folderName].push(event);
      });
    }
  });

  return events;
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
  