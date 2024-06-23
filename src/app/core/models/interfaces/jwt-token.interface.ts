export interface IJwtToken {
  userId: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
