import { Requests } from "../request.js"
import { Renders } from "./modalDashboard.js"
    const teste = localStorage.getItem("@admin")
    
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
    static async listarSetores(){
        const setor_ul = document.querySelector(".setor_ul")
        const sectores = await Requests.listAllSectors()
        sectores.forEach(element =>{
            const li = document.createElement("li")
            li.innerText    = element.description
            li.id           = element.uuid
            setor_ul.append(li)
        })
        console.log(sectores)
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
        console.log(company)
        const tagLI             = document.createElement("li")

        const tagDivMain        = document.createElement("div")

        const tagDivinfo        = document.createElement("div")
        const tagH3             = document.createElement("h3")
        const tagSpan           = document.createElement("span")
        const tagP              = document.createElement("p")
        const tagSelect         = document.createElement("select")
        
        const tagboxBtn         = document.createElement("div")
        const btnCriarDep       = document.createElement("buttton")

        tagLI.classList.add("renderEmpresa__li")
        tagDivMain.classList.add("box_content")
        tagSelect.classList.add("renderDepartament")
        
    
        tagboxBtn.classList.add("box_btns")
        tagboxBtn.classList.add("box_btns2")
        btnCriarDep.classList.add("btn-geral")
        btnCriarDep.classList.add("btnListGeral")
  
        tagH3.innerText         = company.name
        tagSpan.innerText       = company.opening_hours
        tagP.innerText          = company.description
        tagSelect.id            = company.uuid 

        const idDaEmpresa       = company.uuid 
        
        btnCriarDep.innerText   = "Criar Dep"
        
        const tagTodosOsDep     = document.createElement("option")
        tagTodosOsDep.innerText = "List todos :dep"
        tagSelect.append(tagTodosOsDep)
        
        //listar dep da empresa
        tagSelect.addEventListener("click", async (event)=>{
            const departamento = await Requests.listOneDep(event.target.id)
            
            console.log(departamento )
            if(departamento.length){                
                tagSelect.innerText         = ""
                departamento.forEach(element =>{    
                    const optionDep         = document.createElement("option")
                    optionDep.innerText     = element.name
                    optionDep.id            = element.uuid
                    tagSelect.append(optionDep)  
    
                   
                })
            }else{
                tagTodosOsDep.innerText = "Sem departamento"
            }
            
        })

        // cadastra departament
        btnCriarDep.addEventListener("click", ()=>{
            const body  = document.querySelector("body")
            const renderCadastrar = this.criarDep(company)
       
            body.append(renderCadastrar)
        })
        

        tagDivinfo.append(tagH3, tagSpan, tagP)
        tagboxBtn.append(btnCriarDep)

        tagDivMain.append(tagDivinfo, tagSelect)
        tagLI.append(tagDivMain, tagboxBtn)
       
        return tagLI
        
    }
    

    static criarDep(id){

        const tagDiv            = document.createElement("div")
        const tagPai            = document.createElement("div")
        const tagForm           = document.createElement("form")
        const tagH3             = document.createElement("h3")
        const tagInputNome      = document.createElement("input")
        const tagInputDesc      = document.createElement("input")
        const btnRegistrar      = document.createElement("buttton")

        tagDiv.classList.add("container__modal")
        tagDiv.classList.add("criarDepartamento")
        tagPai.classList.add("baseModal")
        tagForm.classList.add("boxForm")
        btnRegistrar.classList.add("btn-geral")
        
        btnRegistrar.innerText      = "Registrar"
        tagH3.innerText             = "Criar departamento"
        tagInputNome.placeholder    = "Nome do Departamento"
        tagInputDesc.placeholder    = "Descrição do departamento"
        tagInputDesc.required       = true
        tagInputNome.required       = true
        
        const tagI                  = document.createElement("i")
        tagI.innerText              = "X"
        tagI.addEventListener("click", ()=>{
            tagDiv.classList.toggle("modal-disappear")
           setTimeout(()=>{
            tagDiv.remove()
           },1000)

        })
        let empresa = id.uuid

        btnRegistrar.addEventListener("click", ()=>{
            const data = {
                name: tagInputNome.value,
                description: tagInputDesc.value,
                company_uuid:empresa                
            }
            Requests.registerDep(data)
            tagDiv.classList.toggle("modal-disappear")
            setTimeout(()=>{
                tagDiv.remove()
                index.listDep()
            },1000)
            //post

        })

        tagForm.append(tagH3, tagI, tagInputNome,tagInputDesc, btnRegistrar)

        tagPai.append(tagForm,)

        tagDiv.append(tagPai)
        
        return tagDiv
    }

    static async listDep(){
        const tagUlDep      = document.querySelector(".ul__render_dep")
        const btnListGeral  = document.querySelector(".btnListGeral2") 
          
        btnListGeral.addEventListener("click", async ()=>{  

            tagUlDep.innerText  = ""
            const departament   = await Requests.listAllDep()
            
            departament.forEach( element =>{
                const listaDep = this.renderDep(element)
                tagUlDep.append(listaDep)
            })
            
        })
       
    }

    // listar todos departamentos
    static  renderDep(dep){
       
        const tagLi             = document.createElement("li")
        const tagDivInfo        = document.createElement("div")

        const tagH3             = document.createElement("h3")
        const tagPDesc          = document.createElement("p")
        const tagPEmpresa       = document.createElement("p")
        const tagSpanTime       = document.createElement("span")

        const boxBtn            = document.createElement("div")
        const btnListarF        = document.createElement("button")
        const btnExcluirDep     = document.createElement("button")

        tagDivInfo.classList.add("box_content_infoDep")
        boxBtn.classList.add("box_btns")
        btnListarF.classList.add("btnLisar")//eu sei kk
        btnListarF.classList.add("btn-geral")

        btnExcluirDep.classList.add("btn-geral")
        btnExcluirDep.classList.add("btnLisar")
        

        //alimentando informação
        btnExcluirDep.innerText = "Excluir dep"
        btnListarF.innerText    = "Editar Dep.."
        tagH3.innerText         = dep.name
        tagPDesc.innerText      = dep.description
        tagPEmpresa.innerText   = dep.companies.name
        tagSpanTime.innerText   = dep.companies.opening_hours

        btnListarF.addEventListener("click" ,() => {
           
            this.atualizarDep(dep)
        })

        btnExcluirDep.addEventListener("click", ()=>{
            index.ExcluirDepartament(dep)
        })
        
        boxBtn.append(btnListarF,btnExcluirDep)
        tagDivInfo.append(tagH3, tagPDesc,tagPEmpresa, tagSpanTime, boxBtn )
        tagLi.append(tagDivInfo)
        return tagLi

    }

    static ExcluirDepartament(deparment){
        const   body = document.querySelector("body")
        console.log(deparment)
        const tagDivContainer   = document.createElement("div")
        const tagBaseModal      = document.createElement("div")
        const tagBtnSim         = document.createElement("buttom")
        const tagBtnNao         = document.createElement("buttom")
        const tagH3             = document.createElement("h3")
        const tagSpan           = document.createElement("span")
        const tagBoxBtn         = document.createElement("div")
        const taginformacao     = document.createElement("div")

        tagDivContainer.classList.add("container__modal")
        tagBaseModal.classList.add("baseModal")
        tagBoxBtn.classList.add("box_btns")
        tagBtnSim.classList.add("btn-geral")
        tagBtnNao.classList.add("btn-geral")
        tagBtnNao.classList.add("naoExcluir")
        taginformacao.classList.add("infoExcluir")


        tagH3.innerText     = "Gostaria de exCluir esse Departamento ?"
        tagSpan.innerText   = deparment.name
        tagBtnSim.innerText = "SIM"
        tagBtnNao.innerText = "Não"
        const ID = deparment.uuid


        tagBtnSim.addEventListener("click" ,()=>{
            Requests.deletDep(ID)
        })
       
        tagBtnNao.addEventListener("click" ,()=>{
            tagDivContainer.classList.toggle("modal-disappear")
            setTimeout(()=>{
                tagDivContainer.remove()
            },1000)
        })


        body.append(tagDivContainer)
        tagDivContainer.append(tagBaseModal)
        
        tagBaseModal.append(taginformacao)
        taginformacao.append(tagH3, tagSpan, tagBoxBtn)

        tagBoxBtn.append(tagBtnSim ,tagBtnNao)
    }


    static atualizarDep(nome){
        const body              = document.querySelector("body")
        const container__modal  =document.createElement("div")
        const baseModal         = document.createElement("div")

        const form              = document.createElement("form")
        const textarea          = document.createElement("textarea")
        const btnAtualizar      = document.createElement("buttom")
        const tagI              = document.createElement("i")
        
        baseModal.classList.add("baseModal")
        container__modal.classList.add("container__modal")
        form.classList.add("formEditar")
        textarea.classList.add("texto")
        btnAtualizar.classList.add("btn-geral", "btnAtualizar" )
        tagI.classList.add("btnClose")

        tagI.innerText              = "X"
        textarea.cols               ="10"
        textarea.rows               ="5"
        textarea.placeholder        = `${nome.description}`
        btnAtualizar.innerText      = "enviar atualização.."
      
        
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
    
    static async listarUsuario(){
        const tagUl = document.querySelector(".ul__render_dep")
        const btnListar = document.querySelector(".btListarFuncionarios")
       
        const usuario = await Requests.listUsers()
        usuario.forEach( async element =>{
            tagUl.append(index.usuarioCadastrado(element))

            
        })
        btnListar.addEventListener("click", ()=>{
            tagUl.innerText = ""
            usuario.forEach( async element =>{
                tagUl.append(index.usuarioCadastrado(element))

               
            })
        })

       
    }
    //todos
    static  usuarioCadastrado(usuario){
        const tagLi             = document.createElement("li")
        const tagImg            = document.createElement("img")
        const tagDivInfo        = document.createElement("div")
        const tagH4             = document.createElement("h4")
        const tagPEmail         = document.createElement("p")
        const nivelProff        = document.createElement("p")
        const boxBtn            = document.createElement("div")
        const editarUser        = document.createElement("button")
    
        tagLi.classList.add("listarUsuario")
        tagDivInfo.classList.add("info")
        boxBtn.classList.add("box_btns")
        editarUser.classList.add("btn-geral")
    
        
        if(usuario.department_uuid ==null){
            const btn = document.createElement("button")
            btn.classList.add("btn-geral")
            btn.innerText ="contratar"
            boxBtn.append(btn)

            btn.addEventListener("click", ()=>{
                this.contrarFuncioanrio(usuario)
            })

        }else{
            const btnDemitir = document.createElement("button")
            btnDemitir.classList.add("btn-geral")
            btnDemitir.innerText ="Demitir"
            boxBtn.append(btnDemitir)

            btnDemitir.addEventListener("click", ()=>{
                this.demitirFuncionario(usuario)
            })

        }

        editarUser.addEventListener("click", ()=>{
            index.editarFuncinario(usuario)

        })
        tagImg.src              = "https://api.lorem.space/image/face?w=80&h=80"
     

        tagH4.innerText         = usuario.username
        tagPEmail.innerText     = usuario.email
        nivelProff.innerText    = usuario.professional_level
        editarUser.innerText    = "editar"
        boxBtn.append(editarUser)
        tagDivInfo.append(tagH4, tagPEmail, nivelProff,boxBtn)
        tagLi.append(tagImg, tagDivInfo)
        return tagLi

    }

    //Editar Funcionario
    static editarFuncinario(infUsuario){

         const body                 = document.querySelector("body")
      
        const tagDivMain            = document.createElement("div")
        const tagDivBaseModal       = document.createElement("div")
        const tadEditar             = document.createElement("div")
        const tagNome               = document.createElement("p")
        const tagEmail              = document.createElement("p")
        const tagEmpresa            = document.createElement("span")
        const btnContratar          = document.createElement("button")

        const presencial            = document.createElement("option")
        const homeOffice            = document.createElement("option")
        const hibrido               = document.createElement("option")
        
        const select                = document.createElement("select")
        const select2               = document.createElement("select")

        tagDivMain.classList.add("container__modal")
        tagDivBaseModal.classList.add("baseModal")

        select.classList.add("deparament")
        btnContratar.classList.add("btn-geral")
        tadEditar.classList.add("editar")
        
        
        btnContratar.innerText      = "Editar informação"
        tagNome.innerText           = infUsuario.username 
        tagEmpresa.innerText        = infUsuario.professional_level
        tagEmail.innerText          = infUsuario.email

        const id                    = infUsuario.uuid
    
        
        const tagI =document.createElement("i")
        tagI.innerText  = "X"
        tagI.addEventListener("click", ()=>{
            tagDivMain.classList.toggle("modal-disappear")
           setTimeout(()=>{
            tagDivMain.remove()
           },1000)

        })
        btnContratar.addEventListener("click", ()=>{
            const level         = select2.options[select.selectedIndex].id;
            const localTrabalho = select.options[select.selectedIndex].id;
            
            // console.log(level)
            console.log(localTrabalho)

            const objeto ={
                kind_of_work: localTrabalho,
                professional_level  : level
            }
            console.log(objeto)
            // Requests.updateUserInfo(objeto, id)

        })



        tadEditar.append(tagNome,tagEmail, tagEmpresa, select,select2, btnContratar)
        tagDivBaseModal.append(tagI,tadEditar)
        tagDivMain.append(tagDivBaseModal)
        body.append(tagDivMain)

       
    }
    
    //contratar funcionario 
    static async contrarFuncioanrio(infUsuario){
        const body              = document.querySelector("body")
      
        const tagDivMain        = document.createElement("div")
        const tagDivBaseModal   = document.createElement("div")
        const tadEditar         = document.createElement("div")
        const tagNome           = document.createElement("p")
        const tagEmail          = document.createElement("span")
        const btnContratar      = document.createElement("button")

        const select            = document.createElement("select")
       

        
        tagDivMain.classList.add("container__modal")
        tagDivBaseModal.classList.add("baseModal")

        select.classList.add("deparament")
        btnContratar.classList.add("btn-geral")
        tadEditar.classList.add("editar")
        
        
        btnContratar.innerText      = "Contratar"
        tagNome.innerText           = infUsuario.username 
        tagEmail.innerText          = infUsuario.email

        const  IdUser               = infUsuario.uuid
        const todosDep  = await Requests.listAllDep()
        const empresas  = await Requests.listartodasEmpresas()


   
        console.log(todosDep)
        empresas.forEach(idEMpresa =>{

            const idEmpresa = idEMpresa.uuid
            todosDep.forEach(idDepartamento =>{
                
                if(idEmpresa == idDepartamento.companies.uuid){
               
                    const nomeEmpresa       = idDepartamento.companies.name
                    const nomeDepartamento  = idDepartamento.name
                    
                    const tagOption         = document.createElement("option")
                    tagOption.classList.add("escolherOpcao")
                    tagOption.id            = idDepartamento.uuid
                    
                    tagOption.innerText     = `${nomeEmpresa}: dep: ${nomeDepartamento}`
                    select.append(tagOption)
                }
            })
        })

        btnContratar.addEventListener("click", ()=>{
            const idDep = select.options[select.selectedIndex].id;
            const objeto ={
                user_uuid : IdUser,
                department_uuid: idDep
            }
            Requests.hireUser(objeto)
            //objeto

        })
       
        const tagI =document.createElement("i")
        tagI.innerText  = "X"
        tagI.addEventListener("click", ()=>{
            tagDivMain.classList.toggle("modal-disappear")
           setTimeout(()=>{
            tagDivMain.remove()
           },1000)

        })



        tadEditar.append(tagNome, tagEmail, select, btnContratar)
        tagDivBaseModal.append(tagI,tadEditar)
        tagDivMain.append(tagDivBaseModal)
        body.append(tagDivMain)

    }

    static demitirFuncionario(usuario){
        const   body = document.querySelector("body")
        console.log(usuario)
        const tagDivContainer = document.createElement("div")
        const tagBaseModal = document.createElement("div")
        const tagBtnSim = document.createElement("buttom")
        const tagBtnNao = document.createElement("buttom")
        const tagH3 = document.createElement("h3")
        const tagP = document.createElement("p")
        const tagSpan = document.createElement("span")
        const tagBoxBtn = document.createElement("div")
        const taginformacao = document.createElement("div")

        tagDivContainer.classList.add("container__modal")
        tagBaseModal.classList.add("baseModal")
        tagBoxBtn.classList.add("box_btns")
        tagBtnSim.classList.add("btn-geral")
        tagBtnNao.classList.add("btn-geral")
        tagBtnNao.classList.add("naoExcluir")
        taginformacao.classList.add("infoExcluir")

        tagSpan.innerText   = usuario.professional_level
        tagH3.innerText     = "excluir funcionario?"
        tagP.innerText   = usuario.username
        tagBtnSim.innerText = "SIM"
        tagBtnNao.innerText = "Não"
        const ID = usuario.uuid


        tagBtnSim.addEventListener("click" ,()=>{
            Requests.dismissUser(ID)
            tagDivContainer.classList.toggle("modal-disappear")
            setTimeout(()=>{
                tagDivContainer.remove()
            },1000)

        })
       
        tagBtnNao.addEventListener("click" ,()=>{
            tagDivContainer.classList.toggle("modal-disappear")
            setTimeout(()=>{
                tagDivContainer.remove()
            },1000)
        })


        body.append(tagDivContainer)
        tagDivContainer.append(tagBaseModal)
        
        tagBaseModal.append(taginformacao)
        taginformacao.append(tagH3, tagP, tagSpan, tagBoxBtn)

        tagBoxBtn.append(tagBtnSim ,tagBtnNao)
    }


}


index.listarSetores()
index.listarUsuario()
index.registerNewCompany()
index.listcompany()