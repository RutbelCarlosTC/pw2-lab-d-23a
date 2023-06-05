//Usando framework express
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

//Configuracion de la plantilla de vista
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//lista de los eventos creados
app.get('/list', (req, res) => {
  //Lee los eventos guardados y devuelve un JSON
  const eventTree = getEventTree();
  res.json(eventTree);
});

//Ruta para crear un evento
app.post('/event', (req, res) => {
  const { date, time, title, description } = req.body;
  const eventPath = path.join(__dirname, 'events', date);
  const eventFile = path.join(eventPath, `${time}.txt`);

  //Verificar si el archivo del evento ya existe
  if (fs.existsSync(eventFile)) {
    res.send('El evento ya existe.');
  } else {
    //Crear el directorio de la fecha si no existe
    if (!fs.existsSync(eventPath)) {
      fs.mkdirSync(eventPath);
    }
    //Guardar el evento en el archivo
    fs.writeFileSync(eventFile, `${title}\n${description}`);
    res.end();
  }
});

app.get('/event/:date/:time', (req, res) => {
  //Obtener la descripcion del contenido de un evento
});

app.put('/event/:date/:time/update', (req, res) => {
  //Ruta para actualizar un evento (procesamiento del formulario de edicion
});

app.delete('/event/:date/:time/delete', (req, res) => {
  //Ruta para eliminar un evento
});

function getEventTree() {
  // Obtener la estructura JSON de eventos
}
function getTitleFromContent(content) {
  //Obtener el titulo del contenido de un evento

}
function getDescriptionFromContent(content) {
  //Obtener la descripcion del contenido de un evento
}
//Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
