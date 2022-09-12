


//Render dash border

export class Renders{

    static body = document.querySelector("body");
    static token = localStorage.getItem("empresaToken:token")
    static meuId = localStorage.getItem("@empresa:id")

    static templates(modal){
        const section_modalPadrao = document.createElement("section")
        section_modalPadrao.classList.add("container__modal")
        section_modalPadrao.append(modal)
        this.body.append(section_modalPadrao)

    }

    static registerCompany(cadastrar){

        const divMain           = document.createElement("div")
        divMain.classList.add("baseModal")

        const tagform           = document.createElement("form")
        tagform.classList.add("form_CadastrarEmpresa")

        const tagH3             = document.createElement("h3")
        tagH3.innerText         = "Cadastrar empresa"

        const tagInputCompany   = document.createElement("input")
        const tagTime           = document.createElement("input")
        const tagDescription    = document.createElement("input")

        tagInputCompany.classList.add("nameCompany")
        tagTime.classList.add("openingHours")
        tagDescription.classList.add("description")
        
        tagInputCompany.type     = "text"
        tagTime.type             = "time"
        tagDescription.type      = "text"

        tagInputCompany.placeholder = "Nome da empresa"
        tagTime.placeholder         = "Horario de abertura"
        tagDescription.placeholder  = "Descrição da Empresa"
        tagInputCompany.required    = true
        tagTime.required            = true
        tagDescription.required     = true


        const tagSelect         = document.createElement("select")

        const options           = document.createElement("option")
        const alimenticio       = document.createElement("option")
        const varejo            = document.createElement("option")
        const textil            = document.createElement("option")
        const aeroEspacial      = document.createElement("option")
        const automotiva        = document.createElement("option")
        const tagManuf          = document.createElement("option")
        const ti                = document.createElement("option")
        const Atacado           = document.createElement("option")
       
        
        tagSelect.id            = "addSetor"
        options.innerText       = "Selecione Setor"
        
        alimenticio.innerText   = "Alimenticio"
        alimenticio.value       ="8fb1917a-8416-4a46-a409-303708f368c4"
        
        varejo.innerText        = "Varejo"
        varejo.value            ="90d05449-26e7-4728-a3fc-d93bf8d537ad"
        
        textil.innerText        = "Textil"
        textil.value            ="c8641ecd-29f3-4ba2-a533-81dce99b18b9"

        tagManuf.innerText        = "tagManuf"
        tagManuf.value            ="a39f5db3-ad77-4cf9-801f-4129f2505dca"
        
        aeroEspacial.innerText  = "Aero Espacial"
        aeroEspacial.value      ="92f173a6-1c38-4831-886b-86d9ed29945d"
        
        automotiva.innerText    = "Automotiva"
        automotiva.value        ="d8104214-18c9-4c9f-95ce-3c7cbff822a5"
        
        ti.innerText            = "tecnologia TI"
        ti.value                = "292de85f-048f-47cd-9fad-37342a8d0f07"
        
        Atacado.innerText       = "Atacado"
        Atacado.value           ="283e47bf-84e8-4994-8974-35d08a93cc45"

        tagSelect.append(options, alimenticio, varejo, textil, aeroEspacial, automotiva, ti, Atacado)
        
        
        const tagI =document.createElement("i")
        tagI.innerText  = "X"

        tagI.addEventListener("click", ()=>{
            const teste = document.querySelector(".container__modal")
            divMain.classList.toggle("modal-disappear")
           setTimeout(()=>{
            teste.parentNode.removeChild(teste)
           },1000)

        })


        const tagDivbtn     = document.createElement("div")
        const btnRegister   = document.createElement("button")
        
            
        btnRegister.classList.add("btnRegisterCompany")
        btnRegister.classList.add("btn-geral")
        btnRegister.innerText = "Cadastrar Empresa"
       
        tagform.append(tagInputCompany, tagTime, tagDescription,tagSelect,tagDivbtn )
        
        
        
        tagDivbtn.append(btnRegister)
        
        divMain.append(tagI, tagform)

        return divMain


    }

    // static listCompany





}