import { create } from 'zustand';
import ApiService from "@/services/ApiService";
import validateApi from "@/utils/validateApi";
import {SignInCredential, User} from "@/@types/auth";
import {useNavigate} from "react-router-dom";
import {AuthService} from "@/services/auth/auth.service";
import {REDIRECT_URL_KEY} from "@/constants/app.constant";
import appConfig from "@/configs/app.config";

interface UserStore {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  userRole: string | null;
  fetchMe: () => Promise<any>; // Return type of async function should be Promise
  logout: () => Promise<any>; // Return type of async function should be Promise
  setUser: (user: User) => void;
  initialize: () => void;
  signIn: (values: SignInCredential) => Promise<any>;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,

  get isAuth() {
    return get().user !== null;
  },

  get userRole() {
    if(!get().user){
      return null
    }
    return get().user.role;
  },

  logout: async () => {
    await ApiService.fetchData({
      url: 'auth/logout',
      method: 'GET',
    });
    localStorage.removeItem('user');
  },

  setUser: (user: User) => {
    console.log('setuser', user)
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  fetchMe: async (): Promise<any> => {
    set({ loading: true });

    try {
      const res: any = await ApiService.fetchData({
        url: 'users/me',
        method: 'GET',
      });

      const isValid = validateApi(res.data);
      if (!isValid) {
        return res.data;
      }

      if (res.data?.payload?.user) {
        get().setUser(res.data.payload.user); // Use setUser to update localStorage and state
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (values: SignInCredential): Promise<any> => {
    try {
      const resp = await AuthService.signIn(values.email, values.password);

      if (resp?.response?.status !== 200) {
        return {
          status: 'failed',
          message: 'Invalid credentials',
        };
      }

      // Fetch user data after successful sign-in
      const userReps = await get().fetchMe();

      if (userReps?.response?.status !== 200) {
        return {
          status: 'failed',
          message: 'Failed to fetch user data',
        };
      }

      return {
        status: 'success',
        message: '',
      };
    } catch (errors: any) {
      console.error(errors);
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString(),
      };
    }
  },

  initialize: () => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (savedUser) {
      set({ user: savedUser });
    }
  }
}));

export default useUserStore;
