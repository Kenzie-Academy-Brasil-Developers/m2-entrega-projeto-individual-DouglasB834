import { Requests } from "../request.js"
import { Renders } from "./modalDashboard.js"


// FN Basicas 
class PartiuM3{
    static token = localStorage.getItem("@empresaToken:token")
    static cabecalho__menu = document.querySelector(".cabecalho__menu")
    static btnfecharMenu   = document.querySelector("#btnFecharMenu")
    static btnMenu         = document.querySelector("#btnhowMenu") 

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



class index{

    static registerNewCompany(){
        const btnCadastra = document.querySelector(".btnCdastrarComp")

        btnCadastra.addEventListener("click", ()=>{
           const novoModal = Renders.registerCompany()
           Renders.templates(novoModal)
           this.newCompany()

        })        

    }

    static newCompany(){

        const nameCompany   =    document.querySelector(".nameCompany")
        const openingHours  =    document.querySelector(".openingHours")
        const description   =    document.querySelector(".description")
        const select        =    document.querySelector("#addSetor")
        const btn           =    document.querySelector(".btnRegisterCompany ")
      
        btn.addEventListener("click" ,(event)=>{
            const data ={
                name:   nameCompany.value,
                opening_hours:  openingHours.value,
                description:    description.value,
                sector_uuid:    select.options[select.selectedIndex].value
            }
            console.log(data)
            Requests.registerCompany(data)
        })

    }
    static async listcompany(){
        const slider = document.querySelector(".ap")
        const tagUl = document.querySelector(".renderEmpresas")
        const empresas = await Requests.listartodasEmpresas()
        empresas.forEach( async element => {
            tagUl.append( this.criarEmpresa(element))
            
           
        });
        
    }

    static criarEmpresa(company){
        const tagLI             = document.createElement("li")

        const tagDivMain        = document.createElement("div")

        // const tagDivBoximg      = document.createElement("div")
        // const tagImg            = document.createElement("img")

        const tagDivinfo        = document.createElement("div")
        const tagH3             = document.createElement("h3")
        const tagSpan           = document.createElement("span")
        const tagP              = document.createElement("p")
        const tagSelect         = document.createElement("select")
        const tagTodosOsDep     = document.createElement("option")
        const tagboxBtn         = document.createElement("div")
        const btnFuncionarios   = document.createElement("buttton")
        const btnlistDepartament   = document.createElement("buttton")
        

        tagLI.classList.add("renderEmpresa__li")
        tagDivMain.classList.add("box_content")
        // tagDivBoximg.classList.add("box_imgDender")
        tagSelect.classList.add("renderDepartament")
        
        btnFuncionarios.classList.add("btnListGeral")
        btnFuncionarios.classList.add("btn-geral")
        tagboxBtn.classList.add("box_btns")
        btnlistDepartament.classList.add("btn-geral")
        


        
        tagH3.innerText         = company.name
        tagSpan.innerText       = company.opening_hours
        tagP.innerText          = company.description
        tagTodosOsDep.value     = company.uuid 
        tagTodosOsDep.innerText = "List todos :dep"
        // tagImg.src              = "../assets/logo2self.png"
        
        btnFuncionarios.innerText = "List employees"
        btnlistDepartament.innerText = "list Dep"
        

        
        
        // tagDivBoximg.append(tagImg)    
        tagSelect.append(tagTodosOsDep)
        tagDivinfo.append(tagH3, tagSpan, tagP)
        tagboxBtn.append(btnFuncionarios)

        tagDivMain.append(tagDivinfo, tagSelect)
        tagLI.append(tagDivMain, tagboxBtn)
       
        return tagLI
    }

    





}

index.registerNewCompany()
index.listcompany()