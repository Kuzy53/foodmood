import { create } from 'zustand';
import ApiService from "@/services/ApiService";


interface RestStore {
  restaurants: any[];
  loading: boolean;
  fetchData: () => Promise<any>; // Return type of async function should be Promise
  removeItem: (id: string) => Promise<any>; // Return type of async function should be Promise
  fetchOne: (id: string) => Promise<any>; // Return type of async function should be Promise
  updateItem: (values: any, id: string) => Promise<any>; // Return type of async function should be Promise
  create: (values: any) => Promise<any>; // Return type of async function should be Promise
}

const useRestStore = create<RestStore>((set) => ({
  restaurants: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({
        url: 'restaurants',
        method: 'GET'
      });

      if (Array.isArray(res.data?.payload?.restaurants)) {
        set({ restaurants: res.data?.payload?.restaurants });
      }
    } catch (error) {
    }finally {
      set({ loading: false });
    }
  },
  create: async (values: any) => {
    try {
      const res = await ApiService.fetchData({
        url: 'restaurants/restaurant',
        method: 'POST',
        data: {
          restaurant: {
            ...values,
            locationId: +values.locationId
          },
        }
      });

      if (Array.isArray(res.data?.payload?.restaurants)) {
        set({ restaurants: res.data?.payload?.restaurants });
      }
      return res
    } catch (error) {
      return error
    }finally {
      set({ loading: false });
    }
  },
  removeItem: async (id: string) => {
    try {
      const res = await ApiService.fetchData({
        url: 'restaurants/' + id,
        method: 'delete',
        data: {
          id
        }
      });

      return res
    } catch (error) {
      return error
    }finally {
      set({ loading: false });
    }
  },
  fetchOne: async(id: string) => {
    try {
      const res = await ApiService.fetchData({
        url: `restaurants/${id}` ,
        method: 'get',
      });
      return res
    } catch (error) {
      return error
    }finally {
      set({ loading: false });
    }
  },
  updateItem: async (values: any, id: string) => {
    try {
      const res = await ApiService.fetchData({
        url: `restaurant/restaurants/${id}` ,
        method: 'put',
        data: {
          restaurant: {
            ...values,
            locationId: +values.locationId
          },
        }
      });
      debugger

      return res
    } catch (error) {
      return error
    }finally {
      set({ loading: false });
    }
  }
}));

export default useRestStore;
