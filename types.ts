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
  user_id: string;
};

export type typeStackTag = {
  stack_id: number;
  tag: string;
};
