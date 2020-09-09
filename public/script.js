// console.log(pelicula.value);
function getFilmDetails() {
  let pelicula = document.getElementById("movSearch");

  console.log("hola");
  location.replace("/films/" + pelicula.value);
  //   console.log(pelicula);
}

document
  .getElementById("buttonSearch")
  .addEventListener("click", getFilmDetails);

function saveFilmDetails() {
  //   console.log("hola");
  let pelicula = document.getElementById("movSave");
  localStorage.setItem("peliculas", { titulo: pelicula.value });
}

document
  .getElementById("buttonSave")
  .addEventListener("click", saveFilmDetails);

// document
//   .getElementById("name")
//   .addEventListener("click", newFilmDetails);
