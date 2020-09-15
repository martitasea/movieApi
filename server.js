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
  res.render("pruebaHome", {
    title: "Pixel Movie",
  });
});

app.get("/films", (req, res) => {
  res.render("pruebaHome", {
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
      res.render("pruebaFilm", {
        film: myJson.Title,
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
  // Films/detail/:i? Param1=xx&param2=yy
  console.log(req.query.titulo)
  res.status(200).render("pruebaFilm", {
    film: req.query.titulo,
    director: req.params.director,
  });
});

/* ----------------------------------------------------------------------
---------------------------PAGINA DE EDITAR------------------------------
---------------------------------------------------------------------- */
// app.get("/films/edit/:id", (req, res) => {
//   // Films/detail/:i? Param1=xx&param2=yy
//   console.log(req.query.titulo)
//   res.status(200).render("pruebaForm", {
//     film: req.query.titulo,
//     director: req.params.director,
//   });
// });

/* ----------------------------------------------------------------------
---------------------------PAGINA DE FORMULARIO--------------------------
---------------------------------------------------------------------- */
app.get("/formulario", (req, res) => {
  res.status(200).render("pruebaForm", { title: "Formulario" });
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
