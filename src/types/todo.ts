import type { UserType } from "./user";

export interface TodoType {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: Status;
  priority: Int8Array;
  icon: string;
  deadline: string;
  color: Color;
  isChecked: boolean
  
  users: UserType[];
}

export interface PostTodoType {
  userId: number;
  title: string;
  description: string;
  status: Status;
  deadline: string;
  color: Color;
  isChecked: boolean
}

export const Status = {
  progress: "progress",
  completed: "completed",
  uncompleted: "uncompleted",
} as const;

export type Status = keyof typeof Status;

  export const Color = {
    cyan: "cyan",
    dark_blue: "dark_blue",
    yellow: "yellow",
    black: "black",
    sage: "sage",
  } as const;

export type Color = keyof typeof Color;