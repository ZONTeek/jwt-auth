export type AxiosContextType = {
  error: string | undefined;
  authAxios: any;
  publicAxios: any;
  login: (username:string, password: string) => void;
  register: (firstName:string, lastName:string, email:string, password: string) => void;
  getCat: () => any;
  checkAuth: ()=> void;
  clearError: () => void;
}

export type Weather = {
  city: string,
  description: string,
  temperature: number,
  windSpeed: number,
  date: number
}