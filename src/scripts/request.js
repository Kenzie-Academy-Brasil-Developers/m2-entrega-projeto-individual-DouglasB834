
import { instance } from "./axios.js";
import { Toast } from "./tost.js";

export class Requests {

    //fazer o login
    static async login(data) {
        const loginUser = await instance
            .post("auth/login", data)
            .then(res => {
                localStorage.setItem("@empresaToken:token", res.data.token)
                localStorage.setItem("@empresa:id", res.data.uuid)
                Toast.create("Login realizado com sucesso", "#0be881")

                setTimeout(() => {
                    window.location.replace("src/pages/dashboard.html")
                }, 1000)
            })
            .catch(error => {
                Toast.create("Email ou password invalido", "#FF3F34")
            })
        return loginUser

    }

    // fazer o cadastro
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

    //listar empresas 
    static async listartodasEmpresas() {
        const posts = await instance
            .get(`companies`)
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            })

        return posts
    }
    //lista uma presa 
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
        })
        .catch(error =>{
            Toast.create(error, red)
        })
    }

    //listar os departamentos da empresa na qual o usuário faz parte
    static async depDaEmpresaDoFuncinario(dep){
        const departamento = await instance
        .get(`users/${dep}`)
        .then(res =>{
            Toast.create("listando os departamentos da empresa..,", "#35a953")
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
    }

    //atualizar sua propria informação  normal email senha etc
    static async atualizaInf(data){
        const atualziar = await instance
        patch("users",data)
        .then(res =>{
            Toast.create("atualizando informações","#35a953")
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        /* oque vou preciso        
        {
            "username": "Bertoldo",
            "email": "bertoldo@mail.com",
            "password": "senha123"
        }
        
        */ 
    }

    // cadastrar empresa
    static async registerCompany(data){
        const company = await instance
        .post("companies", data)
        .then(res =>{
            Toast.create("Empresa Cadastra com sucesso","#35a953")
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

    // listar todos os setores 
    static async listAllSectors(){
        const sector = await instance
        get(`sectors`)
        .then(res => Toast.create("Listando setores","#35a953"))
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
    }

    //DEPARTAMENTOS REQUEST 

    //Rota para listar todos os departamentos
    static async listAllDep(){
        const deparment = await instance
        get("departments")
        .then(res => Toast.create("Listando departamentos","#35a953"))
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
    }

    //Listar todos os departamentos de uma empresa ID
    static async listOneDep(id){
        const selecDep = await instance 
        get(`departments/${id}`)
        .then(res => Toast.create("departamentos dessa empresa","#35a953"))
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        //id da empresa cujos departamentos serão listados deve ser informado na URI
    }

    //Criar departamento para um empresa
    static async registerDep(data){
        const departament = await instance
        .post(`departments`, data)
        .then(res =>{
            Toast.create("departamentos dessa empresa","#35a953")
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
            patch(`departments/hire/`,data)
            .then(res => Toast.create("departamentos dessa empresa","#35a953"))
            .catch(error => Toast.create(error,"#f2867d"))
            return user
        }
        /*O que vou precisar
        {
            "user_uuid": "0212ff4a-94de-4c97-8fbf-e7e4bb06e258",
            "department_uuid": "fc65d0be-507e-4c6e-badc-ccc4417ef980"
        } //https://api.lorem.space/image/face?w=150&h=150 img aleatoria gratis 
        */

        // Demitir funcionário ID
        static async dismissUser(id){
            const dismiss = await instance
            .patch(`departments/dismiss/`, id)
            .then(res =>Toast.create("desligado da empresa", "gray"))
            .catch(error => Toast.create(error, "red"))
        }

        //editar a descrição de um departamento, passando o uuid do departamento na url
        static async editDepartamet(data){
            const edit = await instance
            patch(`departments/`,data)
            .then(res =>Toast.create("editador com sucesso","#4AD09D"))
            .catch(error => Toast.create(error,"#eb4235"))
        }
        /* oque vou precisar
    data{
            "description": "Novo departamento de TI"
        }*/
        
        // Deletar departamento //res retorna apenas o status 204
        static async deletDep(id){
            const delet = await instance
            delete(`departments/${id}`)
            .then(res => Toast.create("Departamento deletado com Sucesso" ,"#ee6357"))
            .catch(error => Toast.create(error, "#eb4235"))
        }

        //Rota para listar todos os usuários (admin e funcionários) cadastrados no sistema
        static async listUsers(){
            const users = await instance
            get(`users`)
            .then(res => res)
            .catch(error => console.log(error))
            return users
        }

        //Usuários todos sem departamentos
        static async listAllDep(){
            const notdep = await instance
            get(`admin/out_of_work`)
            .then(res =res)
            .catch(error => console.log(error))
        }

        //Rota para atualização das informações do usuário
        static async updateUserInfo(data){
            const notdep = await instance
            patch(`admin/update_user/${data}`)
            .then(res = Toast.create("atualizado com sucesso"))
            .catch(error => console.log(error))
            return notdep
        }
        /*o que vou precisar
        {
            "kind_of_work": "presencial",
            "professional_level": "pleno"
        }
        
        */


}
