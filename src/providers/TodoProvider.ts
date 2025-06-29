import type { PostTodoType, UpdateTodoType } from "../types/todo";
import axiosInstance from "./axiosInstance";

const TODO = "todolist";

export const addTodo = async (data: PostTodoType) => {
  try {
    const res = await axiosInstance.post(`${TODO}/`, data);
    console.log("Data todo: ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in post todo API");
    throw e;
  }
};

export const getTodoById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${TODO}/user/${id}`);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get id API");
    throw e;
  }
};

export const getTodoByUser = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${TODO}/user/${id}`);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get user todo API");
    throw e;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${TODO}/${id}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get email API");
    throw e;
  }
};

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${TODO}/`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get email API");
    throw e;
  }
};

export const updateTodo = async (id: number, data: UpdateTodoType) => {
  try {
    const res = await axiosInstance.put(`${TODO}/${id}`, data);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in update API");
    throw e;
  }
};