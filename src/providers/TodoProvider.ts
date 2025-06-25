import axiosInstance from "./axiosInstance";

const TODO = 'todolist'

export const addTodo = async (data: any) => {
    try{
        const res = await axiosInstance.post(`${TODO}`, data)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in postTodo API");
        throw e;
    }
}

export const getTodoById = async (id: string) => {
    try{
        const res = await axiosInstance.get(`${TODO}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get id API");
        throw e;
    }
}

export const getTodoByUser = async (id: string) => {
    try{
        const res = await axiosInstance.get(`${TODO}/user/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const deleteTodo = async (id: string) => {
    try{
        const res = await axiosInstance.delete(`${TODO}/${id}`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

export const getTodos = async () => {
    try{
        const res = await axiosInstance.get(`${TODO}/`)
        console.log("Data : ", res)
        return res.data.data
    } catch (e) {
        console.error(e, "Error in get email API");
        throw e;
    }
}

//update belom