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
            Requests.registerCompany(data)
        })

    }

    static async listcompany(){
        // const slider = document.querySelector(".ap")
        const tagUl = document.querySelector(".renderEmpresas")
        const empresas = await Requests.listartodasEmpresas()
        empresas.forEach( async element => {
            tagUl.append( this.renderEmpresa(element))
            
           
        });
        index.listDep()
        
    }

    static renderEmpresa(company){
     
        const tagLI             = document.createElement("li")

        const tagDivMain        = document.createElement("div")

        const tagDivinfo        = document.createElement("div")
        const tagH3             = document.createElement("h3")
        const tagSpan           = document.createElement("span")
        const tagP              = document.createElement("p")
        const tagSelect         = document.createElement("select")
        
        const tagboxBtn         = document.createElement("div")
        const btnFuncionarios   = document.createElement("buttton")
        const btnCriarDep   = document.createElement("buttton")
      
     

        tagLI.classList.add("renderEmpresa__li")
        tagDivMain.classList.add("box_content")
        tagSelect.classList.add("renderDepartament")
        
        // btnFuncionarios.classList.add("btnListGeral")
        // btnFuncionarios.classList.add("btn-geral")
        tagboxBtn.classList.add("box_btns")
        btnCriarDep.classList.add("btn-geral")
        btnCriarDep.classList.add("btnListGeral")
  
        tagH3.innerText         = company.name
        tagSpan.innerText       = company.opening_hours
        tagP.innerText          = company.description
        tagSelect.id            = company.uuid 
        
        // btnFuncionarios.innerText = "list all Dep"
        btnCriarDep.innerText = "Criar Dep"

        const tagTodosOsDep     = document.createElement("option")
       
        tagTodosOsDep.innerText = "List todos :dep"
        tagSelect.append(tagTodosOsDep)


        tagSelect.addEventListener("click", async (event)=>{
            const departamento = await Requests.listOneDep(event.target.id)
           
            if(departamento.length){                
                tagSelect.innerText = ""
                departamento.forEach(element =>{    
                    const optionDep     = document.createElement("option")
                    optionDep.innerText = element.name
                    optionDep.value     = element.uuid
                    tagSelect.append(optionDep)  
    
                   
                })
            }else{
                tagTodosOsDep.innerText = "Sem departamento"
            }
            
        })
        btnCriarDep.addEventListener("click", ()=>{
            const body  = document.querySelector("body")
            const renderCadastrar = this.criarDep(company)
           if(renderCadastrar.classList.contains("container__modal")){
                renderCadastrar.classList.toggle()
           }
            body.append(renderCadastrar)
        })
        

        tagDivinfo.append(tagH3, tagSpan, tagP)
        tagboxBtn.append(btnCriarDep)

        tagDivMain.append(tagDivinfo, tagSelect)
        tagLI.append(tagDivMain, tagboxBtn)
       
        return tagLI
        
    }

    static criarDep(id){

        const tagDiv        = document.createElement("div")
        const tagPai        = document.createElement("div")
        const tagForm       = document.createElement("form")
        const tagH3         = document.createElement("h3")
        const tagInputDep   = document.createElement("input")
        const tagInoutDesc  = document.createElement("input")
        const btnEnviar     = document.createElement("buttton")

        tagDiv.classList.add("container__modal")
        tagDiv.classList.add("criarDepartamento")
        tagPai.classList.add("baseModal")
        tagForm.classList.add("boxForm")
        btnEnviar.classList.add("btn-geral")
        
        btnEnviar.innerText         = "Registrar"
        tagH3.innerText             = "Criar departamento"
        tagInputDep.placeholder     = "criar novo departamento"
        tagInoutDesc.placeholder    = "Descrição do departamento"

        tagForm.append(tagH3, tagInputDep,tagInoutDesc, btnEnviar)

        tagPai.append(tagForm,)

        tagDiv.append(tagPai)
        
        return tagDiv
    }

    static async listDep(){
        const tagUlDep = document.querySelector(".ul__render_dep")
        const btnListGeral = document.querySelector(".btnListGeral2") 
          
        btnListGeral.addEventListener("click", async ()=>{           
            tagUlDep.innerText = ""
            const departament = await Requests.listAllDep()
            
            departament.forEach( element =>{
                const listaDep = this.renderDep(element)
                tagUlDep.append(listaDep)
            })
            
        })
       
    }

    static  renderDep(dep){
       
        const tagLi             = document.createElement("li")
        const tagDivInfo        = document.createElement("div")

        const tagH3             = document.createElement("h3")
        const tagPDesc          = document.createElement("p")
        const tagPEmpresa       = document.createElement("p")
        const tagSpanTime       = document.createElement("span")

        const boxBtn            = document.createElement("div")
        const btnListarF        = document.createElement("button")

        tagDivInfo.classList.add("box_content_infoDep")
        boxBtn.classList.add("box_btns")
        btnListarF.classList.add("btnLisar","rbtn-geral")

        //alimentando ob
        btnListarF.innerText    = "Editar de partamento.."
        tagH3.innerText         = dep.name
        tagPDesc.innerText      = dep.description
        tagPEmpresa.innerText   = dep.companies.name
        tagSpanTime.innerText   = dep.companies.opening_hours

        btnListarF.addEventListener("click" ,() => {
           
            this.atualizarDep(dep)
        })

        
        boxBtn.append(btnListarF)
        tagDivInfo.append(tagH3, tagPDesc,tagPEmpresa, tagSpanTime, boxBtn )
        tagLi.append(tagDivInfo)
        return tagLi

    }
    static atualizarDep(nome){
        const body = document.querySelector("body")
        const container__modal  =document.createElement("div")
        const baseModal =document.createElement("div")
        
        const form =document.createElement("form")
        const textarea =document.createElement("textarea")
        const btnAtualizar =document.createElement("buttom")
        const tagI =document.createElement("i")
        
        baseModal.classList.add("baseModal")
        container__modal.classList.add("container__modal")
        form.classList.add("formEditar")
        textarea.classList.add("texto")
        btnAtualizar.classList.add("btn-geral", "btnAtualizar" )
        tagI.classList.add("btnClose")

        tagI.innerText  = "X"
        textarea.cols ="10"
        textarea.rows ="5"
        textarea.placeholder = `${nome.description}`
        btnAtualizar.innerText  = "enviar atualização.."
      
        
        tagI.addEventListener("click", ()=>{
            container__modal.classList.toggle("modal-disappear")
           setTimeout(()=>{
            container__modal.remove()
           },600)

        })
        console.log(nome.uuid)
        // atualizar descrição Dep
        btnAtualizar.addEventListener("click", () =>{
            console.log(textarea.value)
            const objeto ={
                description: textarea.value
            }
            Requests.editDepartamet(objeto, nome.uuid)
            setTimeout(()=>{
                location.reload()

            }, 1000)
        })



        form.append(tagI, textarea, btnAtualizar)
        baseModal.append(form)
        
        container__modal.append(baseModal)
        body.append( container__modal)


    }



}

// index.atualizardep()
index.registerNewCompany()
index.listcompany()