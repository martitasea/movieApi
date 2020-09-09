// Ejercicio API REST:
// API de pelis:
// http://www.omdbapi.com/
// [GET] dame una pelicula por titulo. Devuelve JSON. Ruta: api/films/:titulo
// Para tus favoritas( fakear BBDD con LocalStorage):
// [POST] crea una pelicula y guarda. Devuelve un status 200. Ruta: api/films
// [GET] Dame todas las peliculas guardadas. Devuelve un array de JSON. Ruta: /api/films
// [DELETE] borra una pelicula api/films
// [PUT] actualiza una peli guardada en LocalStorage api/films/:id
// Parte Web:
// - Crear home.pug, film.pug
// [GET] Home de la app. Debe mostrar home.pug "/" o "/films"
// [GET] Te muestra en HTML detalles de una peli por título. Debe mostrar film.pug   /films/:titulo
// [GET] Muestra formulario HTML para crear nueva película. Cuando envíes formulario debe hacer un POST. Debe mostrar formulario.pug  Ruta: /films/create
// Si la ruta no existe, se debe devolver 404 Not

const port = 3000;
const express = require("express");
const fetch = require("node-fetch");
const bodyParser=require("body-parser");
const app = express();
const apikey = "ca4abc94";
let titulo = "gladiator";

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Motor de vista
app.set("view engine", "./views"); //De donde lee el pug
app.set("view engine", "pug"); //Definimos el motor de vista

//Rutas
app.get("/", (req, res) => {
  res.render("home", {
    title: "Films",
    message: "Bienvenido a la página de películas",
  });
});

app.get("/films", (req, res) => {
  res.render("home", {
    title: "Films",
    message: "Bienvenido a la página de películas",
  });
});

app.get("/films/:titulo", (req, res) => {
  titulo = req.params.titulo;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.render("film", {
        title: myJson.Title,
        pelicula: myJson.Title,
        fecha: myJson.Year,
        actores: myJson.Actors,
        director: myJson.Director,
        premios: myJson.Awards,
        ruta: myJson.Poster,
      });
    });
});

app.get("/api/films", (req, res) => {
  res.status(200).send("Bienvenido a mi película");
});

app.get("/api/films/:titulo", (req, res) => {
  titulo = req.params.title;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}`)
    .thes(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.send(
        "Me has preguntado por la película " +
          myJson.Title +
          ". El director es " +
          myJson.Director +
          ". El año es " +
          myJson.Year +
          "."
      );
    });
});

app.post("/formulario", (req, res)=>{
  console.log(req.body)
  res
  .status(200)
  .json({mensaje:`Hola, ${req.body.name}`})
});


app.get("/formulario", (req,res)=>{
  res.status(200).render("form", {title:"Formulario"})
});

app.get("*", (req, res) => {
  res.status(404).render("error", { title: "Error" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
