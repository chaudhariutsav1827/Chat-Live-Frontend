export interface IJwtToken {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
