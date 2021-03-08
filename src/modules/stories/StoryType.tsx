export type AuthorType = {
  id: string;
  karma: number;
};

export type StoryType = {
  title: string;
  url: string;
  score: number;
  time: number;
  by: string;
  id: number;
  author: AuthorType;
};
