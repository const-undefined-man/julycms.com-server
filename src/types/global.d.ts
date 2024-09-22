declare namespace Express {
  export interface Request {
    loggerInfo?: Record<string, any>;
    user: {
      // TODO: 暂未使用 用户名
      username: string;
      // TODO: 暂未使用 用户id
      userid: number;
      roles: number[];
      isAdmin: number;
    };
  }
}
