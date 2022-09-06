
const token = localStorage.getItem("@kenzieRedeSocial:token");

let Headers = {}

    if(token){
        Headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }else{
        Headers = {
            "Content-Type": "application/json"
        }
    }

export const instance = axios.create({
    baseURL: "http://localhost:6278/",
    headers: Headers
})

