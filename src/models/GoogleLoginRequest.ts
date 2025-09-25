export interface GoogleLoginRequest {
  credential: string;
}

export interface LoginResponse {
  sucesso: boolean;
  mensagem: string;
  token: string;
  storeId: string;
  name: string;
  lastName: string;
}