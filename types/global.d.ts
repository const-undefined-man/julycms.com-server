declare type UserInfo = {
  username: string;
  id: number;
  roles: [];
};

declare namespace Express {
  export interface Request {
    loggerInfo?: Record<string, any>;
  }
}
