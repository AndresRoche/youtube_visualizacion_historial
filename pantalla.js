const pantalla = document.querySelector(".pantalla")

document.getElementById("gr").addEventListener("click", ()=> {
    pantalla.setAttribute("style", "width:95%;")
})

document.getElementById("me").addEventListener("click", ()=> {
    pantalla.setAttribute("style", "width:768px;")
})