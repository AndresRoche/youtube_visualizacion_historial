const localStorage = window.localStorage;
var db;
let openRequest = indexedDB.open("DB", 1);

const dbPromise = new Promise((resolve, reject) => {
  /*  Evento de cuando la base de dato ve que no hay BD o cuando se necesite
   *    Actualizar la DB.
   */
  openRequest.onupgradeneeded = function () {
    // se dispara si el cliente no tiene la base de datos
    // ...ejecuta la inicialización...
    // AQUI PASARIA ToDa la data del localstorage aa indexdDB
    console.log("NO Tienes la BAse De Datos");

    //Codigo en caso que cambie la structura de la vase de datos
    // la versión de la base existente es menor que 2 (o ni siquiera existe)
    /* let db = openRequest.result;
     switch(event.oldVersion) { // versión de db existente
       case 0:
         // version 0 significa que el cliente no tiene base de datos
         // ejecutar inicialización
       case 1:
         // el cliente tiene la versión 1
         // actualizar
     } */

    var db = openRequest.result;
    if (!db.objectStoreNames.contains("videos")) {
      // si no hay un almacén de libros ("books"),
      db.createObjectStore("videos", { keyPath: "id" }); // crearlo
    }

    /*   db.deleteObjectStore('books') */
  };

  /* En caso de error
   */
  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
    reject(openRequest.error);
  };

  /*  Cuando se ejecute Excitosamente
   */
  openRequest.onsuccess = function () {
    /* var db = openRequest.result;
    // continúa trabajando con la base de datos usando el objeto db
    //
    // Por si las moscas XD
    db.onversionchange = function() {
        db.close();
        alert("La base de datos está desactualizada, por favor recargue la página.")
    }; */
    db = openRequest.result;

    console.log("Éxito BD");

    resolve(openRequest.result);
  };

  openRequest.onblocked = function () {
    // este evento no debería dispararse si hemos manejado onversionchange correctamente
    // significa que hay otra conexión abierta a la misma base
    // que no fue cerrada después de que se disparó db.onversionchange
  };
});

function localStorageInit() {
  if (localStorage.getItem("list") == null) {
    return;
  }

  var db = openRequest.result;

  let list = JSON.parse(localStorage.getItem("list"));
  list.forEach((dato) => {
    let transaction = db.transaction("videos", "readwrite");
    let videosDB = transaction.objectStore("videos");

    let video = {
      id: generarIdOrdenable(),
      url: dato.url,
      videoId: dato.videoId,
      playListId: dato.splayListId,
      img: dato.img,
    };

    let request = videosDB.add(video);

    /* request.onsuccess = function() { // (4)
      console.log("Libro agregado al almacén", request.result);
    };

    request.onerror = function() {
      console.log("Error", request.error);
    }; */

    request.onsuccess = () => console.log("Video agregado");
    request.onerror = () => console.log("Error al agregar");

    transaction.oncomplete = function () {
      console.log("Transacción completa");
    };
  });

  localStorage.clear();
}

function generarIdOrdenable() {
  // 1. Tomamos el tiempo actual y lo pasamos a letras y números (ej: "ltd7q9z4")
  const tiempo = Date.now().toString(36);

  // 2. Generamos texto aleatorio para el final (ej: "x8j9f")
  const aleatorio = Math.random().toString(36).substring(2, 8);

  // Los unimos
  return tiempo + '-' + aleatorio;
}


function lsSetData(url) {
  /* let list = JSON.parse(localStorage.getItem('list'))
    lsClear()
    localStorageInit() */

  let transaction = db.transaction("videos", "readwrite");
  let videosDB = transaction.objectStore("videos");

  let videoId,
    playListId = "";

  if (isVideoList(url)) {
    videoId = getYoutubeId(url, true);
    playListId = getYoutubeId(url);
  } else {
    videoId = getYoutubeId(url, true);
  }

  let video = {
    id: generarIdOrdenable(),
    url: url,
    videoId: videoId,
    playListId: playListId,
    img: "https://i.ytimg.com/vi/" + getYoutubeId(url, true) + "/hqdefault.jpg",
  };

  let request = videosDB.add(video);

  request.onsuccess = function () {
    // (4)
    console.log("Libro agregado al almacén", request.result);
  };

  request.onerror = function () {
    console.log("Error", request.error);
  };

  transaction.oncomplete = function (event) {
    console.log("All added  !");
  };
}

function lsGetDataAll() {
  let transaction = db.transaction("videos", "readwrite");
  let videosDB = transaction.objectStore("videos");

  //let list = JSON.parse(localStorage.getItem('list'))
  return videosDB.getAll();
}

function lsGetData(id) {
  let transaction = db.transaction("videos", "readwrite");
  let videosDB = transaction.objectStore("videos");

  //let re
  /* lsGetDataAll().forEach(e => {
        if (id == e.id ) {
            re = e
        }
    }); */
  return videosDB.get(id);
}

function lsDeleteData(id) {
  /* let list = lsGetDataAll()
    lsClear()
    console.log(list)
    for(var i = 0; i < list.length; i++){
        if(list[i].id == id){
            console.log(list[i].id)
            list.splice(i, 1)
        }
    } */

  let transaction = db.transaction("videos", "readwrite");
  let videosDB = transaction.objectStore("videos");
  videosDB.delete(id);
}

function lsClear() {
  let transaction = db.transaction("videos", "readwrite");
  let videosDB = transaction.objectStore("videos");
  videosDB.clear();
}
