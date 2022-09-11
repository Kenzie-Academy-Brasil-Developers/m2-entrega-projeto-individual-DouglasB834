

export class CriarModal {
    static body = document.querySelector("body")

    static template(modal) {
        const section = document.createElement("section")
        section.classList.add("container__modal")

        section.append(modal)
        this.body.append(section)
    }


    static loginForm(login) {
       
        const tagDiv = document.createElement("div")
        tagDiv.classList.add("modal")

        const tagDivVoltar          = document.createElement("div")
        const tagH2                 = document.createElement("h2")
        const tagSpan               = document.createElement("span")
        tagSpan.classList.add(".closeModal")

        tagH2.innerText             = "Login"
        tagSpan.innerText           = "Back"

        const tagForm               = document.createElement("form")
        tagForm.classList.add("form")

        const tagInputEmail         = document.createElement("input")
        tagInputEmail.classList.add("email")
        tagInputEmail.type          = "email"
        tagInputEmail.placeholder   = "Seu e-mail"

        const tagInputPassword       = document.createElement("input")
        tagInputPassword.classList.add("password")
        tagInputPassword.type        = "password"
        tagInputPassword.placeholder = "Sua senha"

        const tagButtonLogar         = document.createElement("button")

        tagButtonLogar.classList.add("logar")
        tagButtonLogar.innerText    = "Logar"

        const tagP = document.createElement("p")
        tagP.innerText = "go to registration"

        const tagButtonRegistrar     = document.createElement("button")
        tagButtonRegistrar.classList.add("btnSingup")
        tagButtonRegistrar.innerText = "Don't have a registration yet?"

        tagSpan.addEventListener("click", ()=>{

            const modal = document.querySelector(".container__modal")
            modal.classList.add("modal-disappear")
            setTimeout(()=>{
                modal.remove()
               
            },1400)
        })

        tagButtonRegistrar.addEventListener("click", (event) => {
            event.preventDefault()
            const modal = document.querySelector(".container__modal")
            modal.classList.add("modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1.400)
            this.template(this.singupForm())
        })

        tagDivVoltar.append(tagH2, tagSpan)
        tagForm.append(tagInputEmail, tagInputPassword, tagButtonLogar)
        tagDiv.append(tagDivVoltar, tagForm, tagP, tagButtonRegistrar)
        return tagDiv
    }

    static singupForm(cadastrar) {

        const tagDiv = document.createElement("div")
        tagDiv.classList.add("modal")

        const tagDivVoltar              = document.createElement("div")
        const tagH2                     = document.createElement("h2")
        const tagSpan                   = document.createElement("span")
        tagSpan.classList.add("closeModal")
        tagH2.innerText                 = "Sing Up"
        tagSpan. innerText              = "Back"

        const tagForm                   = document.createElement("form")
        tagForm.classList.add("form")

        const tagInputNome              = document.createElement("input")
        tagInputNome.classList.add("nomeUser")
        tagInputNome.type               = "text"
        tagInputNome.placeholder        = "Digite seu nome"
        tagInputNome.required           = true


        const tagInputEmail             = document.createElement("input")
        tagInputEmail.classList.add("email")
        tagInputEmail.type              = "email"
        tagInputEmail.placeholder       = "Seu e-mail"
        tagInputEmail.required          =true



        const tagInputPassword          = document.createElement("input")
        tagInputPassword.classList.add("password")
        tagInputPassword.type           = "password"
        tagInputPassword.placeholder    = "Sua senha"
        tagInputPassword.required       = true


        const select    = document.createElement("select")
        const estagio   = document.createElement("option")
        const junior    = document.createElement("option")
        const pleno     = document.createElement("option")
        const senior    = document.createElement("option")
        const nivel     = document.createElement("option")

       
        nivel.innerText = "qual e seu nivel ?"   
        estagio.innerText   = "estágio"
        estagio.value       = "estágio"
        junior.value        = "júnior"
        junior.innerText    = "júnior"
        pleno.value         = "pleno"
        pleno.innerText     = "pleno"
        senior.value        = "sênior"
        senior.innerText    = "sênior"
        
        console.log(senior.value)
        select.append(nivel,estagio,junior,pleno,senior)

        const tagInputJob               = document.createElement("input")
        tagInputJob.classList.add("UserJob")
        tagInputJob.type                = "text"
        tagInputJob.placeholder         = "Qual seu trabalho?"
        tagInputJob.required            = true
       

        const tagButtonRegistrar        = document.createElement("button")
        tagButtonRegistrar.classList.add("register")
        tagButtonRegistrar.innerText    = "Registrar"

        const tagP                      = document.createElement("p")
        tagP.innerText                  = "Already have login?"

        const buttonVoltarLogin         = document.createElement("p")
        buttonVoltarLogin.classList.add("voltarLogin")
        buttonVoltarLogin.type          = "submit"
        buttonVoltarLogin.innerText     = "go to login page"

        tagSpan.addEventListener("click", ()=>{
            const modal = document.querySelector(".container__modal")
            modal.classList.add("modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1400)
        })

        buttonVoltarLogin.addEventListener("click", (event) => {
            event.preventDefault()
            const modal = document.querySelector(".container__modal")
            modal.classList.add("modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1.400)
            this.template(this.loginForm())
        })

        tagDivVoltar.append(tagH2, tagSpan)

        tagForm.append(tagInputNome, tagInputEmail, tagInputPassword, select, tagButtonRegistrar)

        tagDiv.append(tagDivVoltar, tagForm, tagP, buttonVoltarLogin)


        return tagDiv

    }
  

}