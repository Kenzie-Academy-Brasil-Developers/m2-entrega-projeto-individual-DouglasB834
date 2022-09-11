import { Requests } from "../request.js"

console.log("salve")

    const admin = localStorage.getItem("@admin")
    Requests
// FN Basicas 
class PartiuM3{
    static token = localStorage.getItem("@empresaToken:token")
    static cabecalho__menu = document.querySelector(".cabecalho__menu")
    static btnfecharMenu   = document.querySelector("#btnFecharMenu")
    static btnMenu         = document.querySelector("#btnhowMenu") 

    static sairPage(){
        
        if(!this.token && admin == "false"){         
            window.location.assign("../../../homepage.html")
            
        }
        const btns_singUp = document.querySelector(".btns_singUp ")
        btns_singUp.addEventListener("click", ()=>{
            localStorage.removeItem("@empresa:id")
            localStorage.removeItem("@empresaToken:token")
            localStorage.removeItem("@@admin")
            window.location.replace("../../../homepage.html")
        })
            
    }
    static showMenu(){
        this.btnMenu.addEventListener("click", ()=>{   
            if(this.cabecalho__menu.classList.contains("hidden")){
                this.cabecalho__menu.classList.toggle("hidden")
                this.cabecalho__menu.classList.toggle("abrir")
                
            }else if(this.cabecalho__menu.classList.contains("abrir")){
           
             this.cabecalho__menu.classList.toggle("fechar")
                this.btnMenu.style.display = "block"
                this.cabecalho__menu.classList.toggle("abrir")
                this.btnfecharMenu.style.display = "none"
                setTimeout(()=>{
                    this.cabecalho__menu.classList.toggle("hidden")
                    this.cabecalho__menu.classList.toggle("fechar")
                },600)  
            }
      
        })
 
    }

}

// Chamadas
PartiuM3.showMenu()
PartiuM3.sairPage()

class RenderUsers{
    static token = localStorage.getItem("@empresaToken:token")

    static async funcionarios(){
        const nome  = document.querySelector(".name")        
        const empresa  = document.querySelector(".empresa")        
        const nivel  = document.querySelector(".name")        
        const funcionarios = await Requests.informacaoFuncionario()
        console.log(funcionarios)
        nome.innerText =  funcionarios.username
        empresa.innerText =  funcionarios.username
        nivel.innerText =  funcionarios.professional_level
    }

}

RenderUsers.funcionarios()