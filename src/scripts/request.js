
import { instance } from "./axios.js";
import { Toast } from "./tost.js";

export class Requests {

    //fazer o login(FOI)
    static async login(data) {
        const loginUser = await instance
            .post("auth/login", data)
            .then(res => {
                localStorage.setItem("@empresaToken:token", res.data.token)
                localStorage.setItem("@empresa:id", res.data.uuid)
                localStorage.setItem("@admin", res.data.is_admin)
                Toast.create("Login realizado com sucesso", "#0be881")

                setTimeout(() => {
                    if(res.data.is_admin == true){
                        window.location.replace("src/pages/dashboard.html")
                    }else{
                        window.location.replace("src/pages/userPage.html")
                    }
                }, 1000)
            })
            .catch(error => {
                Toast.create("Email ou password invalido", "#FF3F34")
            })
        return loginUser

    }

    // fazer o cadastro (FOI)
    static async singup(data) {

        const newRegister = await instance
            .post("auth/register/user", data)
            .then(async res => {
                Toast.create("Cadastrado com sucesso!!")
            })
            .catch(error => {
                Toast.create("Cadastro invalido", "red;")
            })
    }

    //listar todos empresas  (foi!)
    static async listartodasEmpresas() {
        const posts = await instance
            .get(`companies`)
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            })

        return posts
    }
    //lista uma empresa 
    static async listarCompany(name) {
        const posts = await instance
            .get(`companies/${name}`)
            .then(res => res.data)
            .catch(error => {
                Toast.create(error, red)
            })

        return posts
    }

    // FUNCIONARIOS NORMAL
    // Listar todos os funcionários do mesmo departamento (usuario normal)
    static async funcionarioDepartamento(nomeDep){
        const funcionários = await instance
        .get(`users/departments/${nomeDep}`)
        .then(res => {
            Toast.create("listando os Funcionarios do departamento..." ,"gray")
            return res.data
        })
        .catch(error =>{
            Toast.create(error," red")
        })
        return funcionários
    }

    //listar os departamentos da empresa na qual o usuário faz parte
    static async depDaEmpresaDoFuncinario(dep){
        const departamento = await instance
        .get(`users/${dep}`)
        .then(res =>{
            Toast.create("listando os departamentos da empresa..,", "#35a953")
            return res
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return departamento
    }

    static async informacaoFuncionario(data){
        const user = await instance
        .get(`users/profile/`)
        .then(res =>{
            Toast.create("listando informação..,", "#35a953")
            return res.data
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return user
    }




    //atualizar sua propria informação  normal email senha etc
    static async atualizaInf(data){
        const atualziar = await instance
        .patch("users",data)
        .then(res =>{
            Toast.create("atualizando informações","#35a953")
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
    }
    /* oque vou preciso        
    {
        "username": "Bertoldo",
        "email": "bertoldo@mail.com",
        "password": "senha123"
    }
    
    */ 

    // cadastrar empresa (feito)
    static async registerCompany(data){
        const company = await instance
        .post("companies", data)
        .then(res =>{
            Toast.create("Empresa Cadastra com sucesso","#35a953")
            setTimeout(()=>{
                window.location.reload()
            },1500)
            return res

        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return company
    }
    /*OQUE PRECISO 
    {
        "name": "Kenzie",
        "opening_hours": "09:00",
        "description": "Kenzie kenzie kenzie",
        "sector_uuid": "17247c6b-5205-4067-9695-278fcb97d592"
    }
    
    */ 

    // listar todos os setores (Listando na Homepage)
    static async listAllSectors(){
        const sector = await instance
        .get(`sectors`)
        .then(res => res.data)
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return sector
    }

    //DEPARTAMENTOS REQUEST 

    //Rota para listar todos os departamentos ()
    // (feito)
    static async listAllDep(){
        const deparment = await instance
        .get("departments")
        .then(res => res.data)
        .catch(error => console.log(error))
        return deparment
    }

    //Listar todos os departamentos de uma empresa ID (feito esta no selecte)
    static async listOneDep(id){
        const selecDep = await instance 
        .get(`departments/${id}`)
        .then(res => {
            Toast.create("departamentos dessa empresa","#35a953")
            return res.data
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return selecDep
        //id da empresa cujos departamentos serão listados deve ser informado na URI
    }

    //Criar departamento para um empresa (feito)
    static async registerDep(data){
        
        const departament = await instance
        .post(`departments`, data)
        .then(res =>{
            Toast.create("departamentos criado com sucesso","#35a953")
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        return departament
    }
    /* O que vou precisar 
    {
        "name": "Ensino",
        "description": "Equipe responsável para ensinar os alunos",
        "company_uuid": "76319b59-e26a-4b96-9715-98f38d6dba57"
    }
    */

    // Contratar funcionário
        static async hireUser(data){
            const user = await instance 
            .patch(`departments/hire/`,data)
            .then(res => Toast.create("Contratado com sucesso ","#35a953"))
            .catch(error => Toast.create(error,"#f2867d"))
            return user
        }
      

        // Demitir funcionário ID
        static async dismissUser(id){
            const dismiss = await instance
            .patch(`departments/dismiss/${id}`)
            .then(res =>Toast.create("desligado da empresa", "gray"))
            .catch(error => Toast.create(error, "red"))
        }

        //editar a descrição de um departamento, passando o uuid do departamento na url
        static async editDepartamet(data, id){
            const edit = await instance
            .patch(`departments/${id}`,data)
            .then(res =>Toast.create("editador com sucesso","#4AD09D"))
            .catch(error => Toast.create(error,"#eb4235"))
        }
       
        
        // Deletar departamento //res retorna apenas o status 204
        //(SIm)
        static async deletDep(id){
            const delet = await instance
            .delete(`departments/${id}`)
            .then(res => Toast.create("Departamento deletado com Sucesso" ,"#gray"))
            .catch(error => Toast.create(error, "#eb4235"))
        }
        static async deletUser(id){
            const delet = await instance
            .delete(`admin/delete_user/${id}`)
            .then(res => Toast.create(" deletado com Sucesso" ,"#gray"))
            .catch(error => Toast.create(error, "#eb4235"))
        }

        //Rota para listar todos os usuários (admin e funcionários) cadastrados no sistema
        static async listUsers(){
            const users = await instance
            .get(`users`)
            .then(res => res.data)
            .catch(error => console.log(error))
            return users
        }

        //Usuários todos sem departamentos
        static async listAllUsersDep(){
            const notdep = await instance
           .get(`admin/out_of_work`)
            .then(res =res)
            .catch(error => console.log(error))
        }

        //Rota para atualização das informações do usuário
        static async updateUserInfo(data, id){
            const notdep = await instance
            .patch(`admin/update_user/${id}`, data )
            .then(res =>{
                Toast.create("atualizado com sucesso")
                return res
            })
            .catch(error =>  Toast.create(error, "#eb4235"))
            return notdep
        }
      


}
