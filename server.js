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
app.use("/films/:titulo", express.static(__dirname + "/public"));
app.use("/films/detail/:i", express.static(__dirname + "/public"));
app.use("/films/edit/:i", express.static(__dirname + "/public"));

// Motor de vista
app.set("view engine", "./views"); //De donde lee el pug
app.set("view engine", "pug"); //Definimos el motor de vista

//Rutas
app.get("/", (req, res) => {
  res.render("Home", {
    title: "Pixel Movie",
  });
});

app.get("/films", (req, res) => {
  res.render("Home", {
    title: "Pixel Movie",
  });
});

app.get("/films/:titulo", (req, res) => {
  titulo = req.params.titulo;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=ca4abc94`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.render("Film", {
        titulo: myJson.Title,
        poster: myJson.Poster,
        director: myJson.Director,
        released: myJson.Released,
        runtime: myJson.Runtime,
        actors: myJson.Actors,
        score: myJson.imdbRating,
        plot: myJson.Plot,
      });
    });
});
/* ----------------------------------------------------------------------
---------------------------PAGINA DE DETALLES----------------------------
---------------------------------------------------------------------- */
app.get("/films/detail/:id", (req, res) => {
  console.log(req.query.titulo)
  console.log(req.query.director)
  console.log(req.query.runtime)
  res.status(200).render("Film", {
    // titular: "Editar",
    titulo: req.query.titulo,
    director: req.query.director,
    id:req.query.id,
    released:req.query.released,
    runtime: req.query.runtime,
    poster:req.query.poster,
    watched:req.query.watched,
    liked:req.query.liked,
    score:req.query.score
  });
});

/* ----------------------------------------------------------------------
---------------------------PAGINA DE EDITAR------------------------------
---------------------------------------------------------------------- */
app.get("/films/edit/:id", (req, res) => {
  res.status(200).render("Form", {
    titulo: req.query.titulo,
    director: req.query.director,
    id:req.query.id,
    released:req.query.released,
    runtime: req.query.runtime,
    poster:req.query.poster,
    watched:req.query.watched,
    liked:req.query.liked,
    score:req.query.score
  });
});

/* ----------------------------------------------------------------------
---------------------------PAGINA DE FORMULARIO--------------------------
---------------------------------------------------------------------- */
app.get("/formulario", (req, res) => {
  res.status(200).render("Form", { title: "Formulario" });
});

app.post("/exito", (req, res) => {
  console.log("hola");
  res.status(200).redirect("/");
});
/* ----------------------------------------------------------------------
-------------------------ENRUTAMIENTO CON LA API-------------------------
---------------------------------------------------------------------- */
// app.get("/api/films", (req, res) => {
//   res.status(200).send("Bienvenido a mi película");
// });

// app.get("/api/films/:titulo", (req, res) => {
//   titulo = req.params.title;
//   fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}`)
//     .thes(function (response) {
//       return response.json();
//     })
//     .then(function (myJson) {
//       res.send(
//         "Me has preguntado por la película " +
//           myJson.Title +
//           ". El director es " +
//           myJson.Director +
//           ". El año es " +
//           myJson.Year +
//           "."
//       );
//     });
// });
/* ----------------------------------------------------------------------
------------------------TODAS LAS DEMÁS PÁGINAS--------------------------
---------------------------------------------------------------------- */
app.get("*", (req, res) => {
  res.status(404).render("error", { title: "Error" });
});

/* ----------------------------------------------------------------------
---------------DEFINICIÓN DEL PUERTO AL QUE TIENEN QUE ATENDER-----------
---------------------------------------------------------------------- */
app.listen(port, () => {
  console.log(
    `Tu servidor local está en la siguiente ruta http://localhost:${port}`
  );
});
