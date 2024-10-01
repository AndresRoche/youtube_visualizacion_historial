localStorageInit()

render()


function render(){
    let list = lsGetDataAll()
    let conten = document.querySelector(".historial__video")

    conten.innerHTML = ""
    


    list.forEach(e => {

        let mostrar = "display:block;" 

        if(e.playListId==""){
            mostrar="display:none;"
        }

        conten.innerHTML += `<div class="card_video box">
                                <span class="card_playList" style="${mostrar}">PlayList</span>
                                <div class="card_info">
                                    <img class="card_img" src="${e.img}" id="${e.videoId}" url="${e.url}">
                                </div>
                                <div class="card_btn">
                                    <button class="btn rojo" id="${e.id}">Eleminar</button>
                                </div>
                            </div>`

    });

    document.querySelectorAll('.btn.rojo').forEach(btn => {
        btn.addEventListener('click', e => {
            lsDeleteData(e.target.id)
            render()
        })
    })

    document.querySelectorAll('.card_img').forEach(img => {
        img.addEventListener('click', e => {
            let video_framer = document.querySelector("#video")
            let input = document.getElementById("entrada")
            video_framer.setAttribute("videoid",e.target.id)
            input.value = e.target.getAttribute("url")
        })
    })

}





