const port = 3000;
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const apikey = "ca4abc94";
let titulo = "gladiator";


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

// PAGINA DE FORMULARIO
app.get("/formulario", (req, res) => {
  res.status(200).render("form", { title: "Formulario" });
});

app.post("/exito", (req, res) => {
  // console.log("HOla"+req.body.film)
  res.status(200).render("exito", {
    title: "Éxito",
    message: "Bienvenido a la página de películas",
  });
});
// .json({mensaje:"HOlita Json"+req.body.film})});

app.get("*", (req, res) => {
  res.status(404).render("error", { title: "Error" });
});

// DEFINICIÓN DEL PUERTO AL QUE TIENEN QUE ATENDER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
