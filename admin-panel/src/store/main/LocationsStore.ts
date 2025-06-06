import { create } from 'zustand';
import ApiService from "@/services/ApiService";
import validateApi from "@/utils/validateApi";

interface Store {
  locations: any[];
  loading: boolean;
  createItem: (data: any) => Promise<any>;
  fetchData: () => Promise<any>; // Return type of async function should be Promise
}

const useLocationsStore = create<Store>((set, get) => ({
  locations: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });

    try {
      const res: any = await ApiService.fetchData({
        url: 'locations',
        method: 'GET'
      });

      const isValid = validateApi(res.data)
      if(!isValid){
        return
      }

      if (Array.isArray(res.data?.payload?.locations)) {
        set({ locations: res.data.payload.locations });
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
      data: data
    })
  }
}));

export default useLocationsStore;
