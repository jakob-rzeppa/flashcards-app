export type typeCards = {
  back: string;
  created_at: string;
  front: string;
  id: number;
  stack_id: number;
  user_id: string;
}[];

export type typeStack = {
  created_at: string;
  description: string;
  id: number;
  name: string;
  parent_folder: number | null;
  user_id: string;
};

export type typeFolder = {
  created_at: string;
  id: number;
  name: string;
  parent_folder: number | null;
  user_id: string;
};
