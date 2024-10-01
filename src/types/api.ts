// let's imagine this file is autogenerated from the backend
// ideally, we want to keep these api related types in sync
// with the backend instead of manually writing them out

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type User = Entity<{
  email: string;
}>;

export type AuthResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
