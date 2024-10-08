function vidoeOrList(id){
    let url
    // los id de list son mas largos que los id de videos individuales
    if(id.length > 11){
        url = 'https://www.youtube.com/embed/videoseries?list='+id
    } else {
        url = 'https://www.youtube.com/embed/'+id
    }
    return url
}

function isVideoList(url){
    let encontrar = url.indexOf("list")
    if(encontrar==-1) {
        return false
    } else {
        return true
    }
}



function getYoutubeId(url,nolist=false){
    let buscar = new RegExp('(((?<==)|(?<=e/)|(?<=ed/)).{11}(?=(&|$)))')
    let buscarList = new RegExp('(?<=list=).*$')

    // Busca si tiene el list, 
    if (url.search(buscarList) != -1 && !nolist) {
        //retorna el id de la list
        return url.substr(url.search(buscarList), 34)
        

    // busca el id normal
    } else if (url.search(buscar) != -1){
        // retorna el id normal
        return url.substr(url.search(buscar), 11)

    } else {
        return null
    }
}


function ponerVideo(url_youtube){
    let video_framer = document.getElementById("video")
    let input = url_youtube
    let re_youtube = new RegExp('(youtube|youtu.be)')


    if (input.search(re_youtube) == -1){
        //Aqui entra el id directo
        if(input.length > 11){
            video_framer.setAttribute("playlistid",input)
            video_framer.setAttribute("videoid","")
        } else {
            video_framer.setAttribute("videoid",input)
            video_framer.setAttribute("playlistid","")
        }
        
    } else {
        /* La expresion regular va a sacar esto:
         * https://www.youtube.com/watch?v=7wo0zZur_Yk => 7wo0zZur_Yk      
         * https://youtu.be/TMazt2Qv63s => TMazt2Qv63s 
         * https://www.youtube.com/watch?v=7wo0zZur_Yk&list=PLo5lAe9kQrwrnxrTu3HumlUz3k8DP1_r7 => 7wo0zZur_Yk
         */
        if(isVideoList(input)){
            //si es una lista
            video_framer.setAttribute("playlistid",getYoutubeId(input))
            video_framer.setAttribute("videoid",getYoutubeId(input, true))
        }else {
            //si no es una lista
            video_framer.setAttribute("videoid",getYoutubeId(input))
            video_framer.setAttribute("playlistid","")
        }
        
        
    }

}


document.addEventListener("DOMContentLoaded", () => {
    'use strict'

    document.querySelector("#b").addEventListener('click', e => {
        e.preventDefault();
        let url = document.querySelector("#entrada").value
        if (url != "") {
            ponerVideo(url)
            lsSetData(url)
        } 
        
        render()
    })
});