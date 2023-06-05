function mostrarLista() {
  //fetch (GET) para obtener JSON de estructura de eventos y mostrarlos como lista HTML
}
function formCrearEvento(){
  //formulario html para crear un evento
}
function crearEvento(){
  //fetch para crear un evento
  console.log("hola llego a crear evento");

  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  const data = {
    date:date,
    time:time,
    title:title,
    description:description
  }
  console.log(data);
  const request = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  const url = `http://localhost:3000/event`;

  fetch(url,request)
  .then(function(response) {
    if(response.ok){
      mostrarLista();
    }else{
      console.log('Error al enviar los datos');
    }
  })
  .catch(error =>{
    console.log('Error al crear archivo:',error);
  });
  
}
function verEvento(date,time){
  //fetch (GET) para ver un evento
}
function editarEvento(date,time){
  //formulario para editar un evento
}
function actualizarEvento(date,time){
  //fetch (PUT) para actualizar un evento
}
function borrarEvento(date,time){
  //fetch (DELETE)para borrar un evento
}
