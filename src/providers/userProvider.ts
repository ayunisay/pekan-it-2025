import instance from "./instance.ts";

const USER = 'users'

export const register = async (data: any) => {
    try{
        const res = await instance.post(`${USER}`, data)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in registerUser API");
        throw e;
    }
}

export const login = async (data: any) => {
    try{
        const res = await instance.post(`${USER}/login`, data)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in login API");
        throw e;
    }
}

export const getUserById = async (id: string) => {
    try{
        const res = await instance.get(`${USER}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get id API");
        throw e;
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        const res = await instance.get(`${USER}/${email}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const deleteUser = async (id: string) => {
    try{
        const res = await instance.delete(`${USER}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const getUsers = async () => {
    try{
        const res = await instance.get(`${USER}/`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const verifyToken = async (token: any) => {
    try{
        const res = await instance.post(`${USER}/verify-token`, token)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in login API");
        throw e;
    }
}