export interface IJwtToken {
  _id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
