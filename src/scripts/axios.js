
const token = localStorage.getItem("@kenzieRedeSocial:token");


export const instance = axios.create({
    baseURL: "http://localhost:6278/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})

