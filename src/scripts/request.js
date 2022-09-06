
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

    static async atualizaInf(data){
        const atualziar = await instance
        patch("users",data)
        .then(res =>{
            Toast.create("atualizando informações","#35a953")
        })
        .catch(error =>{
            Toast.create(error,"#f2867d")
        })
        /*
        oque preciso 
        {
            "username": "Bertoldo",
            "email": "bertoldo@mail.com",
            "password": "senha123"
        }
        
        */ 
    }




}
