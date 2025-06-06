import ApiService from "@/services/ApiService";
import {SignInResponse, SignUpCredential} from "@/@types/auth";
import axios from "axios";

export const AuthService = {
  async getMe(): Promise<any> {
    try {
      const res = await ApiService.fetchData({
        url: 'users/me',
        method: 'GET',
      })
      return res.data;
    }catch (err){
      return err;
    }
  },

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const res = await ApiService.fetchData<{ email: string, password: string }, SignInResponse>({
      url: 'auth/login',
      method: 'POST',
      data: {email, password}
    })
    return res.data;
  },

  async confirmEmail(submit_code: string, email: string): Promise<any> {
    try {
      const res = await ApiService.fetchData({
        url: 'auth/confirmEmail',
        method: 'POST',
        data: {email, submit_code}
      })
      return res.data;
    } catch(err) {
      console.error(err)
    }
  },
  async signUp(params: SignUpCredential): Promise<any> {
    const {email, password, name, phone} = params;
    try {
      const res = await axios({
        url: 'auth/registration',
        method: 'POST',
        data: {email, password, name, phone}
      })
      return res.data;
    } catch(err) {
      console.error(err)
    }
  }
}
