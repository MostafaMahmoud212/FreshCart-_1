export interface loginData {
  name: string,
  email: string,
}



export interface UserData extends loginData {
  phone: string,
  password: string,
  rePassword: string,
}