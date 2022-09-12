import { Requests } from "../request.js"
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
            window.location.assign("../../../index.html")
            
        }
        const btns_singUp = document.querySelector(".btns_singUp ")
        btns_singUp.addEventListener("click", ()=>{
            localStorage.removeItem("@empresa:id")
            localStorage.removeItem("@empresaToken:token")
            localStorage.removeItem("@@admin")
            window.location.replace("../../../index.html")
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
        const nome          = document.querySelector(".name")        
        const email         = document.querySelector(".empresa")        
        const nivel         = document.querySelector(".nivel")        
        const ondeTrabalha  = document.querySelector(".ondeTrabalha")        
        const funcionarios  = await Requests.informacaoFuncionario()

        nome.innerText          =  funcionarios.username
        email.innerText         =  funcionarios.email
        if(funcionarios.kind_of_work){
            ondeTrabalha.innerText  =  `${funcionarios.kind_of_work}`

        }else{
            ondeTrabalha.innerText = "sem local de trabaalho"
        }

        nivel.innerText =  `Nivel ${funcionarios.professional_level}`
        const idUser = funcionarios.department_uuid
        console.log(funcionarios)

        this.departamento(idUser)
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
    
    static async departamento(id){
        const departamentos = document.querySelector(".departamentos")
       const dep =  await Requests.depDaEmpresaDoFuncinario()
       dep.departments.forEach(element=>{
          
           if(id == element.uuid){
                departamentos.append( this.renderDepEmpresa(element))

            }
           
        })
     
        const nomeEmpresa   = document.querySelector(".nomeEmpresa")
        const horario       = document.querySelector(".horario")
        const desc          = document.querySelector(".desc")

        nomeEmpresa.innerText   = dep.name
        horario.innerText       = dep.opening_hours
        desc.innerText          = dep.description


    }

    static renderDepEmpresa(dep){
    
        const tagLi             = document.createElement("li")
        const tagDivInfo        = document.createElement("div")

        const tagH3             = document.createElement("h3")
        const tagPDesc          = document.createElement("p")

        tagDivInfo.classList.add("box_content_infoDep")

        tagH3.innerText   = dep.name
        tagPDesc.innerText      = dep.description

        tagDivInfo.append(tagH3, tagPDesc )
        tagLi.append(tagDivInfo)
        return tagLi


    }
    
    static editarFuncionario(){
        const btnEditar = document.querySelector(".btnEditar")

        btnEditar.addEventListener("click", ()=>{
            this.ultimoMOdal()
        })
    }

    static ultimoMOdal(){
        const body              = document.querySelector("body")
        const modal             = document.createElement("div")
        const tagBaseModal      = document.createElement("form")
        const modalinfo         = document.createElement("div")

        const titulo            = document.createElement("h3")
        const inputUserName     = document.createElement("input")
        const inputEmail        = document.createElement("input")
        const inputPassword     = document.createElement("input")
        const sairPage          = document.createElement("p")

        const btnEnviar         = document.createElement("buttom")
        
        inputUserName.innerText
        inputEmail.innerText
        inputPassword.innerText

        titulo.innerText            = "atualizar Informação"
        inputUserName.placeholder   = "digite seu Nome"
        inputEmail.placeholder      = "digite seu  Email"
        inputPassword.placeholder   = "digite Nova senha"
        btnEnviar.innerText         = "Atualizar"
        btnEnviar.classList.add("editarFuncionario")
        sairPage.innerHTML          = `<i class="fa-solid fa-x"></i>`

        sairPage.addEventListener("click", ()=>{
            modal.classList.toggle("modal-disappear")
           setTimeout(()=>{
            modal.remove()
           },600)

        })







        btnEnviar.addEventListener("click", ()=>{

                const objeto = {
                    username:inputUserName.value,
                    email: inputEmail.value,
                    password: inputPassword.value
                }
                Requests.atualizaInf(objeto)
                modal.classList.toggle("modal-disappear")
                setTimeout(()=>{
                modal.remove()
                location.reload()
           },1200)
         

        })

        modalinfo.classList.add("titiloAtualizar")
        modal.classList.add("container__modal")
        tagBaseModal.classList.add("modal")
        modalinfo.classList.add("editar")

        modalinfo.append(sairPage ,titulo,inputUserName, inputEmail, inputPassword, btnEnviar)
        tagBaseModal.append(modalinfo)
        modal.append(tagBaseModal)
        body.append(modal)
    }


}
RenderUsers.editarFuncionario()
RenderUsers.renderPessoas()
RenderUsers.funcionarios()