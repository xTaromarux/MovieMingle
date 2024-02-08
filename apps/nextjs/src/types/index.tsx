export type Post = {
  id: string;
  title: string;
  content: string;
};

export type Movie = {
  id: string;
  backgroundImg?: string;
  cardImg?: string;
  titleImg?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  stateType?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Person = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export type Schedule = {
  id: string;
  movie: Movie;
  movieId: string;
  time: string;
  remainTickets: number;
  fromDate: Date;
  toDate: Date;
  roomNumber: number;
};
