import { nanoid } from "nanoid";

export function getUserId(){
    let userId = localStorage.getItem("userId")
    if(!userId){
        userId = nanoid()
        localStorage.setItem('userId',userId)
    }
    return userId
}

export function setToken(token){
    localStorage.setItem('token',token)
}

export function getToken(){
    let token = localStorage.getItem('token')
    return token
}

export function deleteToken(){
    localStorage.removeItem('token')
}