export interface UserType {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string | null;
  role: "admin" | "user";
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserType {
  id?: number;
  username: string;
  email: string;
  name: string;
  avatar: string | null;
  role: "admin" | "user";
  newAvatar?: File;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostUserType {
  username: string;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  role: "admin" | "user";
}

export interface LoginUserType {
  email: string;
  password: string;
}

