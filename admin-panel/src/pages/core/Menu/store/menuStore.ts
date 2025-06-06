import {create} from 'zustand';
import ApiService from "@/services/ApiService";
import validateApi from "@/utils/validateApi";

interface MenuStore {
  menuList: any[];
  loading: boolean;
  createItem: (data: any) => Promise<any>;
  removeItem: (id: string) => Promise<any>; // Return type of async function should be Promise
  fetchData: () => Promise<any>; // Return type of async function should be Promise
}

const useMenuStore = create<MenuStore>((set, get) => ({
  menuList: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });

    try {
      const res: any = await ApiService.fetchData({
        url: 'menus',
        method: 'GET'
      });

      const isValid = validateApi(res.data)
      if(!isValid){
        return
      }

      if (Array.isArray(res.data?.payload?.menus)) {
        set({ menuList: res.data.payload.menus });
      }
    } catch (error) {
    }finally {
      set({ loading: false });
    }
  },
  createItem: async (data: any) => {
    return await ApiService.fetchData({
      url: 'menus/menu',
      method: "POST",
      data: {
        menu: data
      }
    })
  },
  removeItem: async (id: string) => {
    set({ loading: true });

    try {
      return await ApiService.fetchData({
        url: 'menus/' + id,
        method: 'delete',
        data: {
          id
        }
      })
    } catch (error) {
      return error
    }finally {
      set({ loading: false });
    }
  },
}));

export default useMenuStore;
