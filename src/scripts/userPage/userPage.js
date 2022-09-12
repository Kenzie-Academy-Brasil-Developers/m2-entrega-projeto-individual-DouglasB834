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
        const email  = document.querySelector(".empresa")        
        const nivel  = document.querySelector(".nivel")        
        const funcionarios = await Requests.informacaoFuncionario()

        nome.innerText =  funcionarios.username
        email.innerText =  funcionarios.email
        nivel.innerText =  funcionarios.professional_level
    }


    static async renderPessoas(){
      
        const user = await Requests.funcionarioDepartamento()

        user.forEach( async element=>{
            this.pessoas(element.users)
         
          
        })
      
    }


    static pessoas(user){
        const   tagUl  = document.querySelector(".funcionarios")
        user.forEach(element=>{

            // console.log(element)
     
        const tagLi             = document.createElement("li")
      
        const tagImg            = document.createElement("img")
        const tagDivInfo        = document.createElement("div")
        const tagH4             = document.createElement("h4")
        const tagPEmail         = document.createElement("p")
        const nivelProff        = document.createElement("p")
        
        tagLi.classList.add("listarUsuario")
        tagDivInfo.classList.add("info")
       

      
        tagImg.src              = "https://api.lorem.space/image/face?w=80&h=80"  

        tagH4.innerText         = element.username
        tagPEmail.innerText     = element.email
        nivelProff.innerText    = element.professional_level
       
       
        tagDivInfo.append(tagH4, tagPEmail, nivelProff)
        tagLi.append(tagImg, tagDivInfo)
        tagUl.append(tagLi)
       

    })

    }
    
    static async departamento(){
        const departamentos = document.querySelector(".departamentos")
       const dep =  await Requests.depDaEmpresaDoFuncinario()
       dep.departments.forEach(element=>{
           console.log(element)
          
           
            departamentos.append( this.renderDepEmpresa(element))
        })
    }
    static renderDepEmpresa(dep){

        const tagLi             = document.createElement("li")
        const tagDivInfo        = document.createElement("div")

        const tagH3             = document.createElement("h3")
        const tagPDesc          = document.createElement("p")

        tagDivInfo.classList.add("box_content_infoDep")
       
        

        //alimentando informação

        tagH3.innerText   = dep.name
        tagPDesc.innerText      = dep.description

        tagDivInfo.append(tagH3, tagPDesc )
        tagLi.append(tagDivInfo)
        return tagLi


    }
    

}
RenderUsers.departamento()
RenderUsers.renderPessoas()
RenderUsers.funcionarios()