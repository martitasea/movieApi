// GUARDAR UNA PELÍCULA EN LOCAL STORAGE---------------------------------
localStorage.clear();
let filmsSaved = [];
function saveFilmDetails() {
  localStorage.getItem("peliculas")
    ? (filmsSaved = JSON.parse(localStorage.getItem("peliculas")))
    : (filmsSaved = []);
  console.log(typeof filmsSaved);
  let newFilms = {
    titulo: document.getElementById("film").value,
  };
  console.log("has introducido la pelicula " + newFilms.titulo);
  filmsSaved.push(newFilms);
  filmsSaved = JSON.stringify(filmsSaved);
  localStorage.setItem("peliculas", filmsSaved);
}
document.getElementById("buttonSave").onclick = (e) => {
  e.preventDefault();
  saveFilmDetails();
};
