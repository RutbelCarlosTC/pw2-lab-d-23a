function mostrarLista() {

    fetch('http://localhost:3000/list')
    .then(response => response.text())
    .then(html => {
        console.log(html);
      const mainDiv = document.getElementById('main');
      mainDiv.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al obtener el HTML:', error);
    });
}