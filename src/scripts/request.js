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


    // pesquisar todos os usuarios na page


}
