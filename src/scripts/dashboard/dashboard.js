



class PartiuM3{
    static token = localStorage.getItem("@empresaToken:token")

    static sairPage(){
        
        if(!this.token){         
            window.location.assign("../../../homepage.html")
            
        }
        const btns_singUp = document.querySelector(".btns_singUp ")
        btns_singUp.addEventListener("click", ()=>{
            localStorage.removeItem("@empresa:id")
            localStorage.removeItem("@empresaToken:token")
            window.location.replace("../../../homepage.html")
        })
            
    }




}

// Chamadas
PartiuM3.sairPage()