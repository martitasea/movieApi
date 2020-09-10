// BUSCAR UNA PELÍCULA EN LA API-----------------------------------------
function getFilmDetails() {
  let pelicula = document.getElementById("movSearch");

  console.log("hola");
  location.replace("/films/" + pelicula.value);
  //   console.log(pelicula);
}
document
  .getElementById("buttonSearch")
  .addEventListener("click", getFilmDetails);

