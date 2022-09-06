import { CriarModal } from "./modal.js"
import { Requests } from "./request.js"

export class Index{

    static indexRender(){
        const token = localStorage.getItem("@kenzieRedeSocial:token")
        if(token){
          
            window.location.replace("/src/pages/dashboard.html")
            //tira o token e nao deixa armazeinamento 
        }
    }

    static Showlogin(){
        const btnLogin = document.querySelector(".btnLogin")

        btnLogin.addEventListener("click", ()=>{
            const novoModal = CriarModal.loginForm()
            CriarModal.template(novoModal)               
            Index.getLogin() 

        })
    }

    static fecharModal(){
        const btnClose = document.querySelector(".closeModal")
        btnClose.addEventListener("click", ()=>{
            const modal = document.querySelector(".container__modal")
            modal.classList.add(".modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1000)
        })
    }
    static ShowSingup(){
        const btnLogin = document.querySelector(".btnSingup")

        btnLogin.addEventListener("click", ()=>{
            const novoModal = CriarModal.singupForm()
            CriarModal.template(novoModal)   
            Index.getSingup()       

        })
    }
    static getLogin(){
        const inputlogin = document.querySelector(".email")
        const inputlPass = document.querySelector(".password")
        const btnLogin   = document.querySelector(".logar")
        
        btnLogin.addEventListener("click", async (event)=>{
            event.preventDefault()            
            const data = {
                email:inputlogin.value,
                password: inputlPass.value
            }
          
           Requests.login(data)
        })      

    }

    static  getSingup(){
      
        const btnCadastra = document.querySelector(".register")
        const nomeUser    = document.querySelector(".nomeUser")
        const email       = document.querySelector(".email")
        const password    = document.querySelector(".password")
        const UserJob     = document.querySelector("select")
       

        btnCadastra.addEventListener("click", async (event)=> {
            event.preventDefault()
          
        const data = {
            password:   password.value, 
            email:      email.value, 
            professional_level:    UserJob.value, 
            username:   nomeUser.value,
        }
      
        await Requests.singup(data)
      })

    }

}


Index.indexRender()
Index.Showlogin()
Index.ShowSingup()


class listarEmpresas{

    static async todasEmpreas(){
        const empresas  = document.querySelector(".box-container")
    

        const renderEmpresa =  await  Requests.listartodasEmpresas()
              
        renderEmpresa.forEach(async (element) => { 
            empresas.append(listarEmpresas.criarEmpresa(element))
           
        })

    }
    static async renderCompany(){
        const companies = document.querySelector(".companies")
        const tagUl  = document.querySelector(".box-container")

        companies.addEventListener("click", async event =>{
            console.log(event.target.tagName)
              
            tagUl.innerHTML = ""
            if(event.target.tagName =="LI"){

                if(event.target.className == "todos"){
                    const renderEmpresa =  await  Requests.listartodasEmpresas()
              
                    renderEmpresa.forEach(async (element) => { 
                        tagUl.append(listarEmpresas.criarEmpresa(element))
                       
                    })
                }              
                console.log(event.target.className)
                const empresas = await Requests.listarCompany(event.target.className)
                empresas.forEach(async  element =>{
                    tagUl.append(listarEmpresas.criarEmpresa(element))
                })
            }
        })
        
        

    }

    static  criarEmpresa(empresa){
     
        const li    = document.createElement("li")
        li.classList.add("box")

        const h3    = document.createElement("h3")
        const p     = document.createElement("p")
        const span  = document.createElement("span")  

        h3.innerText        = empresa.name
        p.innerText         = empresa.opening_hours
        span.innerText      = empresa.sectors.description

        li.append(h3 , p, span)
        return li
    }
}

listarEmpresas.renderCompany()
listarEmpresas.todasEmpreas()
