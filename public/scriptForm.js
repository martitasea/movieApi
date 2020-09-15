// ----------------------------------------------------------------------
// GUARDAR UNA PELÍCULA EN LOCAL STORAGE DESDE FORMULARIO
// ----------------------------------------------------------------------
// localStorage.clear();
function saveFilmDetails() {
  let filmsSaved = [];
  localStorage.getItem("filmsStored")
    ? (filmsSaved = JSON.parse(localStorage.getItem("filmsStored")))
    : (filmsSaved = []);

  let newFilms = {
    titulo: document.getElementById("titulo").value,
    director: document.getElementById("director").value,
    released: document.getElementById("released").value,
    runtime: document.getElementById("runtime").value,
    score: document.getElementById("score").value,
    watched: document.getElementById("watched").value,
    liked: document.getElementById("liked").value,
    poster: document.getElementById("poster").value,
  };

  // let position=getElementById("id")
  // Hacer dos tipos de guardado, si ya existe en lS guardar por id, si no existe hacer un push
  
  filmsSaved.push(newFilms);
  localStorage.setItem("filmsStored", JSON.stringify(filmsSaved));
}
document.getElementById("buttonSave").onclick = (e) => {
  // e.preventDefault();
  saveFilmDetails();
};