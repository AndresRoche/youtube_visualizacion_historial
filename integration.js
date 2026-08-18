async function iniciarApp() {
  try {
    const db = await dbPromise;

    localStorageInit();

    render();
  } catch (error) {
    console.error("No se pudo iniciar la aplicación porque la BD falló", error);
  }
}

function render() {
  let list = lsGetDataAll();
  let conten = document.querySelector(".historial__video");

  conten.innerHTML = "";

  list.onsuccess = function () {
    list.result.forEach((e) => {
      let mostrar = "display:block;";

      conten.innerHTML += `<div class="card_video box">
                                <span class="card_playList" style="display:none;">PlayList</span>
                                <div class="card_info">
                                    <img class="card_img" src="${e.img}" id="${e.videoId}" onclick="subirArriba()" url="${e.url}">
                                </div>
                                <div class="card_btn">
                                    <button class="btn rojo" id="${e.id}">Eleminar</button>
                                </div>
                            </div>`;
    });

    document.querySelectorAll(".btn.rojo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        lsDeleteData(e.target.id);
        render();
      });
    });

    document.querySelectorAll(".card_img").forEach((img) => {
      img.addEventListener("click", (e) => {
        let video_framer = document.querySelector("#video");
        let input = document.getElementById("entrada");
        video_framer.setAttribute("videoid", e.target.id);
        input.value = e.target.getAttribute("url");
      });
    });
  };
}

iniciarApp();

function subirArriba() {
  // window.scrollTo viaja a las coordenadas X y Y (0, 0 es el tope de la página)
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
