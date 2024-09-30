const localStorage = window.localStorage;

function localStorageInit(){
    if(localStorage.getItem('list') == null){
        localStorage.setItem('list', "[]")
    }
}


function lsSetDataAll(list){
    localStorage.setItem('list', JSON.stringify(list))
}

function lsSetData(url){
    let list = JSON.parse(localStorage.getItem('list'))
    lsClear()
    localStorageInit()
    list.push({id: uuid.v4(), url: vidoeOrList(getYoutubeId(url)), img: 'https://i.ytimg.com/vi/'+getYoutubeId(url,true)+'/sddefault.jpg'})
    
    localStorage.setItem('list', JSON.stringify(list))
}




function lsGetDataAll(){
    let list = JSON.parse(localStorage.getItem('list'))
    return list
}

function lsGetData(id){
    let re
    lsGetDataAll().forEach(e => {
        if (id == e.id ) {
            re = e
        }
    });
    return re
}




function lsDeleteData(id){
    let list = lsGetDataAll()
    lsClear()
    localStorageInit()
    console.log(list)
    for(var i = 0; i < list.length; i++){
        if(list[i].id == id){
            console.log(list[i].id)
            list.splice(i, 1)
        }
    }
    lsSetDataAll(list)
}

function lsClear(){
    localStorage.clear()
    localStorageInit()
}