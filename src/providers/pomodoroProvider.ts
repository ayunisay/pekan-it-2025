import type { PomodoroType, PostPomodoroType } from "@/types/pomodoroType";
import axiosInstance from "./axiosInstance";

const POMODORO = "pomodoro";

export const postPomodoro = async (data: PostPomodoroType) => {
  try {
    const res = await axiosInstance.post(`${POMODORO}`, data);
    console.log("Data pomodoro: ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in post pomodoro API");
    throw e;
  }
};

export const getUserPomodoro = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${POMODORO}/user/${id}`);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get user API");
    throw e;
  }
};

export const getPomodoroById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${POMODORO}/${id}`);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get ID API");
    throw e;
  }
};

export const deletePomodoro = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`${POMODORO}/${id}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in delete API");
    throw e;
  }
};

export const getPomodoros = async () => {
  try {
    const res = await axiosInstance.get(`${POMODORO}/`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get all API");
    throw e;
  }
};

export const updatePomodoro = async (id: number, data: PomodoroType) => {
  try {
    const res = await axiosInstance.put(`${POMODORO}/${id}`, data);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in update API");
    throw e;
  }
};
