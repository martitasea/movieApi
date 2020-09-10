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