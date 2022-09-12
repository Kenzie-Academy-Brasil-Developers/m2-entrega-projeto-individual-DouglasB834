
const token = localStorage.getItem("@empresaToken:token");

export const instance = axios.create({
    baseURL: "http://localhost:6278/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})


