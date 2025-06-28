import type { FriendReqType, UpdateUserType, UserType } from "../types/user.ts";
import axiosInstance from "./axiosInstance.ts";

const USER = "users";
const FRIEND = "friends";

export const register = async (data: any) => {
  try {
    const res = await axiosInstance.post(`${USER}/`, data);
    console.log("Data regis: ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in registerUser API");
    throw e;
  }
};

export const login = async (data: any) => {
  try {
    const res = await axiosInstance.post(`${USER}/login`, data);
    console.log("Data login: ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in login API");
    throw e;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${USER}/${id}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get id API");
    throw e;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const res = await axiosInstance.get(`${USER}/${email}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get email API");
    throw e;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${USER}/${id}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get email API");
    throw e;
  }
};

export const getUsers = async () :Promise<UserType[]> => {
  try {
    const res = await axiosInstance.get(`${USER}/`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get email API");
    throw e;
  }
};

export const verifyToken = async (token: any) => {
  try {
    const res = await axiosInstance.post(`${USER}/verify-token`, { token });
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in verify token API");
    throw e;
  }
};

export const updateUser = async (id: number, data: UpdateUserType) => {
    try {
        const formData = new FormData();
        
        // Append data biasa
        if (data.username) formData.append('username', data.username);
        if (data.name) formData.append('name', data.name);
        if (data.email) formData.append('email', data.email);
        if (data.role) formData.append('role', data.role);
        if (data.avatar) {formData.append('avatar', data.avatar);}
        
        if (data.newAvatar && data.newAvatar instanceof File) {
            formData.append('newAvatar', data.newAvatar);
        }

        console.log("FormData entries:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const res = await axiosInstance.put(`${USER}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (!res.data || !res.data.data) {
            console.error("Invalid response format from server");
        }
        console.log("Hereeesss");
        console.log("Helooo",res.data.data)
        return res.data;
    } catch (e: any) {
        console.error("Error response:", e.response?.data);
        console.error("Error status:", e.response?.status);
        throw e;
    }
};

export const getUserByUsn = async (username: string) => {
  try {
    const res = await axiosInstance.get(`${USER}/usn/${username}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get username API");
    throw e;
  }
};

export const getFriends = async (id: number, status: string) => {
  try {
    const res = await axiosInstance.get(`${USER}/${FRIEND}/${id}`, {
      params: {status}
    });
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get username API");
    throw e;
  }
};

export const getFriend= async (identifier: any) => { //bisa pake username atau id
  const isNumber = !isNaN(identifier);  
  try {
    const res = await axiosInstance.get(`${USER}/${FRIEND}/${identifier}?byUsername=${isNumber}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in get friend API");
    throw e;
  }
};

export const requestFriend = async (data:any) => {
  try {
    const res = await axiosInstance.post(`${USER}/${FRIEND}`, data);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in request friend API");
    throw e;
  }
};

export const updateFriendStatus = async (data: FriendReqType) => {
  try {
    const res = await axiosInstance.post(`${USER}/${FRIEND}/status`, data);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e: any) {
    console.error(e, "Error in update friend API");
    console.error(`Message error ${e.Message}`);
    throw e;
  }
};

export const deleteFriend = async (identifier: any) => {
  try {
    const res = await axiosInstance.delete(`${USER}/${FRIEND}/${identifier}`);
    console.log("Data : ", res);
    return res.data.data;
  } catch (e) {
    console.error(e, "Error in delete API");
    throw e;
  }
};