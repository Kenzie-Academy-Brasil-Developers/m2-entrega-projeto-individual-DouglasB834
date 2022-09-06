

class darkMode{

    static darkEvent(){
        const darkMode = document.querySelector(".darkMode")
        const html = document.querySelector("html")
        console.log("cheguei ")
        darkMode.addEventListener("click", ()=>{
            html.classList.toggle("darkMode1")
        })

    }
}

darkMode.darkEvent()