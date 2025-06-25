import axiosInstance from "./axiosInstance.ts";

const USER = 'users'

export const register = async (data: any) => {
    try{
        const res = await axiosInstance.post(`${USER}/`, data)
        console.log("Data regis: ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in registerUser API");
        throw e;
    }
}

export const login = async (data: any) => {
    try{
        const res = await axiosInstance.post(`${USER}/login`, data)
        console.log("Data login: ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in login API");
        throw e;
    }
}

export const getUserById = async (id: string) => {
    try{
        const res = await axiosInstance.get(`${USER}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get id API");
        throw e;
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        const res = await axiosInstance.get(`${USER}/${email}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const deleteUser = async (id: string) => {
    try{
        const res = await axiosInstance.delete(`${USER}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const getUsers = async () => {
    try{
        const res = await axiosInstance.get(`${USER}/`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const verifyToken = async (token: any) => {
    try{
        const res = await axiosInstance.post(`${USER}/verify-token`, token)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in login API");
        throw e;
    }
}