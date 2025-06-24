export interface UserInterface {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoInterface {
  id: number,
  name: string,
  username: string,
  role: string,
  avatar: string,
}

export interface TaskInterface {
  id: number;
  text: string;
  date: string;
  color: string;
}